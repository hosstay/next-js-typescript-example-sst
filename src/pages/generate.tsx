import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { api } from "~/utils/api";

import React, { useState } from "react";

import { FormGroup } from "~/component/FormGroup";
import { Input } from "~/component/Input";
import { Button } from "~/component/Button";

const colors = ["blue", "red", "green", "yellow", "purple", "pink", "orange", "brown"];
const shapes = ["square", "circle", "rounded"];

const GeneratePage: NextPage = () => {
  const [form, setForm] = useState({
    prompt: "",
    color: "",
    shape: "",
    numberOfIcons: "1",
  });
  const [error, setError] = useState("");
  const [imagesUrl, setImagesUrl] = useState<{ imageUrl: string }[]>([]);

  const generateIcon = api.generate.generateIcon.useMutation({
    onSuccess: (data) => {
      setImagesUrl(data);
    },
    onError(error) {
      setError(error.message);
    }
  });

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    generateIcon.mutate({
      ...form,
      numberOfIcons: parseInt(form.numberOfIcons),
    });
  }

  function updateForm(key: string) {
    return function(e: React.ChangeEvent<HTMLInputElement>) {
      setForm((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    }
  }

  return (
    <>
      <Head>
        <title>Generate Icons</title>
        <meta name={"description"} content={"Page for Generating Icons"} />
        <link rel={"icon"} href={"/favicon.ico"} />
      </Head>
      <main className={"container flex flex-col min-h-screen mx-auto px-12 mt-24 gap-4"}>
        <h1 className={"text-6xl"}>Generate your icons</h1>
        <p className={"text-2xl"}>
          Fill out the form below to start generating your icons.
        </p>
        <form className={"flex flex-col gap-4"} onSubmit={handleFormSubmit}>
          <h2 className={"text-xl"}>
            1. Describe what you want your icon to look like.
          </h2>
          <FormGroup className={"mb-12"}>
            <label>Prompt</label>
            <Input required value={form.prompt} onChange={updateForm("prompt")}></Input>
          </FormGroup>

          <h2 className={"text-xl"}>
            2. Pick your icon color.
          </h2>
          <FormGroup className={"grid grid-cols-4 mb-12"}>
            {colors.map((color) => (
              <label key={color} className={"flex gap-2 text-2xl"}>
                <input
                  required
                  type={"radio"} name={"color"}
                  value={color}
                  checked={color === form.color}
                  onChange={updateForm("color")}
                ></input>
                {color}
              </label>
            ))}
          </FormGroup>

          <h2 className={"text-xl"}>
            3. Pick your icon shape.
          </h2>
          <FormGroup className={"grid grid-cols-4 mb-12"}>
            {shapes.map((shape) => (
              <label key={shape} className={"flex gap-2 text-2xl"}>
                <input
                  required
                  type={"radio"} name={"shape"}
                  value={shape}
                  checked={shape === form.shape}
                  onChange={updateForm("shape")}
                ></input>
                {shape}
              </label>
            ))}
          </FormGroup>

          <h2 className={"text-xl"}>4. How many do you want?</h2>
          <FormGroup className={"mb-12"}>
            <label>
              How many icons do you want to generate in a single batch?
            </label>
            <Input
              required
              step={"1"} max={"10"} min={"1"}
              type={"number"}
              value={form.numberOfIcons}
              onChange={updateForm("numberOfIcons")}
            ></Input>
          </FormGroup>

          {error &&
            <div className={"bg-red-500 text-white rounded p-4 text-xl"}>{error}</div>
          }

          <Button isLoading={generateIcon.isLoading} disabled={generateIcon.isLoading}>Submit</Button>
        </form>
        {imagesUrl.length > 0 && (
          <>
            <h2 className={"text-xl"}>Your Icons</h2>
            <section className={"grid grid-cols-4 gap-4 mb-12"}>
              {imagesUrl.map(({imageUrl}) => (
                <Image key={imageUrl} src={imageUrl} alt={"Generated icon"} width={"512"} height={"512"}
                       className={"py-4 mx-auto w-full"}/>
              ))}
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default GeneratePage;