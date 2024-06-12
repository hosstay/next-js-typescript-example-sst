import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { api } from "~/utils/api";

import { PrimaryLinkButton } from "~/component/PrimaryLinkButton";

function HeroBanner() {
  return (
    <section className={"grid grid-cols-1 gap-12 px-8 mb-24 sm:grid-cols-2 sm:mt-24"}>
      <div className={"ml-auto mr-auto"}>
        <h1 className={"text-6xl"}>Generate Icons with a click of a button</h1>
        <p className={"text-2xl mb-4"}>
          Use AI to generate icons in seconds instead of paying a designer and
          waiting for them to create them for you.
        </p>
        <PrimaryLinkButton href={"/generate"} className={"self-start"}>Generate your Icons</PrimaryLinkButton>
      </div>
      <div className={"ml-auto mr-auto order-first sm:-order-none"}>
        <Image src={"/landing-banner.png"} alt={"an image of a bunch of nice looking icons"} width={"500"} height={"250"}/>
      </div>
    </section>
  )
}

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Icon Generator</title>
        <meta name={"description"} content={"Page for Landing"}/>
        <link rel={"icon"} href={"/favicon.ico"}/>
      </Head>
      <main className={"container mx-auto flex flex-col items-center justify-center"}>
        <HeroBanner />
      </main>
    </>
  );
};

export default HomePage;