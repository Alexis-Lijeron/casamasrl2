import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

// Interfaz para la categoría
export interface Categoria {
  id?: number;
  nombre: string;
}

const httpOptions = (token: string) => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }),
});

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private apiUrl = `${environment.URL_SERVICIOS}/categoria`;

  constructor(private http: HttpClient) { }

  // Obtener todas las categorías
  getCategorias(): Observable<Categoria[]> {
    const token = sessionStorage.getItem('token');
    console.log('Token usado:', token);
    if (token) {
      return this.http.get<Categoria[]>(this.apiUrl, httpOptions(token)).pipe(
        tap((categorias) => console.log('Categorías cargadas:', categorias)),
        catchError(this.handleError<Categoria[]>('getCategorias', []))
      );
    } else {
      console.error('No hay token disponible');
      return of([]);
    }
  }

  // Obtener una categoría por ID
  getCategoriaById(id: number): Observable<Categoria> {
    const token = sessionStorage.getItem('token');
    if (token) {
      return this.http.get<Categoria>(`${this.apiUrl}/${id}`, httpOptions(token)).pipe(
        catchError(this.handleError<Categoria>('getCategoriaById'))
      );
    } else {
      console.error('No hay token disponible');
      return of({} as Categoria);
    }
  }

  // Crear una nueva categoría
  createCategoria(categoria: Categoria): Observable<Categoria> {
    const token = sessionStorage.getItem('token');
    if (token) {
      if (!categoria.nombre) {
        console.error('El nombre de la categoría es obligatorio');
        return of({} as Categoria);
      }

      return this.http.post<Categoria>(this.apiUrl, categoria, httpOptions(token)).pipe(
        tap((newCategoria) => console.log('Categoría creada:', newCategoria)),
        catchError(this.handleError<Categoria>('createCategoria', categoria))
      );
    } else {
      console.error('No hay token disponible');
      return of({} as Categoria);
    }
  }

  // Actualizar una categoría
  updateCategoria(id: number, categoria: Categoria): Observable<Categoria> {
    const token = sessionStorage.getItem('token');
    if (token) {
      return this.http.put<Categoria>(`${this.apiUrl}/${id}`, categoria, httpOptions(token)).pipe(
        tap(() => console.log(`Categoría actualizada con ID: ${id}`)),
        catchError(this.handleError<Categoria>('updateCategoria', categoria))
      );
    } else {
      console.error('No hay token disponible');
      return of({} as Categoria);
    }
  }

  // Eliminar una categoría
  deleteCategoria(id: number): Observable<void> {
    const token = sessionStorage.getItem('token');
    if (token) {
      return this.http.delete<void>(`${this.apiUrl}/${id}`, httpOptions(token)).pipe(
        tap(() => console.log(`Categoría eliminada con ID: ${id}`)),
        catchError(this.handleError<void>('deleteCategoria'))
      );
    } else {
      console.error('No hay token disponible');
      return of();
    }
  }

  // Manejo de errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
