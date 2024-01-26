// purple-400

import { forwardRef, useEffect, useState } from "react";
import { HabitTab } from "~/components/HabitTab";
import { AddHabit } from "~/components/AddHabit";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [habits, setHabits] = useState([]);
  const [habitsCompleted, setHabitsCompleted] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHabits = () => {
    const storedHabits = localStorage.getItem("habits");
    const storedHabitsCompleted = localStorage.getItem("habitsCompleted");

    let storedHabitsCompletedArray: string[];
    if (storedHabitsCompleted === null) storedHabitsCompletedArray = [];
    else storedHabitsCompletedArray = JSON.parse(storedHabitsCompleted);

    setHabitsCompleted(storedHabitsCompletedArray);

    let lastSeenDate = localStorage.getItem("lastSeenDate");
    if (!lastSeenDate) {
      localStorage.setItem(
        "lastSeenDate",
        new Date().toISOString().split("T")[0]
      );
      lastSeenDate = localStorage.getItem("lastSeenDate");
    }
    const today = new Date().toISOString().split("T")[0];

    if (lastSeenDate !== today) {
      localStorage.removeItem("habitsCompleted");
      localStorage.setItem("lastSeenDate", today);
    }
    if (storedHabits) {
      if (storedHabitsCompleted !== null && storedHabitsCompleted.length > 0) {
        const storedHabitsArray = JSON.parse(storedHabits);
        const incompletedHabits = storedHabitsArray.filter(
          (habit: string) => !storedHabitsCompletedArray.includes(habit)
        );

        setHabits(incompletedHabits);
      } else setHabits([]);
    }
  };

  // reset at midnight
  const resetHabits = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    if (hours === 0 && minutes === 0 && seconds === 0) {
      localStorage.removeItem("habitsCompleted");
      const storedHabits = localStorage.getItem("habits");
      if (storedHabits) setHabits(JSON.parse(storedHabits));
    }
  };

  useEffect(() => {
    fetchHabits();
    const interval = setInterval(() => {
      resetHabits();
    }, 1000);
    setLoading(false);
    return () => clearInterval(interval);
  }, []);
  const ForwardedHabitTab = forwardRef((props: any, ref) => (
    <HabitTab ref={ref} {...props} />
  ));

  return (
    <div className="w-full text-primary p-0 sm:p-8 h-screen flex flex-col justify-start items-center bg-teal-800 overflow-scroll">
      <div className="w-full max-w-2xl">
        <div className="w-full flex flex-row py-10 max-w-2xl px-5 sm:px-0 font-black text-2xl sm:text-6xl fixed z-[9] top-0 justify-between items-center bg-teal-800">
          <div>
            Today
            {habits.length > 0 && (
              <>
                (
                <span className="countdown font-mono">
                  {/* @ts-ignore */}

                  <span style={{ "--value": habits.length }}></span>
                </span>
                )
              </>
            )}
          </div>
          <AddHabit habits={habits} setHabits={setHabits} />
        </div>
        {!loading && (
          <>
            {habits.length > 0 ? (
              <div className="mt-[8rem] px-2" key="wrapper">
                <AnimatePresence mode="popLayout" initial={true}>
                  {habits.map((habit, id) => (
                    <motion.div
                      layout
                      key={id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{
                        type: "tween",
                        duration: 0.3,
                      }}
                    >
                      <HabitTab
                        id={id}
                        habit={habit}
                        setHabits={setHabits}
                        habits={habits}
                        habitsCompleted={habitsCompleted}
                        setHabitsCompleted={setHabitsCompleted}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div>
                {habitsCompleted.length === 0 ? (
                  <div className="scale-70 mt-[10rem]">
                    <DotLottiePlayer
                      src="https://lottie.host/1da7ccec-40c0-4481-99c2-3cc2c70d1c53/d4aDJui7Cj.lottie"
                      autoplay
                      loop
                    />
                  </div>
                ) : (
                  <div className="scale-50 -mb-[10rem]">
                    <DotLottiePlayer
                      src="https://lottie.host/eab4f3a9-147b-4a09-94c7-a51e803a2324/zqm4o1QSTs.lottie"
                      autoplay
                      loop
                    />
                  </div>
                )}
                <div className="w-full flex flex-row justify-center items-center mt-10">
                  <h1 className="text-xl sm:text-3xl">
                    {habits.length === 0 && habitsCompleted.length === 0
                      ? "let's get slaying"
                      : "time for a treat!"}
                  </h1>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
