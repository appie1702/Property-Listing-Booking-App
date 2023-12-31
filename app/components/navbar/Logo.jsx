"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import React from "react";

const Logo = () => {
  const router = useRouter();

  return (
    <div
      className="hidden md:flex items-center justify-center space-x-3 cursor-pointer"
      onClick={() => router.push("/")}
    >
      <Image
        alt="Logo"
        className=""
        height={28}
        width={28}
        src="/images/logo2.png"
      />
      <p className=" text-2xl font-bold font-serif text-[#F43F5E]">HOMIFY</p>
    </div>
  );
};

export default Logo;
