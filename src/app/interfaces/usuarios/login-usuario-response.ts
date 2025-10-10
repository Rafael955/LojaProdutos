export interface ILoginUsuarioResponse {
    Id: string; 
    Nome: string;
    Email: string;
    Perfil: string;
    Token: string;
    AcessoEm: Date;
    Expiracao: Date;
}