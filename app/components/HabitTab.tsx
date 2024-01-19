import { shootStars } from "~/utils/particles";
import { MdOutlineDoneOutline } from "react-icons/md";

export function HabitTab({ habit, setHabits, habits }: any) {
  return (
    <div className="bg-purple-400 hover:drop-shadow-lg">
      <div
        className="flex flex-row p-3 w-full h-20 text-3xl font-mono bg-secondary text-black my-6 -translate-x-1 -translate-y-1 hover:-translate-y-2 transition-all ease-in-out duration-300 items-center font-bold hover:border-[3px] border-black active:-translate-x-0 active:-traslate-y- hover:opacity-100"
        onMouseEnter={() => {
          const button = document.getElementById(`button-${habit}`);
          if (button) {
            button.style.opacity = "1";
          }
        }}
        onMouseLeave={() => {
          const button = document.getElementById(`button-${habit}`);
          if (button) {
            button.style.opacity = "0";
          }
        }}
      >
        {habit}
        <div
          id={`button-${habit}`}
          className="ml-auto btn btn-square rounded-none btn-ghost text-2xl bg-secondary transition-all ease-in-out duration-75 opacity-0"
          onClick={() => {
            const newHabits = habits.filter((h: any) => h !== habit);
            shootStars();
            setHabits(newHabits);
          }}
        >
          <MdOutlineDoneOutline />
        </div>
      </div>
    </div>
  );
}
