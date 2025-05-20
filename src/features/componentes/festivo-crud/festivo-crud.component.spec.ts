import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivoCrudComponent } from './festivo-crud.component';

describe('FestivoCrudComponent', () => {
  let component: FestivoCrudComponent;
  let fixture: ComponentFixture<FestivoCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FestivoCrudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FestivoCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
