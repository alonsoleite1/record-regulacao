import { Link } from "react-router-dom";
import style from "./style.module.scss";

export const Gerencia = () => {


    return (
        <nav className={style.container}>
            <Link to="/paciente" className={style.link}>
                <span>Pacientes</span>
            </Link>
            <Link to="/consultarListaDeEspera" className={style.link}>
                <span>Consultar Lista de Espera</span>
            </Link>
            <Link to="/dashboard" className={style.link}>
                <span>Dashboard Lista de Espera</span>
            </Link>
            
        </nav>

    )
};