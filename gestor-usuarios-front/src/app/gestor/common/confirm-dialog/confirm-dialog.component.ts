import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-confirm-dialog",
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: ["./confirm-dialog.component.scss"],
})
export class ConfirmDialogComponent {
  title: string;
  message: string;
  confirmButtonText: string = "Sim";
  cancelButtonText: string = "Cancelar";

  constructor(
    public _dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel
  ) {
    this.title = data.title;
    this.message = data.message;

    if (data.confirmButtonText) {
      this.confirmButtonText = data.confirmButtonText;
    }

    if (data.cancelButtonText) {
      this.cancelButtonText = data.cancelButtonText;
    }
  }

  onConfirm(): void {
    this._dialogRef.close(true);
  }

  onDismiss(): void {
    this._dialogRef.close(false);
  }
}

export class ConfirmDialogModel {
  constructor(
    public title: string,
    public message: string,
    public confirmButtonText?: string,
    public cancelButtonText?: string
  ) {}
}
