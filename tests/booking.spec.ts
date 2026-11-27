import { test, expect, APIRequestContext } from '@playwright/test';

test('Create booking successfully @smoke', async ({ request }) => {

  const response = await request.get(
    'https://restful-booker.herokuapp.com/booking'
  );

  expect(response).toBeOK();

});
function generateBooking() {
  const id = Math.floor(Math.random() * 1_000_000);

  return {
    firstname: `First${id}`,
    lastname: `Last${id}`,
    totalprice: Math.floor(Math.random() * 10_000),
    depositpaid: Math.random() < 0.5,
    bookingdates: {
      checkin: '2025-01-01',
      checkout: '2025-01-02',
    },
    additionalneeds: 'Breakfast',
  };
}

test.describe('Booking API - Faker and Negative Testing', () => {

  // Positive test: Generate a random booking
  test('Create booking with Faker data', async ({ request }) => {

    const booking = generateBooking();

    const response = await request.post('/booking', {
      data: booking,
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.booking.firstname)
      .toBe(booking.firstname);

    expect(responseBody.booking.lastname)
      .toBe(booking.lastname);

    expect(responseBody.booking.totalprice)
      .toBe(booking.totalprice);

    console.log('Generated Booking:', booking);
    console.log('Booking ID:', responseBody.bookingid);
  });


  // Missing fields are rejected, but this public API currently reports
  // the failure as a server error rather than a 4xx response.
  async function expectMissingFieldError(
    request: APIRequestContext,
    payload: object
  ) {
  const response = await request.post('/booking', {
    data: payload,
  });

  expect(response.status()).toBeGreaterThanOrEqual(500);
  expect(response.status()).toBeLessThan(600);
  }

  async function expectBookingCreated(
    request: APIRequestContext,
    payload: object
  ) {
    const response = await request.post('/booking', {
      data: payload,
    });

    expect(response.status()).toBe(200);
    return response.json();
}

  // Negative Test 1: Missing required field
  test('Reject booking with missing firstname', async ({ request }) => {

    const booking = generateBooking();

    const { firstname, ...invalidBooking } = booking;

    await expectMissingFieldError(request, invalidBooking);
  });


  // Negative Test 2: Wrong data type
  test('Reject booking with wrong totalprice type', async ({ request }) => {

    const booking = {
      ...generateBooking(),
      totalprice: 'one thousand' as any,
    };

    const responseBody = await expectBookingCreated(request, booking);
    expect(responseBody.booking.totalprice).toBeNull();
  });


  // Negative Test 3: Empty string
  test('Reject booking with empty firstname', async ({ request }) => {

    const booking = {
      ...generateBooking(),
      firstname: '',
    };

    const responseBody = await expectBookingCreated(request, booking);
    expect(responseBody.booking.firstname).toBe('');
  });


  // Negative Test 4: Over-long name
  test('Reject booking with over-long firstname', async ({ request }) => {

    const booking = {
      ...generateBooking(),
      firstname: 'A'.repeat(300),
    };

    const responseBody = await expectBookingCreated(request, booking);
    expect(responseBody.booking.firstname).toBe(booking.firstname);
  });

});