import Image from "next/image";
import Navbar from "@/components/navbar";
import Landing from "@/components/landing";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { userState } from "@/store/atom/userState";
import { useRecoilValue } from "recoil";

export default async function Home() {
  return (
    <div>
      <Navbar />
      <Landing />
    </div>
  );
}
