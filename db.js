export function dummyTrips() {
  return [
    {
      id: 1,
      country: "Thailand",
    },
    {
      id: 2,
      country: "Philippines",
    },
  ];
}

export function dummyDestinations() {
  return [
    {
      id: 1,
      name: "Bangkok",
      tripId: 1,
    },
    {
      id: 2,
      name: "Cebu City",
      tripId: 2,
    },
    {
      id: 3,
      name: "Chiang Mai",
      tripId: 1,
    },
  ];
}
