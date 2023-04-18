import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTiposalaSelectionComponent } from './lista-tiposala-selection.component';

describe('ListaTiposalaSelectionComponent', () => {
  let component: ListaTiposalaSelectionComponent;
  let fixture: ComponentFixture<ListaTiposalaSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTiposalaSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTiposalaSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
