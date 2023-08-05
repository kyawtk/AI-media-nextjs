"use client";
import { useEffect, useState } from "react";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          ></PromptCard>
        );
      })}
    </div>
  );
};

import PromptCard from "./PromptCard";
import { set } from "mongoose";
import { useRouter } from "next/navigation";
const Feed = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [prompts, setPrompts] = useState([]);
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleTagClick = (tag) => {
    // setPrompts((current) => {
    //   return current.filter((post) => {
    //     return post.tag.includes(tag);
    //   });
    // });
  };

  useEffect(() => {
    const fetchprompts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPrompts(data);
      console.log(data);
    };
    fetchprompts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full felx-center">
        <input
          type="text"
          placeholder="Search anything"
          value={searchText}
          onChange={handleChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={prompts.filter((p) => {
          return (
            p.tag.includes(searchText) ||
            p.prompt.includes(searchText) ||
            p.creator.username.includes(searchText)
          );
        })}
        handleTagClick={handleTagClick}
      ></PromptCardList>
    </section>
  );
};

export default Feed;
