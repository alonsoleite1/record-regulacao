import { Link } from "react-router-dom";
import style from "./style.module.scss";

export const Operador = () => {


    return (
        <nav className={style.container}>
            <Link to="/paciente" className={style.link}>
                <span>Pacientes</span>
            </Link>
            <Link to="/agendaProfissional" className={style.link}>
                <span>Agenda dos profissionais</span>
            </Link>

            <Link to="/listaDeEspera" className={style.link}>
                <span>Lista de Espera</span>
            </Link>
            <Link to="/consultarListaDeEspera" className={style.link}>
                <span>Consultar Lista de Espera</span>
            </Link>
            
        </nav>

    )
};