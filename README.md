# Dynamic Form manipulation using JSON

>- Steps To Run Project
 > -
  >1. Install angular ```npm i @angular/cli```
  >2. Take Clone of the app
  >3. Run ```npm i```
  >4. Run ```npm start```


#

# Json Used for Creating Dynamic Form for two senario's

1. Age Group and Age Range Selection:
   - Input: Dropdown for Age Group (Infant, Child, Teenager, Young Adult, Adult, Senior)
   - Input: Dropdown for Age Range (0-2 years, 3-12 years, 13-19 years, 20-39 years, 40-59 years, 60+ years)
   - Requirement: Based on the selected Age Group, automatically select the appropriate Age Range in the dropdown.
   - If the user selects "Infant" as the Age Group, the Age Range dropdown should default to "0-2 years".
   - If the user selects "Teenager" as the Age Group, the Age Range dropdown should default to "13-19 years".
   - This ensures that the Age Range selection aligns with typical age categories used in various contexts.
2. Start Date, End Date, and Duration Calculation:
   - Input: Start Date (date picker)
   - Input: End Date (date picker)
   - Input: Duration (number input, e.g., in days)
- Requirement: Implement the following behaviour:
  - When the user selects a Start Date and End Date, calculate, and display the Duration based on the difference in days between the two dates.
  - When the user changes the End Date, automatically update the Duration to reflect the new difference in days between Start Date and End Date.
  - When the user changes the Duration, automatically update the End date to reflect the new date calculated from Start date and Durations.
  - If the user selects a Start Date of "June 1, 2024" and an End Date of "June 16, 2024", the form should calculate and display the Duration as "15 days".
  - If the user changes the End Date to "June 20, 2024", the Duration should automatically update to "19 days" based on the new date range.
  - If the user changes the Duration 10 days , with the Start date of "June 1, 2024" then the End Date should automatically update to "June 10, 2024” based on the new duration.

#
## Form Json Properties of field

```[
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
```

#
| Property | Description|
|----------|-------------------------------------------------------|
| name | unique identifier and controll being set using this  for the field|
| label | Label of the field visible to the user |
| field_type | Identifier to identify the field type like text,number,select,date and used in rendering the component|
| drop_down_value | to set option's in select fields with code, meaning and optional parament child_field_value used in case where value is to be set in child field based on parent field selection|
|on_change_set_dependent_child_value| a property that is requied to set the child field value if parent field value changed it will have value 1 or 0|
|dependent_child_field| A field name on which the data need to be changed on current data change happen's for select field for now|
|validation| It contains two values ```{dependent_field: <field name for which comparision should occurm>, condition :{ "orgin_code_value": <value of current select field>,"dependent_field_code_value": <value of depeendent seect fields>,"error_message": <error message to reflect if condition doesn't match> }}```|
|validate_field| a propert that act's as flag that tell's that validation should run or not for that field|
|fire_validation_for| An array of field name for which validation should be fired when change occurs|
|error| by default it is empty and need to be set accordingly |
|event_method| A custom method that can be defined in component and can be invoked |


