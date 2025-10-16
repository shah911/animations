"use client";

import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

type Props = {
  item: {
    title: string;
    url: string;
  };
  i: number;
  targetScale: number;
  range: number[];
  progress: MotionValue<number>;
};

const data = [
  {
    title: "Augustus",
    url: "/Augustus.jpg",
  },
  {
    title: "Aristocles",
    url: "/Aristocles.jpg",
  },
  {
    title: "Gordian III",
    url: "/greek-img-3.jpg",
  },
  {
    title: "Julius Caesar",
    url: "/Julius Caesar.jpg",
  },
  {
    title: "Marcus Aurelius",
    url: "/Marcus Aurelius.jpg",
  },
];

export default function CardStackAnimation() {
  return (
    <>
      <div className="mx-auto w-[90%] h-[768px] lg:h-[600px] xl:h-screen flex items-center justify-center gap-1 2xl:gap-[0.3vw]">
        <p className="flex flex-wrap items-center justify-center gap-1 2xl:gap-[0.3vw] text-xl lg:text-[2.5vw] text-center leading-[125%]">
          Card stacking animation. Scroll down to interact.
        </p>
      </div>
      <Services />
      <div className="mx-auto w-[90%] h-[768px] lg:h-[600px] 2xl:h-screen flex items-center justify-center">
        <p className="flex flex-wrap items-center justify-center gap-1 2xl:gap-[0.3vw] text-xl lg:text-[2.5vw] text-center leading-[125%]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </>
  );
}

function Services() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  return (
    <div className="flex flex-col items-center justify-evenly">
      <div ref={ref}>
        {data.map((item, i) => {
          const targetScale = 1 - (data.length - i) * 0.05;
          return (
            <Card
              key={i}
              item={item}
              i={i}
              targetScale={targetScale}
              range={[i * 0.25, 1]}
              progress={scrollYProgress}
            />
          );
        })}
      </div>
    </div>
  );
}

function Card({ item, i, targetScale, range, progress }: Props) {
  console.log(i);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [3, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);
  return (
    <div ref={ref} className="h-[768px] 2xl:h-[125vh] sticky top-[12.5%]">
      <motion.div
        style={{ scale }}
        className="flex flex-col items-center justify-evenly h-[450px] w-[90vw] lg:w-[50vw] 2xl:h-[70vh]"
      >
        <div className="flex items-center justify-evenly h-[100%] w-[100%]">
          <div className="relative h-full w-full overflow-hidden rounded-md 2xl:rounded-[0.375vw]">
            <h1 className="text-white font-[100] tracking-tighter leading-[100%] text-4xl lg:text-[4vw] z-10 absolute top-[2.5%] left-[2.5%]">
              {item.title}
            </h1>
            <motion.div
              style={{ scale: imgScale }}
              className="relative h-[100%] w-[100%] overflow-hidden"
            >
              <Image
                src={item.url}
                alt={item.title}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
