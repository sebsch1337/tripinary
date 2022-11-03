import styled from "styled-components";
import Link from "next/link";
import TripCard from "./TripCard";
import TripForm from "./TripForm";

export default function TripList({ trips, onSubmitNewTrip }) {
  return (
    <TripsWrapper>
      {trips.map((trip) => (
        <Link key={trip.id} href={`/destinations/${trip.id}`} passHref>
          <a>
            <TripCard country={trip.country} />
          </a>
        </Link>
      ))}
      <TripForm onSubmitNewTrip={onSubmitNewTrip} />
    </TripsWrapper>
  );
}

const TripsWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: column;
  gap: 2em;
`;
