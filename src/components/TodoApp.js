import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Footer from "./Footer";
import { saveTodo, loadTodos } from "../lib/service";
import { todoReducer } from "../lib/utils";

export default function TodoApp() {
  const [todos, dispatch] = React.useReducer(todoReducer, {
    list: [],
    currentTodo: "",
    error: false,
  });
  const { list, currentTodo, error } = todos;

  React.useEffect(() => {
    (async () => {
      try {
        const response = await loadTodos();
        console.log(response);
        const { data } = response;
        dispatch({ type: "New Item", item: data });
      } catch (error) {
        console.error(error);
        dispatch({ type: "Error", error: true });
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const newTodo = { name: currentTodo, isComplete: false };
      const response = await saveTodo(newTodo);
      const { data } = response;
      dispatch({ type: "New Item", item: data });
      dispatch({ type: "Reset Current Todo" });
    } catch (error) {
      console.error(error);
      dispatch({ type: "Error", error: true });
    }
  };

  const setCurrentTodo = (itm) => {
    dispatch({ type: "Adding Todo", todo: itm });
  };

  return (
    <Router>
      <div>
        <header className="header">
          <h1>Todos</h1>
          {error && <span className="error">Oh no!</span>}
          <TodoForm
            handleSubmit={handleSubmit}
            setCurrentTodo={setCurrentTodo}
            currentTodo={currentTodo}
          />
        </header>
        <section className="main">
          <TodoList todos={list} />
        </section>
        <Footer />
      </div>
    </Router>
  );
}
