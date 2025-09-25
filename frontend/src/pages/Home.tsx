import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();
  return <Navigate replace={false} to={`/${user.username}`} />;
};

export default Home;
