import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DestinationList from "./DestinationList";

const destinations = [
  {
    id: "br43kd8i",
    name: "Bangkok",
    startDate: 1668902400,
    endDate: 1670112000,
    hotel: "Lebua State Hotel",
    transport: "Flight TG123",
    tripId: "a4e27ee3",
  },
  {
    id: "fk4t83he",
    name: "Cebu City",
    startDate: 1668902400,
    endDate: 1670112000,
    hotel: "Hilton Hotel",
    transport: "Flight PH101",
    tripId: "3ek2d0s7",
  },
  {
    id: "f93ks6bt",
    name: "Chiang Mai",
    startDate: 1670112000,
    endDate: 1671321600,
    hotel: "River Hotel",
    transport: "Train TX299",
    tripId: "a4e27ee3",
  },
];

const toDos = [
  {
    id: "lk42ktt4",
    description: "Visit Temple",
    destinationId: "br43kd8i",
  },
  {
    id: "lk4p43t4",
    description: "Go for a walk",
    destinationId: "f93ks6bt",
  },
];

describe("DestinationList", () => {
  it("renders all destination items", () => {
    render(<DestinationList destinations={destinations} tripId="a4e27ee3" toDos={toDos} />);

    expect(screen.getAllByRole("link")).toHaveLength(2);
    expect(screen.getByText("Bangkok"));
  });

  it("calls a callback when clicking delete buttton", async () => {
    const dummyCallback = jest.fn();
    render(
      <DestinationList
        destinations={destinations}
        toDos={toDos}
        onSubmitNewDestination=""
        setDeleteDestinationId={dummyCallback}
        tripId="a4e27ee3"
        toggleModal={dummyCallback}
      />
    );

    const buttons = screen.getAllByLabelText("Delete destination");
    console.log(buttons);
    await userEvent.click(buttons[0]);
    expect(dummyCallback).toHaveBeenCalledTimes(2);
  });
});
