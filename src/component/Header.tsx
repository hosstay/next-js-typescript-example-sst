import { PrimaryLink } from "~/component/PrimaryLink";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "~/component/Button";
import React from "react";
import { useBuyCredits } from "~/hooks/useBuyCredits";
import { api } from "~/utils/api";

export function Header() {
  const session = useSession();
  const isLoggedIn = session.status === "authenticated";
  const {buyCredits} = useBuyCredits();
  const credits = api.user.getCredits.useQuery();

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
      <ul className={"flex gap-4"}>
        {isLoggedIn && (
          <>
            <li className={"flex items-center"}>Credits remaining: {credits.data}</li>
            <li>
              <Button onClick={() => {
                buyCredits().catch(console.error);
              }}>Buy Credits</Button>
            </li>
            <li>
              <Button variant={"secondary"} onClick={() => {
                signOut().catch(console.error);
              }}>Logout</Button>
            </li>
          </>
        )}
        {!isLoggedIn && <li>
            <Button onClick={() => {
              signIn().catch(console.error);
            }}>Login</Button>
        </li>}
      </ul>
  </header>
);
}