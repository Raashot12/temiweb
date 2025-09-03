import Cookies from "js-cookie";
import { logOut } from "@/state/features/auth/authSlice";
import { useAppDispatch } from "@/state/hooks";

const useLogOut = () => {
  const dispatch = useAppDispatch();

  const logout = () => {
    Cookies.remove("accessToken");
    dispatch(logOut());
  };

  return logout;
};

export default useLogOut;
