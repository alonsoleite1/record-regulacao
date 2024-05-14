import logo from "../../assets/logo.png";
import style from "./style.module.scss";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdHomeWork } from "react-icons/md";


export const Header = () => {
    return (
        <header className={style.header}>
            <div className={style.container}>
                <div>
                    <img className={style.img} src={logo} alt="logo-pacatuba" />
                </div>
                <div className={style.info_box}>
                    <span className={style.span_box}>
                        <FaRegCircleUser /><p>Alonso Araujo Leite</p>
                    </span>
                    <span className={style.span_box}>
                        <MdHomeWork /><p>Secretaria de Saude</p>
                    </span>
                    <button className={style.button}>Sair</button>
                </div>
            </div>
        </header>
    )
};