import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { config } from '../../../environments/environment';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProdutosService } from '../../../services/produtos.service';
import { take } from 'rxjs';

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

  private readonly _produtosService = inject(ProdutosService);

  ngOnInit() {
    this.usuario_logado = JSON.parse(sessionStorage.getItem('usuario') as string);

    this._produtosService.listarProdutos()
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

    this._produtosService.excluirProduto(id)
     .pipe(take(1))
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
