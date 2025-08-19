import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaPostosComponent } from './pesquisa-postos.component';

describe('PesquisaPostosComponent', () => {
  let component: PesquisaPostosComponent;
  let fixture: ComponentFixture<PesquisaPostosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PesquisaPostosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PesquisaPostosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
