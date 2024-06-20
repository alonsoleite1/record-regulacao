import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RiSave3Fill } from "react-icons/ri";
import InputMask from 'react-input-mask';
import { api } from '../../../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import style from "./style.module.scss";


export const AtualizarCadastro = ({ paciente }) => {

  const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

useEffect(()=>{

 const carregaDados = ()=>{
  setValue('nome', paciente.nome);
  setValue('dataDeNascimento', paciente.dataDeNascimento);
  setValue('nomeDaMae', paciente.nomeDaMae);
  setValue('cns', paciente.cns);
  setValue('rua', paciente.rua);
  setValue('numero', paciente.numero);
  setValue('bairro', paciente.bairro);
  setValue('cidade', paciente.cidade);
  setValue('estado', paciente.estado);
  setValue('cep', paciente.cep);
  setValue('ubs', paciente.ubs);
  setValue('acs', paciente.acs);
  setValue('contatoUm', paciente.contatoUm);
  setValue('contatoDois', paciente.contatoDois);
 };

 carregaDados();;

},[setValue]);

  const onSubmit = async (payload) => {
    const token = JSON.parse(localStorage.getItem("@token"));

    try {
      const { data } = await api.patch(`paciente/${payload.cpf}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate("/dashboard");
      toast.success("Cadastro atualizado!");
    } catch (error) {
      toast.error("Não foi possivel atualizar!");
    }
  };


  return (

    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.container}>
            <div className={style.box_input}>
              <label className={style.label}>Nome</label>
              <input className={style.input} {...register('nome', { required: 'Nome é obrigatório' })} />
              {errors.nome && <span className={style.aviso}>{errors.nome.message}</span>}
            </div>
            <div className={style.box_input}>
              <label className={style.label}>Data de Nascimento</label>
              <InputMask className={style.input}
                mask="99/99/9999"
                {...register('dataDeNascimento', { required: 'Data de Nascimento é obrigatória' })}
              />
              {errors.dataDeNascimento && <span className={style.aviso}>{errors.dataDeNascimento.message}</span>}
            </div>
            <div className={style.box_input}>
              <label className={style.label}>Nome da Mãe</label>
              <input className={style.input} {...register('nomeDaMae', { required: 'Nome da Mãe é obrigatório' })} />
              {errors.nomeDaMae && <span className={style.aviso}>{errors.nomeDaMae.message}</span>}
            </div>
            <div className={style.box_input}>
              <label className={style.label}>CPF</label>
              <InputMask className={style.input_cpf}
              value={paciente.cpf}
                mask="99999999999"
                {...register('cpf', { required: 'CPF é obrigatório' })}
              />
              {errors.cpf && <span className={style.aviso}>{errors.cpf.message}</span>}
            </div>
            <div className={style.box_input}>
              <label className={style.label}>CNS</label>
              <InputMask className={style.input}
                mask="999 9999 9999 9999"
                {...register('cns', { required: 'CNS é obrigatório' })}
              />
              {errors.cns && <span className={style.aviso}>{errors.cns.message}</span>}
            </div>
            <div className={style.box_input}>
              <label className={style.label}>Rua:</label>
              <input className={style.input}
                {...register('rua', { required: 'Rua é obrigatória' })}
              />
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
              <input className={style.input}
                {...register('bairro', { required: 'Bairro é obrigatória' })}
              />
              {errors.bairro && <span className={style.aviso}>{errors.bairro.message}</span>}
            </div>
            <div className={style.box_input}>
              <label className={style.label}>Cidade:</label>
              <input className={style.input}
                {...register('cidade', { required: 'Cidade é obrigatória' })}
              />
              {errors.cidade && <span className={style.aviso}>{errors.cidade.message}</span>}
            </div>
            <div className={style.box_input}>
              <label className={style.label}>Estado:</label>
              <input className={style.input}
                {...register('estado', { required: 'Estado é obrigatório' })}
              />
              {errors.estado && <span className={style.aviso}>{errors.estado.message}</span>}
            </div>
            <div className={style.box_input}>
              <label className={style.label}>CEP:</label>
              <InputMask className={style.input}
                mask="99999-999"
                {...register('cep', {
                  required: 'CEP é obrigatório',
                  validate: value => /^[0-9]{5}-[0-9]{3}$/.test(value) || 'CEP inválido'
                })}
              >
                {(inputProps) => <input {...inputProps} />}
              </InputMask>
              {errors.cep && <span className={style.aviso}>{errors.cep.message}</span>}
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
              <label className={style.label}>Contato 1</label>
              <InputMask className={style.input}
                mask="(99) 99999-9999"
                {...register('contatoUm', { required: 'Contato 1 é obrigatório' })}
              />
              {errors.contatoUm && <span className={style.aviso}>{errors.contatoUm.message}</span>}
            </div>
            <div className={style.box_input}>
              <label className={style.label}>Contato 2</label>
              <InputMask className={style.input}
                mask="(99) 99999-9999"
                {...register('contatoDois', { required: 'Contato 2 é obrigatório' })}
              />
              {errors.contatoDois && <span className={style.aviso}>{errors.contatoDois.message}</span>}
            </div>
          </div>

          <button className={style.button} type="submit"><RiSave3Fill /> Atualizar paciente</button>
        </form>
  );
};
