import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { config } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { FornecedoresService } from '../../../services/fornecedores.service';
import { IFornecedorRequest } from '../../../interfaces/fornecedores/fornecedor-request';
import { take } from 'rxjs';
import { IFornecedorResponse } from '../../../interfaces/fornecedores/fornecedor-response';
import { IFornecedoresControllerResponse } from '../../../interfaces/fornecedores/fornecedores-controller-response';

@Component({
  selector: 'app-cadastrar-fornecedor',
  imports: [
    NavbarComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar-fornecedor.component.html',
  styleUrl: './cadastrar-fornecedor.component.css'
})
export class CadastrarFornecedorComponent {

  mensagem: string = "";
  mensagem_erro: string = "";

  private readonly _fornecedorService = inject(FornecedoresService);

  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)])
  });

  onSubmit() {
    this.mensagem = '';
    this.mensagem_erro = '';

    const novoFornecedor: IFornecedorRequest = {
      nome: this.form.value.nome as string
    }

    this._fornecedorService.cadastrarFornecedor(novoFornecedor)
     .pipe(take(1))
      .subscribe({
        next: (data: IFornecedoresControllerResponse) => {
          this.mensagem = data.message;
          this.form.reset();
        },
        error: (err) => {
          this.mensagem_erro = err.error.message;
        }
      })
  }
}
