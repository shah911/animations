"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";

const data = ["story", "protocol", "journal", "media", "gallery", "about"];

const main: Variants = {
  initial: { clipPath: "inset(0 100% 0 0)" },
  animate: {
    clipPath: "inset(0)",
    transition: { type: "tween", duration: 0.5, ease: "easeInOut" },
  },
  exit: {
    clipPath: "inset(0 100% 0 0)",
    transition: { type: "tween", delay: 0.2 },
  },
};

const menuTitle: Variants = {
  initial: { x: "-100%", opacity: 0 },
  animate: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      type: "tween",
      delay: 0.05 * i,
      duration: 0.5,
      ease: "easeInOut",
    },
  }),
  exit: (i: number) => ({
    x: "-100%",
    opacity: 0,
    transition: {
      type: "tween",
      delay: 0.05 * i,
      ease: "easeInOut",
    },
  }),
};

export default function SideMenu() {
  return (
    <div className="flex items-center justify-center py-4 w-[95%] mx-auto 2xl:py-[1vw]">
      <div className="flex-[1]">
        <Menu />
      </div>
      <div className="flex-[1] flex items-center justify-end">
        <button
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 100% 80%, 95% 100%, 0% 100%, 0 50%)",
          }}
          className="px-8 py-4 2xl:px-[2vw] 2xl:py-[1vw] 2xl:text-[1vw] 2xl:rounded-[0.175vw] bg-black text-white uppercase font-bold rounded-[3px] transition-colors cursor-pointer hover:bg-slate-200 hover:text-black"
        >
          sign in
        </button>
      </div>
    </div>
  );
}

function Menu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="flex flex-col gap-1 2xl:gap-[0.3vw] cursor-pointer w-fit"
      >
        <span className="w-[40px] h-[1px] 2xl:w-[3vw] 2xl:h-[0.05vw] bg-black"></span>
        <span className="w-[30px] h-[1px] 2xl:w-[2.5vw] 2xl:h-[0.05vw] bg-black"></span>
      </div>
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            variants={main}
            initial="initial"
            animate="animate"
            exit="exit"
            className="z-10 flex absolute top-[16px] left-0 md:left-[16px] min-h-[600px] h-[95vh] w-full md:w-[70%] lg:w-[45%] bg-black rounded-2xl 2xl:rounded-[1vw] overflow-hidden"
          >
            <div className="flex-[8] text-white relative h-full">
              <span className="text-xs absolute top-[32px] left-4 2xl:text-[0.75vw] 2xl:left-[1vw] 2xl:top-[2vw]">
                Discover.
              </span>
              <div className="h-[60%]">
                <div className="ml-4 mt-16 md:ml-40 md:mt-8 2xl:ml-[12vw] flex flex-col">
                  {data.map((item, i) => (
                    <motion.div
                      variants={menuTitle}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      key={i}
                      custom={i}
                    >
                      <Button Text={item} />
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="h-[40%] flex flex-col justify-end pb-20 2xl:pb-[5vw]">
                <hr className="border-[#bebebe54]" />
                <div className="flex items-center ml-4 2xl:ml-[1vw] gap-[90px] py-4 2xl:py-[2vw]">
                  <span className="uppercase text-[10px] w-[25%] 2xl:text-[0.65vw]">
                    connect.
                  </span>
                  <div className="w-[75%]">
                    <div className="flex flex-col items-center justify-center w-fit">
                      <span className="uppercase text-xs 2xl:text-[0.75vw] leading-[130%]">
                        x
                      </span>
                      <span className="uppercase text-xs 2xl:text-[0.75vw] leading-[130%]">
                        discord
                      </span>
                    </div>
                  </div>
                </div>
                <hr className="border-[#bebebe54]" />
                <div className="flex items-center ml-4 2xl:ml-[1vw] gap-[90px] py-6 2xl:py-[2vw]">
                  <span className="uppercase text-[10px] w-[25%] 2xl:text-[0.65vw]">
                    buy on.
                  </span>
                  <div className="flex flex-col w-[75%]">
                    <span className="uppercase text-xs 2xl:text-[0.75vw]">
                      amazon
                    </span>
                  </div>
                </div>
                <hr className="border-[#bebebe54]" />
              </div>
            </div>
            <div className="flex-[1] text-white border-[#bebebe54] border-l h-full">
              <div
                onClick={() => setOpen(false)}
                className="cursor-pointer h-12 2xl:h-[4vw] flex flex-col relative"
              >
                <span className="w-[40px] h-[1px] 2xl:w-[3vw] 2xl:h-[0.05vw] bg-white rotate-45  absolute top-[32px] left-[50%] translate-x-[-50%]  2xl:top-[2vw]"></span>
                <span className="w-[40px] h-[1px] 2xl:w-[3vw] 2xl:h-[0.05vw] bg-white -rotate-45  absolute top-[32px] left-[50%] translate-x-[-50%]  2xl:top-[2vw]"></span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const Button = ({ Text }: { Text: string }) => {
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const TARGET_TEXT = Text;
  const CYCLES_PER_LETTER = 2;
  const SHUFFLE_TIME = 50;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [text, setText] = useState(""); // Start with an empty string to avoid showing the original text first
  const [isScrambling, setIsScrambling] = useState(false);

  // Function to generate an initial scrambled version of the text
  const initialScramble = (text: string) => {
    return text
      .split("")
      .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
      .join("");
  };

  const stopScramble = useCallback(
    (resetText = true) => {
      clearInterval(intervalRef.current || undefined);
      setIsScrambling(false);

      if (resetText) {
        setText(TARGET_TEXT);
      }
    },
    [TARGET_TEXT]
  );

  const scramble = useCallback(() => {
    setIsScrambling(true);
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble(false);
      }
    }, SHUFFLE_TIME);
  }, [TARGET_TEXT, CYCLES_PER_LETTER, SHUFFLE_TIME, stopScramble]);

  // Trigger scramble when the component mounts
  useEffect(() => {
    setText(initialScramble(TARGET_TEXT)); // Set initial scrambled text
    scramble(); // Start scrambling immediately
    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalRef.current || undefined);
  }, [scramble, TARGET_TEXT]);

  return (
    <motion.button
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 80%, 95% 100%, 0% 100%, 0 50%)",
      }}
      onMouseEnter={() => {
        if (!isScrambling) scramble(); // Start scrambling only if not already scrambling
      }}
      onMouseLeave={() => stopScramble()} // Stop scrambling and reset to the target text
      className="relative cursor-pointer rounded-[3px] px-3 py-1 uppercase bg-black text-white transition-colors hover:bg-white hover:text-black"
    >
      {/* Invisible placeholder text to maintain width */}
      <span className="invisible font-black text-5xl 2xl:text-[3.5vw] tracking-tight">
        {TARGET_TEXT}
      </span>

      {/* Visible scrambling text */}
      <span className="absolute top-[50%] left-2 2xl:left-[2%] translate-y-[-50%] font-black text-5xl 2xl:text-[3.5vw] tracking-tight">
        {text}
      </span>
    </motion.button>
  );
};
