import { passwordValidation } from "./passwordValidation"

test("passwordValidation function should correctly validate", () => {
  // Valid passwords

  expect(passwordValidation("SAfiwj2!wijas!")).toBe(true)

  expect(passwordValidation("N85Y&$7$^4oJ!ar")).toBe(true)

  // Invalid passwords
  expect(passwordValidation("SAfiwj2wijas")).toBe(false)
})