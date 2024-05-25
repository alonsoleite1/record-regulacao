import { DefaultTemplate } from "../../components/DefaultTemplate";
import style from "./style.module.scss";

export const Dashboard = () => {
  return (
    <DefaultTemplate>
      <section className={style.container}>
        <section className={style.especialidade}>
          <h1 className={style.title}>Especialidade</h1>
          <div className={style.card}>
            <h3 className={style.label}>Cardiologia</h3>
            <p>20</p>
            <span className={style.span1}></span>
          </div>
          <div className={style.card}>
            <h3 className={style.label}>Cirurgião Geral</h3>
            <p>30</p>
            <span className={style.span2}></span>
          </div>
          <div className={style.card}>
            <h3 className={style.label}>Clinica Médica</h3>
            <p>50</p>
            <span className={style.span3}></span>
          </div>
          <div className={style.card}>
            <h3 className={style.label}>Dermatologia</h3>
            <p>50</p>
            <span className={style.span1}></span>
          </div>
          <div className={style.card}>
            <h3 className={style.label}>Endocrinologia</h3>
            <p>30</p>
            <span className={style.span2}></span>
          </div>
          <div className={style.card}>
            <h3 className={style.label}>Urologista</h3>
            <p>50</p>
            <span className={style.span3}></span>
          </div>
        </section>

        <section className={style.especialidade}>
          <h1 className={style.title}>Exames e Procedimentos</h1>
          <div className={style.card}>
            <h3 className={style.label}>ECG sem laudo</h3>
            <p>20</p>
            <span className={style.span1}></span>
          </div>
          <div className={style.card}>
            <h3 className={style.label}>Endoscopia</h3>
            <p>30</p>
            <span className={style.span2}></span>
          </div>
          <div className={style.card}>
            <h3 className={style.label}>ECG com laudo</h3>
            <p>50</p>
            <span className={style.span3}></span>
          </div>
          <div className={style.card}>
            <h3 className={style.label}>USG do Olho</h3>
            <p>30</p>
            <span className={style.span2}></span>
          </div>
          <div className={style.card}>
            <h3 className={style.label}>Ultrassom da mão</h3>
            <p>30</p>
            <span className={style.span2}></span>
          </div>
          <div className={style.card}>
            <h3 className={style.label}>Ultrassom de articulação</h3>
            <p>50</p>
            <span className={style.span3}></span>
          </div>
        </section>

        <section className={style.especialidade}>
          <h1 className={style.title}>Cirurgias</h1>
          <div className={style.card}>
            <h3 className={style.label}>Oftalmológica</h3>
            <p>20</p>
            <span className={style.span1}></span>
          </div>
          <div className={style.card}>
            <h3 className={style.label}>Cirugião Geral</h3>
            <p>30</p>
            <span className={style.span2}></span>
          </div>
          <div className={style.card}>
            <h3 className={style.label}>Cirurgia ginecológica</h3>
            <p>50</p>
            <span className={style.span3}></span>
          </div>
        </section>
      </section>
    </DefaultTemplate>
  );
};