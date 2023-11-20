export const boardTitleValidation = (title: string): boolean => {
  if (title.length < 1 || title.length > 30) {
    return false;
  }
  return true;
}
