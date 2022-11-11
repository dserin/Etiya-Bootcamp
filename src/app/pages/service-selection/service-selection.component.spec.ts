import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSelectionComponent } from './service-selection.component';

describe('ServiceSelectionComponent', () => {
  let component: ServiceSelectionComponent;
  let fixture: ComponentFixture<ServiceSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
