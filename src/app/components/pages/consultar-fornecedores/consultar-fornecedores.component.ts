import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { config } from '../../../config/environment';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarComponent } from '../../layout/navbar/navbar.component';

@Component({
  selector: 'app-consultar-fornecedores',
  imports: [
    NavbarComponent,
    CommonModule,
    RouterLink,
    NgxPaginationModule
  ],
  templateUrl: './consultar-fornecedores.component.html',
  styleUrl: './consultar-fornecedores.component.css'
})
export class ConsultarFornecedoresComponent {
  mensagem: string = "";
  mensagem_erro: string = "";
  usuario_logado: any;

  fornecedores: any[] = [];

  p: number = 1;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.usuario_logado = JSON.parse(sessionStorage.getItem('usuario') as string);

    this.http.get(`${config.produtosapi_fornecedores}/listar-fornecedores`)
      .subscribe({
        next: (data: any) => {
          console.log(data.data)
          this.fornecedores = data.data as any[];
        },
        error: (err) => {
          console.error(err.error.message);
          this.mensagem_erro = err.error.message;
        }
      })
  }

  onDelete(id: string) {

    if (confirm('Deseja realmente excluir o fornecedor desejado?')) {
      this.http.delete(`${config.produtosapi_fornecedores}/excluir-fornecedor/${id}`)
        .subscribe({
          next: (data: any) => {
            this.ngOnInit();
            this.mensagem = data.message;
          },
          error: (err) => {
            this.mensagem_erro = err.error.message;
          }
        })
    }
  }
}
