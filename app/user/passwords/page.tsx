"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter, redirect } from "next/navigation";
import Add from "./add/page";
import { useSession } from "next-auth/react";

type UserPassword = {
  id: number;
  website: string;
  username: string;
  password: string;
  note: string;
  user: {};
  userId: number;
};

const bg1 = "sky-900";
const bg2 = "red-300";
const bg3 = "yellow-400";
const bg4 = "blue-300";
const bg5 = "slate-700";

export default function Passwords() {
  const session = useSession();
  const router = useRouter();

  if (!session.data?.user?.email) {
    redirect("/login");
  }
  const [passwords, setPasswords] = useState<UserPassword[]>([]);

  const init = async () => {
    try {
      const allPass = await axios.get("/api/user/getpassword");
      console.log(allPass.data);
      setPasswords(allPass.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="flex flex-col text-black">
      <div className="flex p-2 items-center h-16 shadow-md flex-row justify-between">
        <Button
          onClick={() => {
            router.push("/user/passwords/add");
          }}
        >
          add new
        </Button>
        <Button
          onClick={() => {
            signOut();
          }}
        >
          Logout
        </Button>
      </div>
      <div>
        {passwords.map((elem, key) => {
          return (
            <div key={key}>
              <Pass
                website={elem.website}
                username={elem.username}
                password={elem.password}
                note={elem.note}
                id={elem.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Pass({
  website,
  username,
  password,
  note,
  id,
}: {
  website: string;
  username: string;
  password: string;
  note: string;
  id: number;
}) {
  const passRef = useRef(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(true);
    setTimeout(() => {
      setShowPassword(false);
    }, 2000);
  };

  const handleCopy = () => {
    // Check if the Clipboard API is available
    if (navigator.clipboard) {
      const divContent = { password };
      navigator.clipboard
        .writeText(divContent.password)
        .then(() => {
          console.log("Content copied to clipboard");
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        })
        .catch((err) => {
          console.error("Failed to copy content: ", err);
        });
    } else {
      console.error("Clipboard API not supported");
    }
  };

  return (
    <div className="flex m-1 p-2 border rounded items-center hover:bg-slate-300 transition-all duration-500">
      <div
        className={`text-white border w-16 h-10 mr-6 ml-2 bg flex justify-center items-center text-2xl  rounded-md bg-cover bg-center`}
        style={{
          backgroundImage:
            "url(https://cdn.mos.cms.futurecdn.net/rjqJEKv6P9Yjy9d3KMGvp8-1200-80.jpg.webp)",
        }}
      >
        {username[0].toUpperCase()}
      </div>
      <div id={id.toString()} className="m-1 w-[300px]">
        <a
          className="text-lg hover:text-sky-800 font-semibold"
          href={website}
          target="_blank"
        >
          {website.split("//")[1]}
        </a>
        <p className="text-sm">{username}</p>
      </div>
      <div className="ml-5 flex items-center w-[200px] justify-end">
        {showPassword ? (
          <p ref={passRef} className="p-2 mr-5">
            {password}
          </p>
        ) : (
          <p ref={passRef} className="p-2 mr-5">
            ******
          </p>
        )}
        <Button
          className="transition-all hover:bg-slate-500 duration-500 mr-3"
          onClick={handleCopy}
        >
          {copySuccess ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
            >
              <path
                fill="none"
                stroke="#18ec62"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="m2.75 8.75l3.5 3.5l7-7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
              />
            </svg>
          )}
        </Button>
        <Button
          className="bg-sky-900 hover:bg-sky-500 m-1"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="#12c471"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              >
                <path d="M3 13c3.6-8 14.4-8 18 0" />
                <path d="M12 17a3 3 0 1 1 0-6a3 3 0 0 1 0 6" />
              </g>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M3.26 11.602C3.942 8.327 6.793 6 10 6s6.057 2.327 6.74 5.602a.5.5 0 0 0 .98-.204C16.943 7.673 13.693 5 10 5s-6.943 2.673-7.72 6.398a.5.5 0 0 0 .98.204M10 8a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7m-2.5 3.5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0"
              />
            </svg>
          )}
        </Button>
      </div>
      {/* <p>{pasword}</p>
      <p>{note}</p> */}
    </div>
  );
}
