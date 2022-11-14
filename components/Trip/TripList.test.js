import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TripList from "./TripList";

const trips = [
  {
    id: "a4e27ee3",
    country: "Thailand",
  },
  {
    id: "3ek2d0s7",
    country: "Philippines",
  },
];

const loader = { triggered: false, show: false };

describe("TripList", () => {
  it("renders all trip items", () => {
    const dummyCallback = jest.fn();
    render(<TripList trips={trips} onSubmitNewTrip={dummyCallback} loader={loader} />);

    expect(screen.getAllByRole("link")).toHaveLength(2);
    expect(screen.getByText("Philippines"));
  });

  it("adds a new text to textinput", async () => {
    const dummyCallback = jest.fn();
    render(<TripList trips={trips} onSubmitNewTrip={dummyCallback} loader={loader} />);
    const input = screen.getAllByLabelText("countryname");
    await userEvent.type(input[0], "HelloWorld");
    expect(input[0]).toHaveValue("HelloWorld");
  });
});
