import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { config } from '../../../config/environment';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../layout/navbar/navbar.component';

@Component({
  selector: 'app-editar-produto',
  imports: [
    NavbarComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './editar-produto.component.html',
  styleUrl: './editar-produto.component.css'
})
export class EditarProdutoComponent {

  mensagem: string = "";
  mensagem_erro: string = "";

  produto: any;
  fornecedores: any[] = [];

  id: string = "";

  constructor(private http: HttpClient,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this.http.get(`${config.produtosapi_produtos}/obter-produto/${this.id}`)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.form.patchValue(data.data);
        },
        error: (err) => {
          console.error(err.error.message);
          this.mensagem_erro = err.error.message;
        }
      })

    this.http.get(`${config.produtosapi_fornecedores}/listar-fornecedores`)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.fornecedores = data.data as any[]
        },
        error: (err) => {
          console.error(err.error.message);
          this.mensagem_erro = err.error.message;
        }
      })
  }

  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
    preco: new FormControl('', [Validators.required, Validators.max(99999999.99)]),
    quantidade: new FormControl('', [Validators.required]),
    fornecedorId: new FormControl('', [Validators.required])
  });

  onSubmit() {
    this.mensagem = '';
    this.mensagem_erro = '';

    //console.log(this.form.value); //exibindo no console os dados do formulário
    this.http.put(`${config.produtosapi_produtos}/alterar-produto/${this.id}`, this.form.value)
      .subscribe({
        next: (data: any) => {
          console.log(data.data);
          this.mensagem = data.message; //capturando a mensagem da API
        }, error: (err) => {
          // console.error(err);
          this.mensagem_erro = err.error.message;
        }
      })
  }
}
