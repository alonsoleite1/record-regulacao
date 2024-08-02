import { DefaultTemplate } from "../../DefaultTemplate";
import { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { useForm, Controller } from 'react-hook-form';
import { RiSave3Fill } from "react-icons/ri";
import { api } from "../../../services/api";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import style from "./style.module.scss";



export const ListaDeEspera = () => {

    const { register, handleSubmit, setValue, control,reset, formState: { errors } } = useForm();

    const [especialidade, setEspecialidade] = useState([]);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const valor = e.target.value.replace(/[.-]/g, '');
        setValue('cpf', valor);
    };

    const onSubmit = async (payloand) => {
        const token = JSON.parse(localStorage.getItem("@token"));

        try {
            const { data } = await api.post("/lista", payloand, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            generatePDF(data)
            reset();
            toast.success("Adicionado a lista com sucesso!");

        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleSelectChange = async (e) => {
        const selectedValue = e.target.value;

        const token = JSON.parse(localStorage.getItem("@token"));
        try {
            const { data } = await api.get(`/${selectedValue}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setEspecialidade(data);

        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    };

    const generatePDF = (recibo) => {

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        pdf.setFontSize(12);

        const pageWidth = pdf.internal.pageSize.getWidth();
        const title = `RECIBO DE INSERÇÃO A LISTA DE ESPERA `;

        // Centralizar o título
        const textWidth = pdf.getTextWidth(title);
        const x = (pageWidth - textWidth) / 2.1;
        pdf.text(title, x, 15);


        autoTable(pdf, {
            startY: 20,
            head: [["CPF", "ESPERA", "POSIÇÃO", "INSERIDO"]],
            body: [[recibo.cpf, recibo.especialidade, recibo.posicao, recibo.createdAt]],
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
    };



    return (
        <DefaultTemplate>
            <section className={style.container}>
                <div className={style.header}>
                    <h1 className={style.title}>Lista de espera</h1>
                </div>

                <form className={style.form} onSubmit={handleSubmit(onSubmit)}>

                    <div className={style.box_cadastro}>
                        <div className={style.box_input}>
                            <label className={style.label}>CPF:</label>
                            <Controller
                                name="cpf"
                                control={control}
                                rules={{ required: 'CPF é obrigatório' }}
                                render={({ field }) => (
                                    <InputMask
                                        mask="999.999.999-99"
                                        value={field.value}
                                        onChange={handleChange}
                                    >
                                        {(inputProps) => <input className={style.input} {...inputProps} type="text" />}
                                    </InputMask>
                                )}
                            />
                            {errors.cpf && <span className={style.aviso}>{errors.cpf.message}</span>}
                        </div>

                        <div className={style.box_input}>
                            <label className={style.label}>Serviço:</label>
                            <select className={style.input} {...register('servico', { required: 'Serviço é obrigatório' })} onChange={handleSelectChange}>
                                <option value="">Selecione um serviço</option>
                                <option value="especialista">Especialista</option>
                                <option value="cirugia">Cirugia</option>
                                <option value="exame">Exame/Procedimento</option>
                            </select>
                            {errors.servico && <span className={style.aviso}>{errors.servico.message}</span>}
                        </div>

                        <div className={style.box_input}>
                            <label className={style.label}>Especialidade:</label>
                            <select className={style.input} {...register('especialidade', { required: 'Especialidade é obrigatória' })}>
                                <option value="">Selecione uma especialidade</option>
                                {especialidade.map((option, i) => (
                                    <option key={i} value={option.nome}>
                                        {option.nome}
                                    </option>
                                ))}
                            </select>
                            {errors.especialidade && <span className={style.aviso}>{errors.especialidade.message}</span>}
                        </div>

                        <div className={style.box_input}>
                            <label className={style.label}>Classificação:</label>
                            <select className={style.input} {...register('classificacao', { required: 'Classificação é obrigatória' })}>
                                <option value="">Selecione a classificação</option>
                                <option value="normal">Normal</option>
                                <option value="urgente">Urgente</option>
                            </select>
                            {errors.classificacao && <span className={style.aviso}>{errors.classificacao.message}</span>}
                        </div>

                        <div className={style.box_input}>
                            <label className={style.label}>Regulação:</label>
                            <select className={style.input}  {...register('regulacao', { required: 'Regulação é obrigatório' })}>
                                <option value="">Selecione a regulação</option>
                                <option value="Sede">Sede</option>
                                <option value="Nasf">Nasf</option>
                            </select>
                            {errors.regulacao && <span className={style.aviso}>{errors.regulacao.message}</span>}
                        </div>

                    </div>

                    <button className={style.button_salvar} type="submit"> <RiSave3Fill />Adicionar</button>
                </form>

            </section>
        </DefaultTemplate>
    )
};