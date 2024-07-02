
import { useContext } from "react";
import { UsuarioContext } from "../../../provider/UsuarioContext";
import style from "./style.module.scss";
import { Admin } from "../admin";
import { Gerencia } from "../gerencia";
import { Operador } from "../operador";

export const NavLeft = () => {

    const { perfil } = useContext(UsuarioContext);

    return (
        <nav className={style.container}>
         {perfil === "admin" ? <Admin/> : null}
         {perfil === "gerencia" ? <Gerencia/> : null}
         {perfil === "operador" ? <Operador/> : null}
        </nav>

    )
};