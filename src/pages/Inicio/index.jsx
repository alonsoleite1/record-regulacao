import { DefaultTemplate } from "../../components/DefaultTemplate";
import style from "./style.module.scss";
import logo from "../../assets/tela-inicio.svg";

export const Inicio = () => {

  return (
    <DefaultTemplate>
      <section className={style.container}>
        <img className={style.img} src={logo} alt="tela-inicio" />
      </section>
    </DefaultTemplate>
  );
};