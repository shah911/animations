"use client";

import Image from "next/image";
import { motion } from "motion/react";

const dataSet = [
  {
    title: "Julius Caesar",
    desc: "Ambitious, Strategic, Charismatic",
    img: "/Julius Caesar.jpg",
  },
  {
    title: "Marcus Aurelius",
    desc: "Philosophical, Disciplined, Stoic",
    img: "/Marcus Aurelius.jpg",
  },
  {
    title: "Gordian III",
    desc: "Young, Inexperienced, Imperial",
    img: "/greek-img-3.jpg",
  },
];

function ThreeDCardAnimation() {
  const width = 300;
  const height = 350;
  const depth = 300;

  return (
    <div className="min-h-screen w-full bg-slate-200 flex flex-wrap items-center justify-center gap-10 py-20">
      {dataSet.map((item, i) => (
        /* Perspective wrapper */
        <div
          key={i}
          className="h-[350px] w-[300px] shrink-0"
          style={{ perspective: "2000px" }}
        >
          {/* Rotating 3D cuboid */}
          <motion.div
            whileHover={{
              rotateX: 180,
            }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative h-full w-full"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* FRONT FACE */}
            <div
              className="absolute inset-0 bg-white p-3 flex flex-col justify-between"
              style={{
                backfaceVisibility: "hidden",
                transform: `translateZ(${depth / 2}px)`,
              }}
            >
              <div className="h-[175px] w-[150px] ml-auto">
                <div className="relative h-[75%] w-full">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div>
                <h1 className="text-3xl">{item.title}</h1>
                <p className="text-xs uppercase">{item.desc}</p>
              </div>
            </div>

            {/* BACK FACE */}
            <div
              className="absolute inset-0 bg-white p-3 flex flex-col justify-between"
              style={{
                backfaceVisibility: "hidden",
                transform: `rotateX(180deg) translateZ(${depth / 2}px)`,
              }}
            >
              <div className="h-[175px] w-[150px] ml-auto">
                <div className="relative h-[75%] w-full">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div>
                <h1 className="text-3xl">{item.title}</h1>
                <p className="text-xs uppercase">{item.desc}</p>
              </div>
            </div>

            {/* RIGHT FACE */}
            <div
              className="absolute bg-gray-300"
              style={{
                width: depth,
                height,
                top: 0,
                left: `calc(50% - ${depth / 2}px)`,
                transform: `rotateY(90deg) translateZ(${width / 2}px)`,
                backfaceVisibility: "hidden",
              }}
            />

            {/* LEFT FACE */}
            <div
              className="absolute bg-gray-400"
              style={{
                width: depth,
                height,
                top: 0,
                left: `calc(50% - ${depth / 2}px)`,
                transform: `rotateY(-90deg) translateZ(${width / 2}px)`,
                backfaceVisibility: "hidden",
              }}
            />

            {/* TOP FACE */}
            <div
              className="absolute bg-gray-200"
              style={{
                width,
                height: depth,
                top: `calc(50% - ${depth / 2}px)`,
                left: 0,
                transform: `rotateX(90deg) translateZ(${height / 2}px)`,
                backfaceVisibility: "hidden",
              }}
            />

            {/* BOTTOM FACE */}
            <div
              className="absolute bg-gray-500"
              style={{
                width,
                height: depth,
                top: `calc(50% - ${depth / 2}px)`,
                left: 0,
                transform: `rotateX(-90deg) translateZ(${height / 2}px)`,
                backfaceVisibility: "hidden",
              }}
            />
          </motion.div>
        </div>
      ))}
    </div>
  );
}

export default ThreeDCardAnimation;
