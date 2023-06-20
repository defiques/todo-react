import {ITodos} from "../../models/ITodos";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    addTodo,
    deleteTodo,
    editTodoLabel,
    fetchTodos,
    setTodoDone,
    setTodoImportant
} from "../../features/thunks/TodoThunk";

interface TodoState {
    todos: ITodos[],
    filter: string,
    search: string,
    fetchLoading: boolean,
    addLoading: boolean
    error: string
}


const initialState: TodoState = {
    todos: [],
    filter: 'all',
    search: '',
    fetchLoading: false,
    addLoading: false,
    error: ''
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        getFilter(state, action: PayloadAction<string>) {
            state.filter = action.payload;
        },
        getSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
        },
        onEditSubmit(state, action: PayloadAction<{id: number, label: string}>) {
            const elemId = state.todos.findIndex(el => el.id === action.payload.id);
            state.todos[elemId].label = action.payload.label;
        }
    },
    extraReducers: {
        [fetchTodos.pending.type]: (state) => {
            state.fetchLoading = true
        },
        [fetchTodos.fulfilled.type]: (state, action: PayloadAction<ITodos[]>) => {
            state.todos = action.payload;
            state.fetchLoading = false;
        },
        [fetchTodos.rejected.type]: (state, action: PayloadAction<string>) => {
            state.todos = [];
            state.fetchLoading = false;
            state.error = action.payload
        },
        [addTodo.fulfilled.type]: (state, action: PayloadAction<ITodos>) => {
            state.todos.push(action.payload);
        },
        [deleteTodo.fulfilled.type]: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter( element => element.id !== action.payload);
        },
        [setTodoImportant.fulfilled.type]: (state, action: PayloadAction<number>) => {
            const elemId = state.todos.findIndex(element => element.id === action.payload);
            state.todos[elemId].important = !state.todos[elemId].important;
        },
        [setTodoDone.fulfilled.type]: (state, action: PayloadAction<number>) => {
            const elemId = state.todos.findIndex(element => element.id === action.payload);
            state.todos[elemId].done = !state.todos[elemId].done;
        },
        [editTodoLabel.fulfilled.type]: (state, action: PayloadAction<{ id: number, label: string }>) => {
            const elemId = state.todos.findIndex(el => el.id === action.payload.id);
            state.todos[elemId].label = action.payload.label;
        }
    }
});

export default todoSlice.reducer;