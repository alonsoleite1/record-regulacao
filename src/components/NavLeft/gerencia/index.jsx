import { Link } from "react-router-dom";
import { FaHouse,FaUsers,FaTableList } from "react-icons/fa6";
import { MdFormatListBulletedAdd,MdDashboard } from "react-icons/md";
import { TbListSearch } from "react-icons/tb";
import style from "./style.module.scss";

export const Gerencia = () => {


    return (
        <nav className={style.container}>

            <Link to="/inicio" className={style.link}>
                <span><FaHouse /> Inicio</span>
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
                <span><MdDashboard /> Dashboard Lista de Espera</span>
            </Link>
            <Link to="/dashboardNasf" className={style.link}>
                <span><MdDashboard /> Dashboard Lista de Retorno</span>
            </Link>

        </nav>

    )
};