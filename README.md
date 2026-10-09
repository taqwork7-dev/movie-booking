## Concurrency Protection

Seat booking is protected at the database level to prevent the same seat from being booked multiple times for the same showtime.

The `BookingSeat` model uses a composite unique constraint:

```prisma
@@unique([showtimeId, seatId])
```

This guarantees that the same seat can only be associated with one booking for a specific showtime.

The booking API also uses a database transaction when creating the booking and its selected seats.

If multiple requests attempt to book the same seat concurrently:

```text
20 concurrent requests
        ↓
1 request  →  201 Created
19 requests →  409 Conflict
```

The database constraint acts as the final protection against race conditions, while the API converts duplicate constraint violations into a `409 Conflict` response.

This is intentionally implemented at the database layer rather than relying only on frontend seat availability checks.

## Future Improvements

Possible production-level improvements include:

* Authentication and user accounts
* Booking history
* Payment integration
* Email booking confirmation
* Admin dashboard
* Movie and showtime management
* Redis-based caching
* Automated tests
* CI/CD pipeline
* Better connection pool and database infrastructure configuration
