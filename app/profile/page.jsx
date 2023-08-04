"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Profile from "@components/Profile";
export const ProfilePage = () => {
  const router = useRouter();
  const [prompts, setPrompts] = useState([]);
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure to Delete this prompt?");
    if (hasConfirmed) {
      try {
        console.log(post._id, 'inside try delete block')
        let res = await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });

        setPrompts(current => current.filter(p => p._id !== post._id))
      } catch (err) {
        alert(err);
      }
    }
  };
  const { data: session } = useSession();
  
  useEffect(() => {
    const fetchprompts = async () => {
      const response = await fetch(`/api/users/${session.user.id}/posts`);
      const data = await response.json();
      setPrompts(data);
      console.log(data);
    };

    if (session?.user.id) {
      fetchprompts();
    }
  }, [session?.user.id]);
  return (
    <Profile
      name="My"
      desc="Welcome to your Profile page"
      data={prompts}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    ></Profile>
  );
};

export default ProfilePage;
