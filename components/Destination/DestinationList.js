import styled from "styled-components";
import DestinationItem from "./DestinationItem";
import DestinationForm from "./DestinationForm";

export default function DestinationList({
  destinations,
  onSubmitNewDestination,
  tripId,
  toggleModal,
  toDos,
}) {
  return (
    <DestinationWrapper>
      {destinations
        .filter((destination) => destination.tripId === tripId)
        .map((item) => (
          <DestinationItem
            key={item.id}
            destination={item}
            onClick={() => toggleModal(item.name, "destination", item.id)}
            hasToDos={toDos.some((filteredToDos) => filteredToDos.destinationId === item.id)}
          />
        ))}
      <DestinationForm onSubmitNewDestination={onSubmitNewDestination} />
    </DestinationWrapper>
  );
}

const DestinationWrapper = styled.ul`
  list-style: none;
  margin: 0 2em 5em;
`;
