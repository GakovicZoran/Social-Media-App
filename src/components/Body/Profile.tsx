import { useContext } from "react";
import { AuthContext } from "../../App";

export const Profile = () => {
  const { user } = useContext(AuthContext);

  return <div>PROFILE</div>;
};
