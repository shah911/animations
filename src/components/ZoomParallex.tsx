"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

// const images = [
//   "/imgs-1.jpg",
//   "/imgs-2.jpg",
//   "/imgs-3.jpg",
//   "/imgs-4.jpg",
//   "/imgs-5.jpg",
// ];

function ZoomParallex() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 4]);
  return (
    <div>
      <div className="h-screen flex items-center justify-center text-[10vw] uppercase font-bold tracking-tighter">
        Scroll down
      </div>
      {/* container */}
      <div ref={ref} className="h-[300vh] relative bg-sky-200">
        {/* sticky container */}
        <div className="h-screen sticky top-0 overflow-hidden">
          {/* {images.map((img, i) => ( */}
          <motion.div
            style={{ scale }}
            // key={i}
            className="h-full w-full flex items-center justify-center absolute top-0"
          >
            <div className="relative h-[25vh] w-[25vw]">
              <Image
                src="/imgs-1.jpg"
                alt=""
                className="object-cover"
                fill
                priority
              />
            </div>
          </motion.div>
          <motion.div
            style={{ scale }}
            // key={i}
            className="h-full w-full absolute top-0"
          >
            <div className="relative h-[25vh] w-[25vw]">
              <Image
                src="/imgs-2.jpg"
                alt=""
                className="object-cover"
                fill
                priority
              />
            </div>
          </motion.div>
          <motion.div
            style={{ scale }}
            // key={i}
            className="h-full w-full absolute"
          >
            <div className="relative h-[35vh] w-[25vw]">
              <Image
                src="/imgs-3.jpg"
                alt=""
                className="object-cover"
                fill
                priority
              />
            </div>
          </motion.div>
          {/* ))} */}
        </div>
      </div>
      <div className="h-screen flex items-center justify-center text-[10vw] uppercase font-bold tracking-tighter">
        Zoom Parallex
      </div>
    </div>
  );
}

export default ZoomParallex;
