import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
    <h1>Nextjs Template with providers and database and auth integration</h1>
      <UserButton/>
    </>
  );
}
