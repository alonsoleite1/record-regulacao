import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { DefaultTemplate } from "../../DefaultTemplate";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsChatLeftText } from "react-icons/bs";
import { useState } from "react";
import { ObservacaoModal } from "./modal/obsevacao";
import { useKeydown } from "../../../services/useKeydown";
import { useOutclick } from "../../../services/hooks/useOutclick";
import { api } from "../../../services/api";
import style from "./style.module.scss";


export const ConsultarListaDeEspera = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [paciente, setPaciente] = useState([]);
    const [buscarCadastro, setBuscarCadastro] = useState(false);
    const [modalObservacao, setModalObservacao] = useState(false);

    const modalRef = useOutclick(() => {
        setModalObservacao(false);
    });

    const escRef = useKeydown("Escape", (element) => {
        element.click();
    });

    const onSubmit = async (payloand) => {
        const token = JSON.parse(localStorage.getItem("@token"));

        try {
            const { data } = await api.get(`/lista/${payloand.cpf}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setPaciente(data)
            setBuscarCadastro(true);

        } catch (error) {
            toast.error("Paciente não encontrado!");

        } finally {
            reset()
        }

    };

    return (
        <DefaultTemplate>
            <section className={style.container}>
                <div className={style.header}>
                    <h1 className={style.title}>Consultar Lista de Espera</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className={style.form_buscar}>
                    <input className={style.input} type="text" {...register("cpf")} />
                    <button className={style.button_buscar} type="submit">Buscar</button>
                </form>

                {buscarCadastro ? <ul className={style.ul}>
                    {paciente.map(lista => (
                        <li key={lista.id} className={style.card}>
                            <div className={style.box_card}>
                                <div className={style.box_input}>
                                    <span className={style.label}>Nome:</span>
                                    <p>{lista.nome}</p>
                                </div>
                                <div className={style.box_input}>
                                    <span className={style.label}>Espera:</span>
                                    <p>{lista.especialidade}</p>
                                </div>
                                <div className={style.box_input}>
                                    <span className={style.label}>Agendado:</span>
                                    <p>{lista.data ? lista.data : <p>Aguardando</p>}</p>
                                </div>
                            </div>

                            <div className={style.box_card}>
                                <div className={style.box_input}>
                                    <span className={style.label}>Classificação:</span>
                                    <p>{lista.classificacao}</p>
                                </div>
                                <div className={style.box_input}>
                                    <span className={style.label}>Inserido por:</span>
                                    <p>{lista.usuarioLista}</p>
                                </div>
                                <div className={style.box_input}>
                                    <span className={style.label}>Posição:</span>
                                    <p>0</p>
                                </div>
                            </div>

                            <div className={style.div_button}>

                                {lista.agendaId ? <button className={style.button_agendar} title="Agendar">Info.</button> :

                                    <button className={style.button_agendar} title="Agendar">Agendar</button>}


                                <button onClick={() => setModalObservacao(true)} className={style.button_observacao} title="Observação"><BsChatLeftText /></button>

                                <button title="Deletar" className={style.button_deletar}><FaRegTrashAlt /></button>
                            </div>

                        </li>
                    ))}


                </ul> : null}

            </section>

            {modalObservacao ? <ObservacaoModal setModalObservacao={setModalObservacao} modalRef={modalRef} escRef={escRef} /> : null}
        </DefaultTemplate>
    )
};