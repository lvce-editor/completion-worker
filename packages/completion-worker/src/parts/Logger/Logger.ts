export const error = (message: any): void => {
  // TODO send this to error worker for logging
  // @ts-ignore
  console.error(message)
}
