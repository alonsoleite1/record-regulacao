import { z } from "zod";

export const usuarioSchema = z.object({
    name: z.string().min(2, "Seu nome e obrigatório."),

    cpf: z.string().min(14,"Insira seu CPF"),

    login: z.string().min(11).max(11,"O login deve ser igual o CPF").regex(/\d{11}$/),

    password: z.string().min(8, "Sua senha deve conter no mínimo 8 caractere").
        regex(/[a-z]+/, "Sua senha deve conter uma letra minúscula.").regex(/[A-Z]+/, "Sua senha deve conter uma letra maiúscula.").regex(/[0-9]+/, "Sua senha deve conter número").regex(/[}{,.^?~=+\-_\/*\-+.\|'"!@;:&$#%]+/, "Sua senha deve conter um caractere especial"),

    confirmPassword: z.string().nonempty("Confirme sua senha."),

    unidade: z.string().min(1, "Selecione sua unidade."),

    perfil: z.string().nonempty("Escolha o perfil."),

}).refine(({ password, confirmPassword }) => password === confirmPassword, { message: "Sua senha não confere", path: ["confirmPassword"] });