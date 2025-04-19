import { Component } from '@angular/core';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { config } from '../../../config/environment';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-consultar-produtos',
  imports: [
    NavbarComponent,
    CommonModule,
    RouterLink,
    NgxPaginationModule
  ],
  templateUrl: './consultar-produtos.component.html',
  styleUrl: './consultar-produtos.component.css'
})
export class ConsultarProdutosComponent {

  mensagem: string = '';
  mensagem_erro: string = '';
  produtos: any[] = [];
  usuario_logado: any;

  produtoParaSeExcluir: any = '';

  p: number = 1;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.usuario_logado = JSON.parse(sessionStorage.getItem('usuario') as string);

    this.http.get(config.produtosapi_produtos + '/listar-produtos')
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.produtos = data.data as any[];
        },
        error: (err) => {
          console.log(err.error.message);
          this.mensagem_erro = err.error.message;
        }
      })

    this.produtoParaSeExcluir = '';
  }

  prepareDelete(produto: any) {
    this.produtoParaSeExcluir = produto;
  }

  onDelete() {
    
    const id = this.produtoParaSeExcluir.id;

    this.http.delete(`${config.produtosapi_produtos}/excluir-produto/${id}`)
      .subscribe({
        next: (data: any) => {
          console.log(data.data);
          this.ngOnInit(); // recarregar a lista
          this.mensagem = data.message;
        },
        error: (err) => {
          console.log(err.error.message);
          this.mensagem_erro = err.error.message;
        }
      })
  }

  cancelarExclusao() {
    this.produtoParaSeExcluir = '';
  }
}
