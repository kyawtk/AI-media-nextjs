"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Form from "@components/Form";

// import { useRouter }'
const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
 console.log(session.user.id)
  async function createPrompt(e) {
    e.preventDefault();
    setSubmitting(true);
    const userId = session ? session.user.id : ''
    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId,
          tag: post.tag,
        }),
      });
      if (res.ok) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  }
useEffect(()=>{
  return
},[session.user.id])
  return (
    <div className="">
      <Form
        type="Create"
        setPost={setPost}
        post={post}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </div>
  );
};

export default CreatePrompt;
