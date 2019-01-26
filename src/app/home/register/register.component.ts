import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../shared/custom-validators';
import {UserService} from '../../profile/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    const email = '';
    const password = '';
    const confirmPassword = '';
    const fullName = '';


    this.userForm = new FormGroup({
      'email': new FormControl(email, Validators.compose([
        Validators.email,
        Validators.required])),
      'password': new FormControl(password, Validators.compose([
        // 1. Password Field is Required
        Validators.required,
        // 2. check whether the entered password has a number
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        // 3. check whether the entered password has upper case letter
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // 4. check whether the entered password has a lower-case letter
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        // 5. check whether the entered password has a special character
        CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true }),
        // 6. Has a minimum length of 8 characters
        Validators.minLength(8)])),
      'confirmPassword': new FormControl(confirmPassword, Validators.compose([Validators.required])),
      'fullName': new FormControl(fullName)
    },
      {
        validators: CustomValidators.passwordMatchValidator
      }
      );

  }

  onSubmit() {
     this.userService.registerUser(this.userForm.value)
       .subscribe((res) => {
         if (res['status'] === 'OK') {
           alert(res['message']);
           this.router.navigate(['/login']);
         }  else {
           alert('Something went wrong..., please try again');
           this.userForm.reset();
         }
       });
  }
}
