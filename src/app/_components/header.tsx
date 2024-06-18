"use client";

import React from "react";
// import { signIn, signOut, useSession } from "next-auth/react";
import { type Session } from "next-auth";

import { PrimaryLink } from "~/app/_components/primary-link";
// import { Button } from "~/app/_components/button";

// import { useBuyCredits } from "~/app/hooks/useBuyCredits";
// import { api } from "~/app/utils/api";

export function Header(props: { session?: Session | null }) {
  const isLoggedIn = props.session;
  // const {buyCredits} = useBuyCredits();
  // const credits = api.user.getCredits.useQuery();

  return (
    <header className={"container mx-auto flex justify-between h-16 px-4 items-center bg-gray-900"}>
      <PrimaryLink href={"/"}>Icon Generator</PrimaryLink>
      <ul className={"flex gap-4"}>
        <li>
          <PrimaryLink href={"/generate"}>Generate</PrimaryLink>
        </li>
        <li>
          <PrimaryLink href={"/community"}>Community</PrimaryLink>
        </li>
        {isLoggedIn && (
          <li>
            <PrimaryLink href={"/collection"}>Collection</PrimaryLink>
          </li>
        )}
      </ul>
      {/*<ul className={"flex gap-4"}>*/}
      {/*  {isLoggedIn && (*/}
      {/*    <>*/}
      {/*      <li className={"flex items-center"}>Credits remaining: {credits.data}</li>*/}
      {/*      <li>*/}
      {/*        <Button onClick={() => {*/}
      {/*          buyCredits().catch(console.error);*/}
      {/*        }}>Buy Credits</Button>*/}
      {/*      </li>*/}
      {/*      <li>*/}
      {/*        <Button variant={"secondary"} onClick={() => {*/}
      {/*          signOut().catch(console.error);*/}
      {/*        }}>Logout</Button>*/}
      {/*      </li>*/}
      {/*    </>*/}
      {/*  )}*/}
      {/*  {!isLoggedIn && <li>*/}
      {/*      <Button onClick={() => {*/}
      {/*        signIn().catch(console.error);*/}
      {/*      }}>Login</Button>*/}
      {/*  </li>}*/}
      {/*</ul>*/}
    </header>
  );
}