import styled from "styled-components";
import Image from "next/image";
import DeleteButton from "../Buttons/DeleteButton";
import checkedIcon from "../../assets/checked.svg";
import unCheckedIcon from "../../assets/unchecked.svg";

export default function ToDoItem({ toDo, onDeleteToDoItem, onToggleToDoItem }) {
  return (
    <ToDoListItem>
      <ToDoButton aria-label={toDo.checked ? "Uncheck to-do" : "Check to-do"} onClick={onToggleToDoItem}>
        <Image
          src={toDo.checked ? checkedIcon : unCheckedIcon}
          width={toDo.checked ? "17px" : "14px"}
          height={toDo.checked ? "17px" : "14px"}
          alt=""
        />
        <Description checked={toDo.checked}>{toDo.description}</Description>
      </ToDoButton>
      <DeleteButton
        onClick={onDeleteToDoItem}
        ariaLabel="Delete todo"
        icon="cross"
        width="10px"
        height="10px"
        right="10%"
      />
    </ToDoListItem>
  );
}

const ToDoButton = styled.button`
  display: flex;
  width: 90%;
  height: 1rem;
  align-items: center;
  background-color: transparent;
  border: none;
  font-size: 1rem;
  text-align: left;
`;

const Description = styled.span`
  margin-left: 0.4rem;
  width: 95%;
  text-decoration: ${({ checked }) => (checked ? "line-through" : "none")};
  color: ${({ checked }) => (checked ? "gray" : "var(--primary-text)")};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ToDoListItem = styled.li`
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
`;
