import { DefaultTemplate } from "../../components/DefaultTemplate";
import style from "./style.module.scss";

export const Inicio = () => {

  return (
    <DefaultTemplate>
      <section className={style.container}>
        <h1>RECORD</h1>
      </section>
    </DefaultTemplate>
  );
};