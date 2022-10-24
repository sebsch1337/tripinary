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
      transport: "Flight TG123",
      tripId: "a4e27ee3",
      toDos: [
        { id: "dp0l3wve", description: "Poomjai Garden", checked: true },
        { id: "3ke9if74", description: "ICON Siam", checked: false },
        { id: "d83je7zg", description: "China Town", checked: false },
      ],
    },
    {
      id: "fk4t83he",
      name: "Cebu City",
      startDate: 1668902400,
      endDate: 1670112000,
      hotel: "Hilton Hotel",
      transport: "Flight PH101",
      tripId: "3ek2d0s7",
      toDos: [
        { id: "dow8gu3j", description: "Ayala Mall", checked: true },
        { id: "d8e62hgf", description: "Temple of Leah", checked: false },
      ],
    },
    {
      id: "f93ks6bt",
      name: "Chiang Mai",
      startDate: 1670112000,
      endDate: 1671321600,
      hotel: "River Hotel",
      transport: "Train TX299",
      tripId: "a4e27ee3",
      toDos: [
        { id: "d93jd7eu", description: "Old Town", checked: true },
        { id: "9wk2j43n", description: "Jungle Tour", checked: false },
      ],
    },
  ];
}
