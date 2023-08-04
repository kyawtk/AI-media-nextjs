"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Profile from "@components/Profile";
export const ProfilePageOther = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const [prompts, setPrompts] = useState([]);

  const userName = prompts.length > 0 && prompts[0].creator.username;
  const { data: session } = useSession();
  console.log(userName);
  useEffect(() => {
    const fetchprompts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();
      setPrompts(data);
    };

    if (id) {
      fetchprompts();
    }
  }, [id]);

  useEffect(() => {
    if (session.user.id == id) {
      router.push("/profile");
    }
  }, [id]);
  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s Profile page`}
      data={prompts}
    ></Profile>
  );
};

export default ProfilePageOther;
