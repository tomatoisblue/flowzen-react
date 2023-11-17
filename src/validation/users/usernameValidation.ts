const regex = new RegExp(/^[a-zA-Z0-9_-]{4,20}$/);
export const usernameValidation = (username: string) => {
  return regex.test(username);
}