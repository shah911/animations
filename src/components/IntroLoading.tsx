"use client";
import { motion, useAnimate, Variants } from "motion/react";
import Image from "next/image";
import React, { useEffect } from "react";

const head: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, delay: 3 },
  },
};

const heading: Variants = {
  initial: { y: "100%" },
  animate: {
    y: 0,
    transition: {
      duration: 1,
      delay: 3,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

function IntroLoading() {
  const [scope, animate] = useAnimate();
  useEffect(() => {
    const animateHero = async () => {
      await animate(
        ".img",
        { clipPath: "inset(0 0 0 0)" },
        {
          duration: 1.25,
          delay: 0.5,
          ease: [0.87, 0, 0.13, 1],
        }
      );

      await animate(
        ".img",
        { scale: 1 },
        {
          duration: 1.25,
          ease: [0.76, 0, 0.24, 1],
        }
      );
    };

    animateHero();
  }, [animate]);
  return (
    <div
      ref={scope}
      className="min-h-[600px] h-screen flex items-center justify-center text-white"
    >
      <motion.div
        initial={{ scale: 0.3, clipPath: "inset(0 0 100% 0)" }}
        className="relative h-full w-full img"
      >
        <div className="overflow-hidden w-full z-10 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex items-center justify-center">
          <motion.p
            variants={heading}
            initial="initial"
            animate="animate"
            className="uppercase text-[8.5vw] leading-[90%] text-center tracking-tight"
          >
            sequential animation
          </motion.p>
        </div>
        <motion.p
          variants={head}
          initial="initial"
          animate="animate"
          className="absolute text-black bottom-[10%] left-[50%] translate-x-[-50%] z-10 uppercase font-light"
        >
          Coded by Shahzeb
        </motion.p>
        <Image
          src="/imgs-4.jpg"
          alt="cover image"
          fill
          sizes="100vw"
          priority={true}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}

export default IntroLoading;
