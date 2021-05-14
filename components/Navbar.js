import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Navbar() {
  return (
    <header>
      <Link href="/">
        <a>
          <h1>
            vietnamese <br /> cuisine
          </h1>
        </a>
      </Link>
      <style jsx>
        {`
          header {
            text-align: center;
          }
          h1 {
            text-transform: uppercase;
            line-height: 1;
          }
        `}
      </style>
    </header>
  );
}
