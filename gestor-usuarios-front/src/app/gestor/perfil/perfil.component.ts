import {  Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PerfilService } from 'app/core/service/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  form: FormGroup;
  id: number = 0;

  constructor(
    public _dialogRef: MatDialogRef<PerfilComponent>,
    private _formBuilder: FormBuilder,
    private _perfilService: PerfilService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.id = data.id;
  }

  ngOnInit() {
    this.form = this._formBuilder.group({
      id: [''],
      nome: ['', [Validators.required]],
    });


    if (this.id) {
      this.getPerfil(this.id);
    }
  }

  getPerfil(id: number) {
    this._perfilService.get(id).pipe(take(1)).subscribe(
      (response) => {
        this.form.patchValue(response);
        console.log(this.form);
      },
      (response) => {
        console.error(response.error);
      }
    );
  }

  onConfirm() {
    if (this.form.invalid) {
      return;
    }
    this.form.disable();
    const form = this.form.getRawValue();

    this._perfilService
      .save(form.id, form)
      .pipe(take(1))
      .subscribe(
        (response) => {
          this.form.enable();
          this._dialogRef.close(true);
          this.snackBar("Salvo com sucesso.", "success");
        },
        (response) => {
          console.error(response.error);
          this.form.enable();
          this.snackBar("Erro ao salvar.", "error");
        }
      );
  }

  snackBar(message: string, type: string) {
    if (type == "success") {
      this._snackBar.open(message, "", {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 5000,
        panelClass: ["bg-primary", "text-on-primary", "text-center"],
      });
    } else {
      this._snackBar.open(message, "", {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 5000,
        panelClass: ["bg-warn", "text-on-warn", "text-center"],
      });
    }
  }

  onDismiss(): void {
    this._dialogRef.close(false);
  }
}
