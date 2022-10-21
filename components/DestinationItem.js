import bulletCircle from "../assets/bulletCircle.svg";
import styled from "styled-components";
import Link from "next/link";

export default function DestinationItem({ id, name }) {
  return (
    <ListBox bulletCircle={bulletCircle.src}>
      <BulletCircle src={bulletCircle.src} />
      <Link href={`/details/${id}`} passHref>
        <NameArea>{name}</NameArea>
      </Link>
    </ListBox>
  );
}

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
    background-image: linear-gradient(
      90deg,
      rgba(49, 107, 255, 1) 0%,
      rgba(255, 255, 255, 1) 200%
    );
    top: 0;
    bottom: 0;
    left: 1em;
  }

  &:first-child:before {
    top: 1.2em;
  }

  &:last-child:before {
    bottom: 1.2em;
  }
`;

const BulletCircle = styled.img`
  width: 1.2em;
  height: 1.2em;
  margin-right: 1em;
  z-index: 5;
`;
