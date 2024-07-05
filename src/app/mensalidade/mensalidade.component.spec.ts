import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensalidadeComponent } from './mensalidade.component';

describe('MensalidadeComponent', () => {
  let component: MensalidadeComponent;
  let fixture: ComponentFixture<MensalidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensalidadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensalidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
