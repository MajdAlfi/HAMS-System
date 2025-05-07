export const HandleRegisterLogin = (token: string) => {
  localStorage.setItem("token", token);
};
