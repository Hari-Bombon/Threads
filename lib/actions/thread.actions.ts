"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createThread({ text, author, communityId, path }: Params) {
  try {
    connectToDB();

    // Adjust the community field based on the provided communityId
    const createdThread = await Thread.create({
      text,
      author,
      community: communityId ? communityId : null,
    });

    if (!createdThread) {
      // Handle the case where the thread creation failed
      throw new Error("Thread creation failed");
    }

    // Update the user with the new thread ID
    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });

    // Revalidate the specified path
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error creating Thread: ${error.message}`);
  }
}
