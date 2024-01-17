import { shootStars } from "~/utils/particles";

export function HabitTab({ habit, setHabits, habits }: any) {
  return (
    <div className="bg-purple-400 hover:drop-shadow-lg">
      <div
        className="flex flex-row p-3 w-full h-20 text-3xl font-mono bg-secondary text-black my-6 -translate-x-1 -translate-y-1 hover:-translate-y-2 transition-all ease-in-out duration-300 items-center font-bold hover:border-[3px] border-black active:-translate-x-0 active:-traslate-y-"
        onClick={() => {
          const newHabits = habits.filter((h: any) => h !== habit);
          shootStars();
          setHabits(newHabits);
        }}
      >
        {habit}
      </div>
    </div>
  );
}
