import { useEffect, useState } from "react";
import { api } from "../../../../services/api";
import style from "./style.module.scss";

export const DashboardSedeRetorno = () => {
  const [especialidade, setEspecialidade] = useState([]);
  const [listEspecialidadeMuni, setListEspecialidadeMuni] = useState([]);
  const [listEspecialidadePoli, setListEspecialidadePoli] = useState([]);


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
    const listaMunicipio = async () => {
      // Mapeia os dados para um novo array com os resultados do processamento
      const processedData = await Promise.all(especialidade.map(async item => {
               
        const { data } = await api.get(`/retorno/sede/municipio/${item.nome}`);
   
        
        return {
          nome: item.nome, quantidade: data,
        };
      }));

      setListEspecialidadeMuni(processedData);

    };

    const listaPoliclinica = async () => {
      // Mapeia os dados para um novo array com os resultados do processamento
      const processedData = await Promise.all(especialidade.map(async item => {
               
        const { data } = await api.get(`/retorno/sede/policlinica/${item.nome}`);
   
        
        return {
          nome: item.nome, quantidade: data,
        };
      }));

      setListEspecialidadePoli(processedData);

    };
    
    listaMunicipio();
    listaPoliclinica();
   

  }, [especialidade]);


  return (
      <section className={style.container}>
        <h1 className={style.header}>FILA DE RETORNO SEDE</h1>
        <ul className={style.especialidade}>
          <h1 className={style.title}>MUNICIPIO</h1>

          {listEspecialidadeMuni.map(element => (
            <li key={element.id} className={style.card}>
              <h3 className={style.label}>{element.nome}</h3>
              <p className={style.quantidade}>{element.quantidade}</p>
            </li>
          ))}

        </ul>

        <ul className={style.especialidade}>
          <h1 className={style.title}>POLICLINICA</h1>

          {listEspecialidadePoli.map(element => (
            <li key={element.id} className={style.card}>
              <h3 className={style.label}>{element.nome}</h3>
              <p className={style.quantidade}>{element.quantidade}</p>
            </li>
          ))}

        </ul>
      </section>

  );
};