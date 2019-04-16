import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdCropperComponent } from './rd-cropper.component';

describe('RdCropperComponent', () => {
  let component: RdCropperComponent;
  let fixture: ComponentFixture<RdCropperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdCropperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdCropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
