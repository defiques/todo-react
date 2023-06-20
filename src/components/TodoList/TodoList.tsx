import React, {FC, memo, useEffect} from 'react';
import {ListGroup} from "react-bootstrap";
import TodoListItem from "../TodoListItem/TodoListItem";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {ITodos} from "../../models/ITodos";
import {fetchTodos} from "../../features/thunks/TodoThunk";


const TodoList:FC = () => {

    const {todos, filter, search, fetchLoading} = useAppSelector( (state => state.todoReducer) );
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
    }, [])

    if (fetchLoading) {
        return <div>Загрузка...</div>
    }

    let filteredData : ITodos[] = [];

    if (filter === 'all')
        filteredData = todos.filter( (item) => item?.label.toLowerCase().indexOf(search.toLowerCase()) > -1);

    if (filter === 'done') {
        filteredData = todos.filter( (item) => item.done)
            .filter( (item) => item.label.toLowerCase().indexOf(search.toLowerCase()) > -1);
    }

    if (filter === 'important') {
        filteredData = todos.filter( (item) => item.important)
            .filter( (item) => item.label.toLowerCase().indexOf(search.toLowerCase()) > -1);
    }

    if (filter === 'ongoing') {
        filteredData = todos.filter( (item) => !item.done)
            .filter( (item) => item.label.toLowerCase().indexOf(search.toLowerCase()) > -1);
    }

    if (todos.length === 0) {
        return <h2 className="mt-4">There is no Todos Today - Add Something</h2>
    }

    return (
        <ListGroup className="mt-4 w-100">
            {filteredData.map( (todo) =>
                <TodoListItem key={todo.id} todo={todo}/>
            )}
        </ListGroup>
    );
};

export default memo(TodoList);