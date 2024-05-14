import { Link } from "react-router-dom";
import style from "./style.module.scss";

export const NavLeft = () => {

    return (
        <nav className={style.container}>
       <Link className={style.link}>
       <span>Usuario</span>
       </Link>
       <Link className={style.link}>
       <span>Usuario</span>
       </Link>
       <Link className={style.link}>
       <span>Usuario</span>
       </Link>
       <Link className={style.link}>
       <span>Usuario</span>
       </Link>
        </nav>
    )
};