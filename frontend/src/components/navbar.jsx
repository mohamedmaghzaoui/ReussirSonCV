import { UnauthenticatedNavbar } from './UnauthenticatedNavbar';
import { AuthenticatedNavbar } from './AuthenticatedNavbar';
import { useUser } from "../context/UserContext.jsx";

export const Navbar = () => {
  const { user, loading, logout, refetch } = useUser();

  // 👉 While loading, show a placeholder with same height as navbar to avoid layout shift
  if (loading) {
    return (
      <div style={{ height: '70px' }} className="w-full shadow-sm bg-base-100" />
    );
  }

  // 👉 Once loaded, show the correct navbar
  if (!user) {
    return <UnauthenticatedNavbar refetch={refetch} />;
  }

  return <AuthenticatedNavbar user={user} logout={logout} loading={loading} />;
};
