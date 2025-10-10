import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { FornecedoresService } from '../../../services/fornecedores.service';
import { take } from 'rxjs';

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

  fornecedorParaSeExcluir: any = '';

  p: number = 1;

  private readonly _fornecedoresService = inject(FornecedoresService);

  ngOnInit() {
    this.usuario_logado = JSON.parse(sessionStorage.getItem('usuario') as string);

    this._fornecedoresService.listarFornecedores()
     .pipe(take(1))
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
      
      this.fornecedorParaSeExcluir = '';
  }

  prepareDelete(fornecedor: any) {
    this.fornecedorParaSeExcluir = fornecedor;
  }

  onDelete() {
    const id = this.fornecedorParaSeExcluir.id;

    this._fornecedoresService.excluirFornecedor(id)
     .pipe(take(1))
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

  cancelarExclusao() {
    this.fornecedorParaSeExcluir = '';
  }
}
