import Link, {type LinkProps} from "next/link";
import {type ReactNode} from "react";

export function PrimaryLinkButton(props: LinkProps & { children: ReactNode; className?: string }) {
  return (
    <Link {...props} className={`rounded px-4 py-2 bg-blue-400 hover:bg-blue-500${" " + props.className ?? ""}`}>
      {props.children}
    </Link>
  );
}