"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Hero = () => {
  const { user } = useUser();

  return (
    <section className=" bg-[#F0F9FF] text-gray-600 body-font">
      <div className="container mx-auto flex px-5 pt-10 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-extrabold text-gray-900">
            Summerize PDFs
            <br className="hidden lg:inline-block" /> in Seconds
          </h1>
          <p className="mb-8 leading-relaxed">
            Streamline your reading with our AI-powered PDF summarizer. Upload
            your documents and get concise, accurate summaries in seconds,
            perfect for busy professionals and students alike.
          </p>
          <div className="flex justify-center">
            <Link
              href={user ? "/dashboard" : "/sign-in"}
              className="inline-flex text-white bg-[#0396f2] border-0 py-2 px-6 focus:outline-none hover:bg-[#067fca] rounded-md text-lg capitalize"
            >
              get started for free
            </Link>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src="/Selection.png"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
