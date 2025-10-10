import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICriarUsuarioRequest } from '../interfaces/usuarios/criar-usuario-request';
import { config } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { ICriarUsuarioResponse } from '../interfaces/usuarios/criar-usuario-response';
import { ILoginUsuarioRequest } from '../interfaces/usuarios/login-usuario-request';
import { ILoginUsuarioResponse } from '../interfaces/usuarios/login-usuario-response';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private readonly _httpClient = inject(HttpClient);

  criarUsuario(usuario: ICriarUsuarioRequest) : Observable<ICriarUsuarioResponse> {
    return this._httpClient.post<ICriarUsuarioResponse>(`${config.usuariosapi}/criar-usuario`, usuario)
  }

  loginUsuario(usuario: ILoginUsuarioRequest) : Observable<ILoginUsuarioResponse> {
    return this._httpClient.post<ILoginUsuarioResponse>(`${config.usuariosapi}/login-usuario`, usuario)
  }
}
