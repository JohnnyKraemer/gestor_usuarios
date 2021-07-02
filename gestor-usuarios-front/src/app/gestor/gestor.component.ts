import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from 'app/core/models/usuario.model';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { UsuarioService } from 'app/core/service/usuario.service';
import { UsuarioComponent } from './usuario/usuario.component';
import { CargoService } from 'app/core/service/cargo.service';
import { ICargo } from 'app/core/models/cargo.model';
import { IPerfil } from 'app/core/models/perfil.model';
import { PerfilService } from 'app/core/service/perfil.service';
import { CargoComponent } from './cargo/cargo.component';
import { ConfirmDialogComponent } from './common/confirm-dialog/confirm-dialog.component';
import { take } from 'rxjs/operators';
import { PerfilComponent } from './perfil/perfil.component';

@Component({
  selector: 'app-gestor',
  templateUrl: './gestor.component.html',
  styleUrls: ['./gestor.component.scss'],
})
export class GestorComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'nome',
    'cpf',
    'dataNascimento',
    'cargo',
    'acoes',
  ];
  dataSource: MatTableDataSource<IUsuario>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  usuarios: IUsuario[];
  cargos: ICargo[];
  perfis: IPerfil[];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService,
    private _cargoService: CargoService,
    private _perfilService: PerfilService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getUsuarios();
    this.getCargos();
    this.getPerfis();
  }

  ngAfterViewInit() {}

  getUsuarios() {
    this._usuarioService.getAll().subscribe(
      (response) => {
        this.dataSource = new MatTableDataSource<IUsuario>(response);
        this.dataSource.paginator = this.paginator;
      },
      (response) => {
        console.error(response.error);
      }
    );
  }

  getCargos() {
    this._cargoService.getAll().subscribe(
      (response) => {
        this.cargos = response;
      },
      (response) => {
        console.error(response.error);
      }
    );
  }

  getPerfis() {
    this._perfilService.getAll().subscribe(
      (response) => {
        this.perfis = response;
      },
      (response) => {
        console.error(response.error);
      }
    );
  }

  openDialogUsuario(id: number): void {
    const dialogRef = this._dialog.open(UsuarioComponent, {
      width: '500px',
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getUsuarios();
        this.getCargos();
        this.getPerfis();
      }
    });
  }

  openDialogCargo(id: number): void {
    const dialogRef = this._dialog.open(CargoComponent, {
      width: '500px',
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getCargos();
      }
    });
  }

  openDialogPerfil(id: number): void {
    const dialogRef = this._dialog.open(PerfilComponent, {
      width: '500px',
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getPerfis();
      }
    });
  }

  deleteUsuario(id: number) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Excluir',
        message: 'Tem certeza que deseja excluir este registro?',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this._usuarioService
            .delete(id)
            .pipe(take(1))
            .subscribe(
              (response) => {
                this.getUsuarios();
                this.getCargos();
                this.getPerfis();
                this.snackBar('Sucesso ao excluir usuário.', 'success');
              },
              (response) => {
                console.error(response.error);
                this.snackBar('Erro ao excluir usuário.', 'error');
              }
            );
        }
      });
  }

  deleteCargo(id: number) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Excluir',
        message: 'Tem certeza que deseja excluir este registro?',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this._cargoService
            .delete(id)
            .pipe(take(1))
            .subscribe(
              (response) => {
                this.snackBar('Sucesso ao excluir cargo.', 'success');
              },
              (response) => {
                console.error(response.error);
                this.snackBar('Erro ao excluir cargo.', 'error');
              }
            );
        }
      });
  }

  deletePerfil(id: number) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Excluir',
        message: 'Tem certeza que deseja excluir este registro?',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this._perfilService
            .delete(id)
            .pipe(take(1))
            .subscribe(
              (response) => {
                this.snackBar('Sucesso ao excluir perfil.', 'success');
              },
              (response) => {
                this.snackBar(response.error, 'error');
              }
            );
        }
      });
  }

  snackBar(message: string, type: string) {
    if (type == 'success') {
      this._snackBar.open(message, '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000,
        panelClass: ['bg-primary', 'text-on-primary', 'text-center'],
      });
    } else {
      this._snackBar.open(message, '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000,
        panelClass: ['bg-warn', 'text-on-warn', 'text-center'],
      });
    }
  }
}
