import { useEffect, useReducer } from "react";
import type { Task } from "../types/task";

type Action =
  | { type: "add"; title: string }
  | { type: "toggle"; id: string }
  | { type: "remove"; id: string }
  | { type: "hydrate"; tasks: Task[] };

function reducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case "add":
      return [
        {
          id: crypto.randomUUID(),
          title: action.title,
          done: false,
          createdAt: new Date().toISOString(),
        },
        ...state,
      ];

    case "toggle":
      return state.map((task) =>
        task.id === action.id ? { ...task, done: !task.done } : task
      );

    case "remove":
      return state.filter((task) => task.id !== action.id);

    case "hydrate":
      return action.tasks;

    default:
      return state;
  }
}

export function useTasks() {
  const [tasks, dispatch] = useReducer(reducer, []);

  // 初回読み込み
  useEffect(() => {
    const saved = localStorage.getItem("not-to-do");
    if (saved) {
      dispatch({ type: "hydrate", tasks: JSON.parse(saved) });
    }
  }, []);

  // 保存
  useEffect(() => {
    localStorage.setItem("not-to-do", JSON.stringify(tasks));
  }, [tasks]);

  return { tasks, dispatch };
}