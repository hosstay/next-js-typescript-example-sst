import Link, {type LinkProps} from "next/link";
import {type ReactNode} from "react";
import clsx from "clsx";

export function PrimaryLinkButton(props: LinkProps & { children: ReactNode; className?: string }) {
  return (
    <Link {...props} className={clsx("rounded px-4 py-2 bg-blue-400 hover:bg-blue-500", props.className ?? "")}>
      {props.children}
    </Link>
  );
}