import React from "react";

const TodoItem = ({ name, isComplete, id, destroy }) => (
  <li className={isComplete ? "completed" : null}>
    <div className="view">
      <input className="toggle" type="checkbox" checked={isComplete} />
      <label>{name}</label>
      <button className="destroy" onClick={() => destroy(id)} />
    </div>
  </li>
);

export default function TodoList({ todos, handleDelete }) {
  return (
    <ul className="todo-list">
      {todos.map((todo, ind) => (
        <TodoItem key={ind} {...todo} destroy={handleDelete} />
      ))}
    </ul>
  );
}
