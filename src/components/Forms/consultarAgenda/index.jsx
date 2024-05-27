import { DefaultTemplate } from "../../DefaultTemplate";
import { FaRegTrashAlt } from "react-icons/fa";
import style from "./style.module.scss";
import { useState } from "react";


export const ConsultarAgenda = () => {
    const [buscarCadastro, setBuscarCadastro] = useState(false);

    const atualizar = () => {
        event.preventDefault()
        return setBuscarCadastro(true);
    };

    return (
        <DefaultTemplate>
            <section className={style.container}>
                <div className={style.header}>
                    <h1 className={style.title}>Consultar Agenda</h1>
                </div>
                <form className={style.form_buscar}>
                    <input className={style.input} type="text" />
                    <button className={style.button_buscar} type="submit" onClick={() => atualizar()}>Buscar</button>
                </form>

                {buscarCadastro ? <ul className={style.ul}>
                    <li className={style.card}>
                        <div className={style.box_input}>
                            <span className={style.label}>Nome:</span>
                            <p>Alonso Araujo Leite</p>
                        </div>
                        <div className={style.box_input}>
                            <span className={style.label}>Especialidade:</span>
                            <p>Pediatra</p>
                        </div>
                        <div className={style.box_input}>
                            <span className={style.label}>Profissional:</span>
                            <p>Alonso Araujo Leite</p>
                        </div>
                        <div className={style.box_posicao}>
                            <span className={style.label}>Data:</span>
                            <p>01/06/2024</p>
                        </div>
                        <div className={style.box_posicao}>
                            <span className={style.label}>Hora:</span>
                            <p>09:00</p>
                        </div>
                        <div className={style.box_input}>
                            <span className={style.label}>Agendado por:</span>
                            <p>Alonso Araújo Leite</p>
                        </div>
                        <div className={style.div_button}>
                            <button className={style.button_deletar}><FaRegTrashAlt /></button>
                        </div>
                    </li>

                    <li className={style.card}>
                        <div className={style.box_input}>
                            <span className={style.label}>Nome:</span>
                            <p>Alonso Araujo Leite</p>
                        </div>
                        <div className={style.box_input}>
                            <span className={style.label}>Especialidade:</span>
                            <p>Clinica Medica</p>
                        </div>
                        <div className={style.box_input}>
                            <span className={style.label}>Profissional:</span>
                            <p>Alonso Araujo Leite</p>
                        </div>
                        <div className={style.box_posicao}>
                            <span className={style.label}>Data:</span>
                            <p>10/06/2024</p>
                        </div>
                        <div className={style.box_posicao}>
                            <span className={style.label}>Hora:</span>
                            <p>08:00</p>
                        </div>
                        <div className={style.box_input}>
                            <span className={style.label}>Agendado por:</span>
                            <p>Alonso Araújo Leite</p>
                        </div>
                        <div className={style.div_button}>
                            <button className={style.button_deletar}><FaRegTrashAlt /></button>
                        </div>
                    </li>
                </ul> : null}

            </section>
        </DefaultTemplate>
    )
};