"use client";

import {
  useScroll,
  AnimatePresence,
  motion,
  Variants,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import img1 from "../../public/modern Architecture.jpg";
import img2 from "../../public/Gothic architecture.jpg";
import img3 from "../../public/Greek Revival architecture.jpg";
import img4 from "../../public/Islamic architecture.jpg";
import img5 from "../../public/Byzantine architecture.jpg";
import img6 from "../../public/Ancient Roman architecture.jpg";

const Animate: Variants = {
  initial: { opacity: 0, scale: 1.1 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    scale: 1.1,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const heading: Variants = {
  initial: { y: "100%" },
  animate: (i: number) => ({
    y: 0,
    transition: {
      type: "tween",
      duration: 0.5,
      delay: 0.5 + i * 0.05,
      ease: [0, 0.55, 0.45, 1],
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.5,
      delay: i * 0.05,
      ease: [0, 0.55, 0.45, 1],
    },
  }),
};

const data = [
  {
    title: "modern",
    url: img1,
  },
  {
    title: "Gothic",
    url: img2,
  },
  {
    title: "Greek Revival",
    url: img3,
  },
  {
    title: "Islamic",
    url: img4,
  },
  {
    title: "Byzantine",
    url: img5,
  },
  {
    title: "Ancient Roman",
    url: img6,
  },
];
function SeqScroll() {
  const [index, setIndex] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0 0 100% 0)", "inset(0 0 0% 0)"],
  );

  useEffect(() => {
    if (!data.length) return;

    return scrollYProgress.on("change", (prg) => {
      const newIndex = Math.min(data.length - 1, Math.floor(prg * data.length));
      setIndex(newIndex);
    });
  }, [scrollYProgress]);

  return (
    <div>
      <div className="h-screen flex items-center justify-center text-[10vw] uppercase font-bold tracking-tighter">
        Scroll down
      </div>
      <div
        ref={ref}
        style={{ height: `${(data.length + 1) * 100}vh` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen overflow-hidden bg-black">
          <motion.div
            style={{ clipPath }}
            className="absolute left-[calc(95%-1px)] top-1/2 -translate-y-1/2 z-10 w-1 h-60 bg-white"
          ></motion.div>
          <div className="absolute left-[95%] top-1/2 -translate-y-1/2 w-0.5 h-60 bg-white/40 z-10"></div>
          <div className="flex flex-col justify-between absolute left-[78%] md:left-[86%] lg:left-[90%] top-1/2 -translate-y-1/2 h-60 z-10">
            {data.map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <motion.span
                  animate={{
                    clipPath:
                      index === i ? "inset(0 0 0 0)" : "inset(0 0 0 100%)",
                  }}
                  className="w-[40px] h-0.5 bg-white"
                ></motion.span>
                <motion.span
                  animate={{ opacity: index === i ? 1 : 0.5 }}
                  className="leading-[100%] text-white font-light"
                >
                  {i + 1}
                </motion.span>
              </div>
            ))}
          </div>
          {data.map((item, i) => (
            <div key={i} className="absolute top-0 left-0 h-full w-full hidden">
              <Image
                priority
                src={item.url}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
          ))}
          <AnimatePresence mode="sync">
            {data.map(
              (item, i) =>
                i === index && (
                  <motion.div
                    variants={Animate}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    key={i}
                    className="absolute top-0 left-0 h-full w-full"
                  >
                    <h1 className="flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white uppercase text-7xl tracking-tight">
                      {item.title.split("").map((char, i) =>
                        char === " " ? (
                          <span key={i}>&nbsp;</span>
                        ) : (
                          <span key={i} className="overflow-hidden">
                            <motion.span
                              variants={heading}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              custom={i}
                              className="inline-flex whitespace-nowrap uppercase text-2xl md:text-4xl lg:text-5xl 2xl:text-[3vw] text-white"
                            >
                              {char}
                            </motion.span>
                          </span>
                        ),
                      )}
                    </h1>
                    <Image
                      src={item.url}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="h-screen flex items-center justify-center text-[10vw] uppercase font-bold tracking-tighter">
        Seq Parallex
      </div>
    </div>
  );
}

export default SeqScroll;
