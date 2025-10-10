import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { config } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UsuariosService } from '../../../services/usuarios.service';
import { take } from 'rxjs';
import { ILoginUsuarioRequest } from '../../../interfaces/usuarios/login-usuario-request';
import { ILoginUsuarioResponse } from '../../../interfaces/usuarios/login-usuario-response';

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

  private readonly _usuariosService = inject(UsuariosService);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  onSubmit() {
    this.LimparMensagens();

    const dadosUsuario: ILoginUsuarioRequest = {
      email: this.form.value.email as string,
      senha: this.form.value.senha as string
    }

    this._usuariosService.loginUsuario(dadosUsuario)
     .pipe(take(1))
      .subscribe({
        next: (data: ILoginUsuarioResponse) => {
          console.log(data);
          console.log("data");
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
