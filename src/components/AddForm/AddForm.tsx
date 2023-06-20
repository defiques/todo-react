import React, {FC, useState} from 'react';
import {Button, Form, FormControl} from "react-bootstrap";
import {FaPlus} from "react-icons/fa";
import {useAppDispatch} from "../../hooks/redux";
import {todoSlice} from "../../store/reducers/TodoSlice";
import {addTodo} from "../../features/thunks/TodoThunk";

const AddForm:FC = () => {

    const dispatch = useAppDispatch();
    const [ label, setLabel ] = useState<string>('');

    const onLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLabel(e.target.value);
    };

    const onAddItem = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(addTodo(label));
        setLabel("")
    }

    return (
        <Form className="mt-4 d-flex w-100">
            <FormControl
                placeholder="Add todo"
                value={label}
                onChange={onLabelChange}
            />
            <Button variant="success"
                    type="submit"
                    onClick={onAddItem}
            >
                <FaPlus />
            </Button>
        </Form>
    );
};

export default AddForm;