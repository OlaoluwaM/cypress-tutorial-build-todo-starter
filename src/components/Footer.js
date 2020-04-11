import React from "react";
import { Link } from "react-router-dom";

export default function Footer({ remainingTodos }) {
  const text = remainingTodos > 1 ? "todos left" : "todo left";
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{remainingTodos}</strong> {text}
      </span>
      <ul className="filters">
        <li>
          <Link to="/">All</Link>
        </li>{" "}
        <li>
          <Link to="/active">Active</Link>
        </li>{" "}
        <li>
          <Link to="/completed">Completed</Link>
        </li>
      </ul>
    </footer>
  );
}
