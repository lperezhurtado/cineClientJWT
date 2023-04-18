import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTipousuarioSelectionComponent } from './lista-tipousuario-selection.component';

describe('ListaTipousuarioSelectionComponent', () => {
  let component: ListaTipousuarioSelectionComponent;
  let fixture: ComponentFixture<ListaTipousuarioSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTipousuarioSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTipousuarioSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
