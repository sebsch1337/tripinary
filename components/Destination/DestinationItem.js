import styled from "styled-components";
import Link from "next/link";
import DeleteButton from "../Buttons/DeleteButton";
import StatusIndicators from "./StatusIndicators";
import bulletCircle from "../../assets/bulletCircle.svg";

export default function DestinationItem({ destination, onClick, hasToDos }) {
  return (
    <ListBox bulletCircle={bulletCircle.src}>
      <BulletCircle src={bulletCircle.src} />
      <div>
        <Link href={`/details/${destination.id}`} passHref>
          <AnkorTag>
            <NameArea>{destination.name}</NameArea>
          </AnkorTag>
        </Link>
        <StartDate>{new Date(destination.startDate * 1000).toUTCString().substring(0, 11)}</StartDate>
      </div>

      <StatusIndicators hotel={destination.hotel} transport={destination.transport} hasToDos={hasToDos} />
      <DeleteButton
        onClick={onClick}
        name={destination.name}
        icon="cross"
        width="10px"
        height="10px"
        right="0"
        ariaLabel="Delete destination"
      />
    </ListBox>
  );
}

const StartDate = styled.p`
  font-size: 0.8rem;
  color: var(--drop-shadow);
`;

const AnkorTag = styled.a`
  all: unset;
  text-decoration: none;
  color: var(--text-primary);
`;

const NameArea = styled.span`
  width: 65%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ListBox = styled.li`
  padding: 0.8em 0.5em;
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
    left: 1em;
  }

  &:first-child:before {
    top: 2.2em;
  }
`;

const BulletCircle = styled.img`
  width: 1.2em;
  height: 1.2em;
  margin-right: 1em;
  z-index: 5;
`;
