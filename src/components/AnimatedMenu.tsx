"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AnimatePresence, motion, Variants } from "motion/react";
import Image from "next/image";

const links = ["ABOUT US", "SERVICES", "BLOG", "CONTACT"];
const img: Variants = {
  initial: {
    clipPath: "inset(100% 0 0 0)",
  },
  animate: {
    clipPath: "inset(0)",
    transition: {
      type: "tween",
      delay: 0.75,
      duration: 0.5,
      ease: [0.45, 0, 0.55, 1],
    },
  },
  exit: {
    clipPath: "inset(100% 0 0 0)",
    transition: {
      type: "tween",
      duration: 0.5,
      ease: [0.45, 0, 0.55, 1],
    },
  },
};

const main2: Variants = {
  initial: {
    clipPath: "inset(0 0 100% 0)",
  },
  animate: {
    clipPath: "inset(0)",
    transition: {
      type: "tween",
      duration: 1,
      ease: [0.45, 0, 0.55, 1],
    },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    transition: {
      type: "tween",
      duration: 1,
      ease: [0.45, 0, 0.55, 1],
    },
  },
};

const main: Variants = {
  initial: {
    clipPath: "inset(0 0 100% 0)",
  },
  animate: {
    clipPath: "inset(0)",
    transition: {
      type: "tween",
      duration: 0.75,
      ease: [0.45, 0, 0.55, 1],
    },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    transition: {
      type: "tween",
      delay: 0.25,
      duration: 0.75,
      ease: [0.45, 0, 0.55, 1],
    },
  },
};

function AnimatedMenu() {
  return (
    <div className="flex items-center justify-between mx-auto w-[85%] md:w-[90%] py-6 2xl:py-[2vw]">
      <Link
        href="/"
        className="z-20 font-medium tracking-tighter text-3xl 2xl:text-[2.25vw]"
      >
        Shah.
      </Link>
      <Menu />
    </div>
  );
}

export default AnimatedMenu;

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const handleHamburgerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <>
      <div className="flex items-center justify-center">
        <label
          className="burger z-20"
          htmlFor="burger"
          onClick={() => setIsOpen(!isOpen)}
        >
          <input
            type="checkbox"
            id="burger"
            checked={isOpen}
            readOnly
            onClick={handleHamburgerClick}
          />
          <span></span>
          <span></span>
        </label>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={main}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-orange-500 absolute z-10 top-[12.5px] lg:top-1/2 left-1/2 transform -translate-x-1/2 lg:-translate-y-1/2 lg:w-[97.5%] w-[95%] h-[97.5vh] min-h-[650px] md:min-h-[600px] rounded-xl"
          >
            <SideBarMenu />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SideBarMenu() {
  return (
    <motion.div
      variants={main2}
      className="h-full w-full rounded-xl relative overflow-hidden bg-yellow-300"
    >
      <div className="h-[60%] md:h-[85%] flex items-center justify-center">
        <div className="flex-[1] h-full w-full flex flex-col items-center lg:items-end justify-center">
          {links.map((item, i) => (
            <span className="w-[90%] lg:w-[70%]" key={i}>
              <span
                className={`${
                  i === 0 ? "opacity-100" : "opacity-45"
                } transition-opacity  ease-linear hover:opacity-100 text-[10vw] md:text-[6vw] lg:text-[4vw] w-fit cursor-pointer tracking-tight underline-effect`}
              >
                {item}
              </span>
            </span>
          ))}
        </div>
        <div className="hidden flex-[1] h-full w-full md:flex items-center">
          <motion.div
            variants={img}
            className="h-[225px] w-[300px] lg:h-[325px] lg:w-[450px] 2xl:h-[55vh] 2xl:w-[35vw] relative"
          >
            <Image
              src="/imgs-1.jpg"
              alt="main"
              priority={true}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
      <hr className="border border-black border-b-0" />
      <div className="mx-auto w-[90%] h-[40%] md:w-full md:mx-0 md:h-[15%] flex flex-col md:flex-row items-center justify-center">
        <div className="flex-[1] flex items-center md:justify-center h-full w-full">
          <span className="text-xs uppercase font-normal 2xl:text-[0.9vw] leading-[125%]">
            contact
          </span>
        </div>
        <div className="flex-[1] flex flex-col justify-start md:justify-center h-full w-full">
          <span className="text-xs font-normal 2xl:text-[0.9vw] leading-[125%]">
            Shah.
          </span>
          <span className="text-xs font-normal 2xl:text-[0.9vw] leading-[125%]">
            1234 Elm Street
          </span>
          <span className="text-xs font-normal 2xl:text-[0.9vw] leading-[125%]">
            90001 Los Angeles
          </span>
        </div>
        <div className="flex-[1] flex items-center md:justify-center h-full w-full">
          <span className="text-xs font-normal 2xl:text-[0.9vw] leading-[125%]">
            T:+(123) 456-7890
          </span>
        </div>
        <div className="flex-[1] flex flex-col md:items-center justify-center h-full w-full">
          <span className="md:w-[55%] font-normal text-xs tracking-tight 2xl:text-[0.9vw] leading-[125%]">
            INSTAGRAM
          </span>
          <span className="md:w-[55%] font-normal text-xs tracking-tight 2xl:text-[0.9vw] leading-[125%]">
            LINKEDIN
          </span>
        </div>
        <div className="flex-[1] flex md:items-center flex-col justify-center h-full w-full">
          <span className="font-normal text-xs tracking-tight 2xl:text-[0.9vw] leading-[125%]">
            Privacy Policy
          </span>
          <span className="font-normal text-xs tracking-tight 2xl:text-[0.9vw] leading-[125%]">
            Cookie Policy
          </span>
        </div>
        <div className="flex-[1] flex flex-col justify-center h-full w-full">
          <span className="font-normal text-xs tracking-tight 2xl:text-[0.9vw] leading-[125%]">
            Manage preferences
          </span>
          <span className="font-normal text-xs tracking-tight 2xl:text-[0.9vw] leading-[125%]">
            Credits
          </span>
        </div>
      </div>
    </motion.div>
  );
}
