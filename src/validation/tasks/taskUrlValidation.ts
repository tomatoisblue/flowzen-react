export const taskUrlValidation = (value: string | null): boolean  => {
  if (value === null) {
    return true;
  } else if (value.length > 512 ) {
    console.log("task url validation FAILED")
    return false;
  }
  console.log("task url validation APPROVED")
  return true;
}
