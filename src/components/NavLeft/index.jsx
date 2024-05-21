import { Link } from "react-router-dom";
import style from "./style.module.scss";

export const NavLeft = () => {

    return (
        <nav className={style.container}>
       <Link to="/usuario" className={style.link}>
       <span>Usuários</span>
       </Link>
       <Link to="/profissional" className={style.link}>
       <span>Profissionais</span>
       </Link>
       <Link className={style.link}>
       <span>Unidades </span>
       </Link>
       <Link className={style.link}>
       <span>Consulta especializada</span>
       </Link>
       <Link className={style.link}>
       <span>Exames</span>
       </Link>
       <Link className={style.link}>
       <span>Cirugias</span>
       </Link>
       <Link to="/paciente" className={style.link}>
       <span>Pacientes</span>
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