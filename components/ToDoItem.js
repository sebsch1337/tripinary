import styled from "styled-components";
import Image from "next/image";
import unCheckedIcon from "../assets/unchecked.svg";
import checkedIcon from "../assets/checked.svg";
import DeleteButton from "./DeleteButton";

export default function ToDoItem({ toDo, onDeleteToDoItem, onToggleToDoItem }) {
  return (
    <ToDoListItem>
      <ToDoButton onClick={onToggleToDoItem}>
        <Image
          src={toDo.checked ? checkedIcon : unCheckedIcon}
          width={toDo.checked ? "17px" : "14px"}
          height={toDo.checked ? "17px" : "14px"}
          alt={toDo.checked ? "checked" : "unchecked"}
        />
        <Description checked={toDo.checked}>{toDo.description}</Description>
        <DeleteButton
          onClick={onDeleteToDoItem}
          ariaLabel="Delete todo"
          icon="cross"
          width="10px"
          height="10px"
          right="10%"
        />
      </ToDoButton>
    </ToDoListItem>
  );
}

const ToDoButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  font-size: 1rem;
`;

const Description = styled.p`
  margin-left: 0.4em;
  text-decoration: ${({ checked }) => (checked ? "line-through" : "none")};
  color: ${({ checked }) => (checked ? "gray" : "var(--primary-text)")};
`;

const ToDoListItem = styled.li`
  padding: 0.5em 0;
  display: flex;
  align-items: center;
`;
