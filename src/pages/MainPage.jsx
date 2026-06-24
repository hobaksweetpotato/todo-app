import { useEffect, useState } from "react";
import {
  getDailyTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  updateTodoReview,
  toggleTodoCheck,
} from "../apis/todoApi";

import CalendarBox from "../components/CalendarBox";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

function mapApiTodo(todo) {
  return {
    id: todo.todo_id,
    title: todo.content,
    date: todo.date.slice(0, 10),
    completed: todo.is_checked,
    emoji: todo.emoji || "",
  };
}

function makeApiDate(dateKey) {
  return `${dateKey}T00:00:00.000000`;
}

function getEmojiStorageKey(memberId) {
  return `todo-emojis-${memberId}`;
}

function getSavedEmojis(memberId) {
  return JSON.parse(localStorage.getItem(getEmojiStorageKey(memberId))) || {};
}

function saveTodoEmoji(memberId, todoId, emoji) {
  const savedEmojis = getSavedEmojis(memberId);

  if (emoji) {
    savedEmojis[todoId] = emoji;
  } else {
    delete savedEmojis[todoId];
  }

  localStorage.setItem(
    getEmojiStorageKey(memberId),
    JSON.stringify(savedEmojis),
  );
}

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

function getMonthAndDay(dateKey) {
  const [, month, day] = dateKey.split("-");

  return {
    month: Number(month),
    day: Number(day),
  };
}

function MainPage({ currentUser, onLogout }) {
  const memberId = localStorage.getItem("memberId");

  const [todos, setTodos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getDateKey());
  const [filter, setFilter] = useState("all");

  useEffect(() => {
  const fetchDailyTodos = async () => {
    try {
      const { month, day } = getMonthAndDay(selectedDate);

      const data = await getDailyTodos(memberId, month, day);
      console.log("날짜별 투두 조회 응답:", data);

      const mappedTodos = Array.isArray(data) ? data.map(mapApiTodo) : [];
      setTodos(mappedTodos);
    } catch (error) {
      console.error("날짜별 투두 조회 실패:", error);
    }
  };

  if (memberId) {
    fetchDailyTodos();
  }
}, [memberId, selectedDate]);

  const handleAddTodo = async ({ title }) => {
    try {
      const data = await createTodo(memberId, {
        date: makeApiDate(selectedDate),
        content: title,
      });

      console.log("투두 작성 응답:", data);

      const newTodo = mapApiTodo(data);
      setTodos([newTodo, ...todos]);
    } catch (error) {
      console.error("투두 작성 실패:", error);
      alert("할 일 작성에 실패했습니다.");
    }
  };

  const handleToggleTodo = async (todoId) => {
  try {
    const data = await toggleTodoCheck(memberId, todoId);
    console.log("완료 토글 응답:", data);

    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? mapApiTodo(data) : todo
      ),
    );
  } catch (error) {
    console.error("완료 토글 실패:", error);
    alert("완료 상태 변경에 실패했습니다.");
  }
};

  const handleDeleteTodo = async (todoId) => {
    try {
      await deleteTodo(memberId, todoId);

      setTodos(todos.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.error("투두 삭제 실패:", error);
      alert("할 일 삭제에 실패했습니다.");
    }
  };

  const handleEditTodo = async (todoId, updatedTodo) => {
    try {
      const originalTodo = todos.find((todo) => todo.id === todoId);

      const data = await updateTodo(memberId, todoId, {
        date: makeApiDate(originalTodo.date),
        content: updatedTodo.title,
      });

      console.log("투두 수정 응답:", data);

      setTodos(
        todos.map((todo) => (todo.id === todoId ? mapApiTodo(data) : todo)),
      );
    } catch (error) {
      console.error("투두 수정 실패:", error);
      alert("할 일 수정에 실패했습니다.");
    }
  };

  const handleEmojiChange = async (todoId, emoji) => {
    try {
      const data = await updateTodoReview(memberId, todoId, {
        emoji,
      });

      console.log("투두 리뷰 응답:", data);

      setTodos(
        todos.map((todo) => (todo.id === todoId ? mapApiTodo(data) : todo)),
      );
    } catch (error) {
      console.error("투두 리뷰 실패:", error);
      alert("리뷰 이모지 저장에 실패했습니다.");
    }
  };

  const selectedTodos = todos;

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
              onEmojiChange={handleEmojiChange}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

export default MainPage;
