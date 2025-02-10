import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { User } from '../../interfaces/user.interface';
import { environment } from '../../../environments/environment.development';
import { map } from 'jquery';

const httpOptions = (token: string) => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }),
});

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = `${environment.URL_SERVICIOS}/usuario`;
  
  // private _usuariosSubject = new Subject<User[]>();
  // public usuarios$ = this._usuariosSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsuarios(): Observable<User[]> {
    const token = sessionStorage.getItem('token'); // Obtener el token del localStorage
    console.log('Token usado:', token);
    if (token) {
      return this.http
        .get<User[]>(this.apiUrl, httpOptions(token))
        .pipe(
          // tap((usuarios) => {
          //   console.log('Usuarios cargados:', usuarios);
          //   this._usuariosSubject.next(usuarios);
          // }),
          catchError(this.handleError('getUsuarios', []))
        );
    } else {
      return of([]); // Si no hay token, devuelve un array vacío
    }
  }

  // Obtener un usuario por ID
  getUsuarioById(id: number): Observable<User> {
    const token = sessionStorage.getItem('token');
    if (token) {
      return this.http
        .get<User>(`${this.apiUrl}/${id}`, httpOptions(token))
        .pipe(catchError(this.handleError<User>('getUsuarioById')));
    } else {
      console.error('No hay token disponible');
      return of({} as User); // Retorna un objeto vacío si no hay token
    }
  }

  // Crear un nuevo usuario
  createUsuario(usuario: User): Observable<User> {
    const token = sessionStorage.getItem('token');
    if (token) {
      // Verificar que todos los campos sean válidos antes de enviar
      if (!usuario.username || !usuario.fullname) {
        console.error('Faltan datos necesarios para crear el usuario');
        return of({} as User); // Retorna un objeto vacío si falta algún dato
      }

      return this.http
        .post<User>(this.apiUrl, usuario, httpOptions(token))
        .pipe(catchError(this.handleError('addProduct', usuario)));
    } else {
      console.error('No hay token disponible');
      return of({} as User); // Retorna un objeto vacío si no hay token
    }
  }

  // Actualizar un usuario
  updateUsuario(id: number, usuario: User): Observable<User> {
    const token = sessionStorage.getItem('token');
    if (token) {
      return this.http
        .put<User>(`${this.apiUrl}/${id}`, usuario, httpOptions(token))
        .pipe(
          tap(() => console.log('Usuario actualizado:', usuario)),
          catchError(this.handleError('updateUsuario', usuario)));
    } else {
      console.error('No hay token disponible');
      return of({} as User); // Retorna un objeto vacío si no hay token
    }
  }

  // Eliminar un usuario
  deleteUsuario(id: number): Observable<void> {
    const token = sessionStorage.getItem('token');
    if (token) {
      return this.http.delete<void>(`${this.apiUrl}/${id}`, httpOptions(token)).pipe(
        catchError(this.handleError<void>('deleteUsuario'))
      );
    } else {
      console.error('No hay token disponible');
      return of(); // Retorna un observable vacío si no hay token
    }
  }
  
  // Manejo de errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Loguea el error para depuración
      return of(result as T); // Retorna el resultado predeterminado
    };
  }
}
