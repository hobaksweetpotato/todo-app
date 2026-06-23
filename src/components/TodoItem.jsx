import { useState } from "react";

const REVIEW_EMOJIS = ["✅", "❤️", "🔥", "✨", "👏", "🎉", "⭐", "🌱", "⚡", "❓", "❗", "👀", "🌀", "👽", "😎"];

function TodoItem({
  todo,
  onToggleTodo,
  onDeleteTodo,
  onEditTodo,
  onEmojiChange,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleSave = () => {
    if (!editTitle.trim()) {
      alert("할 일을 입력해주세요.");
      return;
    }

    onEditTodo(todo.id, {
      title: editTitle.trim(),
    });

    setIsEditing(false);
  };

  const handleEmojiClick = (emoji) => {
    onEmojiChange(todo.id, emoji);
    setIsEmojiOpen(false);
  };

  return (
    <div className="rounded-[22px] border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md">
      {isEditing ? (
        <div className="flex gap-3">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="flex-1 rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          />

          <button
            onClick={handleSave}
            className="rounded-2xl bg-blue-500 px-4 text-sm font-semibold text-white"
          >
            저장
          </button>

          <button
            onClick={() => setIsEditing(false)}
            className="rounded-2xl bg-gray-100 px-4 text-sm font-semibold text-gray-500"
          >
            취소
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onToggleTodo(todo.id)}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
                todo.completed
                  ? "border-blue-500 bg-blue-500 text-white"
                  : "border-gray-200 text-transparent"
              }`}
            >
              ✓
            </button>

            <p
              className={`flex-1 font-semibold ${
                todo.completed
                  ? "text-gray-300 line-through"
                  : "text-gray-800"
              }`}
            >
              {todo.title}
            </p>

            <button
              onClick={() => setIsEmojiOpen(!isEmojiOpen)}
              className="rounded-full bg-blue-50 px-3 py-2 text-lg transition hover:bg-blue-100"
            >
              {todo.emoji || "＋"}
            </button>

            <button
              onClick={() => setIsEditing(true)}
              className="rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-500"
            >
              수정
            </button>

            <button
              onClick={() => onDeleteTodo(todo.id)}
              className="rounded-full bg-red-50 px-4 py-2 text-xs font-semibold text-red-500"
            >
              삭제
            </button>
          </div>

          {isEmojiOpen && (
            <div className="mt-4 flex flex-wrap gap-2 rounded-2xl bg-[#f8fbff] p-3">
              {REVIEW_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleEmojiClick(emoji)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg shadow-sm transition hover:scale-110"
                >
                  {emoji}
                </button>
              ))}

              {todo.emoji && (
                <button
                  onClick={() => handleEmojiClick("")}
                  className="rounded-full bg-gray-100 px-3 text-xs font-semibold text-gray-500"
                >
                  지우기
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TodoItem;