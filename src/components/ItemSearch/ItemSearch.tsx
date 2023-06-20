import React, {ChangeEvent, FC, useState} from 'react';
import {FormControl, InputGroup} from "react-bootstrap";
import {useAppDispatch} from "../../hooks/redux";
import {todoSlice} from "../../store/reducers/TodoSlice";

const ItemSearch:FC = () => {

    const [label, setLabel] = useState<string>('');

    const { getSearch } = todoSlice.actions;

    const dispatch = useAppDispatch();

    const onSearch = (e:ChangeEvent<HTMLInputElement>) => {
        setLabel(e.target.value);
        dispatch(getSearch(e.target.value));
    }

    return (
        <InputGroup className="me-3">
            <FormControl
                placeholder="Search for todos"
                value={label}
                onChange={onSearch}
            />
        </InputGroup>
    );
};

export default ItemSearch;