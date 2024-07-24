import { useEffect, useState } from "react";
import { DefaultTemplate } from "../../components/DefaultTemplate";
import { api } from "../../services/api";
import style from "./style.module.scss";

export const Dashboard = () => {
  const [especialidade, setEspecialidade] = useState([]);
  const [listEspecialidade, setListEspecialidade] = useState([]);

  const [exame, setExame] = useState([]);
  const [listExame, setListExame] = useState([]);

  const [cirurgia, setCirurgia] = useState([]);
  const [listCirurgia, setListCirurgia] = useState([]);

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


  useEffect(() => {
    // Função que será executada automaticamente com os dados obtidos
    const processData = async () => {
      // Mapeia os dados para um novo array com os resultados do processamento
      const processedData = await Promise.all(especialidade.map(async item => {

        const { data } = await api.get(`/lista/quantidade/${item.nome}`);

        return {
          nome: item.nome, quantidade: data,
        };
      }));

      setListEspecialidade(processedData);

    };
    processData();

  }, [especialidade]);

  useEffect(() => {
    // Função que será executada automaticamente com os dados obtidos
    const processData = async () => {
      // Mapeia os dados para um novo array com os resultados do processamento
      const processedData = await Promise.all(exame.map(async item => {
       
        const { data } = await api.get(`/lista/quantidade/${item.nome}`);
        
        return {
          nome: item.nome, quantidade: data,
        };
      }));

      setListExame(processedData);

    };
    processData();

  }, [exame]);

  useEffect(() => {
    // Função que será executada automaticamente com os dados obtidos
    const processData = async () => {
      // Mapeia os dados para um novo array com os resultados do processamento
      const processedData = await Promise.all(cirurgia.map(async item => {

        const {data}  = await api.get(`/lista/quantidade/${item.nome}`);
        console.log('teste');
        return {
          nome: item.nome, quantidade: data,
        };
      }));

      setListCirurgia(processedData);

    };
    processData();

  }, [cirurgia]);



  return (
    <DefaultTemplate>
      <section className={style.container}>
        <h1 className={style.header}>Fila de Espera</h1>
        <ul className={style.especialidade}>
          <h1 className={style.title}>Especialidade</h1>

          {listEspecialidade.map(element => (
            <li key={element.id} className={style.card}>
              <h3 className={style.label}>{element.nome}</h3>
              <p>{element.quantidade}</p>
              <span className={style.span3}></span>
            </li>
          ))}

        </ul>

        <ul className={style.especialidade}>
          <h1 className={style.title}>Exames e Procedimentos</h1>

          {listExame.map(element => (
            <li key={element.id} className={style.card}>
              <h3 className={style.label}>{element.nome}</h3>
              <p>{element.quantidade}</p>
              <span className={style.span1}></span>
            </li>
          ))}

        </ul>

        <ul className={style.especialidade}>
          <h1 className={style.title}>Cirurgias</h1>

          {listCirurgia.map(element => (
            <li key={element.id} className={style.card}>
              <h3 className={style.label}>{element.nome}</h3>
              <p>{element.quantidade}</p>
              <span className={style.span2}></span>
            </li>
          ))}

        </ul>
      </section>
    </DefaultTemplate>
  );
};