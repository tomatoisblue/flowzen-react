export const taskDescriptionValidation = (value: string): boolean  => {
  if (value.length > 512 ) {
    console.log("task description validation FAILED")
    return false;
  }
  console.log("task description validation APPROVED")
  return true;
}
