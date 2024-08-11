import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../Dialogs/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

    // METODO DE ABRIR DIALOG
    openConfirmDialog(alunoId: number): MatDialogRef<ConfirmDialogComponent> {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = { alunoId };
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.position = { top: '25%',left: '-35%' };

      const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        if (!result) {
          console.log('Ação cancelada pelo usuário.');
        }
      });

      return dialogRef;
    }
}
