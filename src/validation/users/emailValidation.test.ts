import { emailValidation } from "./emailValidation";

test("emailValidation function should correctly validate emails", () => {
  // Valid email
  expect(emailValidation("test@example.com")).toBeTruthy();

  // Valid email with subdomain
  expect(emailValidation("test@sub.example.com")).toBeTruthy();

  // Invalid email with missing "@"
  expect(emailValidation("testexample.com")).toBeFalsy();

  // Invalid email with leading dot
  expect(emailValidation(".test@example.com")).toBeFalsy();

  // Invalid email with trailing dot
  expect(emailValidation("test.@example.com")).toBeFalsy();

  // Invalid email with consecutive dots
  expect(emailValidation("test..example@example.com")).toBeFalsy();

  // Invalid email with invalid characters
  expect(emailValidation("test!@example.com")).toBeFalsy();

  // Invalid email with spaces
  expect(emailValidation("test @example.com")).toBeFalsy();

  // Empty string
  expect(emailValidation("")).toBeFalsy();
});
