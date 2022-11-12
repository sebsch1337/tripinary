import styled from "styled-components";
import Image from "next/image";
import addButtonCircleActive from "../../assets/addButtonCircleActive.svg";
import Input from "../FormElements/Input";

export default function TripForm({ onSubmitNewTrip }) {
  return (
    <FormBox onSubmit={onSubmitNewTrip} aria-label="add trip form">
      <InputWrapper>
        <Input
          height="2.8rem"
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
  box-sizing: border-box;
  width: 17rem;
  height: 17rem;
  border: 4px lightgray dashed;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

const InputWrapper = styled.span`
  position: relative;
`;

const AddTripButton = styled.button`
  all: unset;
  width: 2rem;
  height: 2rem;
  border: 0;
  position: absolute;
  margin-top: auto;
  margin-bottom: auto;
  right: 0.5rem;
  top: 0;
  bottom: 0;
`;
