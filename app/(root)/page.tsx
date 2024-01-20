"use client";
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";
import { useState , useEffect } from "react";
// Import necessary dependencies

// Example Thread Model Definition
interface Thread {
  id: string;
  text: string;
  author: string;
  community: string | null;
  parentId: string | null; // Add this line
  createdAt: Date;
  // ... other properties
}

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);



  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {posts.length === 0 ? (
          <p className="no-result">No posts found.</p>
        ) : (
          posts.map((post) => (
            <ThreadCard
              key={post._id}
              post={post._id}
              currentUserId={user?.id}
              parentId={post.parentId}
              content={post.text}
              author={post.author}
              community={post.community}
              createdAt={post.createdAt}
              comments={post.children}
            />
          ))
        )}
      </section>
    </>
  );
}

