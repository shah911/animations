"use client";

import { useFollowPointer } from "@/hooks/useFollowPointer";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

export default function CursorAnimation() {
  const [enter, setEnter] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseMove={() => setEnter(true)}
      onMouseLeave={() => setEnter(false)}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <p
        onMouseMove={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="w-[90%] uppercase font-semibold text-2xl lg:text-[2.5vw] tracking-tight leading-[100%] text-justify"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <AnimatePresence>
        {enter && <FollowPointer hover={hover} />}
      </AnimatePresence>
    </div>
  );
}

const FollowPointer = ({ hover }: { hover: boolean }) => {
  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref);

  return (
    <motion.div
      ref={ref}
      className="pointer-events-none bg-yellow-500 -z-10 w-10 h-10 2xl:h-[3.5vw] 2xl:w-[3.5vw] absolute rounded-full"
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: hover ? 3 : 1,
      }}
      exit={{ opacity: 0, scale: 0 }}
    />
  );
};
