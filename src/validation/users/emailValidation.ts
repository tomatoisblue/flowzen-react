// const regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const regex = new RegExp(/^[a-z0-9#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/);

export const emailValidation = (value: string): boolean => {
  console.log("email validation => " + regex.test(value))
  return regex.test(value);
}
