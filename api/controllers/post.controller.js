import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  const query = req.query;

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) {
          // If there's an error verifying the token, ensure only one response is sent
          return res.status(200).json({ ...post, isSaved: false });
        }

        const saved = await prisma.savedPost.findUnique({
          where: {
            userId_postId: {
              postId: id,
              userId: payload.id,
            },
          },
        });

        // Only send a response once after verifying the token and checking the saved status
        return res.status(200).json({ ...post, isSaved: saved ? true : false });
      });
    } else {
      // If there's no token, respond with default value
      return res.status(200).json({ ...post, isSaved: false });
    }
  } catch (err) {
    console.error(err);
    // Ensure only one response is sent in case of an error
    res.status(500).json({ message: "Failed to get post" });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const updatePost = async (req, res) => {
  try {
    // Ensure only one response is sent
    return res.status(200).json({ message: "Post updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update posts" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;

  try {
    // Find the post
    const post = await prisma.post.findUnique({
      where: { id },
    });

    // If post not found, return 404
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Delete the post
    await prisma.post.delete({
      where: { id },
    });

    // Send success response
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.error(err);
    // Send error response
    res.status(500).json({ message: "Failed to delete post" });
  }
};
