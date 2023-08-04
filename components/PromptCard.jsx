"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const pathName = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [copied, setCopied] = useState("");
  

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };
  return (
    <div className="prompt_card">
      <div className="flex-1 flex justify-start gap-3 cursor-pointer items-center">
        <div className="flex justify-between gap-5 items-start" onClick={()=>{
          router.push(`/profile/${post.creator._id}`)
        }}>
          <div className="">
            <Image
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
              src={post.creator.image}
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn " onClick={handleCopy}>
          <Image
            alt="copy indicator icon"
            width={30}
            height={30}
            src={
              copied == post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
          ></Image>
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        # {post.tag}
      </p>
      {session &&
        session.user.id === post.creator._id &&
        pathName === "/profile" && (
          <div className=" mt-5 flex flex-center border-t border-gray-100 gap-4">
            <p
              className="font-inter green_gradient cursor-pointer text-sm"
              onClick={() => handleEdit(post)}
            >
              Edit
            </p>
            <p
              className="font-inter orange_gradient cursor-pointer text-sm"
              onClick={() => handleDelete(post)}
            >
              Delete
            </p>
          </div>
        )}
    </div>
  );
};

export default PromptCard;
