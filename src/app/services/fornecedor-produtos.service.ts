import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { config } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { IFornecedorProdutosResponse } from '../interfaces/fornecedores/fornecedor-produtos-response';

@Injectable({
  providedIn: 'root'
})
export class FornecedorProdutosService {
  private readonly _httpClient = inject(HttpClient);

  obterDadosFornecedorProdutos() : Observable<IFornecedorProdutosResponse> {
    return this._httpClient.get<IFornecedorProdutosResponse>(`${config.produtosapi_dashboard}/obter-dados-fornecedores-produtos`);
  }
}
