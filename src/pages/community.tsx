import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { api } from "~/utils/api";
import { type Icon } from "@prisma/client";

const CommunityPage: NextPage = () => {

  const icons = api.icons.getCommunityIcons.useQuery();

  return (
    <>
      <Head>
        <title>Community Icons</title>
        <meta name={"description"} content={"Your Icons"} />
        <link rel={"icon"} href={"/favicon.ico"} />
      </Head>
      <main className={"container flex flex-col min-h-screen mx-auto px-12 mt-24 gap-4"}>
        <h1 className={"text-4xl"}>Community Icons</h1>
        <ul className={"grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4"}>
          {icons.data?.map((icon: Icon) => (
            <li key={icon.id}>
              <Image src={`https://next-js-typescript-example.s3.us-east-2.amazonaws.com/${icon.id}.png`}
                     alt={icon.prompt ? icon.prompt : "An image of an icon"}
                     width={"512"} height={"512"} className={"mx-auto w-full rounded-lg"}
              />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default CommunityPage;