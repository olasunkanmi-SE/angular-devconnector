import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

export class PatternValidation {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) return null;
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get("password").value;
    const confirmPassword = control.get("confirmPassword").value;
    if (password !== confirmPassword)
      control.get("confirmPassword").setErrors({ noPasswordMatch: true });
  }
}
