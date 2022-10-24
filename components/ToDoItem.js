import styled from "styled-components";
import unCheckedIcon from "../assets/unchecked.svg";
import Image from "next/image";

export default function ToDoItem({ toDo }) {
  return (
    <ToDoListItem>
      <CheckBox id={toDo.id} />
      <Image src={unCheckedIcon} width="18px" height="18px" alt="unchecked" />
      <Description for={toDo.id}>{toDo.description}</Description>
    </ToDoListItem>
  );
}

const Description = styled.label`
  margin-left: 0.2em;
`;

const ToDoListItem = styled.li`
  padding: 0.5em 0;
  display: flex;
  align-items: center;
`;

const CheckBox = styled.input.attrs({ type: "checkbox" })`
  /* width: 1em;
  height: 1em;
  -webkit-appearance: none; */
  display: none;
  background-image: url("../assets/unchecked.svg");
`;
