import styled from "styled-components";
import Image from "next/image";
import addButtonCircleActive from "../../assets/addButtonCircleActive.svg";

export default function TripForm({ onSubmitNewTrip }) {
  return (
    <FormBox onSubmit={onSubmitNewTrip} aria-label="add trip form">
      <InputWrapper>
        <CountryInput
          placeholder="Country"
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
  all: unset;
  width: 17rem;
  height: 17rem;
  border: 3px var(--drop-shadow) dashed;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

const InputWrapper = styled.span`
  position: relative;
`;

const CountryInput = styled.input`
  width: 12em;
  height: 2.5em;
  filter: drop-shadow(0 0 0.3rem var(--drop-shadow));
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
  all: unset;
  width: 2rem;
  height: 2rem;
  border: 0;
  position: absolute;
  margin-top: auto;
  margin-bottom: auto;
  right: 0.5em;
  top: 0;
  bottom: 0;
`;
