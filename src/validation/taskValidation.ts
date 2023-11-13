export interface TaskValidation {
  [key: string]: boolean;
}
// const taskValidationTemplate: TaskValidation = {
//     "title": false,
//     "status": false,
//     "description": false,
//     // expiration-date is always true
//     "expiration-date": true,
//     "url": false,
// }

const taskValidationTemplate: TaskValidation = {
    "title": true,
    "status": true,
    "description": true,
    // expiration-date is always true
    "expiration-date": true,
    "url": true,
}
export default taskValidationTemplate;