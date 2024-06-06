import { useContext } from "react";
import logo from "../../assets/logo.png";
import style from "./style.module.scss";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdHomeWork } from "react-icons/md";
import { UsuarioContext } from "../../provider/UsuarioContext";


export const Header = () => {

    const { nome, unidade, logout } = useContext(UsuarioContext);


    return (
        <header className={style.header}>
            <div className={style.container}>
                <div>
                    <img className={style.img} src={logo} alt="logo-pacatuba" />
                </div>
                <div className={style.info_box}>
                    <span className={style.span_box}>
                        <FaRegCircleUser /><p>{nome}</p>
                    </span>
                    <span className={style.span_box}>
                        <MdHomeWork /><p>{unidade}</p>
                    </span>
                    <button className={style.button} onClick={logout}>Sair</button>
                </div>
            </div>
        </header>
    )
};