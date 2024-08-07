import { Link } from "react-router-dom";
import style from "./style.module.scss";
import { FaHouse,FaUsers,FaTableList } from "react-icons/fa6";
import { FaUser,FaUserMd,FaHospital,FaList } from "react-icons/fa";
import { MdFormatListBulletedAdd,MdDashboard } from "react-icons/md";
import { TbListSearch } from "react-icons/tb";

export const Admin = () => {


    return (
        <nav className={style.container}>

            <Link to="/inicio" className={style.link}>
                <span><FaHouse /> Inicio</span>
            </Link>
            <Link to="/usuario" className={style.link}>
                <span><FaUser /> Usuários</span>
            </Link>
            <Link to="/profissional" className={style.link}>
                <span><FaUserMd /> Profissionais</span>
            </Link>
            <Link to="/unidade" className={style.link}>
                <span><FaHospital /> Unidades </span>
            </Link>
            <Link to="/especialidade" className={style.link}>
                <span><FaList /> Especialidades</span>
            </Link>
            <Link to="/exame" className={style.link}>
                <span><FaList /> Exames e Procedimentos</span>
            </Link>
            <Link to="/cirugia" className={style.link}>
                <span><FaList /> Cirurgias</span>
            </Link>
            <Link to="/paciente" className={style.link}>
                <span><FaUsers /> Pacientes</span>
            </Link>
            <Link to="/listaDeEspera" className={style.link}>
                <span><MdFormatListBulletedAdd /> Adicionar Espera</span>
            </Link>
            <Link to="/consultarListaDeEspera" className={style.link}>
                <span><TbListSearch /> Consultar Lista de Espera</span>
            </Link>
            <Link to="/gerarListaDeEspera" className={style.link}>
                <span><FaTableList /> Gerar Lista de Espera</span>
            </Link>

            <Link to="/listaDeRetorno" className={style.link}>
                <span><MdFormatListBulletedAdd /> Adicionar Retorno</span>
            </Link>
            <Link to="/consultarListaDeRetorno" className={style.link}>
                <span><TbListSearch /> Consultar Lista de Retorno</span>
            </Link>
            <Link to="/gerarListaDeRetorno" className={style.link}>
                <span><FaTableList /> Gerar Lista de Retorno</span>
            </Link>
            <Link to="/dashboardSede" className={style.link}>
                <span><MdDashboard /> Dashboard Sede</span>
            </Link>
            <Link to="/dashboardNasf" className={style.link}>
                <span><MdDashboard /> Dashboard Nasf</span>
            </Link>

        </nav>

    )
};