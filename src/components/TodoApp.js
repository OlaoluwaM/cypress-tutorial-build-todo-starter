import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Footer from "./Footer";
import { todoReducer, filterTodos } from "../lib/utils";
import { saveTodo, loadTodos, destroyTodo, updateTodo } from "../lib/service";

export default function TodoApp() {
  const [todos, dispatch] = React.useReducer(todoReducer, {
    list: [],
    currentTodo: "",
    error: false,
  });
  const { list, currentTodo, error } = todos;
  const match = useRouteMatch;
  console.log(match);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await loadTodos();
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

  const handleDelete = async (id) => {
    await destroyTodo(id);
    const newList = list.filter(({ id: itmId }) => itmId !== id);
    dispatch({ type: "Remove Item", list: newList });
  };

  const handleToggle = async (id) => {
    const targetTodo = list.find(({ id: itmId }) => itmId === id);
    const updatedTodo = { ...targetTodo, isComplete: !targetTodo.isComplete };
    const response = await updateTodo(updatedTodo);
    const { data } = response;
    const newList = list.map((t) => (t.id === data.id ? data : t));
    dispatch({ type: "Update Items", list: newList });
  };

  const setCurrentTodo = (itm) => {
    dispatch({ type: "Adding Todo", todo: itm });
  };

  const remainingItems = list.filter((t) => !t.isComplete).length;
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
          <Route
            path="/:filter?"
            render={({ match }) => (
              <TodoList
                todos={filterTodos(match.params.filter, list)}
                handleDelete={handleDelete}
                handleToggle={handleToggle}
              />
            )}
          />
        </section>
        <Footer remainingTodos={remainingItems} />
      </div>
    </Router>
  );
}
