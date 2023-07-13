import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import ky from "ky";
import {ITodos} from "../../models/ITodos";

const BASE_URL = "https://my-json-server.typicode.com/defiques/todo-react"

export const fetchTodos = createAsyncThunk(
    'todo/fetchTodo',
    async (_, {rejectWithValue}) => {
        try {
            return await ky.get(`${BASE_URL}/todos`).json();
        }
        catch (e) {
            return rejectWithValue("Произошла ошибка");
        }
    }
);

export const addTodo = createAsyncThunk(
    'todo/addTodo',
    async (label:string, { rejectWithValue }) => {
        try {
            return await ky.post(`${BASE_URL}/todos`, { json: { label: label, important: false, done: false } })
                .json()
        }
        catch (e) {
            return rejectWithValue("Произошла ошибка");
        }
    }
);

export const deleteTodo = createAsyncThunk(
    'todo/deleteTodo',
    async (id:number , { rejectWithValue }) => {
        try {
            await ky.delete(`${BASE_URL}/todos/${id}`)
                .json()
            return id
        }
        catch (e) {
            return rejectWithValue("Произошла ошибка");
        }
    }
);

export const setTodoImportant = createAsyncThunk(
    'todo/setTodoImportant',
    async (todo:ITodos, {rejectWithValue}) => {
        try {
            await ky.put(`${BASE_URL}/todos/${todo.id}`, {json: {...todo, important: !todo.important}}).json();
            return todo.id
        }
        catch (e) {
            rejectWithValue("Произошла ошибка")
        }

    }
);

export const setTodoDone = createAsyncThunk(
    'todo/setTodoDone',
    async (todo:ITodos, {rejectWithValue}) => {
        try {
            await ky.put(`${BASE_URL}/todos/${todo.id}`, {json: {...todo, done: !todo.done}}).json();
            return todo.id
        }
        catch (e) {
            rejectWithValue("Произошла ошибка")
        }

    }
);

export const editTodoLabel = createAsyncThunk(
    'todo/editTodoLabel',
    async ({todo, label}: {todo: ITodos, label: string}, {rejectWithValue}) => {
        try {
            await ky.put(`${BASE_URL}/todos/${todo.id}`, {json: {...todo, label: label}}).json();
            return {id: todo.id, label}
        }
        catch (e) {
            rejectWithValue("Произошла ошибка")
        }

    }
);
