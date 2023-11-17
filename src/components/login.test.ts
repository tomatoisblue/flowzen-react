import { LoginProps, login } from "./login";

test.skip("login function test", async() => {
  const email = "moto@gmail.com";
  const password = "SAfiwj2!wijas!"

  const correct: LoginProps = {
    email: email,
    password: password
  }

  const incorrect: LoginProps = {
    email: email,
    password: password+"a"
  }


  const correctResult = await login(correct);
  expect(correctResult).toBe(true);
  const incorrectResult = await login(incorrect);
  expect(incorrectResult).toBe(false);

})