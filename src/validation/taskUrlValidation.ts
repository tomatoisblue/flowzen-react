export const taskUrlValidation = (value: string): boolean  => {
  if (value.length > 512 ) {
    console.log("task url validation FAILED")
    return false;
  }
  console.log("task url validation APPROVED")
  return true;
}
