import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICargo } from 'app/core/models/cargo.model';
import { CargoService } from 'app/core/service/cargo.service';
import { UsuarioService } from 'app/core/service/usuario.service';
import { map, startWith, take } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PerfilService } from 'app/core/service/perfil.service';
import { IPerfil } from 'app/core/models/perfil.model';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
  form: FormGroup;
  cargos: ICargo[];
  perfis: IPerfil[];
  id: number = 0;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredPerfis$: Observable<IPerfil[]>;

  constructor(
    public _dialogRef: MatDialogRef<UsuarioComponent>,
    private _formBuilder: FormBuilder,
    private _usuarioService: UsuarioService,
    private _cargoService: CargoService,
    private _perfilService: PerfilService,
    private _datepipe: DatePipe,
    private _snackBar: MatSnackBar,
    private _changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.id = data.id;
  }

  async ngOnInit() {
    this.form = this._formBuilder.group({
      id: [''],
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      dataNascimento: ['', []],
      sexo: ['m', []],
      cargo: ['', [Validators.required]],
      perfis: [[]],
      perfilInput: [null],
    });

    await this.getCargos();
    await this.getPerfis();

    if (this.id) {
      await this.getUsuario(this.id);
    }

    this.filteredPerfis$ = this.form.get('perfilInput').valueChanges.pipe(
      startWith(''),
      map((value) => this.perfilFilter(value))
    );
  }

  async getUsuario(id: number) {
    this._usuarioService.get(id).subscribe(
      (response) => {
        let dataNascimento = this._datepipe.transform(
          response.dataNascimento,
          'dd-MM-yyyy'
        );

        response.dataNascimento = dataNascimento;

        this.form.patchValue(response);
        console.log(this.form);
      },
      (response) => {
        console.error(response.error);
      }
    );
  }

  async getCargos() {
    this._cargoService.getAll().subscribe(
      (response) => {
        this.cargos = response;
      },
      (response) => {
        console.error(response.error);
      }
    );
  }

  async getPerfis() {
    this._perfilService.getAll().subscribe(
      (response) => {
        this.perfis = response;
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
    let myDate = form.dataNascimento.replace(
      /(\d{2})-(\d{2})-(\d{4})/,
      '$2/$1/$3'
    );
    let dataNascimento = this._datepipe.transform(
      myDate,
      'yyyy-MM-dd',
      'es-ES'
    );
    form.dataNascimento = dataNascimento;

    if(form.perfis === ""){
      form.perfis = [];
    }else{
      form.perfis.forEach(element => {
        element.usuarios
      });
    }

    this._usuarioService
      .save(form.id, form)
      .pipe(take(1))
      .subscribe(
        (response) => {
          this.form.enable();
          this._dialogRef.close(true);
          this.snackBar('Salvo com sucesso.', 'success');
        },
        (response) => {
          console.error(response.error);
          this.form.enable();
          this.snackBar('Erro ao salvar.', 'error');
        }
      );
  }

  onDismiss(): void {
    this._dialogRef.close(false);
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

  public objectComparisonFunction = function (option, value): boolean {
    return option.id === value.id;
  };

  public addPerfil(perfil: IPerfil) {
    var perfis = this.form.get('perfis').value;
    perfis.push(perfil);
    this.form.get('perfis').setValue(perfis);
    this.form.get('perfilInput').setValue('');
    this._changeDetectorRef.markForCheck();
  }

  public removePerfil(perfil: IPerfil) {
    console.log(perfil);
    const index = this.form.get('perfis').value.indexOf(perfil);
    if (index >= 0) {
      this.form.get('perfis').value.splice(index, 1);
      this.form.get('perfilInput').setValue('');
    }
  }

  private perfilFilter(value: any): IPerfil[] {
    if (this.perfis && value) {
      const filterValue =
        value === null || value instanceof Object ? '' : value.toLowerCase();

      const matches = this.perfis.filter((fruit) =>
        fruit.nome.toLowerCase().includes(filterValue)
      );
      
      const formValue = this.form.get('perfis').value;
      return formValue === null
        ? matches
        : matches.filter((x) => !formValue.find((y) => y.id === x.id));
    }
  }
}
