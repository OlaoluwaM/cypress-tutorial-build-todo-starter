import React from "react";

export default function TodoForm({
  handleSubmit,
  currentTodo,
  setCurrentTodo,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={currentTodo}
        autoFocus={true}
        onChange={(e) => setCurrentTodo(e.target.value)}
        className="new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
}
