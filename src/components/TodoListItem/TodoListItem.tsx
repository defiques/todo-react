import React, {FC, memo, useRef, useState} from 'react';
import {Button, ButtonGroup, Form, FormControl, ListGroupItem} from "react-bootstrap";
import {FaCheck, FaExclamation, FaTrashAlt} from "react-icons/fa";
import {ITodos} from "../../models/ITodos";
import {useAppDispatch} from "../../hooks/redux";
import {todoSlice} from "../../store/reducers/TodoSlice";
import {useOnClickOutside} from "../../hooks/useOutsideClick";
import {deleteTodo, editTodoLabel, setTodoDone, setTodoImportant} from "../../features/thunks/TodoThunk";

interface TodoListProps {
    todo: ITodos
}

const TodoListItem:FC<TodoListProps> = ({ todo }: TodoListProps) => {

    const {id, label, done, important} = todo;
    const [edit, setEdit] = useState<boolean>(false);
    const [value, setValue] = useState<string>(label);
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLInputElement>(null);
    useOnClickOutside(ref, () => {
        setValue(value);
        dispatch(editTodoLabel({todo, label: value}))
        setEdit(false);
    });

    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const onFormSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!value || value.length < 3) {
            alert('Type in Todo');
            return
        }
        dispatch(editTodoLabel({todo, label: value}))
        setEdit(false);
    }

    let className = "";

    if (done) {
        className += " text-decoration-line-through"
    }

    if (important) {
        className += " fw-bold text-info-emphasis"
    }

    return (
        <>
            <ListGroupItem className="d-flex justify-content-between align-items-center">
                    <div
                        className="w-75 h-100 d-flex align-items-center"
                    >
                        {edit
                            ?
                            <Form
                                onSubmit={onFormSubmit}
                            >
                                <FormControl
                                    value={value}
                                    onChange={onValueChange}
                                    type="text"
                                    ref={ref}
                                />
                            </Form>
                            :
                            <span
                                className={className}
                                onClick={() => setEdit(true)}
                            >
                        {label}
                    </span>
                        }
                    </div>
                <ButtonGroup>
                    <Button variant="outline-success"
                            onClick={(e) => {
                                e.stopPropagation()
                                dispatch(setTodoDone(todo))}}
                    >
                        <FaCheck />
                    </Button>
                    <Button variant="outline-warning"
                            onClick={(e) => {
                                e.stopPropagation();
                                dispatch(setTodoImportant(todo))}}
                    >
                        <FaExclamation />
                    </Button>
                    <Button variant="outline-danger"
                            onClick={(e) => {
                                e.stopPropagation();
                                dispatch(deleteTodo(id))}}>
                        <FaTrashAlt />
                    </Button>
                </ButtonGroup>
            </ListGroupItem>
        </>
    );
};

export default memo(TodoListItem);