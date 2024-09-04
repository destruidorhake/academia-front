import { TestBed } from '@angular/core/testing';

import { DialogService } from './dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ConfirmDialogComponent } from '../../Dialogs/confirm-dialog/confirm-dialog.component';

describe('DialogService', () => {
  let service: DialogService;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      providers: [
        DialogService,
        { provide: MatDialog, useValue: dialogSpy }
      ]
    });

    service = TestBed.inject(DialogService);
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve abrir o diálogo de confirmação', () => {
    const alunoId = 1;
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpyObj.afterClosed.and.returnValue(of(false));
    dialog.open.and.returnValue(dialogRefSpyObj);

    const dialogRef = service.openConfirmDialog(alunoId);

    expect(dialog.open).toHaveBeenCalledWith(ConfirmDialogComponent, jasmine.objectContaining({
      data: { alunoId },
      disableClose: true,
      autoFocus: true,
      position: { top: '25%', left: '35%' }
    }));
    expect(dialogRef).toEqual(dialogRefSpyObj);
  });
});
