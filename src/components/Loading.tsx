"use client";
import { AnimatePresence, motion, Variants } from "motion/react";
import { useEffect, useState } from "react";

const main: Variants = {
  initial: {
    clipPath: "inset(100% 0 0 0)",
  },
  animate: {
    clipPath: "inset(0)",
    transition: {
      type: "tween",
      duration: 3,
    },
  },
  // exit: {
  //   clipPath: "inset(0)",
  // },
};

const container: Variants = {
  initial: {
    clipPath: "inset(0)",
  },
  animate: {
    clipPath: "inset(0)",
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    transition: {
      duration: 0.5,
      type: "tween",
      ease: [0.45, 0, 0.55, 1],
    },
  },
};

const container2: Variants = {
  initial: {
    clipPath: "inset(0)",
  },
  animate: {
    clipPath: "inset(0)",
  },
  exit: {
    clipPath: "inset(100% 0 0 0)",
    transition: {
      duration: 0.5,
      type: "tween",
      ease: [0.45, 0, 0.55, 1],
    },
  },
};

function Loader() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count >= 100) {
      setCount(100);
      return;
    }

    const timer = setTimeout(() => {
      setCount((prevCount) => prevCount + 1);
    }, 20);

    return () => clearTimeout(timer);
  }, [count]);
  return (
    <div className="h-screen w-full flex items-center justify-center fixed z-40">
      <motion.div
        variants={container}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative h-full flex-[1] bg-purple-500 -mx-1"
      >
        <motion.div
          variants={main}
          className="relative h-full w-full bg-purple-600"
        ></motion.div>
        <span className="absolute bottom-[10%] lg:bottom-0 right-[5%] text-white text-[10vw] tracking-tight">
          {count}%
        </span>
      </motion.div>
      <motion.div
        variants={container2}
        initial="initial"
        animate="animate"
        exit="exit"
        className="h-full flex-[1] bg-purple-500 -mx-1"
      >
        <motion.div
          variants={main}
          className="h-full w-full bg-purple-600"
        ></motion.div>
      </motion.div>
      <motion.div
        variants={container}
        initial="initial"
        animate="animate"
        exit="exit"
        className="h-full flex-[1] bg-purple-500 -mx-1"
      >
        <motion.div
          variants={main}
          className="h-full w-full bg-purple-600"
        ></motion.div>
      </motion.div>
    </div>
  );
}

function Loading() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 3000);
  }, []);
  return (
    <main className="flex items-center justify-center w-full h-screen">
      <h1 className="text-[5vw] tracking-[0.3em] uppercase font-semibold">
        Loading animation
      </h1>
      <AnimatePresence mode="wait">{isLoading && <Loader />}</AnimatePresence>
    </main>
  );
}

export default Loading;
