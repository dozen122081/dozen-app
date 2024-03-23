"use client";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className=" text-red bg-black">
      <div className="flex justify-around p-[1.5rem] m-[4rem] text-white bg-black">
        <div>
          <h4 className="mb-[1rem]">DoZen</h4>
          <ul className="">
            <li>
              <Link href="/home">Home</Link>
            </li>
            <li>
              <Link href="/product">Product</Link>
            </li>
            <li>
              <Link href="/whats-new">What's New</Link>
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
            <li>
              <Link href="/starter">Starter</Link>
            </li>
            <li>
              <Link href="/enterprise">Enterprise</Link>
            </li>
            <li>
              <Link href="/customer-success">Customer Success</Link>
            </li>
            <li>
              <Link href="/status">Status</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-[1rem]">About Us</h4>
          <ul>
            <li>
              <Link href="/company">Company</Link>
            </li>
            <li>
              <Link href="/leadership">Leadership</Link>
            </li>
            <li>
              <Link href="/customers">Customers</Link>
            </li>
            <li>
              <Link href="/diversity">Diversity</Link>
            </li>
            <li>
              <Link href="/careers">Careers</Link>
            </li>
            <li>
              <Link href="/wavelength">Wavelength</Link>
            </li>
            <li>
              <Link href="/sitemap">Sitemap</Link>
            </li>
            <li>
              <Link href="/investor-relations">Investor Relations</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-[1rem]">Resources</h4>
          <ul>
            <li>
              <Link href="/help-center">Help Center</Link>
            </li>
            <li>
              <Link href="/forum">Forum</Link>
            </li>
            <li>
              <Link href="/support">Support</Link>
            </li>
            <li>
              <Link href="/partners">Partners</Link>
            </li>
            <li>
              <Link href="/app-directory">App Directory</Link>
            </li>
            <li>
              <Link href="/events">Events</Link>
            </li>
            <li>
              <Link href="/accessibility">Accessibility</Link>
            </li>
            <li>
              <Link className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-transparent bg-clip-text" href="/developers-api">Developers & API</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
