import styled from "styled-components";
import unCheckedIcon from "../assets/unchecked.svg";
import checkedIcon from "../assets/checked.svg";
import Image from "next/image";
import deleteSvg from "../assets/delete.svg";

export default function ToDoItem({ toDo, onDeleteToDoItem }) {
  return (
    <ToDoListItem>
      <Image
        src={toDo.checked ? checkedIcon : unCheckedIcon}
        width={toDo.checked ? "17px" : "14px"}
        height={toDo.checked ? "17px" : "14px"}
        alt={toDo.checked ? "checked" : "unchecked"}
      />

      <Description checked={toDo.checked}>{toDo.description}</Description>
      <DeleteToDo onClick={onDeleteToDoItem} aria-label="Delete todo">
        <Image src={deleteSvg} width="10px" height="10px" alt="Delete todo icon" />
      </DeleteToDo>
    </ToDoListItem>
  );
}

const DeleteToDo = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  position: absolute;
  right: 10%;
`;

const Description = styled.label`
  margin-left: 0.4em;
  text-decoration: ${({ checked }) => (checked ? "line-through" : "none")};
  color: ${({ checked }) => (checked ? "gray" : "var(--primary-text)")};
`;

const ToDoListItem = styled.li`
  padding: 0.5em 0;
  display: flex;
  align-items: center;
`;
