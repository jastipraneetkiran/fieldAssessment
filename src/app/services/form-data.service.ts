import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  formJson = [
    {
      "name":"age_sel_header",
      "label":"Age Selection ",
      "field_type":"header"
    },
    {
      "name": "age_group",
      "label": "Age Group",
      "field_type": "select",
      "drop_down_value": [
        { "code": "1", "meaning": "Infant" ,"child_field_value": "101"},
        { "code": "2", "meaning": "Child" ,"child_field_value": "102"},
        { "code": "3", "meaning": "Teenager","child_field_value": "103" },
        { "code": "4", "meaning": "Young Adult","child_field_value": "104" },
        { "code": "5", "meaning": "Adult","child_field_value": "105" },
        { "code": "6", "meaning": "Senior","child_field_value": "106" }
      ],
      "on_change_set_dependent_child_value":"1",
      "dependent_child_field": "age_range",
      "validation": {
        "dependent_field": "age_range",
        "conditions": [
          {
            "orgin_code_value": "1",
            "dependent_field_code_value": "101",
            "error_message": "Infants should be 0-2 years."
          },
          {
            "orgin_code_value": "2",
            "dependent_field_code_value": "102",
            "error_message": "Child should be 3-12 years."
          },
          {
            "orgin_code_value": "3",
            "dependent_field_code_value": "103",
            "error_message": "Teenagers should be 13-19 years."
          },
          {
            "orgin_code_value": "4",
            "dependent_field_code_value": "104",
            "error_message": "Young Adult should be 20-39 years."
          },
          {
            "orgin_code_value": "5",
            "dependent_field_code_value": "105",
            "error_message": "Infants should be 40-59 years."
          },
          {
            "orgin_code_value": "6",
            "dependent_field_code_value": "106",
            "error_message": "Teenagers should be 60+ years."
          },
        ]
      },
      "validate_field":"1",
      "fire_validation_for":["age_group"],
      "error":""
    },
    {
      "name": "age_range",
      "label": "Age Range",
      "field_type": "select",
      "drop_down_value": [
        { "code": "101", "meaning": "0-2 years" },
        { "code": "102", "meaning": "3-12 years" },
        { "code": "103", "meaning": "13-19 years" },
        { "code": "104", "meaning": "20-39 years" },
        { "code": "105", "meaning": "40-59 years" },
        { "code": "106", "meaning": "60+ years" }
      ],
      "validate_field":"1",
      "fire_validation_for":["age_group"],
      "error":""
    },

    {
      "name":"date_info_header",
      "label":"Date Duration Calculation",
      "field_type":"header"
    },

    {
      "name": "start_date",
      "label": "Start Date",
      "field_type": "date",
      "event_method":"onDateComponentChangeToCalculateDuration",
      "error": ""
    },
    {
      "name": "end_date",
      "label": "End Date",
      "field_type": "date",
      "event_method":"onDateComponentChangeToCalculateDuration",
      "error": ""
    },
    {
      "name": "duration",
      "label": "Duration (days)",
      "field_type": "number",
      "event_method":"onDurationChangeToSetEndDate",
      "error": ""
    }
  ];

  constructor() { }

  getFormJson() {
    return this.formJson;
  }
}
