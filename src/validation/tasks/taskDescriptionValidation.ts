export const taskDescriptionValidation = (value: string | null): boolean  => {
  if (value === null) {
    return true;
  } else if (value.length > 512 ) {
    console.log("task description validation FAILED")
    return false;
  }
  console.log("task description validation APPROVED")
  return true;
}
