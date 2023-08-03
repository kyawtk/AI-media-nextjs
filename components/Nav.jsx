"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useReducer } from "react";
import { signOut, useSession, signIn, useProvider, getProviders } from "next-auth/react";
const Nav = () => {
 
  const [providers, setProviders] = React.useState(null)
  
  const { data: session, status } = useSession();
  
  const [openDropDown, setOpenDropDown] = React.useState(false);
  useEffect(()=>{
    const setUpProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    setUpProviders()
  },[])
  return (
    <nav className="px-3 flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          width={30}
          height={30}
          className="object-contain"
          src="/assets/images/logo.svg"
          alt="logo"
        ></Image>
      </Link>
      <p className="logo_text">Prompotopia</p>

      {/* desktop  navigation */}
      <div className="sm:flex hidden">
        {session ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Prompt
            </Link>
            <button
              onClick={() => {
                signOut();
              }}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                width={30}
                height={30}
                className="object-contain"
                src={session && session.user.image}
                alt="profile"
              ></Image>
            </Link>
          </div>
        ) : (
          <>
            {providers && Object.values(providers).map((provider) => {
            return <button className="black_btn" key={provider.id} onClick={()=>signIn(provider.id)}>Sign In</button>
          })}
          </>
        )}
      </div>

      {/* mobile navigation */}
      <div className="sm:hidden flex relative">
        {session ? (
          <div className="flex">
            <Image
              width={30}
              height={30}
              className="object-contain"
              src={ session && session.user.image}
              alt="profile"
              onClick={() => {
                setOpenDropDown((prev) => !prev);
              }}
            ></Image>
            {openDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setOpenDropDown(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setOpenDropDown(false)}
                >
                  Crete Prompt
                </Link>
                <button
                  className="outline_btn"
                  onClick={() => {
                    setOpenDropDown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
          {providers && Object.values(providers).map((provider) => {
            return <button className="black_btn" key={provider.id} onClick={()=>signIn(provider.id)}>Sign In</button>
          })}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
