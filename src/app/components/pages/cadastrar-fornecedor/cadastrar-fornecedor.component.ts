import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { config } from '../../../config/environment';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../layout/navbar/navbar.component';

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

  constructor(private http: HttpClient) { }

  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)])
  });

  onSubmit() {
    this.mensagem = '';
    this.mensagem_erro = '';

    this.http.post(`${config.produtosapi_fornecedores}/cadastrar-fornecedor`, this.form.value)
      .subscribe({
        next: (data: any) => {
          this.mensagem = data.message;
          this.form.reset();
        },
        error: (err) => {
          this.mensagem_erro = err.error.message;
        }
      })
  }
}
