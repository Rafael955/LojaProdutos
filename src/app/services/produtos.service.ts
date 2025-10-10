import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProdutoRequest } from '../interfaces/produto-request';
import { config } from '../environments/environment.development';
import { IProdutoResponse } from '../interfaces/produto-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private readonly _httpClient = inject(HttpClient);

  cadastrarProduto(produto: IProdutoRequest) : Observable<IProdutoResponse> {
    return this._httpClient.post<IProdutoResponse>(`${config.produtosapi_produtos}/cadastrar-produto`, produto);
  }

  alterarProduto(idProduto: string, produto: IProdutoRequest) : Observable<IProdutoResponse>  {
    return this._httpClient.put<IProdutoResponse>(`${config.produtosapi_produtos}/alterar-produto/${idProduto}`, produto);
  }

  excluirProduto(idProduto: string) : Observable<IProdutoResponse> {
    return this._httpClient.delete<IProdutoResponse>(`${config.produtosapi_produtos}/excluir-produto/${idProduto}`);
  }

  obterProduto(idProduto: string): Observable<IProdutoResponse> {
    return this._httpClient.get<IProdutoResponse>(`${config.produtosapi_produtos}/obter-produto/${idProduto}`);
  }

  listarProdutos(): Observable<IProdutoResponse> {
    return this._httpClient.get<IProdutoResponse>(`${config.produtosapi_produtos}/listar-produtos`);
  }

}
