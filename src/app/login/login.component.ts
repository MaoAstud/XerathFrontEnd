import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  file?:File;

  @Output() btnPage = new EventEmitter();

  llamarPage(){
    this.btnPage.emit();
  }

  constructor(
              private fb: FormBuilder, 
              private Service: Service,
              private toastr: ToastrService) {
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
      profileImage: ["../assets/img/perfilNone.jpg"]
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
     this.file = event.target.files[0];
    if (this.file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.registrationForm.patchValue({
          profileImage: reader.result
        });
      };
      reader.readAsDataURL(this.file);
    }
  }

  onLoginSubmit(): void {
    const user = this.loginForm.value;
    this.Service.iniciarSesion(user).subscribe(
      response => {
        console.log('Inicio Sesión:', response); 
        if (response.usuario) {
          this.llamarPage()
          this.toastr.success("Ingreso exitoso, Bienvenido")
        } else {
          // Mensaje de error si las credenciales son incorrectas
          this.toastr.error(response.error.message);
        }
      },
      error=>{
        console.log('Inicio Sesión:', error); 
        this.toastr.error(error.error.message);
      }
    );
  }

  submitRegisterForm() {
    if (this.registrationForm.valid) {
      const email = this.registrationForm.value.email;
      const nombreUsuario = this.registrationForm.value.username;
      const password = this.registrationForm.value.password;
      const nombreCanal = this.registrationForm.value.channelName;
      const descripcionCanal = this.registrationForm.value.channelDescription;
      this.Service.registro({nombreUsuario, email, contrasena: password}).subscribe(responseRegistro => {
        console.log('Registro:', responseRegistro); 
        if (this.isCreator) {
          this.Service.creacionCanal({
            nombreCanal,
            descripcionCanal,
            billeteraCanal: "0x34f5377c143B7B61da5c7817Ba49b87e357Af74f",
            idUsuario: responseRegistro.usuario.idUsuario
        }).subscribe(responseCanal => {
          if (responseCanal.canal) {
            
            this.llamarPage()
            this.toastr.success("Creación de canal exitoso", "Success")
          } else {
            // Mensaje de error si las credenciales son incorrectas
            this.toastr.error(responseRegistro.error.message);
          }
        },
        error=>{
          console.log('Registro:', error); 
          this.toastr.error(error.error.message);
        })
        }
        if (responseRegistro.usuario) {
          if (this.file) {
            this.Service.uploadProfilePicture(responseRegistro.usuario.idUsuario, this.file).subscribe(
              response => {
                this.toastr.success("Foto subida de manera correcta", "Success")
              },
              error => {
                console.error('Error al cargar imagen, intente de nuevo en perfil', error.message);
              }
            );
          }
          
          this.llamarPage()
          this.toastr.success("Registro exitoso, Bienvenido", "Success")

        } else {
          // Mensaje de error si las credenciales son incorrectas
          this.toastr.error(responseRegistro.error.message);
        }
      },
        error=>{
        console.log('Registro:', error); 
        this.toastr.error(error.error.message);
      });
    }
  }

  onRecoverySubmit(): void {
    const { email } = this.recoveryForm.value;
    this.toastr.success("Se envio un correo al email proprocionado.", "Success")
  }
}
