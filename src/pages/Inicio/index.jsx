import { DefaultTemplate } from "../../components/DefaultTemplate";
import img from "../../assets/tela-inicio.jpg"
import style from "./style.module.scss";

export const Inicio = () => {

  return (
    <DefaultTemplate>
      <section className={style.container}>
      <img className={style.logo} src={img} alt="logo" />
      </section>
    </DefaultTemplate>
  );
};