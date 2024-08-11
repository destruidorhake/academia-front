import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { alunoId: number }
  ) { }


  // METODO PARA ENCERRAR DIALOG
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // METODO AO CONFIRMAR OPERAÇÃO - SIM
  onConfirm(): void {
    this.dialogRef.close(true);
  }

  // METODO PARA CACELAR OPERAÇÃO - NÃO
  onCancel(): void {
    this.dialogRef.close(false);
  }

// METODO PARA RESETAR O FOCO DO MOUSE NA DIALOG OU FORA DO CONTEUDO
  resetButtonFocus(): void {
    const element: HTMLElement | null = document.getElementById('btn-confirm');
    if (element) {
      element.blur();
    }
  }
}
