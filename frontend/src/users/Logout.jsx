import { useDispatch } from "react-redux";
import { logOut } from "../store/user";
import { useNavigate } from "react-router";

export const LogOutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(logOut());
    navigate('/login');
  };
  return (
    <button onClick={onClick} className="nav-item btn bi bi-power text-white" />
  );
};
