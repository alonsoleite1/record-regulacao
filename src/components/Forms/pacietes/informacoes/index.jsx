import React from 'react';
import { GiFastBackwardButton } from "react-icons/gi";
import style from "./style.module.scss";


export const InformaçõesPaciente = ({ paciente }) => {

  const handleClick = () => {
    window.location.reload();
  };

  return (

    <section className={style.form} >
      <div className={style.container}>
        <div className={style.box_input}>
          <label className={style.label}>Nome:</label>
          <span className={style.input}>{paciente.nome}</span>
        </div>

        <div className={style.box_input}>
          <label className={style.label}>Data de Nascimento:</label>
          <span className={style.input}>{paciente.dataDeNascimento}</span>
        </div>
        <div className={style.box_input}>
          <label className={style.label}>Nome da Mãe:</label>
          <span className={style.input}>{paciente.nomeDaMae}</span>
        </div>
        <div className={style.box_input}>
          <label className={style.label}>CPF:</label>
          <span className={style.input}>{paciente.cpf}</span>
        </div>
        <div className={style.box_input}>
          <label className={style.label}>CNS:</label>
          <span className={style.input}>{paciente.cns}</span>
        </div>
        <div className={style.box_input}>
          <label className={style.label}>Rua:</label>
          <span className={style.input}>{paciente.rua}</span>
        </div>
        <div className={style.box_input}>
          <label className={style.label}>Número:</label>
          <span className={style.input}>{paciente.numero}</span>
        </div>
        <div className={style.box_input}>
          <label className={style.label}>Bairro:</label>
          <span className={style.input}>{paciente.bairro}</span>
        </div>
        <div className={style.box_input}>
          <label className={style.label}>Cidade:</label>
          <span className={style.input}>{paciente.cidade}</span>
        </div>
        <div className={style.box_input}>
          <label className={style.label}>Estado:</label>
          <span className={style.input}>{paciente.estado}</span>
        </div>
        <div className={style.box_input}>
          <label className={style.label}>CEP:</label>
          <span className={style.input}>{paciente.cep}</span>
        </div>
        <div className={style.box_input}>
          <label className={style.label}>Posto de Saúde:</label>
          <span className={style.input}>{paciente.ubs}</span>
        </div>
        <div className={style.box_input}>
          <label className={style.label}>ACS:</label>
          <span className={style.input}>{paciente.acs}</span>
        </div>
        <div className={style.box_input}>
          <label className={style.label}>Contato 1:</label>
          <span className={style.input}>{paciente.contatoUm}</span>
        </div>
        <div className={style.box_input}>
          <label className={style.label}>Contato 2:</label>
          <span className={style.input}>{paciente.contatoDois}</span>
        </div>
      </div>

      <button onClick={handleClick} className={style.button}><GiFastBackwardButton /> Voltar</button>
    </section>
  );
};
