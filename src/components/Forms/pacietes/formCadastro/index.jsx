import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { DefaultTemplate } from '../../../DefaultTemplate';
import { RiSave3Fill } from "react-icons/ri";
import { api } from '../../../../services/api';
import { FormPesquisaPaciente } from '../formBusca';
import { toast } from 'react-toastify';
import axios from 'axios';
import style from "./style.module.scss";

export const Pacientes = () => {
  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm();
  const [atualizar, setAtualizar] = useState(false);
  const [abrirCadastro, setAbrirCadastro] = useState(false);
  const [buscarCadastro, setBuscarCadastro] = useState(false);
  const [informacoes, setInformacoes] = useState(false);

  const fetchAddress = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.data.erro) {
        setValue('rua', response.data.logradouro);
        setValue('bairro', response.data.bairro);
        setValue('cidade', response.data.localidade);
        setValue('estado', response.data.uf);
      } else {
        alert('CEP não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar o CEP:', error);
      alert('Erro ao buscar o CEP');
    }
  };

  const handleCepBlur = (event) => {
    const cep = event.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
      fetchAddress(cep);
    }
  };

  const cadastrar = async () => {
    setAbrirCadastro(true);
    setBuscarCadastro(false);
    setAtualizar(false);
    setInformacoes(false);

  };

  const handleChange = (e) => {
    const valor = e.target.value.replace(/[.-]/g, '');
    setValue('cpf', valor);
  };

  const onSubmit = async (formData) => {
    const token = JSON.parse(localStorage.getItem("@token"));


    try {
      const { data } = await api.post("/paciente", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Paciente criado com sucesso!");
      setAbrirCadastro(false);
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };


  return (
    <DefaultTemplate>
      <section className={style.section}>

        <div className={style.header}>
          <h1 className={style.title}>PACIENTES</h1>
          <div className={style.div_button}>
            <button className={style.button_cadastrar} onClick={() => cadastrar()}>+ Cadastrar</button>
          </div>
        </div>
        <FormPesquisaPaciente buscarCadastro={buscarCadastro} atualizar={atualizar} informacoes={informacoes} setInformacoes={setInformacoes} setAtualizar={setAtualizar} setBuscarCadastro={setBuscarCadastro} setAbrirCadastro={setAbrirCadastro} />

        {abrirCadastro ? <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.container}>
            <div className={style.box_input}>
              <label className={style.label}>Nome:</label>
              <input className={style.input} {...register('nome', { required: 'Nome é obrigatório' })} />
              {errors.nome && <span className={style.aviso}>{errors.nome.message}</span>}
            </div>
            <div className={style.box_input}>
              <label className={style.label}>Data de Nascimento:</label>
              <InputMask className={style.input}
                mask="99/99/9999"
                {...register('dataDeNascimento', { required: 'Data de Nascimento é obrigatória' })}
              />
              {errors.dataDeNascimento && <span className={style.aviso}>{errors.dataDeNascimento.message}</span>}
            </div>
            <div className={style.box_input}>
              <label className={style.label}>Nome da Mãe:</label>
              <input className={style.input} {...register('nomeDaMae', { required: 'Nome da Mãe é obrigatório' })} />
              {errors.nomeDaMae && <span className={style.aviso}>{errors.nomeDaMae.message}</span>}
            </div>
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
              <label className={style.label}>CNS:</label>
              <InputMask className={style.input}
                mask="999 9999 9999 9999"
                {...register('cns', { required: 'CNS é obrigatório' })}
              />
              {errors.cns && <span className={style.aviso}>{errors.cns.message}</span>}
            </div>

            <div className={style.box_input}>
              <label className={style.label}>CEP:</label>
              <InputMask
                className={style.input}
                mask="99999-999"
                {...register('cep', {
                  required: 'CEP é obrigatório',
                  validate: value => /^[0-9]{5}-[0-9]{3}$/.test(value) || 'CEP inválido'
                })}
                onBlur={handleCepBlur}
              >
                {(inputProps) => <input {...inputProps} />}
              </InputMask>
              {errors.cep && <span className={style.aviso}>{errors.cep.message}</span>}
            </div>

            <div className={style.box_input}>
              <label className={style.label}>Rua:</label>
              <input className={style.input} {...register('rua', { required: 'Rua é obrigatória' })} />
              {errors.rua && <span className={style.aviso}>{errors.rua.message}</span>}
            </div>
            <div className={style.box_input}>
              <label className={style.label}>Número:</label>
              <input className={style.input}
                type="number"
                {...register('numero', { required: 'Número é obrigatório' })}
              />
              {errors.numero && <span className={style.aviso}>{errors.numero.message}</span>}
            </div>
            <div className={style.box_input}>
              <label className={style.label}>Bairro:</label>
              <input className={style.input} {...register('bairro', { required: 'Bairro é obrigatório' })} />
              {errors.bairro && <span className={style.aviso}>{errors.bairro.message}</span>}
            </div>
            <div className={style.box_input}>
              <label className={style.label}>Cidade:</label>
              <input className={style.input} {...register('cidade', { required: 'Cidade é obrigatória' })} />
              {errors.cidade && <span className={style.aviso}>{errors.cidade.message}</span>}
            </div>
            <div className={style.box_input}>
              <label className={style.label}>Estado:</label>
              <input className={style.input} {...register('estado', { required: 'Estado é obrigatório' })} />
              {errors.estado && <span className={style.aviso}>{errors.estado.message}</span>}
            </div>


            <div className={style.box_input}>
              <label className={style.label}>Posto de Saúde:</label>
              <input className={style.input} {...register('ubs', { required: 'Posto de Saúde é obrigatório' })} />
              {errors.ubs && <span className={style.aviso}>{errors.ubs.message}</span>}
            </div>
            <div className={style.box_input}>
              <label className={style.label}>ACS:</label>
              <input className={style.input} {...register('acs', { required: 'ACS é obrigatório' })} />
              {errors.acs && <span className={style.aviso}>{errors.acs.message}</span>}
            </div>
            <div className={style.box_input}>
              <label className={style.label}>Contato 1:</label>
              <InputMask className={style.input}
                mask="(99) 99999-9999"
                {...register('contatoUm', { required: 'Contato 1 é obrigatório' })}
              />
              {errors.contatoUm && <span className={style.aviso}>{errors.contatoUm.message}</span>}
            </div>
            <div className={style.box_input}>
              <label className={style.label}>Contato 2:</label>
              <InputMask className={style.input}
                mask="(99) 99999-9999"
                {...register('contatoDois', { required: 'Contato 2 é obrigatório' })}
              />
              {errors.contatoDois && <span className={style.aviso}>{errors.contatoDois.message}</span>}
            </div>
          </div>

          <button className={style.button} type="submit"><RiSave3Fill /> Salvar paciente</button>
        </form> : null}
      </section>
    </DefaultTemplate>
  );
};
