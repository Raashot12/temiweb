import { useEffect } from "react";
import {
  AuthStatus,
  logOut,
  selectAuth,
} from "@/state/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { useIdle } from "@mantine/hooks";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type ProtectedPageProps = {
  children: React.ReactNode;
};

const MAX_IDLE_TIME_BEFORE_LOG_OUT = 60000 * 60; // 1 hour

const ProtectedPage = ({ children }: ProtectedPageProps) => {
  const idle = useIdle(MAX_IDLE_TIME_BEFORE_LOG_OUT, { initialState: false });
  const dispatch = useAppDispatch();

  const auth = useAppSelector(selectAuth);
  const router = useRouter();

  useEffect(() => {
    if (idle) {
      dispatch(logOut());
      Cookies.remove("accessToken");
      router.push("/login");
    }
  }, [idle]);

  useEffect(() => {
    if (auth?.status === AuthStatus.loggedOut) {
      router.push("/login");
    }
  }, [auth, router]);

  return <>{children}</>;
};

export default ProtectedPage;
