import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { config } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { IFornecedorResponse } from '../interfaces/fornecedor-response';
import { IFornecedorRequest } from '../interfaces/fornecedor-request';

@Injectable({
  providedIn: 'root'
})
export class FornecedoresService {
  private readonly _httpClient = inject(HttpClient);

  cadastrarFornecedor(fornecedor: IFornecedorRequest) : Observable<IFornecedorResponse> {
    return this._httpClient.post<IFornecedorResponse>(`${config.produtosapi_fornecedores}/cadastrar-fornecedor`, fornecedor);
  }

  alterarFornecedor(idFornecedor: string, fornecedor: IFornecedorRequest) : Observable<IFornecedorResponse> {
    return this._httpClient.put<IFornecedorResponse>(`${config.produtosapi_fornecedores}/alterar-fornecedor/${idFornecedor}`, fornecedor);
  }

  excluirFornecedor(idFornecedor: string) : Observable<IFornecedorResponse> {
    return this._httpClient.delete<IFornecedorResponse>(`${config.produtosapi_fornecedores}/excluir-fornecedor/${idFornecedor}`);
  }

  obterFornecedorPorId(idFornecedor: string) : Observable<IFornecedorResponse> {
    return this._httpClient.get<IFornecedorResponse>(`${config.produtosapi_fornecedores}/obter-fornecedor/${idFornecedor}`);
  }

  listarFornecedores() : Observable<IFornecedorResponse>{
    return this._httpClient.get<IFornecedorResponse>(`${config.produtosapi_fornecedores}/listar-fornecedores`);
  }
}
