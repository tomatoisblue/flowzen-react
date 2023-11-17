export const passwordMatchValidation = (password: string, confirmPassword: string): boolean => {
  if (password !== confirmPassword) {
    return false
  }
  return true
}