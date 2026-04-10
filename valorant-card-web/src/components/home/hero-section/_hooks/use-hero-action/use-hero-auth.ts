import { useAuthStatus } from "@/hooks/use-auth-status";
import { fetchApi } from "@/network/fetch-api";

const useHeroAuth = () => {
  const { status, refresh } = useAuthStatus();

  const logout = async () => {
    await fetchApi("/api/auth/rso/logout", { method: "POST" });
    refresh();
  };

  return {
    isAuthenticated: status?.authenticated === true,
    refresh,
    logout,
  };
};

export { useHeroAuth };
