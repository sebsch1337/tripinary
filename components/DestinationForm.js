import styled from "styled-components";
import Image from "next/image";
import addButtonCircleActive from "../assets/addButtonCircleActive.svg";

export default function DestinationForm({ onSubmitNewDestination }) {
  return (
    <ListBox>
      <FormBox onSubmit={onSubmitNewDestination}>
        <AddTripButton aria-label="submit">
          <Image src={addButtonCircleActive} alt="Add button" />
        </AddTripButton>
        <DestinationInput
          name="destination"
          aria-label="destination"
          placeholder="Add destination..."
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

const DestinationInput = styled.input`
  margin-left: 0.8em;
  width: 12em;
  height: 2em;
  filter: drop-shadow(0 0 0.3em var(--drop-shadow));
  border: 0;
  border-radius: 50px;
  padding: 0 1.1em;
  font-size: 1.1rem;
  outline: none;

  &:focus {
    filter: drop-shadow(0 0 0.6em var(--drop-shadow));
  }
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
    background-image: linear-gradient(
      90deg,
      rgba(49, 107, 255, 1) 0%,
      rgba(255, 255, 255, 1) 200%
    );
    top: 0;
    bottom: 0;
    left: 1em;
  }

  &:first-child:before {
    top: 1.2em;
  }

  &:last-child:before {
    bottom: 1.2em;
  }
`;

const AddTripButton = styled.button`
  width: 2.5em;
  height: 2.5em;
  border: 0;
  background-color: transparent;
`;
