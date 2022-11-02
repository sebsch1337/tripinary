import styled from "styled-components";
import Image from "next/image";
import addButtonCircleActive from "../../assets/addButtonCircleActive.svg";

export default function TripForm({ onSubmitNewTrip }) {
  return (
    <FormBox onSubmit={onSubmitNewTrip} aria-label="add trip form">
      <InputWrapper>
        <CountryInput
          placeholder="Add trip..."
          aria-label="countryname"
          name="country"
          autoComplete="off"
          required
        />
        <AddTripButton aria-label="submit">
          <Image src={addButtonCircleActive} alt="Add icon" />
        </AddTripButton>
      </InputWrapper>
    </FormBox>
  );
}

const FormBox = styled.form`
  width: 17em;
  height: 17em;
  border: 3px var(--drop-shadow) dashed;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputWrapper = styled.span`
  position: relative;
`;

const CountryInput = styled.input`
  width: 12em;
  height: 2.5em;
  filter: drop-shadow(0 0 0.3em var(--drop-shadow));
  transition: all ease-in-out 200ms;
  border: 0;
  border-radius: 50px;
  padding-left: 1.1em;
  padding-right: 2.3em;
  font-size: 1.2rem;
  outline: none;

  &:focus {
    filter: drop-shadow(0 0 0.6em var(--drop-shadow));
  }
`;

const AddTripButton = styled.button`
  width: 2.5em;
  height: 2.5em;
  border: 0;
  background-color: transparent;
  position: absolute;
  margin-top: auto;
  margin-bottom: auto;
  right: 0.5em;
  top: 0;
  bottom: 0;
`;