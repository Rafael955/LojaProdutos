import { IProdutoResponse } from "./produto-response";

export interface IProdutosControllerResponse {
    message: string,
    data: IProdutoResponse | IProdutoResponse[];
}