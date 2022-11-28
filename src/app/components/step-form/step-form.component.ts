import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-step-form',
  templateUrl: './step-form.component.html',
  styleUrls: ['./step-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StepFormComponent implements OnInit {
  genre: any;
  age    = 18;
  altura = 80;
  peso   = 10;

  selectedFA = 0;

  totalCalories: any = 0;
  userForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.userForm = this._formBuilder.group({
      nome: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email ]],
    })
  }



  nome = new FormControl(null, [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit(): void {

  }
  nextPage(){

  }

  ageUpdate(event: any) {
    this.age = event.value;
  }

  updateAltura(event: any) {
    this.altura = event.value;
  }

  updatePeso(event: any) {
    this.peso = event.value;
  }

  selectActivity(activity: number) {
    this.selectedFA = activity;
  }

  onStepChange( event: any ){
    this.calculateCalories();
  }

  calculateCalories(){
    let fa = 0;
    switch (this.selectedFA) {
      case 1:
        fa = 1.2;
        break;
      case 2:
        fa = 1.3;
        break;
      case 3:
        fa = 1.5;
        break;
      case 4:
        fa = 1.7;
        break;
    }
    this.totalCalories = fa * (655.09+(9.563* this.peso)+(1.85 * this.altura)-(4.676 * this.age));
  }
}
