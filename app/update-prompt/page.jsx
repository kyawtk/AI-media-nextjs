"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Form from "@components/Form";

// import { useRouter }'
const UpdatePrompt = () => {
    const searchParmas = useSearchParams()
    const promptid = searchParmas.get('id')
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
 
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  async function updatePrompt(e) {
    if(!promptid){
        alert('No prompt id')
    }
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/prompt/"+ promptid, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          
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
    const getPrompt = async () => {
        let response = await fetch(`/api/prompt/${promptid}`)
        let data = await response.json()
        setPost(data)}
    if(promptid){
        getPrompt()
    }}
  ,[promptid])
  return (
    <div className="">
      <Form
        type="Update"
        setPost={setPost}
        post={post}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </div>
  );
};

export default UpdatePrompt;
