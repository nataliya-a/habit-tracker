import React, { useEffect, useState } from "react";

export function AddHabit() {
  const [NewHabit, setNewHabit] = useState("");
  const [habits, setHabits] = useState([]);

  // fetch habits from local storage
  const fetchHabits = () => {
    const habits = localStorage.getItem("habits");
    if (habits) {
      setHabits(JSON.parse(habits));
    }
  };

  // fetch habits on component mount
  useEffect(() => {
    fetchHabits();
  }, []);

  //   console.log("SavedHabits:", habits);

  // save habits to local storage
  const saveHabits = (habits: any) => {
    localStorage.setItem("habits", JSON.stringify(habits));
  };

  // add habit to list
  const addHabit = (habit: any) => {
    const newHabits = [...habits, habit];
    setHabits(newHabits as any);
    saveHabits(newHabits);
  };

  const handleAddHabit = (event: any) => {
    event.preventDefault();

    // console.log("Habits:", habits);

    // Use the NewHabit state here or perform any other actions
    console.log("New Habit Value:", NewHabit);

    // Add the new habit to the list
    addHabit(NewHabit);

    // Reset the NewHabit state
    setNewHabit("");

    // Close the modal
    // @ts-ignore
    document.getElementById("my_modal_1")?.close();

    // Reload the page
    window.location.reload();

    // redirect to home page
    // redirect("/home");
  };

  return (
    <div className="flex bg-black w-12 h-10 ">
      <button
        className="w-full bg-primary text-black text-xl font-bold transition-all ease-in-out duration-300 hover:border-black hover:-translate-x-2 hover:-translate-y-2 hover:scale-[1.2] active:-translate-x-0 active:-translate-y-0 active:scale-100 active:duration-75"
        // @ts-ignore
        onClick={() => document.getElementById("my_modal_1")?.showModal()}
      >
        +
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box rounded-none bg-purple-500">
          {/* Header */}
          <div className="flex flex-row w-full justify-between items-center">
            <p className="font-extrabold font-mono text-3xl ">New Habit</p>
            <form
              method="dialog"
              className="flex flex-col justify-center items-center"
            >
              <button className="btn btn-md btn-circle btn-ghost">
                <div className="font-bold text-xl ">x</div>
              </button>
            </form>
          </div>

          {/* input */}
          <input
            type="text"
            placeholder="Habit"
            name="habit"
            value={NewHabit}
            autoFocus
            onChange={(e) => setNewHabit(e.target.value)}
            className="input bg-purple-200 text-purple-500 font-extrabold font-xl rounded-none font-mono w-full max-w-xs border-none  focus:outline-primary"
          />
          <div className="modal-action p-2">
            <button
              className="btn btn-primary rounded-none"
              type="submit"
              onClick={handleAddHabit}
            >
              Add
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
