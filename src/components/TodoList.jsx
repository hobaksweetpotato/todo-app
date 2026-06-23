import TodoItem from "./TodoItem";

function TodoList({
  todos,
  filter,
  onToggleTodo,
  onDeleteTodo,
  onEditTodo,
  onEmojiChange,
}) {
  const isDoneFilter = filter === "done";

  if (todos.length === 0) {
    return (
      <div className="rounded-[24px] border border-dashed border-blue-200 bg-blue-50/50 p-10 text-center">
        <p className="text-4xl">🫧</p>

        <p className="mt-3 font-semibold text-gray-700">
          {isDoneFilter ? "아직 완료한 일이 없어요." : "아직 할 일이 없어요."}
        </p>

        <p className="mt-1 text-sm text-gray-400">
          {isDoneFilter
            ? "지금부터 달려봐요! 파이팅!"
            : "오늘의 첫 일정을 추가해보세요."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
          onEditTodo={onEditTodo}
          onEmojiChange={onEmojiChange}
        />
      ))}
    </div>
  );
}

export default TodoList;