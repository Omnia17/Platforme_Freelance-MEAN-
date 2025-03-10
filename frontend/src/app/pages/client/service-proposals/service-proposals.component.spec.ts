import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProposalsComponent } from './service-proposals.component';

describe('ServiceProposalsComponent', () => {
  let component: ServiceProposalsComponent;
  let fixture: ComponentFixture<ServiceProposalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceProposalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceProposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
