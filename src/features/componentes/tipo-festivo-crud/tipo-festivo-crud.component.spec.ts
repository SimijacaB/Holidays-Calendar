import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoFestivoCrudComponent } from './tipo-festivo-crud.component';

describe('TipoFestivoCrudComponent', () => {
  let component: TipoFestivoCrudComponent;
  let fixture: ComponentFixture<TipoFestivoCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoFestivoCrudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoFestivoCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
