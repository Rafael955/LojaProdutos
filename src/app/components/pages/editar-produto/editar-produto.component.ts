import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { ProdutosService } from '../../../services/produtos.service';
import { take } from 'rxjs';
import { IProdutoRequest } from '../../../interfaces/produtos/produto-request';
import { FornecedoresService } from '../../../services/fornecedores.service';
import { IProdutosControllerResponse } from '../../../interfaces/produtos/produtos-controller-response';
import { IProdutoResponse } from '../../../interfaces/produtos/produto-response';
import { IFornecedoresControllerResponse } from '../../../interfaces/fornecedores/fornecedores-controller-response';
import { IFornecedorResponse } from '../../../interfaces/fornecedores/fornecedor-response';

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

  productImageBase64 = '';
  mensagem: string = "";
  mensagem_erro: string = "";

  produto: any;
  fornecedores: any[] = [];

  id: string = "";

  @ViewChild('imageInput') imagemProduto!: ElementRef<HTMLInputElement>;
  
  constructor(private activatedRoute: ActivatedRoute) { }

  private readonly _produtosService = inject(ProdutosService);
  private readonly _fornecedoresService = inject(FornecedoresService);


  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this._fornecedoresService.listarFornecedores()
    .pipe(take(1))
      .subscribe({
        next: (data: IFornecedoresControllerResponse) => {
          console.log(data);
          this.fornecedores = data.data as IFornecedorResponse[]
        },
        error: (err) => {
          console.error(err.error.message);
          this.mensagem_erro = err.error.message;
        }
      })

    this._produtosService.obterProduto(this.id)
    .pipe(take(1))
      .subscribe({
        next: (data: IProdutosControllerResponse) => {
          console.log(data.data);
          
          const produto = data.data as IProdutoResponse;
          console.log(this.imagemProduto.nativeElement.value);
          
          this.form.patchValue(produto);
          this.productImageBase64 = produto.imageBase64 as string;
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
      fornecedorId:  this.form.value.fornecedorId as string,
      imageBase64: this.productImageBase64
    };
    
    this._produtosService.alterarProduto(this.id, produtoAlterar)
    .pipe(take(1))
      .subscribe({
        next: (data: IProdutosControllerResponse) => {
          console.log(data);
          this.mensagem = data.message; //capturando a mensagem da API
        }, error: (err) => {
          // console.error(err);
          this.mensagem_erro = err.error.message;
        }
      })
  }

  onFileSelected(event: Event) {
   const input = event.target as HTMLInputElement;

   if(input.files && input.files.length > 0) {
    const file = input.files[0];

    this.convertFileToBase64(file);
   }
  }

  convertFileToBase64(file: File) {
    const reader = new FileReader(); 
    
    reader.onload = (e : any) => {
      const imageBase64 = e.target.result as string; //Pega texto da imagem em base 64

      this.productImageBase64 = imageBase64;

      console.log(imageBase64);
    }

    reader.onerror = (_) => {
      this.productImageBase64 = '';
    }

    reader.readAsDataURL(file);
  }
}
