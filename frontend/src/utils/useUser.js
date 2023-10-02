import { useSelector } from "react-redux";

export const useUser = () => {
  const user = useSelector((state) => state.user.user);

  if (!user) return {};

  return user;
};
