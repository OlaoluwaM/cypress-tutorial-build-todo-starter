"use strict";
import axios from "axios";

const ENDPOINT = "http://localhost:3030/api/todos";

export const saveTodo = (todo) => axios.post(ENDPOINT, todo);

export const loadTodos = () => axios.get(ENDPOINT);

export const destroyTodo = (id) => axios.delete(`${ENDPOINT}/${id}`);
