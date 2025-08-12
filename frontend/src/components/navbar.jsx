import { UnauthenticatedNavbar } from "./UnauthenticatedNavbar";
import { AuthenticatedNavbar } from "./AuthenticatedNavbar";
import { useUser } from "../context/UserContext.jsx";
import { HashLoader } from "react-spinners";

export const Navbar = () => {
  const { user, loading, logout, refetch } = useUser();

  // 👉 While loading, show a placeholder with same height as navbar to avoid layout shift
  if (loading) {
    return (
     <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
        <HashLoader color="#570DF8" />
      </div>
    );
  }

  // 👉 Once loaded, show the correct navbar
  if (!user) {
    return <UnauthenticatedNavbar refetch={refetch} />;
  }

  return <AuthenticatedNavbar user={user} logout={logout} loading={loading} />;
};
