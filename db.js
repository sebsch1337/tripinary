export function dummyTrips() {
  return [
    {
      id: "a4e27ee3",
      country: "Thailand",
    },
    {
      id: "3ek2d0s7",
      country: "Philippines",
    },
  ];
}

export function dummyDestinations() {
  return [
    {
      id: "br43kd8i",
      name: "Bangkok",
      startDate: 1668902400,
      endDate: 1670112000,
      hotel: "Lebua State Hotel",
      transport: { type: "flight", description: "TG123" },
      tripId: "a4e27ee3",
    },
    {
      id: "fk4t83he",
      name: "Cebu City",
      tripId: "3ek2d0s7",
    },
    {
      id: "f93ks6bt",
      name: "Chiang Mai",
      startDate: 1670112000,
      endDate: 1671321600,
      hotel: "River Hotel",
      transport: { type: "train", description: "TX299" },
      tripId: "a4e27ee3",
    },
    {
      id: "d82ng76e",
      name: "Koh Phayam",
      tripId: "a4e27ee3",
    },
    {
      id: "9d72ejre",
      name: "Phuket",
      tripId: "a4e27ee3",
    },
  ];
}
