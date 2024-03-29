import { shootStars } from "~/utils/particles";
import { MdOutlineDoneOutline } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

import { useState } from "react";
import { motion } from "framer-motion";
import { Habit } from "~/types/habit";

export function HabitTab({
  habit,
  setHabits,
  habits,
}: {
  habit: Habit;
  setHabits: (h: Habit[]) => void;
  habits: Habit[];
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="bg-purple-400 hover:drop-shadow-lg"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="flex flex-row justify-between p-3 w-full h-[60px] sm:h-20  text-xl sm:text-3xl font-mono bg-secondary text-black my-6 -translate-x-1 -translate-y-1 hover:-translate-y-2 transition-all ease-in-out duration-300 items-center font-bold hover:border-[3px] border-black active:-translate-x-0 active:-traslate-y- hover:opacity-100"
        onMouseEnter={() => {
          const button = document.getElementById(`button-${habit.name}`);
          if (button) {
            button.style.opacity = "1";
          }
        }}
        onMouseLeave={() => {
          const button = document.getElementById(`button-${habit.name}`);
          if (button) {
            button.style.opacity = "0";
          }
        }}
      >
        <div className="w-full">{habit.name}</div>

        <div className="flex flex-row items-center">
          <div
            id={`button-${habit.name}`}
            className="ml-auto btn btn-square rounded-none btn-ghost text-2xl bg-secondary transition-all ease-in-out duration-75 opacity-0"
            onClick={() => {
              shootStars();
              const newHabits = habits.map((h: Habit) => {
                if (h.name === habit.name) {
                  h.completed = !h.completed;
                }
                return h;
              });
              setHabits(newHabits);
              localStorage?.setItem("habits", JSON.stringify(newHabits));
            }}
          >
            <MdOutlineDoneOutline />
          </div>
          <div
            id={`button-delete-${habit.name}`}
            className={`ml-auto btn btn-square rounded-none btn-ghost text-2xl bg-secondary transition-all ease-in-out duration-75 ${
              hover ? "opacity-100" : "opacity-0"
            } text-black`}
            onClick={() => {
              const newHabits = habits.filter((h: any) => h !== habit);
              const index = newHabits.indexOf(habit);
              if (index > -1) newHabits.splice(index, 1);
              setHabits(newHabits);
              localStorage.setItem("habits", JSON.stringify(newHabits));
            }}
          >
            <RiDeleteBin5Line />
          </div>
        </div>
      </div>
    </div>
  );
}
