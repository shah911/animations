"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import woman1 from "../../public/woman1.jpg";
import woman2 from "../../public/woman2.jpg";

export default function ParallexAnimation() {
  return (
    <main>
      <Gallery />
      <Hero />
      <div className="min-h-[600px] h-screen flex items-center justify-center">
        <h1 className="text-3xl md:text-5xl 2xl:text-[4vw] capitalize">
          thanks for viewing
        </h1>
      </div>
    </main>
  );
}

function Gallery() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const top = useTransform(scrollYProgress, [0, 1], ["5%", "60%"]);
  const bottom = useTransform(scrollYProgress, [0, 1], ["5%", "50%"]);

  return (
    <div
      ref={ref}
      className="relative min-h-[600px] h-screen flex items-center justify-center w-[95%] mx-auto overflow-hidden"
    >
      <h1 className="capitalize text-5xl z-10 2xl:text-[4vw] mix-blend-difference text-black">
        scroll
      </h1>
      <motion.div
        style={{ top }}
        className="absolute w-[200px] 2xl:w-[15vw] h-[300px] 2xl:h-[50vh] right-0 top-[5%] overflow-hidden"
      >
        <div className="relative h-full w-full">
          <Image
            src={woman1}
            alt=""
            fill
            priority={true}
            placeholder="blur"
            className="object-cover"
          />
        </div>
      </motion.div>
      <motion.div
        style={{ bottom }}
        className="absolute w-[300px] 2xl:w-[22.5vw] h-[450px] 2xl:h-[75vh] left-0 bottom-[5%] overflow-hidden"
      >
        <div className="relative h-full w-full">
          <Image
            src={woman2}
            alt=""
            fill
            priority={true}
            placeholder="blur"
            className="object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);
  return (
    <div className="min-h-[600px] h-screen flex items-center justify-center">
      <div className="h-[90%] w-[95%] overflow-hidden">
        <motion.div
          ref={ref}
          style={{ y }}
          className="relative h-[125%] w-full"
        >
          <Image
            src="/fashion.jpg"
            alt=""
            fill
            priority={true}
            className="object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
}
