import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPrecosComponent } from './lista-precos.component';

describe('ListaPrecosComponent', () => {
  let component: ListaPrecosComponent;
  let fixture: ComponentFixture<ListaPrecosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPrecosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPrecosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
