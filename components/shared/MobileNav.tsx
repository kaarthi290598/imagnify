"use client";

import React from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants";
import { Button } from "../ui/button";

const MobileNav = () => {
  const pathName = usePathname();

  return (
    <header className=" header">
      <Link href="/" className="flex items-center gap-2 md:p-2">
        <Image
          src="/assets/images/logo-text.svg"
          alt="logo"
          height={28}
          width={180}
          className="w-auto h-auto"
        />
      </Link>

      <nav className="flex gap-4 border-5">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />

          <Sheet>
            <SheetTrigger>
              <Image
                src="/assets/icons/menu.svg"
                alt="menu"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </SheetTrigger>
            <SheetContent className="sheet-content w-72">
              <>
                <Image
                  src="/assets/images/logo-text.svg"
                  alt="logo"
                  height={28}
                  width={180}
                  className="w-auto h-auto"
                />
                <ul className="header-nav_elements ">
                  {navLinks.map((link) => {
                    const isActive = link.route === pathName;
                    return (
                      <li
                        key={link.route}
                        className={` ${
                          isActive && "gradient-text"
                        }  flex whitespace-nowrap text-dark-700  `}
                      >
                        <Link
                          href={link.route}
                          className="sidebar-link cursor-pointer "
                        >
                          <Image
                            src={link.icon}
                            alt="icon"
                            height={24}
                            width={24}
                          />
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </>
            </SheetContent>
          </Sheet>
        </SignedIn>

        <SignedOut>
          <Button asChild className="button bg-purple-gradient bg-cover">
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
};

export default MobileNav;
