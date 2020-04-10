"use strict";

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
