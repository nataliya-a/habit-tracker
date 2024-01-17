// purple-400

import { useEffect, useState } from "react";
import { HabitTab } from "~/components/HabitTab";
import { AddHabit } from "~/components/AddHabit";
import { DotLottiePlayer, Controls } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

export default function Home() {
  const [habits, setHabits] = useState([]);

  const fetchHabits = () => {
    const storedHabits = localStorage.getItem("habits");
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div className="w-full text-primary p-8 h-screen flex flex-col justify-start items-center bg-teal-800 overflow-scroll">
      <div className="w-full max-w-2xl ">
        <div className="w-full flex flex-row py-10 max-w-2xl font-black text-6xl fixed z-[9] top-0 justify-between items-center bg-teal-800">
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
          <AddHabit />
        </div>
        {habits.length > 0 ? (
          <div className="mt-[8rem] px-2">
            {habits.map((habit, id) => (
              <div key={id}>
                <HabitTab habit={habit} setHabits={setHabits} habits={habits} />
              </div>
            ))}
          </div>
        ) : (
          <div className="scale-50">
            <DotLottiePlayer
              src="https://lottie.host/eab4f3a9-147b-4a09-94c7-a51e803a2324/zqm4o1QSTs.lottie"
              autoplay
              loop
            />
            <div className="w-full flex flex-row justify-center items-center mt-10">
              <h1 className="text-5xl">time for a treat!</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
