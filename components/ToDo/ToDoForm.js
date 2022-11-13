import styled from "styled-components";
import Input from "../FormElements/Input";
import AddButton from "../Buttons/AddButton";

export default function ToDoForm({ onSubmitNewToDoItem }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.todo.value.trim().length === 0) return;
    onSubmitNewToDoItem(event.target.todo.value.trim());
    event.target.reset();
  };

  return (
    <ToDoListForm onSubmit={handleSubmit} aria-label="add todo form">
      <AddButton height="1.5rem" width="1.5rem" iconSize="1rem" aria-label="submit todo" />
      <Input
        margin="0 0 0 0.8rem"
        height="1.8rem"
        width="85%"
        name="todo"
        aria-label="todo"
        placeholder="Activity"
        required={true}
      />
    </ToDoListForm>
  );
}

const ToDoListForm = styled.form`
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
`;
