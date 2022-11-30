import { CalculadoraService } from './../../core/calculadora.service';
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

  constructor(
    private _formBuilder: FormBuilder,
    private _calculadoraService: CalculadoraService
    ) {
    this.userForm = this._formBuilder.group({
      nome: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')] ],
    })
  }

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

    if ( event.selectedIndex === 3 ) {
      const body = {
        nome: this.nome,
        email: this.email,
        idade: this.age,
        altura: this.altura,
        fa: this.selectedFA
      }

      this._calculadoraService.sendMail(body).subscribe(
        res => {
          console.log(res);
      },
        err => {
          console.log(err);
        }
      );
    }
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

  get nome() {
    return this.userForm.get('nome')?.value;
  }

  get email() {
    return this.userForm.get('email')?.value;
  }
}
