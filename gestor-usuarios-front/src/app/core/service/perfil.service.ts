
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of, ReplaySubject } from "rxjs";
import { map, switchMap, take, tap } from "rxjs/operators";
import { environment } from "environments/environment";
import { IPerfil } from "../models/perfil.model";

const baseUrl = `${environment.apiUrl}/perfil`;

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private _perfil: BehaviorSubject<IPerfil> = new BehaviorSubject(null);
  private _perfis: BehaviorSubject<IPerfil[] | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient) {}

  set perfil(value: IPerfil) {
    this._perfil.next(value);
  }

  get perfil$(): Observable<IPerfil> {
    return this._perfil.asObservable();
  }

  get perfis$(): Observable<IPerfil[]> {
    return this._perfis.asObservable();
  }

  get(id: number): Observable<IPerfil> {
      return this._httpClient.get<IPerfil>(`${baseUrl}/${id}`).pipe(
        tap((data) => {
          this._perfil.next(data);
        })
      );
  }

  getAll(): Observable<IPerfil[]> {
    return this._httpClient.get<IPerfil[]>(`${baseUrl}`).pipe(
      tap((data) => {
        this._perfis.next(data);
      })
    );
  }

  save(id: number, usuario: IPerfil): Observable<any> {
    if (id == 0) {
      return this.perfis$.pipe(
        take(1),
        switchMap((objs) =>
          this._httpClient.post<IPerfil>(`${baseUrl}`, usuario).pipe(
            map((newObj) => {
              this._perfil.next(newObj);

              let objsOrder = [newObj, ...objs];
              objsOrder.sort((a, b) => a.nome.localeCompare(b.nome));
              this._perfis.next(objsOrder);
              return newObj;
            })
          )
        )
      );
    } else {
      return this._httpClient.put(`${baseUrl}`, usuario).pipe(
        tap((data) => {
          this._perfis.next(data);
        })
      );
    }
  }

  delete(id: number): Observable<any> {
    return this.perfis$.pipe(
      take(1),
      switchMap((objs) =>
        this._httpClient.delete<any>(`${baseUrl}/${id}`).pipe(
          map((isDeleted: boolean) => {
            const index = objs.findIndex((item) => item.id === id);
            objs.splice(index, 1);
            this._perfis.next(objs);
            return isDeleted;
          })
        )
      )
    );
  }
}
