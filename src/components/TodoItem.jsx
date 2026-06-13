import { useState } from "react";

const EMOJIS = ["✅", "📚", "💻", "🏃", "🧹", "📝", "🔥", "💙"];

function TodoItem({ todo, onToggleTodo, onDeleteTodo, onEditTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editEmoji, setEditEmoji] = useState(todo.emoji);

  const handleSave = () => {
    if (!editTitle.trim()) {
      alert("할 일을 입력해주세요.");
      return;
    }

    onEditTodo(todo.id, {
      title: editTitle,
      emoji: editEmoji,
    });

    setIsEditing(false);
  };

  return (
    <div className="rounded-[22px] border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md">
      {isEditing ? (
        <div className="flex gap-3">
          <select
            value={editEmoji}
            onChange={(e) => setEditEmoji(e.target.value)}
            className="rounded-2xl border border-gray-200 px-3 text-xl outline-none"
          >
            {EMOJIS.map((emojiItem) => (
              <option key={emojiItem}>{emojiItem}</option>
            ))}
          </select>

          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="flex-1 rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          />

          <button
            onClick={handleSave}
            className="rounded-2xl bg-blue-500 px-4 text-sm font-bold text-white"
          >
            저장
          </button>

          <button
            onClick={() => setIsEditing(false)}
            className="rounded-2xl bg-gray-100 px-4 text-sm font-bold text-gray-500"
          >
            취소
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <button
            onClick={() => onToggleTodo(todo.id)}
            className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
              todo.completed
                ? "border-blue-500 bg-blue-500 text-white"
                : "border-gray-200 text-transparent"
            }`}
          >
            ✓
          </button>

          <div className="text-2xl">{todo.emoji}</div>

          <p
            className={`flex-1 font-bold ${
              todo.completed ? "text-gray-300 line-through" : "text-gray-800"
            }`}
          >
            {todo.title}
          </p>

          <button
            onClick={() => setIsEditing(true)}
            className="rounded-full bg-gray-100 px-4 py-2 text-xs font-bold text-gray-500"
          >
            수정
          </button>

          <button
            onClick={() => onDeleteTodo(todo.id)}
            className="rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-red-500"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
}

export default TodoItem;