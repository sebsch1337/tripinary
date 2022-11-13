import styled from "styled-components";
import Input from "../FormElements/Input";
import AddButton from "../Buttons/AddButton";

export default function TripForm({ onSubmitNewTrip, loader }) {
  return (
    <FormBox onSubmit={onSubmitNewTrip} aria-label="add trip form" disabled={true}>
      <Input
        width="90%"
        height="2.8rem"
        fontSize="1.2rem"
        padding="0 2.8rem 0 1.2rem"
        placeholder="Country"
        aria-label="countryname"
        name="country"
        pattern="^[^-\s][a-zA-ZäÄöÖüÜß ]*$"
        disabled={loader.triggered}
        required={true}
      />
      <AddTripButton width="2rem" height="2rem" />
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
  position: relative;
`;

const AddTripButton = styled(AddButton)`
  position: absolute;
  right: 1.3rem;
`;
