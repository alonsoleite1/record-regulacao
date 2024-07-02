import { useEffect, useState } from "react";
import { DefaultTemplate } from "../../components/DefaultTemplate";
import style from "./style.module.scss";
import { api } from "../../services/api";

export const Dashboard = () => {
  const [especialidade, setEspecialidade] = useState([]);
  const [exame, setExame] = useState([]);
  const [cirurgia, setCirurgia] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@token"));

    const dashboard = async () => {
      try {
        const especialista = await api.get('/especialista', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const exame = await api.get('/exame', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const cirurgia = await api.get('/cirugia', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEspecialidade(especialista.data);
        setExame(exame.data);
        setCirurgia(cirurgia.data);

      } catch (error) {
        
      }

    }

    if (token) {
      dashboard();
    }
  }, []);

  return (
    <DefaultTemplate>
      <section className={style.container}>
        <h1 className={style.header}>Fila de Espera</h1>
        <ul className={style.especialidade}>
          <h1 className={style.title}>Especialidade</h1>
           
         {especialidade.map(element => (
          <li key={element.id} className={style.card}>
          <h3 className={style.label}>{element.nome}</h3>
          <p>50</p>
          <span className={style.span3}></span>
        </li>
         ))}

        </ul>

        <ul className={style.especialidade}>
          <h1 className={style.title}>Exames e Procedimentos</h1>

          {exame.map(element => (
          <li key={element.id} className={style.card}>
         <h3 className={style.label}>{element.nome}</h3>
            <p>20</p>
            <span className={style.span1}></span>
        </li>
         ))}
         
        </ul>

        <ul className={style.especialidade}>
          <h1 className={style.title}>Cirurgias</h1>
        
          {cirurgia.map(element => (
          <li key={element.id} className={style.card}>
           <h3 className={style.label}>{element.nome}</h3>
            <p>30</p>
            <span className={style.span2}></span>
        </li>
         ))}      
         
        </ul>
      </section>
    </DefaultTemplate>
  );
};