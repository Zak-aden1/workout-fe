import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if(!context) throw Error('useAuth can only be used inside authContextProvider')

  return context
}