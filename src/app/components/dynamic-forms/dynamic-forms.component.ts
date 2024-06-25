import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; // Creating Reactive form to get the fieldControlls in form
import { CommonModule } from '@angular/common'; // Used for ngIf and ngFor Directive
import { FormDataService } from '../../services/form-data.service'; //Service File to fetch the formJson

@Component({
  selector: 'app-dynamic-forms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-forms.component.html',
  styleUrl: './dynamic-forms.component.css'
})


export class DynamicFormsComponent {
  form!: FormGroup; // To Set FormGroup from the angular form's module
  formJson?: any[]; // To Set Value of form Json

  constructor(private fb: FormBuilder, private formDataService: FormDataService) { } // Used to inject the formbuilder and formDataService

  /**
   *@description : To Set formJson from the  service class and to load controls on basis of it.
   */
  ngOnInit(): void {
    this.formJson = this.formDataService.getFormJson();
    this.initializeForm();
  }
  /**
   * Loading controls for individual fields
   */
  initializeForm() {
    const formGroupConfig:any = {};
    this.formJson?.forEach(field => {
      formGroupConfig[field.name] = [''];
    });
    this.form = this.fb.group(formGroupConfig);
  }
  /**
   * @desciption: An event call bind with every field, which would be called if anything changes in any field
   * @function: onChange
   * @param1: event
   * @param2:fieldSchemaData : schema of that particular field
   */
  onChange(event:any,fieldSchemaData:any){
    /**
     * To set the field value of dependent child field based on parent field value change.
     */
    if(fieldSchemaData.on_change_set_dependent_child_value === '1'){
      const targetFieldControll = this.form.get(fieldSchemaData.dependent_child_field);
      const fetchTheTargetSetFieldValue = fieldSchemaData.drop_down_value.filter((field:any,index:Number)=>{
        if(field.code == event.target.value){
          return field;
        }
      });
      targetFieldControll?.setValue(fetchTheTargetSetFieldValue[0].child_field_value);
    }
    /**
     * Custom Method's that can be invoke to perform action's
     */
    if(fieldSchemaData?.event_method?.length > 0){
      const methodName:string = fieldSchemaData?.event_method;
      const methodEvent = this[methodName as keyof this];
      if(typeof methodEvent === 'function'){
        (methodEvent as Function).apply(this,[event,fieldSchemaData])
      } else {
        console.error(`Method ${methodName} does not exist`);
      }
    }
    /**
     * Validate Field Based on validation field and dependent field comparision.
     */
    if(fieldSchemaData.validate_field === "1"){
      const fireFieldValidationArray = fieldSchemaData?.fire_validation_for;
      if(fireFieldValidationArray.length >0){
        for(let validateField of fireFieldValidationArray){
          const fetchValidateField = this.formJson?.find(field => field.name === validateField);
          const valueOfValidateField = this.form.get(validateField)?.value;
          const validation = fetchValidateField.validation;
          const dependentField = validation.dependent_field;
          const dependentFieldValue = this.form.get(dependentField)?.value;
          if (validation) {
            const mappedCondition = validation.conditions.find((condition: { orgin_code_value: any; }) => condition.orgin_code_value === valueOfValidateField);
            if (mappedCondition && mappedCondition.dependent_field_code_value !== dependentFieldValue) {
              fetchValidateField.error = mappedCondition.error_message;
              this.form.get(validateField)?.setErrors({ incorrect: true });
            } else {
              fetchValidateField.error = '';
                this.form.get(validateField)?.setErrors(null);
            }
          }
        }
      }else{
        return;
      }
    }
  }

  /**
   * ClearDependnent Field Error 's
   */
  clearDependentFieldError(dependentFieldName: string) {
    const dependentField = this.formJson?.find(field => field.name === dependentFieldName);
    if (dependentField) {
      dependentField.error = '';
    }
  }
  /**
   * A custom field method associated to duration field to caculate and set the end date
   */
  onDurationChangeToSetEndDate(event:any,fieldSchemaData:any){
    const startDate = new Date(this.form.get('start_date')?.value);
    const duration = parseInt(this.form.get('duration')?.value, 10);
    if (!isNaN(startDate.getTime()) && !isNaN(duration)) {
      const endDate = new Date(startDate);
      endDate.setDate(startDate?.getDate() + duration);
      this.form.get('end_date')?.setValue(endDate.toISOString().split('T')[0],{emitEvent:false}); // emitEvent is set to false as to avoid loop when value is set
    }
  }

  /**
   * A custom field method associated to date fieldsto caculate and set the Duration on change of start and end  date
   */
  onDateComponentChangeToCalculateDuration(event:any,fieldSchemaData:any){
    const startDate = new Date(this.form.get('start_date')?.value);
    const endDate = new Date(this.form.get('end_date')?.value);
    if (!isNaN(startDate?.getTime()) && !isNaN(endDate?.getTime())) {
      const duration = this.dateDiffInDays(startDate, endDate);
      this.form.get('duration')?.setValue(duration,{emitEvent:false});// emitEvent is set to false as to avoid loop when value is set
    }
  }

  /**
   * A function that provide's the diffrence between two dates
   */
  dateDiffInDays(startDate: Date, endDate: Date): number {
    const millSecondsPerDay = 1000 * 60 * 60 * 24;
    const startDateUTC = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const endDateUTC = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    return Math.floor((endDateUTC-startDateUTC) / millSecondsPerDay);
  }
}
