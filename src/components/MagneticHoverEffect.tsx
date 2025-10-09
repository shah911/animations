"use client";
import React, { useEffect, useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const links = ["work", "about", "contact"];
const words = ["Magnetic", "Hover", "Effect"];

interface MagneticEffectProps {
  children: ReactNode;
}

function FramerMagneticEffect({ children }: MagneticEffectProps) {
  const magnetic = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  useEffect(() => {
    const currentMagnetic = magnetic.current;
    if (!currentMagnetic) return;

    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } =
        currentMagnetic.getBoundingClientRect();
      const xValue = clientX - (left + width / 2);
      const yValue = clientY - (top + height / 2);

      x.set(xValue);
      y.set(yValue);
    };

    const mouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    currentMagnetic.addEventListener("mousemove", mouseMove);
    currentMagnetic.addEventListener("mouseleave", mouseLeave);

    return () => {
      if (currentMagnetic) {
        currentMagnetic.removeEventListener("mousemove", mouseMove);
        currentMagnetic.removeEventListener("mouseleave", mouseLeave);
      }
    };
  }, [x, y]);

  return (
    <motion.div ref={magnetic} style={{ x: springX, y: springY }}>
      {children}
    </motion.div>
  );
}

//for gsap
// import React, { useEffect, useRef, ReactNode } from "react";
// import gsap from "gsap";

// interface MagneticEffectProps {
//   children: ReactNode;
// }

// export default function MagneticEffect({ children }: MagneticEffectProps) {
//   const magnetic = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const currentMagnetic = magnetic.current;
//     if (!currentMagnetic) return;

//     const xTo = gsap.quickTo(currentMagnetic, "x", {
//       duration: 1,
//       ease: "elastic.out(1, 0.3)",
//     });
//     const yTo = gsap.quickTo(currentMagnetic, "y", {
//       duration: 1,
//       ease: "elastic.out(1, 0.3)",
//     });

//     const mouseMove = (e: MouseEvent) => {
//       const { clientX, clientY } = e;
//       const { height, width, left, top } =
//         currentMagnetic.getBoundingClientRect();
//       const x = clientX - (left + width / 2);
//       const y = clientY - (top + height / 2);
//       xTo(x);
//       yTo(y);
//     };

//     const mouseLeave = () => {
//       xTo(0);
//       yTo(0);
//     };

//     currentMagnetic.addEventListener("mousemove", mouseMove);
//     currentMagnetic.addEventListener("mouseleave", mouseLeave);

//     return () => {
//       if (currentMagnetic) {
//         currentMagnetic.removeEventListener("mousemove", mouseMove);
//         currentMagnetic.removeEventListener("mouseleave", mouseLeave);
//       }
//     };
//   }, []);

//   return React.cloneElement(children as React.ReactElement, { ref: magnetic });
// }

function MagneticHoverEffect() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="fixed top-0">
        <div className="w-[95vw] py-4 2xl:py-[2vw] mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
          <div className="flex-[1]">
            <span className="text-2xl 2xl:text-[1.75vw] capitalize">shah.</span>
          </div>
          <div className="flex-[1] flex items-center justify-end gap-5 md:gap-10 2xl:gap-[4vw]">
            {links.map((item, i) => (
              <FramerMagneticEffect key={i}>
                <span className="cursor-pointer capitalize text-sm border border-black py-2 px-4 2xl:px-[1.5vw] 2xl:py-[0.75vw] 2xl:text-[1vw] rounded-full transition-colors duration-300 hover:text-white hover:bg-black">
                  {item}
                </span>
              </FramerMagneticEffect>
            ))}
          </div>
        </div>
      </div>
      {words.map((item, i) => (
        <FramerMagneticEffect key={i}>
          <span className="text-2xl md:text-4xl cursor-pointer 2xl:leading-[125%] 2xl:text-[3vw]">
            {item}
          </span>
        </FramerMagneticEffect>
      ))}
      <p className="text-center mt-5 2xl:mt-[3vw] 2xl:text-[1.25vw]">
        Hover over the nav links or words to observe the animation.
      </p>
    </main>
  );
}

export default MagneticHoverEffect;
