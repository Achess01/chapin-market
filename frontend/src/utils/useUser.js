import { useSelector } from "react-redux";

export const useUser = () => {
  // const user = useSelector((state) => state.user.user);
  const user = {
    token: "token",
    is_admin: true,
  };

  if (!user) return {};

  return user;
};
