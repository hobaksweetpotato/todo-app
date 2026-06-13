import { useEffect, useState } from "react";
import CalendarBox from "../components/CalendarBox";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

function getDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getKoreanDate(dateKey) {
  const [, month, day] = dateKey.split("-");
  return `${Number(month)}월 ${Number(day)}일`;
}

function MainPage({ currentUser, onLogout }) {
  const storageKey = `todos-${currentUser}`;

  const [selectedDate, setSelectedDate] = useState(getDateKey());
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(todos));
  }, [todos, storageKey]);

  const handleAddTodo = ({ title, emoji }) => {
    const newTodo = {
      id: Date.now(),
      title,
      emoji,
      date: selectedDate,
      completed: false,
    };

    setTodos([newTodo, ...todos]);
  };

  const handleToggleTodo = (todoId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  const handleEditTodo = (todoId, updatedTodo) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, ...updatedTodo } : todo
      )
    );
  };

  const selectedTodos = todos.filter((todo) => todo.date === selectedDate);

  const filteredTodos = selectedTodos.filter((todo) => {
    if (filter === "done") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  const doneCount = selectedTodos.filter((todo) => todo.completed).length;

  return (
    <div className="min-h-screen bg-[#f5f8ff] px-5 py-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between rounded-[28px] bg-white px-7 py-5 shadow-sm">
          <div>
            <p className="text-sm font-semibold text-blue-500">TMT</p>
            <h1 className="mt-1 text-2xl font-bold text-gray-900">
              {currentUser}님의 Todo
            </h1>
          </div>

          <button
            onClick={onLogout}
            className="rounded-full bg-gray-100 px-5 py-3 text-sm font-bold text-gray-600 transition hover:bg-gray-200"
          >
            로그아웃
          </button>
        </header>

        <main className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <section className="space-y-6">
            <CalendarBox
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              todos={todos}
            />

            <div className="rounded-[28px] bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-gray-400">오늘의 진행률</p>

              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                {selectedTodos.length === 0
                  ? "아직 일정이 없어요"
                  : `${doneCount}/${selectedTodos.length} 완료`}
              </h2>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-blue-50">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all"
                  style={{
                    width:
                      selectedTodos.length === 0
                        ? "0%"
                        : `${(doneCount / selectedTodos.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </section>

          <section className="rounded-[32px] bg-white p-7 shadow-sm">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-blue-500">
                  {getKoreanDate(selectedDate)}
                </p>
                <h2 className="mt-1 text-2xl font-extrabold text-gray-900">
                  오늘의 할 일
                </h2>
              </div>

              <div className="flex rounded-full bg-gray-100 p-1">
                <button
                  onClick={() => setFilter("all")}
                  className={`rounded-full px-4 py-2 text-xs font-bold ${
                    filter === "all"
                      ? "bg-white text-blue-500 shadow-sm"
                      : "text-gray-500"
                  }`}
                >
                  전체
                </button>

                <button
                  onClick={() => setFilter("pending")}
                  className={`rounded-full px-4 py-2 text-xs font-bold ${
                    filter === "pending"
                      ? "bg-white text-blue-500 shadow-sm"
                      : "text-gray-500"
                  }`}
                >
                  미완료
                </button>

                <button
                  onClick={() => setFilter("done")}
                  className={`rounded-full px-4 py-2 text-xs font-bold ${
                    filter === "done"
                      ? "bg-white text-blue-500 shadow-sm"
                      : "text-gray-500"
                  }`}
                >
                  완료
                </button>
              </div>
            </div>

            <TodoForm onAddTodo={handleAddTodo} />

            <TodoList
              todos={filteredTodos}
              filter={filter}
              onToggleTodo={handleToggleTodo}
              onDeleteTodo={handleDeleteTodo}
              onEditTodo={handleEditTodo}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

export default MainPage;