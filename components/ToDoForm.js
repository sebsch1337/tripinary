import styled from "styled-components";
import Image from "next/image";
import addButtonCircleActive from "../assets/addButtonCircleActive.svg";

export default function ToDoForm() {
  return (
    <ToDoListForm aria-label="add todo form">
      <AddToDoButton aria-label="submit">
        <Image src={addButtonCircleActive} width="20x" height="20px" alt="Add icon" />
      </AddToDoButton>
      <ToDoInput
        name="todo"
        aria-label="todo"
        placeholder="Add To-Do..."
        autoComplete="off"
        required
      />
    </ToDoListForm>
  );
}

const ToDoInput = styled.input`
  margin-left: 0.8em;
  width: 90%;
  height: 1.8em;
  filter: drop-shadow(0 0 0.3em var(--drop-shadow));
  transition: all ease-in-out 200ms;
  border: 0;
  border-radius: 50px;
  padding: 0 1.1em;
  font-size: 1rem;
  outline: none;

  &:focus {
    filter: drop-shadow(0 0 0.6em var(--drop-shadow));
  }
`;

const AddToDoButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
`;

const ToDoListForm = styled.form`
  padding: 0.5em 0;
  display: flex;
  align-items: center;
`;
