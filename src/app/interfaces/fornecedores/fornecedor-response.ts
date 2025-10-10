import { IProdutoResponse } from "../produtos/produto-response";

export interface IFornecedorResponse {
    id: string;
    nome: string;
    produtos: IProdutoResponse[]
}