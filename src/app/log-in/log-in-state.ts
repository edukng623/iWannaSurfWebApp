 
import {FormControl,Validators} from '@angular/forms';
const errors = {
  "minlength": "Minimum length is required",
  "pattern": "No special characters",
  "required": "Obligatory field",
  "mismatch": "Different passwords"
}

export class CredentialState {
  nameValidator: FormControl =  new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern("[0-9a-zA-Z_.-]*")]);
  passwordValidator: FormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

  public valid: Boolean = false;
  public active: Boolean = false;
  public hidePw: Boolean = true;

  constructor(public username: String, public password: String){

  }
  
  check(){
    this.valid = !this.nameValidator.errors && !this.passwordValidator.errors;
  }

  nameError():String { 
    return errors[Object.keys(this.nameValidator.errors)[0]]
  }

  passwordError():String { 
    let err = this.passwordValidator.errors && Object.keys(this.passwordValidator.errors)[0];
    return errors[err] || ""; 
  }

  

  getState() {
    return {
      username: this.nameValidator.value,
      password: this.passwordValidator.value
    }
  }
}

export class SamePasswordCredentialState extends CredentialState {
  repeatValidator: FormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  
  constructor(public username: String, public password: String, public repeatPassword: String, public equal: Boolean){
    super(username,password)
    this.equal = true;
  }

  check(){
    this.valid = !this.nameValidator.errors && !this.passwordValidator.errors && this.equalPasswords();
    this.equal = this.equalPasswords();
    
    if(!this.equal && !this.repeatValidator.invalid) 
      this.repeatValidator.setErrors({"mismatch": "Mismatch values"})
  }
  
  equalPasswords() : Boolean {
    return this.passwordValidator.value === this.repeatValidator.value;
  }
  repeatError() : String {
    let err = this.repeatValidator.errors && Object.keys(this.repeatValidator.errors)[0];
    return errors[err] || ""; 
  }
  getState() {
    return {
      username: this.nameValidator.value,
      password: this.passwordValidator.value,
      repeatPassword: this.repeatValidator.value
    } 
  }
}