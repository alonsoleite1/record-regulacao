import { Link } from "react-router-dom";
import style from "./style.module.scss";

export const NavLeft = () => {

    return (
        <nav className={style.container}>
       <Link className={style.link}>
       <span>Usuario</span>
       </Link>
       <Link className={style.link}>
       <span>Profissionais</span>
       </Link>
       <Link className={style.link}>
       <span>Especialidades</span>
       </Link>
       <Link className={style.link}>
       <span>Procedimentos</span>
       </Link>
       <Link className={style.link}>
       <span>Cirugias</span>
       </Link>
       <Link className={style.link}>
       <span>Criar Agenda</span>
       </Link>
       <Link className={style.link}>
       <span>Agendar</span>
       </Link>
       <Link className={style.link}>
       <span>Consultar Agenda</span>
       </Link>
       <Link className={style.link}>
       <span>Lista de Espera</span>
       </Link>
       <Link className={style.link}>
       <span>Consultar Lista de Espera</span>
       </Link>
       <Link className={style.link}>
       <span>Gerar Lista de Espera</span>
       </Link>
       <Link className={style.link}>
       <span>Dashboard</span>
       </Link>
        </nav>
        
    )
};