import React, {FC} from 'react';
import {Button, ButtonGroup} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {todoSlice} from "../../store/reducers/TodoSlice";

const ItemFilter:FC = () => {

    const dispatch = useAppDispatch();
    const { filter } = useAppSelector(state => state.todoReducer);
    const { getFilter } = todoSlice.actions;

    return (
        <ButtonGroup>
            <Button variant={filter === 'all' ? "primary" : "outline-primary"}
                    onClick={() => dispatch(getFilter('all'))}
            >
                All
            </Button>
            <Button variant={filter === 'ongoing' ? "secondary" : "outline-secondary"}
                    onClick={() => dispatch(getFilter('ongoing'))}
            >
                Ongoing
            </Button>
            <Button variant={filter === 'done' ? "success" : "outline-success"}
                    onClick={() => dispatch(getFilter('done'))}
            >
                Done
            </Button>
            <Button variant={filter === 'important' ? "danger" : "outline-danger"}
                    onClick={() => dispatch(getFilter('important'))}
            >
                Important
            </Button>
        </ButtonGroup>
    );
};

export default ItemFilter;