import styled from "styled-components";
import Link from "next/link";
import DeleteButton from "../Buttons/DeleteButton";
import StatusIndicators from "./StatusIndicators";

export default function DestinationItem({ destination, onClick, hasToDos }) {
  return (
    <ListBox>
      <BulletCircle />
      <NameWrapper>
        <Link href={`/details/${destination.id}`} passHref>
          <AnkorTag>
            <NameArea>{destination.name}</NameArea>
          </AnkorTag>
        </Link>
        <StartDate>{new Date(destination.startDate * 1000).toUTCString().substring(0, 11)}</StartDate>
      </NameWrapper>
      <StatusIndicators hotel={destination.hotel} transport={destination.transport} hasToDos={hasToDos} />
      <DeleteButton
        onClick={onClick}
        name={destination.name}
        icon="cross"
        aria-label="Delete destination"
        right="0"
      />
    </ListBox>
  );
}

const StartDate = styled.p`
  font-size: 0.8rem;
  color: var(--drop-shadow);
`;

const NameWrapper = styled.div`
  width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AnkorTag = styled.a`
  all: unset;
  text-decoration: none;
  color: var(--text-primary);
`;

const NameArea = styled.span``;

const ListBox = styled.li`
  padding: 0.8rem 0.6rem;
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
    left: 1.2rem;
  }

  &:first-child:before {
    top: 2.2rem;
  }
`;

const BulletCircle = styled.div`
  background: var(--gradient-primary);
  border-radius: 100%;
  width: 1.4rem;
  height: 1.4rem;
  margin-right: 1rem;
  z-index: 5;
`;
