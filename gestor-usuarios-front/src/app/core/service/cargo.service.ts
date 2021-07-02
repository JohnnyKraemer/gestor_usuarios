
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of, ReplaySubject } from "rxjs";
import { map, switchMap, take, tap } from "rxjs/operators";
import { environment } from "environments/environment";
import { Cargo, ICargo } from "../models/cargo.model";

const baseUrl = `${environment.apiUrl}/cargo`;

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  private _cargo: BehaviorSubject<ICargo> = new BehaviorSubject(null);
  private _cargos: BehaviorSubject<ICargo[] | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient) {}

  set cargo(value: ICargo) {
    this._cargo.next(value);
  }

  get cargo$(): Observable<ICargo> {
    return this._cargo.asObservable();
  }

  get cargos$(): Observable<ICargo[]> {
    return this._cargos.asObservable();
  }

  get(id: number): Observable<ICargo> {
    return this._httpClient.get<ICargo>(`${baseUrl}/${id}`).pipe(
      tap((data) => {
        this._cargo.next(data);
      })
    );
  }

  getAll(): Observable<ICargo[]> {
    return this._httpClient.get<ICargo[]>(`${baseUrl}`).pipe(
      tap((data) => {
        this._cargos.next(data);
      })
    );
  }

  save(id: number, cargo: ICargo): Observable<any> {
    if (id == 0) {
      return this.cargos$.pipe(
        take(1),
        switchMap((objs) =>
          this._httpClient.post<ICargo>(`${baseUrl}`, cargo).pipe(
            map((newObj) => {
              this._cargo.next(newObj);

              let objsOrder = [newObj, ...objs];
              objsOrder.sort((a, b) => a.nome.localeCompare(b.nome));
              this._cargos.next(objsOrder);
              return newObj;
            })
          )
        )
      );
    } else {
      return this._httpClient.put(`${baseUrl}`, cargo).pipe(
        tap((data) => {
          this._cargos.next(data);
        })
      );
    }
  }

  delete(id: number): Observable<any> {
    return this.cargos$.pipe(
      take(1),
      switchMap((objs) =>
        this._httpClient.delete<any>(`${baseUrl}/${id}`).pipe(
          map((isDeleted: boolean) => {
            const index = objs.findIndex((item) => item.id === id);
            objs.splice(index, 1);
            this._cargos.next(objs);
            return isDeleted;
          })
        )
      )
    );
  }
}
