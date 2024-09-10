import React from 'react';
import './card.scss';
import axios from 'axios';
// Define getToken function
const getToken = () => {
  // Retrieve the token from localStorage or wherever you're storing it
  return localStorage.getItem('token'); // Assuming you're storing the token in localStorage
};

function Card({ item, onDelete }) {
  const deletePost = async (postId) => {
    try {
      const token = getToken(); // Get the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request header
        }
      };
  
      const res = await axios.delete(`http://localhost:8800/api/posts/${postId}`, config);
      
      if (res.status === 200) {
        alert("Post deleted");
        onDelete(postId); // Update UI by removing the deleted post
      } else {
        console.error("Error deleting post:", res.data.message);
        alert("Error deleting post: " + res.data.message);
      }
    } catch (error) {
      console.error("Error deleting post:", error.message);
      alert("Error deleting post: " + error.message);
    }
  };

  return (
    <div className='card'>
      <div className='imageContainer'>
        <img src={item.images[0]} alt='' />
      </div>
      <div className='textContainer'>
        <h2 className='title'>{item.title}</h2>
        <p className='address'>
          <img src='/pin.png' alt='' />
          <span>{item.address}</span>
        </p>
        <p className='price'>Rs {item.price}</p>
        <div className='bottom'>
          <div className='features'>
            <div className='feature'>
              <img src='/bed.png' alt='' />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className='feature'>
              <img src='/bath.png' alt='' />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className='icons'>
            <div className='icon'>
              <img src='/save.png' alt='' />
            </div>
            <div className='icon'>
              <img src='/chat.png' alt='' />
            </div>
            <div className='icon'>
              <button onClick={() => deletePost(item.id)}>
              <img src='/bin.png' alt='' />
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
