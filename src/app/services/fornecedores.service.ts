import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { config } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { IFornecedorResponse } from '../interfaces/fornecedores/fornecedor-response';
import { IFornecedorRequest } from '../interfaces/fornecedores/fornecedor-request';
import { IFornecedoresControllerResponse } from '../interfaces/fornecedores/fornecedores-controller-response';

@Injectable({
  providedIn: 'root'
})
export class FornecedoresService {
  private readonly _httpClient = inject(HttpClient);

  cadastrarFornecedor(fornecedor: IFornecedorRequest) : Observable<IFornecedoresControllerResponse> {
    return this._httpClient.post<IFornecedoresControllerResponse>(`${config.produtosapi_fornecedores}/cadastrar-fornecedor`, fornecedor);
  }

  alterarFornecedor(idFornecedor: string, fornecedor: IFornecedorRequest) : Observable<IFornecedoresControllerResponse> {
    return this._httpClient.put<IFornecedoresControllerResponse>(`${config.produtosapi_fornecedores}/alterar-fornecedor/${idFornecedor}`, fornecedor);
  }

  excluirFornecedor(idFornecedor: string) : Observable<IFornecedoresControllerResponse> {
    return this._httpClient.delete<IFornecedoresControllerResponse>(`${config.produtosapi_fornecedores}/excluir-fornecedor/${idFornecedor}`);
  }

  obterFornecedorPorId(idFornecedor: string) : Observable<IFornecedoresControllerResponse> {
    return this._httpClient.get<IFornecedoresControllerResponse>(`${config.produtosapi_fornecedores}/obter-fornecedor/${idFornecedor}`);
  }

  listarFornecedores() : Observable<IFornecedoresControllerResponse>{
    return this._httpClient.get<IFornecedoresControllerResponse>(`${config.produtosapi_fornecedores}/listar-fornecedores`);
  }
}
