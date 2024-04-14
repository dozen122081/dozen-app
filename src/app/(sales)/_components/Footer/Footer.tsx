"use client";
import React from "react";
import Link from "next/link";
import { FiFacebook } from "react-icons/fi";
import { Copyright, Notebook } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-white mt-20 p-3 bg-slate-900 flex flex-col gap-4 lg:py-14 lg:px-24">
      <section className="flex flex-col lg:flex-row justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Notebook />
            <h2>Dozen</h2>
          </div>
          <p className="max-w-[14rem] text-xs font-extralight">Tired of life's chaos let's clean up together</p>
        </div>
        <div>
          <h4 className="mb-[1rem] font-semibold text-md">Resources</h4>
          <ul className="text-sm font-light flex flex-col gap-1.5">
            <li>
              <Link href="/features">Request Features</Link>
            </li>
            <li>
              <Link href="/features">How to use</Link>
            </li>
            <li>
              <Link className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-transparent bg-clip-text" href="/developers-api">Developers & API</Link>
            </li>
          </ul>
        </div>
      </section>
      <Separator />
      <section className="flex flex-col lg:flex-row items-center lg:items-start gap-3 lg:gap-0 w-full justify-between">
        <div className="flex items-center">
          <Copyright className="h-4 w-4" />
          <h2> 2024 dozen.digital. All rights reserved</h2>
        </div>
        <div className="flex items-center gap-3">
          <Link href="">
            <FiFacebook />
          </Link>
          <Link href="">
            <FaTwitter />
          </Link>
          <Link href="">
            <FaInstagram />
          </Link>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
