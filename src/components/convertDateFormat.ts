export const convertDateFormat = (inputDate: Date | string | null): string => {
  console.log("########type of inputDate : " + typeof inputDate)
  if (!inputDate) {
    return ""
  }

  if (inputDate instanceof Date) {
    const year = String(inputDate.getFullYear());
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  if (typeof inputDate == "string"){
    const date = new Date(inputDate);
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  return "";
}