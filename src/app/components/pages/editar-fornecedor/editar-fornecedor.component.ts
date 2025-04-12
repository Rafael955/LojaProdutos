import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { config } from '../../../config/environment';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../layout/navbar/navbar.component';

@Component({
  selector: 'app-editar-fornecedor',
  imports: [
    NavbarComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './editar-fornecedor.component.html',
  styleUrl: './editar-fornecedor.component.css'
})
export class EditarFornecedorComponent {

  id: string = '';

  mensagem: string = "";
  mensagem_erro: string = "";

  constructor(private http: HttpClient, private activatedRouter: ActivatedRoute) { }

  ngOnInit() {

    this.id = this.activatedRouter.snapshot.paramMap.get('id') as string;

    this.http.get(`${config.produtosapi_fornecedores}/obter-fornecedor/${this.id}`)
      .subscribe({
        next: (data: any) => {
          this.form.patchValue(data.data);
        },
        error: (err) => {
          this.mensagem_erro = err.error.message;
        }
      });
  }

  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)])
  });

  onSubmit() {

    this.mensagem = '';
    this.mensagem_erro = '';

    this.http.put(`${config.produtosapi_fornecedores}/alterar-fornecedor/${this.id}`, this.form.value)
      .subscribe({
        next: (data: any) => {
          this.mensagem = data.message;
        }, error: (err) => {
          console.log(err);
          this.mensagem_erro = err.error.message;
        }
      });
  }
}
