"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="flex-between mb-16 w-full pt-3">
      <Link href="/" className="flex gap-2 flext-center ">
        <Image
          src="assets/images/logo.svg"
          width={37}
          height={37}
          alt="logo"
          className="object-conatain"
        />
        <p className="logo_text">Promptopia</p>

      </Link>
      {/* Desktop Navigation*/}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create post
            </Link>
            <button type="button" className="outline_btn" onClick={signOut}>
              SignOut
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                alt="Profile"
                className="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  className="black_btn"
                  key={provider.name}
                  onClick={(e) => {e.preventDefault(),signIn(provider.id)}}
                >
                  SignIn
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              alt="Profile"
              className="profile"
              onClick={() => setToggleDropDown(!toggleDropDown)}
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  className="mt-5 w-full balck_btn"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                >
                  SignOut
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  className="black_btn"
                  key={provider.name}
                  onClick={(e) => {e.preventDefault(),signIn(provider.id)}}
                >
                  SignIn
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
