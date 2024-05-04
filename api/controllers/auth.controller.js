import bcrypt from "bcrypt";
import prisma from "..//lib/prisma.js";


export const register = async (req,res) =>{
    const { username, email, password } = req.body;
    console.log(req.body)
    try{
        //HASH THE PASSWORD
        const hashedPPassword = await bcrypt.hash(password, 10);
        //CREATE A NEW USER and SAVE TO DB
        const newUser = await prisma.user.create({
            data:{
                username,
                email,
                password: hashedPPassword
            }
        });
        console.log(newUser);
        res.status(200).json({message: "User created successfully"});
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: "User creation failed"});
    }
}

export const login = (req,res) =>{
    //db operations
}
export const logout = (req,res) =>{
    //db operations
}