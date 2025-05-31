import { Usuario } from "../entidades/usuario";

export interface UsuarioDTO {
    usuario: Usuario;
    token: string;
}
