'use client'
import Feed from "@components/Feed";
import Loading from "@components/Loading";

import { useSession, signIn, signOut } from "next-auth/react"
import { Suspense } from "react";
const Home = () => {
  const {data} = useSession()
  
  return (
    <section className="w-full flex-col flex-center">
      <h1 className="head_text text-center">
        Revolutionize Ai Prompts
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center ">
        
          Discover and Share
        </span>
      </h1>
      <p className="desc text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
        delectus minima maxime quidem a magni nesciunt quisquam cum enim atque?
      </p>
      <Suspense fallback={<Loading></Loading>}>

          <Feed></Feed>
      </Suspense>
    
    </section>
  );
};

export default Home;
