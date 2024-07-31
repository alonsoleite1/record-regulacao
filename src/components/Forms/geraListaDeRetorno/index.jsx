import { DefaultTemplate } from "../../DefaultTemplate";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { toast } from 'react-toastify';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import style from "./style.module.scss";



export const GerarListaDeRetorno = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [especialidade, setEspecialidade] = useState([]);

    useEffect(() => {
        const buscarEspecialidades = async () => {

            const token = JSON.parse(localStorage.getItem("@token"));

            const { data } = await api.get("/especialista", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setEspecialidade(data);

        };

buscarEspecialidades();

    }, [])
    const onSubmit = async (payloand) => {

        try {
            const { data } = await api.get(`/gerar?espera=${payloand.espera}&regulacao=${payloand.regulacao}&classificacao=${payloand.classificacao}&quantidade=${payloand.quantidade}`);


            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            pdf.setFontSize(12);

            const pageWidth = pdf.internal.pageSize.getWidth();
            const title = `LISTA DE ESPERA ${payloand.espera.toUpperCase()}`;

            // Centralizar o título
            const textWidth = pdf.getTextWidth(title);
            const x = (pageWidth - textWidth) / 2.1;
            pdf.text(title, x, 15);


            const tableColumn = ["CPF", "NOME", "CONTATO 1", "CONTATO 2"];
            const tableRows = [];

            data.map(item => {
                const rowData = [
                    item.paciente.cpf,
                    item.paciente.nome,
                    item.paciente.contatoUm,
                    item.paciente.contatoDois
                ];
                tableRows.push(rowData);
            });

            autoTable(pdf, {
                startY: 20, head: [tableColumn],
                body: tableRows,
                margin: { top: 10, left: 10, right: 10, bottom: 10 },
                theme: 'grid', // Outras opções: 'striped', 'plain'
                styles: {
                    fontSize: 10,
                    cellPadding: 5
                },
                headStyles: {
                    fillColor: [62, 188, 62]
                }
            })

            pdf.save('Lista');

        } catch (error) {
            toast.error('Não foi gerado a lista!');
        }
        // Aqui você pode enviar os dados para um servidor, por exemplo
    };



    return (
        <DefaultTemplate>
            <section className={style.container}>
                <div className={style.header}>
                    <h1 className={style.title}>Gerar lista de retorno</h1>
                </div>

                <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.box_cadastro}>

                        <div className={style.box_input}>
                            <label className={style.label}>Especialidade:</label>
                            <select className={style.input} {...register('espera', { required: 'Especialidade é obrigatória' })}>
                                <option value="">Selecione uma especialidade</option>
                                {especialidade.map((option, i) => (
                                    <option key={i} value={option.nome}>
                                        {option.nome}
                                    </option>
                                ))}
                            </select>
                            {errors.espera && <span className={style.aviso}>{errors.espera.message}</span>}
                        </div>
                        <div className={style.box_input}>
                            <label className={style.label}>Regulaçao:</label>
                            <select className={style.input} {...register('regulacao', { required: 'Regulação é obrigatória' })}>
                                <option value="">Selecione uma regulação</option>
                                <option value="Sede">Sede</option>
                                <option value="Nasf">Nasf</option>
                            </select>
                            {errors.regulacao && <span className={style.aviso}>{errors.regulacao.message}</span>}
                        </div>

                        <div className={style.box_input}>
                            <label className={style.label}>Classificação:</label>
                            <select className={style.input} {...register('classificacao', { required: 'Classificação é obrigatória' })}>
                                <option value="">Selecione uma classificação</option>
                                <option value="normal">Normal</option>
                                <option value="urgente">Urgente</option>
                            </select>
                            {errors.classificacao && <span className={style.aviso}>{errors.classificacao.message}</span>}
                        </div>

                        <div className={style.box_input}>
                            <label className={style.label}>Quantidade:</label>
                            <input className={style.input}
                                type="number"
                                {...register("quantidade", { required: "Informe a quantidade", min: { value: 1, message: "A quantidade deve ser no mínimo 1" } })}
                            />
                            {errors.quantidade && <span className={style.aviso}>{errors.quantidade.message}</span>}
                        </div>

                    </div>

                    <button className={style.button_salvar} type="submit"> Gerar Lista</button>
                </form>

            </section>
        </DefaultTemplate>
    )
};