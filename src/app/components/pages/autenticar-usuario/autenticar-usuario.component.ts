import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { config } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-autenticar-usuario',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './autenticar-usuario.component.html',
  styleUrl: './autenticar-usuario.component.css'
})
export class AutenticarUsuarioComponent {
  mensagem_erro: string = "";

  constructor(private http: HttpClient) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  onSubmit() {
    this.LimparMensagens();

    this.http.post(`${config.usuariosapi}/login-usuario`, this.form.value)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          //guardar o usuário autenticado na sessão
          sessionStorage.setItem('usuario', JSON.stringify(data));
          //redirecionar para a página de dashboard
          location.href = '/pages/dashboard';
        },
        error: (err) => {
          this.mensagem_erro = err.error.message;
        }
      })
  }

  LimparMensagens() {
    this.mensagem_erro = '';
  }
}
