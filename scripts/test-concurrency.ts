const BASE_URL = "http://localhost:3000";

const SHOWTIME_ID = "cmuzgf6cm005sso7kvm9q7ry8";
const SEAT_ID = "cmuzge10o000lso7kl0thfi40";

const REQUEST_COUNT = 20;

async function createBooking(index: number) {
  const response = await fetch(`${BASE_URL}/api/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      showtimeId: SHOWTIME_ID,
      customerName: `Test User ${index}`,
      customerEmail: `test${index}@example.com`,
      seatIds: [SEAT_ID],
    }),
  });

  const data = await response.json();

  return {
    index,
    status: response.status,
    data,
  };
}


async function main() {
  console.log(
    `Sending ${REQUEST_COUNT} concurrent booking requests...`,
  );

  const results = await Promise.all(
    Array.from(
      { length: REQUEST_COUNT },
      (_, index) => createBooking(index + 1),
    ),
  );

  const success = results.filter(
    (result) => result.status === 201,
  );

  const conflicts = results.filter(
    (result) => result.status === 409,
  );

  const errors = results.filter(
    (result) =>
      result.status !== 201 &&
      result.status !== 409,
  );

  console.log("\nResults:");
  console.log(`Success:   ${success.length}`);
  console.log(`Conflict:  ${conflicts.length}`);
  console.log(`Other:     ${errors.length}`);

  console.log("\nDetails:");

  for (const result of results) {
    console.log(
  `Request ${result.index}: ${result.status}`,
  result.data,
);
  }

  if (
    success.length === 1 &&
    conflicts.length === REQUEST_COUNT - 1 &&
    errors.length === 0
  ) {
    console.log(
      "\nConcurrency test PASSED.",
    );

    process.exit(0);
  }

  console.error(
    "\nConcurrency test FAILED.",
  );

  process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});