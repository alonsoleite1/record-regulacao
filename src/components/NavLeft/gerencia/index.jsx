import { Link } from "react-router-dom";
import style from "./style.module.scss";

export const Gerencia = () => {


    return (
        <nav className={style.container}>

        <Link to="/inicio" className={style.link}>
            <span>Inicio</span>
        </Link>  
        <Link to="/paciente" className={style.link}>
            <span>Pacientes</span>
        </Link>
        <Link to="/listaDeEspera" className={style.link}>
            <span>Lista de Espera</span>
        </Link>
        <Link to="/consultarListaDeEspera" className={style.link}>
            <span>Consultar Lista de Espera</span>
        </Link>
        <Link to="/gerarListaDeEspera" className={style.link}>
            <span>Gerar Lista de Espera</span>
        </Link>
        <Link to="/dashboardEspera" className={style.link}>
            <span>Dashboard Lista de Espera</span>
        </Link>

        <Link to="/listaDeRetorno" className={style.link}>
            <span>Lista de Retorno</span>
        </Link>
        <Link to="/consultarListaDeRetorno" className={style.link}>
            <span>Consultar Lista de Retorno</span>
        </Link>
        <Link to="/gerarListaDeRetorno" className={style.link}>
            <span>Gerar Lista de Retorno</span>
        </Link>
        <Link to="/dashboardRetorno" className={style.link}>
            <span>Dashboard Lista de Retorno</span>
        </Link>

    </nav>

    )
};