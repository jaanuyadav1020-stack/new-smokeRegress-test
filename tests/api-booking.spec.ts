
import { test, expect } from '@playwright/test';

test('Create and Get Booking API', async ({ request }) => {

  // 1. CREATE BOOKING - POST request
  const createResponse = await request.post(
    'https://restful-booker.herokuapp.com/booking',
    {
      data: {
        firstname: 'Jaan',
        lastname: 'yadav',
        totalprice: 1500,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-12-01',
          checkout: '2026-12-05'
        },
        additionalneeds: 'Breakfast'
      }
    }
  );

  // Check POST response status
  await expect(createResponse).toBeOK();

  // Read POST response JSON
  const createData = await createResponse.json();

  // Validate response fields
  expect(createData.bookingid).toBeTruthy();
  expect(createData.booking.firstname).toBe('Jaan');
  expect(createData.booking.lastname).toBe('yadav');

  // Save booking ID
  const bookingId = createData.bookingid;

  console.log('Created Booking ID:', bookingId);

  // 2. GET BOOKING - GET request
  const getResponse = await request.get(
    `https://restful-booker.herokuapp.com/booking/${bookingId}`
  );

  // Check GET response status
  await expect(getResponse).toBeOK();

  // Read GET response JSON
  const getData = await getResponse.json();

  // Validate retrieved booking fields
  expect(getData.firstname).toBe('Jaan');
  expect(getData.lastname).toBe('yadav');
  expect(getData.totalprice).toBe(1500);

  console.log('Retrieved Booking:', getData);
});
