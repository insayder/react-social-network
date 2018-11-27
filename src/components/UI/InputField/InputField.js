import React, { Fragment } from 'react'
import { FormGroup, Input, Label } from 'reactstrap'

import styles from './InputField.module.css'

function FormField(props) {
  let input
  if (props.type === 'checkbox') {
    input = (
      <FormGroup check>
        <Label check>
          <Input
            type={props.type}
            name={props.name}
            tabIndex={props.tabIndex}
            onChange={props.change}
            checked={props.value}
          />{' '}
          {props.labelText}
        </Label>
      </FormGroup>
    )
  } else {
    input = (
      <FormGroup>
        <Input
          invalid={!props.valid && props.touched && props.validationEnabled}
          className={styles.authFormField}
          type={props.type}
          name={props.name}
          autoComplete={props.autoComplete}
          placeholder={props.placeholder}
          tabIndex={props.tabIndex}
          onChange={props.change}
          value={props.value}
        />
      </FormGroup>
    )
  }

  return <Fragment>{input}</Fragment>
}

export default FormField
