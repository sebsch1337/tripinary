import styled from "styled-components";
import DestinationItem from "./DestinationItem";
import DestinationForm from "./DestinationForm";

export default function DestinationList({
  destinations,
  onSubmitNewDestination,
  tripId,
  toggleModal,
  toDos,
  setDeleteDestinationId,
}) {
  return (
    <DestinationWrapper>
      {destinations
        .filter((destination) => destination.tripId === tripId)
        .map((item) => (
          <DestinationItem
            key={item.id}
            destination={item}
            onClick={() => {
              setDeleteDestinationId(item.id);
              toggleModal(item.name, "destination");
            }}
            hasToDos={toDos.some((filteredToDos) => filteredToDos.destinationId === item.id)}
          />
        ))}
      <DestinationForm onSubmitNewDestination={onSubmitNewDestination} />
    </DestinationWrapper>
  );
}

const DestinationWrapper = styled.ul`
  list-style: none;
  margin: 0 1rem 5rem;
  position: relative;
`;
