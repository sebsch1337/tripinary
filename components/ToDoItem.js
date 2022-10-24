import styled from "styled-components";
import unCheckedIcon from "../assets/unchecked.svg";
import checkedIcon from "../assets/checked.svg";
import Image from "next/image";

export default function ToDoItem({ toDo }) {
  return (
    <ToDoListItem>
      <CheckBox id={toDo.id} />
      <Image
        src={toDo.checked ? checkedIcon : unCheckedIcon}
        width="18px"
        height="18px"
        alt={toDo.checked ? "checked" : "unchecked"}
      />
      <Description for={toDo.id} checked={toDo.checked}>
        {toDo.description}
      </Description>
    </ToDoListItem>
  );
}

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

const CheckBox = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;
