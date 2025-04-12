import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { config } from '../../../config/environment';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../layout/navbar/navbar.component';

@Component({
  selector: 'app-cadastrar-produto',
  imports: [
    NavbarComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cadastrar-produto.component.html',
  styleUrl: './cadastrar-produto.component.css',
})
export class CadastrarProdutoComponent {
  
  mensagem: string = '';
  mensagem_erro: string = '';
  
  fornecedores: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit()
  {
    this.http.get(`${config.produtosapi_fornecedores}/listar-fornecedores`)
      .subscribe({
        next: (data: any) => {
          console.log(data.data);
          this.fornecedores = data.data;
        }, 
        error: (err) => {
          this.mensagem_erro = err.error.message;
        }
      })
  }

  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
    preco: new FormControl('', [Validators.required, Validators.max(99999999.99)]),
    quantidade: new FormControl('',[Validators.required]),
    fornecedorId: new FormControl('',[Validators.required])
  });


  onSubmit()
  {
    this.mensagem = '';
    this.mensagem_erro = '';

    //console.log(this.form.value); //exibindo no console os dados do formulário
    this.http.post(`${config.produtosapi_produtos}/cadastrar-produto`, this.form.value)
      .subscribe({
        next: (data: any) => {
          console.log(data.data);
          this.mensagem = data.message; //capturando a mensagem da API
          this.form.reset(); //limpando o formulário
          this.form.patchValue({ fornecedorId: '' });
        }, error: (err) => {
          // console.error(err);
          this.mensagem_erro = err.error.message;
        }
      })
  }

}
