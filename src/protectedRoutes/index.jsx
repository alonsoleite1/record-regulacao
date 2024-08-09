import { useContext } from "react";
import { UsuarioContext } from "../provider/UsuarioContext";
import { Navigate, Outlet } from "react-router-dom";


export const ProtectedRoutes = () => {
   const {user} = useContext(UsuarioContext);

   return user ? <Outlet/> : <Navigate to=""/>
  };