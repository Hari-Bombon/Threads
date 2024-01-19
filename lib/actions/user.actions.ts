"use server"

import mongoose from "mongoose";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";


interface Params {
    name: string;
    path: string;
    username: string;
    userId : string,
    bio: string;
    image: string;
    
  }
  
export async function updateUser({
    name ,
    path ,
    username ,
    bio ,
    userId ,
    image ,
   
    
 } : Params): Promise<void> {
    connectToDB();

    try{
        await User.findOneAndUpdate(
            {id: userId},
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true,
            },
            
            {
                upsert : true
            }
        );
        if(path == '/profile/edit'){
            revalidatePath(path)
        }
    }  catch (error) {
        console.error(`Failed to create or update user:`, error);
        throw new Error(`Failed to create or update user`);
      }
    }    
