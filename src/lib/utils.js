"use strict";

export const filterTodos = (filter, todos) =>
  filter
    ? todos.filter(({ isComplete }) => isComplete === (filter === "completed"))
    : todos;

export function todoReducer(state, action) {
  switch (action.type) {
    case "New Item":
      return {
        ...state,
        list: state.list.concat(action.item),
      };

    case "Adding Todo":
      return {
        ...state,
        currentTodo: action.todo,
      };

    case "Remove Item":
      return {
        ...state,
        list: action.list,
      };

    case "Update Items":
      return {
        ...state,
        list: action.list,
      };

    case "Reset Current Todo":
      return {
        ...state,
        currentTodo: "",
      };

    case "Error":
      return {
        ...state,
        error: action.error,
      };

    default:
      return "Error, action not recognized";
  }
}
