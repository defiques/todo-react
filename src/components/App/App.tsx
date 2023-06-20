import React, {FC} from 'react';
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemSearch from "../ItemSearch/ItemSearch";
import ItemFilter from "../ItemFilter/ItemFilter";
import TodoList from "../TodoList/TodoList";
import AddForm from "../AddForm/AddForm";

const App: FC = () => {
    return (
        <Wrapper>
            <Container>
                <Title>My Todo List</Title>
                <div className="d-flex flex-row w-100">
                    <ItemSearch />
                    <ItemFilter />
                </div>
                <TodoList />
                <AddForm />
            </Container>
        </Wrapper>
    );
};


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  font-family: 'Roboto', sans-serif;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 600px;
  margin: auto;
  border: 1px solid gray;
  padding: 20px;
  border-radius: 10px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-weight: 700;
`;



export default App;