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
import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
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

    const verificaPosicao = async (id, cpf, especialidade, posicao, createdAt) => {

        
        const token = JSON.parse(localStorage.getItem("@token"));

        const { data } = await api.get(`/lista/posicao/atual?id=${id}&espera=${especialidade}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        pdf.setFontSize(12);

        const pageWidth = pdf.internal.pageSize.getWidth();
        const title = `RECIBO DE ATUALIZAÇÃO A LISTA DE ESPERA `;

        // Centralizar o título
        const textWidth = pdf.getTextWidth(title);
        const x = (pageWidth - textWidth) / 2.1;
        pdf.text(title, x, 15);


        autoTable(pdf, {
            startY: 20,
            head: [["CPF", "ESPERA", "POS. INICIAL", "POS. ATUAL", "INSERIDO"]],
            body: [[cpf,especialidade, posicao, data, createdAt]],
            foot: [["SECRETARIA DE SAUDE DE PACATUBA"]],
            margin: { top: 10, left: 10, right: 10, bottom: 10 },
            theme: 'grid', // Outras opções: 'striped', 'plain'
            styles: {
                fontSize: 10,
                cellPadding: 5
            },
            headStyles: {
                fillColor: [62, 188, 62]
            },
            footStyles: {
                fillColor: [31, 145, 220]
            }
        })

        pdf.save('Lista');


    }

    // Função para capturar o valor da input e o id ao clicar no botão
    const abrirRealizado = async (id) => {
        setListaId(id);
        setModalRealizado(true);
        const { data } = await api.get('/profissional');

        setProfissionais(data);

    };

    const abrirObservacao = async (id) => {
        console.log(id);
        setListaId(id);
        setModalObservacao(true);
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
                                    <span className={style.label}>Posição Inicial: </span>
                                    <p>{lista.posicao}</p>
                                </div>

                            </div>
                            <div className={style.box_card}>
                                <div className={style.box_input}>
                                    <span className={style.label}>Observação: </span>
                                    <p>{lista.observacao}</p>
                                </div>
                            </div>



                            {lista.realizado ? <> <div className={style.box_card}>
                                <div className={style.box_input}>
                                    <span className={style.label}>Realizado: </span>
                                    <p>{format(lista.realizado, 'dd-MM-yyyy')}</p>
                                </div>
                                <div className={style.box_input}>
                                    <span className={style.label}>Profissional: </span>
                                    <p>{lista.nomeProfissional}</p>
                                </div>

                            </div>
                            </> :

                                <>
                                    <div className={style.div_button}> <button onClick={() => abrirRealizado(lista.id)} className={style.button_realizado} title="Realizado">Realizado</button>

                                        <button onClick={() => abrirObservacao(lista.id)} className={style.button_observacao} title="Observação"><BsChatLeftText /></button>

                                        <button onClick={() => verificaPosicao(lista.id,lista.cpf, lista.especialidade,lista.posicao,lista.createdAt)} title="Verificar posição" className={style.button_verificar}>Posição Atual</button>

                                        <button title="Deletar" className={style.button_deletar}><FaRegTrashAlt /></button> </div>
                                </>}

                        </li>
                    ))}


                </ul> : null}

            </section>

            {modalObservacao ? <ObservacaoModal listaId={listaId} setModalObservacao={setModalObservacao} modalRef={modalRef} escRef={escRef} /> : null}
            {modalRealizado ? <RealizadoModal profissionais={profissionais} listaId={listaId} setModalRealizado={setModalRealizado} modalRef={modalRef} escRef={escRef} /> : null}
        </DefaultTemplate>
    )
};