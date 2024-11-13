import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillableEditorComponent } from './fillable-editor.component';

describe('FillableEditorComponent', () => {
  let component: FillableEditorComponent;
  let fixture: ComponentFixture<FillableEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillableEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FillableEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
