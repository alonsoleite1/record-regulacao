import { useEffect, useState } from "react";
import { api } from "../../../../services/api";
import style from "./style.module.scss";

export const DashboardNasfRetorno = () => {
  const [especialidade, setEspecialidade] = useState([]);
  const [listEspecialidade, setListEspecialidade] = useState([]);


  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@token"));

    const dashboard = async () => {
      try {
        const especialista = await api.get('/especialista', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setEspecialidade(especialista.data);    

      } catch (error) {

      }

    }

    if (token) {
      dashboard();
    }
  }, []);

  useEffect(() => {

    // Função que será executada automaticamente com os dados obtidos
    const processEspecialista = async () => {
      // Mapeia os dados para um novo array com os resultados do processamento
      const processedData = await Promise.all(especialidade.map(async item => {
               
        const { data } = await api.get(`/retorno/nasf/${item.nome}`);
   
        
        return {
          nome: item.nome, quantidade: data,
        };
      }));

      setListEspecialidade(processedData);

    };
    
    processEspecialista();
   

  }, [especialidade]);


  return (
      <section className={style.container}>
        <h1 className={style.header}>FILA DE RETORNO NASF</h1>
        <ul className={style.especialidade}>
          <h1 className={style.title}>Especialidade</h1>

          {listEspecialidade.map(element => (
            <li key={element.id} className={style.card}>
              <h3 className={style.label}>{element.nome}</h3>
              <p className={style.quantidade}>{element.quantidade}</p>
            </li>
          ))}

        </ul>
      </section>

  );
};