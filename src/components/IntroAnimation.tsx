"use client";
import Image from "next/image";
import { motion } from "motion/react";
import img1 from "../../public/modern Architecture.jpg";
import img2 from "../../public/Gothic architecture.jpg";
import img3 from "../../public/Greek Revival architecture.jpg";
import img4 from "../../public/Islamic architecture.jpg";
import img5 from "../../public/Byzantine architecture.jpg";
import img6 from "../../public/Ancient Roman architecture.jpg";

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

function IntroAnimation() {
  return (
    <div>
      <motion.div
        initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
        animate={{
          clipPath: "inset(0% 0% 100% 0%)",
          transition: {
            duration: 1,
            ease: "easeInOut",
            delay: 4,
          },
        }}
        className="absolute bg-black h-screen w-full"
      />
      <div className="h-screen w-full flex items-center justify-center">
        {data.map((item, i) => (
          <div
            key={i}
            className="absolute top-0 left-0 h-full w-full bg-black -z-10 hidden"
          >
            <Image
              src={item.url}
              alt={item.title}
              priority={true}
              fill
              className="object-cover"
            />
          </div>
        ))}
        <motion.div
          initial={{ y: 50 }}
          animate={{
            y: 0,
            transition: {
              duration: 0.5,
              ease: "easeInOut",
              delay: 4,
            },
          }}
          className="relative h-[35vh] w-[20vw]"
        >
          {data.map((item, i) => (
            <motion.div
              key={i}
              initial={{ scale: 1.2, clipPath: "inset(50% 50% 50% 50%)" }}
              animate={{
                scale: 1,
                clipPath: "inset(0% 0% 0% 0%)",
                transition: {
                  duration: 1,
                  ease: "easeInOut",
                  delay: 0.5 + 0.5 * i,
                },
              }}
              className="absolute h-full w-full"
            >
              <Image
                src={item.url}
                alt={item.title}
                fill
                className="object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default IntroAnimation;
