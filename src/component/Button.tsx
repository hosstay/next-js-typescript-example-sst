import React from "react";
import clsx from "clsx";

import { Spinner } from "~/component/Spinner";

export function Button(props: React.ComponentPropsWithoutRef<"button"> & { variant?: "primary" | "secondary"; isLoading?: boolean }) {
  const color = (props.variant ?? "primary") === "primary"
    ? "bg-blue-400 hover:bg-blue-500"
    : "bg-gray-400 hover:bg-gray-500";

  return (
    <button {...props} className={clsx("flex rounded gap-2 px-4 py-2 disabled:bg-gray-600 items-center justify-center", color)}>
      {props.isLoading ? <Spinner /> : null}
      {props.children}
    </button>
  );
}