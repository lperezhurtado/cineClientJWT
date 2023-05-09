import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedEntradasComponent } from './selected-entradas.component';

describe('SelectedEntradasComponent', () => {
  let component: SelectedEntradasComponent;
  let fixture: ComponentFixture<SelectedEntradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedEntradasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedEntradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
