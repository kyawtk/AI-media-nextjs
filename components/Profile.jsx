import { Suspense } from "react";
import PromptCard from "./PromptCard";
import Loading from "./Loading";

const Profile = ({ name, desc, data, handleDelete, handleEdit }) => {
  const handleTagClick = () => {
    return;
  };
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <Suspense fallback={<Loading></Loading>}>
        {data.map((post) => {
          return (
            <PromptCard
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            ></PromptCard>
          );
        })}
      </Suspense>
      <div className="mt-16 prompt_layout"></div>
    </section>
  );
};

export default Profile;
