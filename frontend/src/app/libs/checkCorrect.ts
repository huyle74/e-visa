export const checkPassword = (pass: string) => {
  const regex = /^(?=.*\d).{8,}$/;

  return regex.test(pass); // true or false
};
