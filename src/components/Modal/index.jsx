import { MdClose } from "react-icons/md";
import { useForm } from "react-hook-form";
import { RiSave3Fill } from "react-icons/ri";
import style from "./style.module.scss";

export const ObservacaoModal = ({ setOpenModal,modalRef, escRef}) => {
   const { register, handleSubmit, formState: { errors } } = useForm();

   const onSubmit = (data) => {
      console.log(data);
   };

   return (
      <div role="dialog" className={style.overlayBox}>
         <div className={style.modalBox} ref={modalRef}>
            <div className={style.header}>
               <div className={style.title}>
                  <h2>Observação</h2>
               </div>
               <button className={style.button_header} ref={escRef} onClick={() => setOpenModal(false)} title="Fechar">
                  <MdClose size={21} />
               </button>
            </div>
            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
               <textarea className={style.input}  {...register('observacao')}></textarea>
               <button className={style.button_salvar} type="submit"><RiSave3Fill /> Salvar</button>
            </form>
         </div>
      </div>
   );
};