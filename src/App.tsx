import { useState } from "react";
import { useTasks } from "./hooks/useTasks";
import "./App.css";

type Filter = "all" | "active" | "done";

const FILTER_ITEMS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "done", label: "Done" },
];

export default function App() {
  const { tasks, dispatch } = useTasks();
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.done;
    if (filter === "done") return task.done;
    return true;
  });

  return (
    <main className="mockup-page">
      <section className="paper-card">
        <header className="card-header">
          <div className="title-copy">
            <p className="eyebrow">Not-To-Do</p>
            <h1>やらないことにも、ちゃんと居場所を。</h1>
            <p className="subtitle">リモコン片手に、静かに手放すタスク管理。</p>
          </div>

          <div className="illustration" aria-hidden="true">
            <div className="sofa" />
            <div className="person">
              <span className="head" />
              <span className="hair" />
              <span className="torso" />
              <span className="arm" />
              <span className="leg" />
            </div>
            <div className="snacks">
              <span className="chip chip-1" />
              <span className="chip chip-2" />
              <span className="chip chip-3" />
            </div>
            <div className="remote" />
            <span className="crumb crumb-1" />
            <span className="crumb crumb-2" />
            <span className="crumb crumb-3" />
          </div>
        </header>

        <form
          className="task-form"
          onSubmit={(event) => {
            event.preventDefault();
            if (!title.trim()) return;
            dispatch({ type: "add", title });
            setTitle("");
          }}
        >
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="やらないことを、ひとつ置いていく"
            aria-label="やらないことを、ひとつ置いていく"
          />
          <button type="submit">追加</button>
        </form>

        <div className="filter-row">
          {FILTER_ITEMS.map((item) => (
            <button
              key={item.key}
              type="button"
              className={filter === item.key ? "is-active" : ""}
              onClick={() => setFilter(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <ul className="task-list">
          {filteredTasks.length === 0 ? (
            <li className="empty-state">
              まだ何も置かれていません。無理しない姿勢は、もうできています。
            </li>
          ) : (
            filteredTasks.map((task) => (
              <li key={task.id} className={task.done ? "task done" : "task"}>
                <button
                  type="button"
                  className="task-title"
                  onClick={() => dispatch({ type: "toggle", id: task.id })}
                >
                  {task.title}
                </button>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => dispatch({ type: "remove", id: task.id })}
                  aria-label={`${task.title} を削除`}
                >
                  ×
                </button>
              </li>
            ))
          )}
        </ul>
      </section>
    </main>
  );
}
