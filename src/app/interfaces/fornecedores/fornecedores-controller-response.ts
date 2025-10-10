import { IFornecedorResponse } from "./fornecedor-response";

export interface IFornecedoresControllerResponse {
    message: string,
    data: IFornecedorResponse | IFornecedorResponse[];
}