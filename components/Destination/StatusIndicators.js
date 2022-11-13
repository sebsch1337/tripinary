import styled from "styled-components";
import BedIcon from "../DynamicIcons/BedIcon";
import SuitcaseIcon from "../DynamicIcons/SuitcaseIcon";
import ChecklistIcon from "../DynamicIcons/ChecklistIcon";

export default function StatusIndicators({ hotel, transport, hasToDos }) {
  return (
    <StatusSection>
      <BedIcon active={hotel} aria-label="bed icon" />
      <SuitcaseIcon active={transport} aria-label="suitcase icon" />
      <ChecklistIcon active={hasToDos} aria-label="checklist icon" />
    </StatusSection>
  );
}

const StatusSection = styled.section`
  display: flex;
  gap: 0.4rem;
  position: absolute;
  right: 10%;
`;
