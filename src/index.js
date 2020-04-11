import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import TodoApp from "./components/TodoApp";
import "./styles.css";

ReactDOM.render(
  <Router>
    <TodoApp />
  </Router>,
  document.getElementById("app")
);
