import { DefaultTemplate } from "../../DefaultTemplate";
import { FaRegTrashAlt } from "react-icons/fa";
import style from "./style.module.scss";
import { useState } from "react";


export const ConsultarListaDeEspera = () => {
    const [buscarCadastro, setBuscarCadastro] = useState(false);

    const atualizar = () => {
        event.preventDefault()
        return setBuscarCadastro(true);
    };

    return (
        <DefaultTemplate>
            <section className={style.container}>
                <div className={style.header}>
                    <h1 className={style.title}>Consultar Lista de Espera</h1>
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
                            <span className={style.label}>Serviço:</span>
                            <p>Exame e Procedimento</p>
                        </div>
                        <div className={style.box_input}>
                            <span className={style.label}>Especialidade:</span>
                            <p>ECG sem laudo</p>
                        </div>
                        <div className={style.box_input}>
                            <span className={style.label}>Classificação:</span>
                            <p>Normal</p>
                        </div>
                        <div className={style.box_posicao}>
                            <span className={style.label}>Posição:</span>
                            <p>10</p>
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
                            <span className={style.label}>Serviço:</span>
                            <p>Especialista</p>
                        </div>
                        <div className={style.box_input}>
                            <span className={style.label}>Especialidade:</span>
                            <p>Pediatra</p>
                        </div>
                        <div className={style.box_input}>
                            <span className={style.label}>Classificação:</span>
                            <p>Urgente</p>
                        </div>
                        <div className={style.box_posicao}>
                            <span className={style.label}>Posição:</span>
                            <p>50</p>
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