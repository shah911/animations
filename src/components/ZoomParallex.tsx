"use client";
import Image from "next/image";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

function ZoomParallex() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const lerp = (start: number, end: number, alpha: number) => {
    return start + (end - start) * alpha;
  };

  const lerpedScroll = useMotionValue(0);

  useAnimationFrame(() => {
    lerpedScroll.set(lerp(lerpedScroll.get(), scrollYProgress.get(), 0.1));
  });
  const scale1 = useTransform(lerpedScroll, [0.5, 1], [0, 4]);
  const scale2 = useTransform(lerpedScroll, [0.4, 1], [0, 5]);
  const scale3 = useTransform(lerpedScroll, [0.3, 1], [0, 6]);
  const scale4 = useTransform(lerpedScroll, [0.05, 1], [0, 7]);
  const scale5 = useTransform(lerpedScroll, [0.2, 1], [0, 8]);
  return (
    <div>
      <div className="h-screen flex items-center justify-center text-[10vw] uppercase font-bold tracking-tighter">
        Scroll down
      </div>
      {/* container */}
      <div ref={ref} className="h-[500vh] relative bg-sky-200">
        {/* sticky container */}
        <div className="h-screen sticky top-0 overflow-hidden">
          {/* core image */}
          <motion.div
            style={{ scale: scale1 }}
            className="h-full w-full flex items-center justify-center absolute top-0"
          >
            <div className="relative h-[25vh] w-[25vw]">
              <Image
                src="/Marcus Aurelius.jpg"
                alt="Marcus Aurelius"
                className="object-cover"
                fill
                priority
              />
            </div>
          </motion.div>
          {/* top right img */}
          <motion.div
            style={{ scale: scale2 }}
            className="h-full w-full absolute top-0"
          >
            <div className="relative h-[25vh] w-[25vw] ml-[74%] mt-[1%]">
              <Image
                src="/Julius Caesar.jpg"
                alt="Julius Caesar"
                className="object-cover"
                fill
                priority
              />
            </div>
          </motion.div>
          {/* bottom right img */}
          <motion.div
            style={{ scale: scale3 }}
            className="h-full w-full absolute top-0"
          >
            <div className="relative h-[25vh] w-[25vw] ml-[74%] mt-[164%] md:mt-[107%] lg:mt-[35%]">
              <Image
                src="/greek-img-3.jpg"
                alt="Gordian III"
                className="object-cover"
                fill
                priority
              />
            </div>
          </motion.div>
          {/* top left img */}
          <motion.div
            style={{ scale: scale4 }}
            className="h-full w-full absolute top-0"
          >
            <div className="relative h-[25vh] w-[25vw] ml-[0.5%] mt-[1%]">
              <Image
                src="/Aristocles.jpg"
                alt="Aristocles"
                className="object-cover"
                fill
                priority
              />
            </div>
          </motion.div>
          {/* bottom left img */}
          <motion.div
            style={{ scale: scale5 }}
            className="h-full w-full absolute top-0"
          >
            <div className="relative h-[25vh] w-[25vw] ml-[0.5%] mt-[164%] md:mt-[107%] lg:mt-[35%]">
              <Image
                src="/Augustus.jpg"
                alt="Augustus"
                className="object-cover"
                fill
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
      <div className="h-screen flex items-center justify-center text-[10vw] uppercase font-bold tracking-tighter">
        Zoom Parallex
      </div>
    </div>
  );
}

export default ZoomParallex;
