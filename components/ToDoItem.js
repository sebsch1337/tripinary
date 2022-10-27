import styled from "styled-components";
import unCheckedIcon from "../assets/unchecked.svg";
import checkedIcon from "../assets/checked.svg";
import Image from "next/image";
import deleteSvg from "../assets/delete.svg";

export default function ToDoItem({ toDo }) {
  return (
    <ToDoListItem>
      <Image
        src={toDo.checked ? checkedIcon : unCheckedIcon}
        width={toDo.checked ? "17px" : "14px"}
        height={toDo.checked ? "17px" : "14px"}
        alt={toDo.checked ? "checked" : "unchecked"}
      />

      <Description htmlFor={toDo.id} checked={toDo.checked}>
        {toDo.description}
      </Description>
      <DeleteToDo>
        <Image src={deleteSvg} width="10px" height="10px" alt="Delete ToDo" />
      </DeleteToDo>
    </ToDoListItem>
  );
}

const DeleteToDo = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  justify-self: flex-end;
`;

const Description = styled.label`
  margin-left: 0.4em;
  text-decoration: ${({ checked }) => (checked ? "line-through" : "none")};
  color: ${({ checked }) => (checked ? "gray" : "var(--primary-text)")};

  &::before {
    left: 0;
    right: 0;
    background-image: url({unCheckedIcon});
  }
`;

const ToDoListItem = styled.li`
  padding: 0.5em 0;
  display: flex;
  align-items: center;
`;
