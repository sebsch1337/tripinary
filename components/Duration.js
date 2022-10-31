import styled from "styled-components";

export default function Duration({ title, number, type }) {
  return (
    <DurationSection>
      <DurationTitle>{title}</DurationTitle>
      <DurationText>
        {number} {type}
        {number !== 1 && "s"}
      </DurationText>
    </DurationSection>
  );
}

const DurationSection = styled.section``;

const DurationTitle = styled.h4`
  font-size: 0.8rem;
  color: var(--drop-shadow);
`;

const DurationText = styled.p`
  font-size: 0.9rem;
`;
