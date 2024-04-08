export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  return !re.test(email);
};
export const DEPTH = 'DEPT';
export const TVD = 'TVD';
