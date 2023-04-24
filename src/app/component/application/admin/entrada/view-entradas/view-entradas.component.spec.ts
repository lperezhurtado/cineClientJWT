import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEntradasComponent } from './view-entradas.component';

describe('ViewEntradasComponent', () => {
  let component: ViewEntradasComponent;
  let fixture: ComponentFixture<ViewEntradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEntradasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEntradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
