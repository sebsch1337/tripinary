import styled from "styled-components";
import Input from "../FormElements/Input";
import AddButton from "../Buttons/AddButton";

export default function DestinationForm({ onSubmitNewDestination }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.destination.value.trim().length === 0) return;
    onSubmitNewDestination(event.target.destination.value.trim());
    event.target.reset();
  };

  return (
    <ListBox>
      <FormBox onSubmit={handleSubmit} aria-label="add place form">
        <AddButton width="2.5rem" height="2rem" aria-label="submit place" />
        <Input
          margin="0 0 0 1rem"
          height="2.2rem"
          name="destination"
          aria-label="place"
          placeholder="Place"
          pattern="^[^-\s][a-zA-ZäÄöÖüÜß ]*$"
          required={true}
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
  padding: 0.5rem 0.3rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 5px;
    background-image: var(--gradient-horizontal);
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
