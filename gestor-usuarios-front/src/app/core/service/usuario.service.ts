
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of, ReplaySubject } from "rxjs";
import { map, switchMap, take, tap } from "rxjs/operators";
import { IUsuario, Usuario } from "app/core/models/usuario.model";
import { environment } from "environments/environment";

const baseUrl = `${environment.apiUrl}/usuario`;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private _usuario: BehaviorSubject<IUsuario> = new BehaviorSubject(null);
  private _usuarios: BehaviorSubject<IUsuario[] | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient) {}

  set usuario(value: IUsuario) {
    this._usuario.next(value);
  }

  get usuario$(): Observable<IUsuario> {
    return this._usuario.asObservable();
  }

  get usuarios$(): Observable<IUsuario[]> {
    return this._usuarios.asObservable();
  }

  get(id: number): Observable<IUsuario> {
      return this._httpClient.get<IUsuario>(`${baseUrl}/${id}`).pipe(
        tap((data) => {
          this._usuario.next(data);
        })
      );
  }

  getAll(): Observable<IUsuario[]> {
    return this._httpClient.get<IUsuario[]>(`${baseUrl}`).pipe(
      tap((data) => {
        this._usuarios.next(data);
      })
    );
  }

  save(id: number, usuario: IUsuario): Observable<any> {
    if (id == 0) {
      return this.usuarios$.pipe(
        take(1),
        switchMap((objs) =>
          this._httpClient.post<IUsuario>(`${baseUrl}`, usuario).pipe(
            map((newObj) => {
              this._usuario.next(newObj);

              let objsOrder = [newObj, ...objs];
              objsOrder.sort((a, b) => a.nome.localeCompare(b.nome));
              this._usuarios.next(objsOrder);
              return newObj;
            })
          )
        )
      );
    } else {
      return this._httpClient.put(`${baseUrl}`, usuario).pipe(
        tap((data) => {
          this._usuarios.next(data);
        })
      );
    }
  }

  delete(id: number): Observable<any> {
    return this.usuarios$.pipe(
      take(1),
      switchMap((objs) =>
        this._httpClient.delete<any>(`${baseUrl}/${id}`).pipe(
          map((isDeleted: boolean) => {
            const index = objs.findIndex((item) => item.id === id);
            objs.splice(index, 1);
            this._usuarios.next(objs);
            return isDeleted;
          })
        )
      )
    );
  }
}
