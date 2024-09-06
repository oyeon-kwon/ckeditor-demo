"use client";

import dynamic from "next/dynamic";

const CustomEditor = dynamic(
  () => {
    return import("./CustomEditor");
  },
  { ssr: false }
);

export default function Home() {
  return (
    <div>
      <CustomEditor initialData="<h1>Hello from CKEditor in Next.js!</h1>" />
    </div>
  );
}
