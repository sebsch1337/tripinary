import styled from "styled-components";
import Image from "next/image";
import addButtonCircleActive from "../../assets/addButtonCircleActive.svg";
import Input from "../FormElements/Input";

export default function DestinationForm({ onSubmitNewDestination }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.destination.value.trim().length === 0) return;
    onSubmitNewDestination(event.target.destination.value.trim());
    event.target.reset();
  };

  return (
    <ListBox>
      <FormBox onSubmit={handleSubmit} aria-label="add destination form">
        <AddTripButton aria-label="add">
          <Image src={addButtonCircleActive} alt="" />
        </AddTripButton>
        <Input
          margin="0 0 0 1rem"
          height="2.2rem"
          name="destination"
          aria-label="destination"
          placeholder="Place"
          autoComplete="off"
          required
        />
      </FormBox>
    </ListBox>
  );
}

const FormBox = styled.form`
  display: flex;
  align-items: center;
  position: relative;
`;

const ListBox = styled.li`
  padding: 0.5em 0.25em;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 5px;
    background-image: linear-gradient(90deg, rgba(49, 107, 255, 1) 0%, rgba(255, 255, 255, 1) 200%);
    top: 0;
    bottom: 0;
    left: 1em;
  }

  &:first-child:before {
    top: 1.2rem;
  }

  &:last-child:before {
    bottom: 1.2rem;
  }
`;

const AddTripButton = styled.button`
  width: 2.5rem;
  height: 2rem;
  border: 0;
  background-color: transparent;
`;
