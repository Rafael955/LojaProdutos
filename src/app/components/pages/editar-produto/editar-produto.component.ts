import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { config } from '../../../environments/environment';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { ProdutosService } from '../../../services/produtos.service';
import { IProdutoRequest } from '../../../interfaces/produto-request';
import { take } from 'rxjs';

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

  constructor(private activatedRoute: ActivatedRoute) { }

  private readonly _produtosService = inject(ProdutosService);

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this._produtosService.obterProduto(this.id)
    .pipe(take(1))
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

    this._produtosService.listarProdutos()
    .pipe(take(1))
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
    preco: new FormControl(0, [Validators.required, Validators.max(99999999.99)]),
    quantidade: new FormControl(0, [Validators.required]),
    fornecedorId: new FormControl('', [Validators.required])
  });

  onSubmit() {
    this.mensagem = '';
    this.mensagem_erro = '';

    //console.log(this.form.value); //exibindo no console os dados do formulário
    const produtoAlterar: IProdutoRequest = {
      nome: this.form.value.nome as string,
      preco:  this.form.value.preco as number,
      quantidade:  this.form.value.quantidade as number,
      fornecedorId:  this.form.value.fornecedorId as string
    };
    
    this._produtosService.alterarProduto(this.id, produtoAlterar)
    .pipe(take(1))
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.mensagem = data.message; //capturando a mensagem da API
        }, error: (err) => {
          // console.error(err);
          this.mensagem_erro = err.error.message;
        }
      })
  }
}
