import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProdutoRequest } from '../interfaces/produtos/produto-request';
import { config } from '../environments/environment.development';
import { IProdutosControllerResponse } from '../interfaces/produtos/produtos-controller-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private readonly _httpClient = inject(HttpClient);

  cadastrarProduto(produto: IProdutoRequest) : Observable<IProdutosControllerResponse> {
    return this._httpClient.post<IProdutosControllerResponse>(`${config.produtosapi_produtos}/cadastrar-produto`, produto);
  }

  alterarProduto(idProduto: string, produto: IProdutoRequest) : Observable<IProdutosControllerResponse>  {
    return this._httpClient.put<IProdutosControllerResponse>(`${config.produtosapi_produtos}/alterar-produto/${idProduto}`, produto);
  }

  excluirProduto(idProduto: string) : Observable<IProdutosControllerResponse> {
    return this._httpClient.delete<IProdutosControllerResponse>(`${config.produtosapi_produtos}/excluir-produto/${idProduto}`);
  }

  obterProduto(idProduto: string): Observable<IProdutosControllerResponse> {
    return this._httpClient.get<IProdutosControllerResponse>(`${config.produtosapi_produtos}/obter-produto/${idProduto}`);
  }

  listarProdutos(): Observable<IProdutosControllerResponse> {
    return this._httpClient.get<IProdutosControllerResponse>(`${config.produtosapi_produtos}/listar-produtos`);
  }

}
