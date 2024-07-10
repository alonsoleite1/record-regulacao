import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { DefaultTemplate } from "../../../DefaultTemplate";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsChatLeftText } from "react-icons/bs";
import { useState } from "react";
import { ObservacaoModal } from "../modal/obsevacao";
import { useKeydown } from "../../../../services/useKeydown";
import { useOutclick } from "../../../../services/hooks/useOutclick";
import { RealizadoModal } from "../modal/realizado";
import { api } from "../../../../services/api";
import style from "./style.module.scss";


export const ConsultarListaDeEspera = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [paciente, setPaciente] = useState([]);
    const [profissionais, setProfissionais] = useState([]);
    const [buscarCadastro, setBuscarCadastro] = useState(false);
    const [modalObservacao, setModalObservacao] = useState(false);
    const [modalRealizado, setModalRealizado] = useState(false);
    const [listaId, setListaId] = useState(null);

    const modalRef = useOutclick(() => {
        setModalObservacao(false);
    });

    const escRef = useKeydown("Escape", (element) => {
        element.click();
    });

    // Função para capturar o valor da input e o id ao clicar no botão
    const handleButtonClick =async (id) => {
        setListaId(id);
        setModalRealizado(true);
        const { data } = await api.get('/profissional');
        
        setProfissionais(data);

        console.log('Selected ID:', id);
    };

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
                                    <p>{lista.paciente.nome}</p>
                                </div>
                                <div className={style.box_input}>
                                    <span className={style.label}>Espera:</span>
                                    <p>{lista.especialidade}</p>
                                </div>
                                <div className={style.box_input}>
                                    <span className={style.label}>Inserido:</span>
                                    <p>{lista.createdAt}</p>
                                </div>
                            </div>

                            <div className={style.box_card}>
                                <div className={style.box_input}>
                                    <span className={style.label}>Classificação:</span>
                                    <p>{lista.classificacao}</p>
                                </div>
                                <div className={style.box_input}>
                                    <span className={style.label}>Usuario:</span>
                                    <p>{lista.usuarioLista}</p>
                                </div>
                                <div className={style.box_input}>
                                    <span className={style.label}>Posição: </span>
                                    <p>{lista.posicao}</p>
                                </div>
                            </div>



                            {lista.realizado ? <> <div className={style.box_card}>
                                <div className={style.box_input}>
                                    <span className={style.label}>Realizado: </span>
                                    <p>{lista.realizado}</p>
                                </div>
                                <div className={style.box_input}>
                                    <span className={style.label}>Profissional: </span>
                                    <p>{lista.nomeProfissional}</p>
                                </div>
                            </div>
                            </> :

                                <>
                                    <div className={style.div_button}> <button onClick={() => handleButtonClick(lista.id)} className={style.button_realizado} title="Realizado">Realizado</button> <button onClick={() => setModalObservacao(true)} className={style.button_observacao} title="Observação"><BsChatLeftText /></button>

                                 <button title="Deletar" className={style.button_deletar}><FaRegTrashAlt /></button> </div> </>}

                        </li>
                    ))}


                </ul> : null}

            </section>

            {modalObservacao ? <ObservacaoModal setModalObservacao={setModalObservacao} modalRef={modalRef} escRef={escRef} /> : null}
            {modalRealizado ? <RealizadoModal profissionais={profissionais} listaId={listaId} setModalRealizado={setModalRealizado} modalRef={modalRef} escRef={escRef} /> : null}
        </DefaultTemplate>
    )
};