import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export const Followers = () => {
  const { followers } = useContext(AuthContext);
  return (
    <div>
      {followers.map((follow: any) => {
        return (
          <ul key={follow.id}>
            <li>{follow.userName}</li>
          </ul>
        );
      })}
    </div>
  );
};
