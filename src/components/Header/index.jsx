import logo from "../../assets/logo.png";
import style from "./style.module.scss";


export const Header = () => {
    return (
        <header className={style.header}>
            <div className={style.container}>
                <div>
                    <img className={style.img} src={logo} alt="logo-pacatuba" />
                </div>
                <div>
                </div>
            </div>
        </header>
    )
};