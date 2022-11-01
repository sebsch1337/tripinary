export default function BedIcon({ active }) {
  return (
    <svg width={20} height={13} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.2 6.933c1.439 0 2.6-1.161 2.6-2.6 0-1.438-1.161-2.6-2.6-2.6a2.597 2.597 0 0 0-2.6 2.6c0 1.439 1.161 2.6 2.6 2.6Zm10.4-5.2H8.667V7.8H1.733V0H0v13h1.733v-2.6h15.6V13h1.734V5.2A3.466 3.466 0 0 0 15.6 1.733Z"
        fill={active ? "#121212" : "#8e94a3"}
      />
    </svg>
  );
}
