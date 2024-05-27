import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Service } from '../core/service.core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  title = 'XERATH';

  currentForm: string = 'login';
  loginForm: FormGroup;
  registrationForm: FormGroup;
  recoveryForm: FormGroup;
  isCreator: boolean = false;

  @Output() btnPage = new EventEmitter();

  llamarPage(){
    this.btnPage.emit();
  }

  constructor(private fb: FormBuilder, private Service: Service) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });

    this.registrationForm = this.fb.group({
      username: [''],
      email: [''],
      password: [''],
      isCreator: [false],
      channelName: [''],
      channelDescription: [''],
      profileImage: ['']
    });

    this.recoveryForm = this.fb.group({
      email: ['']
    });
  }

  toggleForm(form: string): void {
    this.currentForm = form;
  }

  onToggleCreator(): void {
    this.isCreator = !this.isCreator;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.registrationForm.patchValue({
          profileImage: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onLoginSubmit(): void {
    const { email, password } = this.loginForm.value;
    this.Service.login(email, password).subscribe(
      response => console.log(response),
      error => console.error(error)
    );
  }

  onRegisterSubmit(): void {
    const user = this.registrationForm.value;
    this.Service.register(user).subscribe(
      response => console.log(response),
      error => console.error(error)
    );
  }

  onRecoverySubmit(): void {
    const { email } = this.recoveryForm.value;
    console.log('Recovery email:', email);
  }
}
