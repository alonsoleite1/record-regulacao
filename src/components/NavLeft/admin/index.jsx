import { Link } from "react-router-dom";
import style from "./style.module.scss";

export const Admin = () => {


    return (
        <nav className={style.container}>

            <Link to="/inicio" className={style.link}>
                <span>Inicio</span>
            </Link>
            <Link to="/usuario" className={style.link}>
                <span>Usuários</span>
            </Link>
            <Link to="/profissional" className={style.link}>
                <span>Profissionais</span>
            </Link>
            <Link to="/unidade" className={style.link}>
                <span>Unidades </span>
            </Link>
            <Link to="/especialidade" className={style.link}>
                <span>Especialidades</span>
            </Link>
            <Link to="/exame" className={style.link}>
                <span>Exames e Procedimentos</span>
            </Link>
            <Link to="/cirugia" className={style.link}>
                <span>Cirurgias</span>
            </Link>
            <Link to="/paciente" className={style.link}>
                <span>Pacientes</span>
            </Link>
            <Link to="/listaDeEspera" className={style.link}>
                <span>Adicionar Espera</span>
            </Link>
            <Link to="/consultarListaDeEspera" className={style.link}>
                <span>Consultar Lista de Espera</span>
            </Link>
            <Link to="/gerarListaDeEspera" className={style.link}>
                <span>Gerar Lista de Espera</span>
            </Link>

            <Link to="/listaDeRetorno" className={style.link}>
                <span>Adicionar Retorno</span>
            </Link>
            <Link to="/consultarListaDeRetorno" className={style.link}>
                <span>Consultar Lista de Retorno</span>
            </Link>
            <Link to="/gerarListaDeRetorno" className={style.link}>
                <span>Gerar Lista de Retorno</span>
            </Link>
            <Link to="/dashboardSede" className={style.link}>
                <span>Dashboard Sede</span>
            </Link>
            <Link to="/dashboardNasf" className={style.link}>
                <span>Dashboard Nasf</span>
            </Link>

        </nav>

    )
};