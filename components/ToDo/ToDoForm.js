import styled from "styled-components";
import Image from "next/image";
import addButtonCircleActive from "../../assets/addButtonCircleActive.svg";

export default function ToDoForm({ onSubmitNewToDoItem }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.todo.value.trim().length === 0) return;
    onSubmitNewToDoItem(event.target.todo.value.trim());
    event.target.reset();
  };

  return (
    <ToDoListForm onSubmit={handleSubmit} aria-label="add todo form">
      <AddToDoButton aria-label="add todo">
        <Image src={addButtonCircleActive} width="25px" height="25px" alt="Add icon" />
      </AddToDoButton>
      <ToDoInput
        name="todo"
        type="text"
        aria-label="todo"
        placeholder="Activity"
        autoComplete="off"
        required
      />
    </ToDoListForm>
  );
}

const ToDoInput = styled.input`
  margin-left: 0.8rem;
  width: 90%;
  height: 1.8rem;
  filter: drop-shadow(0 0 0.2rem var(--drop-shadow));
  transition: all ease-in-out 200ms;
  border: none;
  border-radius: 1rem;
  padding: 0 0.9rem;
  font-size: 1rem;
  outline: none;

  &:focus {
    filter: drop-shadow(0 0 0.4rem var(--drop-shadow));
  }
`;

const AddToDoButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;
`;

const ToDoListForm = styled.form`
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
`;
