import React from "react";

const TodoItem = ({ name, isComplete, id, destroy, update }) => (
  <li className={isComplete ? "completed" : null}>
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        checked={isComplete}
        onChange={() => update(id)}
      />
      <label>{name}</label>
      <button className="destroy" onClick={() => destroy(id)} />
    </div>
  </li>
);

export default function TodoList({ todos, handleDelete, handleToggle }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          destroy={handleDelete}
          update={handleToggle}
        />
      ))}
    </ul>
  );
}
