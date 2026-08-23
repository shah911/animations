"use client";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from "motion/react";
import Image from "next/image";
import React, { useRef, useState } from "react";

const data = Array.from(
  { length: 240 },
  (_, i) => `/bmw/ezgif-frame-${String(i + 1).padStart(3, "0")}.png`,
);

function OnScrollVideoPlay() {
  const ref = useRef(null);
  const [frame, setFrame] = useState("001");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const count = useTransform(scrollYProgress, [0, 1], [1, 240]);

  //To round off the count
  useMotionValueEvent(count, "change", (value) => {
    setFrame(Math.round(value).toString().padStart(3, "0"));
  });

  return (
    <div ref={ref} className="relative h-[300vh] w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center z-10">
        {data.map((item, i) => (
          <div
            key={i}
            className="absolute top-0 left-0 h-full w-full -z-10 hidden"
          >
            <Image
              src={item}
              alt={item}
              priority={true}
              fill
              className="object-cover"
            />
          </div>
        ))}
        <motion.div className="h-full w-full">
          <Image
            src={`/bmw/ezgif-frame-${frame}.png`}
            alt={`/bmw/ezgif-frame-${frame}`}
            priority={true}
            sizes="100vw"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default OnScrollVideoPlay;
