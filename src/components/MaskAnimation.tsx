"use client";

import useMousePosition from "@/hooks/useMousePosition";
import { motion } from "motion/react";
import { useRef, useState } from "react";

function MaskAnimation() {
  const [hover, setHover] = useState(false);
  const ref = useRef(null);
  const { x, y } = useMousePosition();
  const size = hover ? 200 : 20;

  return (
    <div className="relative h-screen">
      {/* MASK */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{
          opacity: hover ? 1 : 0,
          maskPosition: `${x - size / 2}px ${y - size / 2}px`,
          maskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
        className="absolute h-full w-full [mask-image:url('/mask.svg')] [mask-repeat:no-repeat] [mask-size:40px] bg-[#ec4e39] flex items-center justify-center overflow-hidden"
      >
        <p
          onMouseMove={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="w-[90%] lg:w-1/2 uppercase font-semibold text-2xl lg:text-[2.5vw] tracking-tight leading-[100%] text-justify"
        >
          I will live, even if life betrays me, and I will dream, even if dreams
          abandon me.
        </p>
      </motion.div>
      {/* MASK */}
      <div className="h-full w-full flex items-center justify-center overflow-hidden">
        <p className="w-[90%] lg:w-1/2 uppercase font-semibold text-2xl lg:text-[2.5vw] tracking-tight leading-[100%] text-justify">
          Ich werde leben, auch wenn das Leben mich verrät, und ich werde
          träumen, auch wenn Träume mich verlassen.
        </p>
      </div>
    </div>
  );
}

export default MaskAnimation;
