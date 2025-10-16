"use client";

import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const para =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export default function OpacityScrollAnimation() {
  return (
    <div className="w-[95%] mx-auto">
      <div className="min-h-[600px] h-screen flex items-center justify-center text-[10vw] uppercase tracking-tighter">
        Scroll down
      </div>
      <Word phrase={para} />
      <div className="min-h-[600px] h-screen" />
      <Charater phrases={para} />
      <div className="min-h-[600px] h-screen" />
    </div>
  );
}

//animated by word

export const Word = ({ phrase }: { phrase: string }) => {
  const words = phrase.split(" ");
  const element = useRef(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ["center end", "end center"],
  });

  return (
    <p
      ref={element}
      className="flex flex-wrap gap-x-1 leading-[100%] text-2xl font-medium"
    >
      {words.map((word: string, i: number) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <SingleWord range={[start, end]} progress={scrollYProgress} key={i}>
            {word}
          </SingleWord>
        );
      })}
    </p>
  );
};

const SingleWord = ({
  children,
  range,
  progress,
}: {
  children: string;
  range: number[];
  progress: MotionValue;
}) => {
  const opacity = useTransform(progress, range, [0.3, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
};

//Animated by single Character

export const Charater = ({ phrases }: { phrases: string }) => {
  const words = phrases.split(" ");
  const element = useRef(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ["start end", "end center"],
  });

  return (
    <p
      ref={element}
      className="flex flex-wrap gap-x-1 leading-[100%] text-2xl font-medium"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <SingleWords range={[start, end]} progress={scrollYProgress} key={i}>
            {word}
          </SingleWords>
        );
      })}
    </p>
  );
};

const SingleWords = ({
  children,
  range,
  progress,
}: {
  children: string;
  range: number[];
  progress: MotionValue;
}) => {
  const characters = children.split("");
  const amount = range[1] - range[0];
  const step = amount / children.length;
  return (
    <span>
      {characters.map((character, i) => {
        const start = range[0] + step * i;
        const end = range[0] + step * (i + 1);
        return (
          <SingleCharacter range={[start, end]} progress={progress} key={i}>
            {character}
          </SingleCharacter>
        );
      })}
    </span>
  );
};

const SingleCharacter = ({
  children,
  range,
  progress,
}: {
  children: string;
  range: number[];
  progress: MotionValue;
}) => {
  const opacity = useTransform(progress, range, [0.3, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
};
