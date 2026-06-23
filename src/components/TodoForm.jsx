import { useState } from "react";

function TodoForm({ onAddTodo }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("할 일을 입력해주세요.");
      return;
    }

    onAddTodo({
      title: title.trim(),
    });

    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-[24px] bg-[#f8fbff] p-5"
    >
      <label className="mb-3 block text-sm font-semibold text-gray-500">
        할 일 추가
      </label>

      <div className="flex gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="오늘 할 일을 입력하세요"
          className="flex-1 rounded-2xl border border-gray-200 bg-white px-4 py-4 text-sm outline-none transition focus:border-[#7ea6f7] focus:ring-4 focus:ring-blue-100"
        />

        <button className="rounded-2xl bg-blue-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-blue-600">
          추가
        </button>
      </div>
    </form>
  );
}

export default TodoForm;