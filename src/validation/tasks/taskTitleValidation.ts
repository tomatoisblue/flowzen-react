
export const taskTitleValidation = (value: string): boolean  => {
  console.log("task title => " + value);
  if (value.length < 1 || value.length > 30 ) {
    console.log("task title validation FAILED")
    return false;
  }

  console.log("task title validation APPROVED")
  return true;
}
