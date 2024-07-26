import { Link } from "react-router-dom";
import style from "./style.module.scss";

export const Admin = () => {


    return (
        <nav className={style.container}>
            
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
                <span>Especialista</span>
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
            <Link to="/criarAgenda" className={style.link}>
                <span>Criar Agenda</span>
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
            <Link to="/gerarListaDeEspera" className={style.link}>
                <span>Gerar Lista de Espera</span>
            </Link>
            <Link to="/dashboard" className={style.link}>
                <span>Dashboard Lista de Espera</span>
            </Link>
            <Link to="/dashboardRealizada" className={style.link}>
                <span>Dashboard Realizadas</span>
            </Link>
        </nav>

    )
};