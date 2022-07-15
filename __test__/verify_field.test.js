const { fields_ok, verify_field_email, verify_field_name } = require('../verify_field')

describe("Testing the verify_field service with bad data...", () => {
  // Testing the email
  test('test@gmail.com is a good email', () => {
    expect(verify_field_email("test@gmail.com")).toBe(true);
  });
  test('test@mail is a bad email', () => {
    expect(verify_field_email("test@mail")).toBe(false);
  });

  // Testing the firstname
  test('Thor is a good firstname', () => {
    expect(verify_field_name("Thor")).toBe(true);
  });
  test('Thor 666 is a bad firstname', () => {
    expect(verify_field_name("Thor 666")).toBe(false);
  });

  // Testing the lastname
  test('Ragnarson is a good lastname', () => {
    expect(verify_field_name("Ragnarson")).toBe(true);
  });
  test('Ragnarson 666 is a bad lastname', () => {
    expect(verify_field_name("Ragnarson 666")).toBe(false);
  });


})

