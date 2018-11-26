import React, { Component } from 'react'
import { Card, CardBody, Col, Container, Form, Row } from 'reactstrap'
import { connect } from 'react-redux'

import AuthButton from './AuthButton/AuthButton'
import InputField from '../../../components/UI/InputField/InputField'
import AuthFormHeader from './AuthFormHeader/AuthFormHeader'
import Spinner from '../../../components/UI/Spinner/Spinner'
import { checkValidity, updateObject } from '../../../shared/utility'
import * as actions from '../../../store/actions'

class AuthForm extends Component {
  state = {
    fields: {
      email: {
        type: 'email',
        name: 'email',
        tabIndex: 1,
        autoComplete: 'email',
        placeholder: 'Email',
        valid: false,
        value: '',
        displayed: true,
        validation: {
          enabled: this.props.type === 'register',
          rules: {
            required: true
          }
        }
      },
      password: {
        type: 'password',
        name: 'password',
        tabIndex: 2,
        autoComplete: this.props.type === 'login' ? 'current-password' : 'new-pasword',
        placeholder: 'Password',
        validation: {
          enabled: this.props.type === 'register',
          rules: {
            required: true,
            minLength: 6,
            confirmationField: 'confirmPassword'
          }
        },
        valid: false,
        value: '',
        touched: false,
        displayed: true
      },
      confirmPassword: {
        type: 'password',
        name: 'password',
        tabIndex: 3,
        valid: false,
        value: '',
        touched: false,
        autoComplete: 'new-password',
        placeholder: 'Confirm password',
        displayed: this.props.type === 'register',
        validation: {
          enabled: this.props.type === 'register',
          rules: {
            required: true,
            minLength: 6,
            confirmationField: 'password'
          }
        }
      },
      remember: {
        type: 'checkbox',
        name: 'remember',
        tabIndex: 4,
        value: false,
        valid: true,
        displayed: this.props.type === 'login',
        labelText: 'Remember me'
      }
    },
    formValid: false
  }

  onChangeHandler = event => {
    const fieldName = event.target.name
    const value = fieldName === 'remember' ? event.target.checked : event.target.value

    this.setState(
      state => {
        const updatedFieldProperties = {
          value: value,
          valid: checkValidity(value, state, fieldName),
          touched: true
        }
        const updatedField = updateObject(state.fields[fieldName], updatedFieldProperties)
        let updatedFields
        if (state.fields[fieldName].validation) {
          const confirmationFieldName = state.fields[fieldName].validation.rules.confirmationField
          const updatedConfirmationField = updateObject(state.fields[confirmationFieldName], {
            valid: updatedFieldProperties.valid
          })
          updatedFields = updateObject(state.fields, {
            [fieldName]: updatedField,
            [confirmationFieldName]: updatedConfirmationField
          })
        } else {
          updatedFields = updateObject(state.fields, { [fieldName]: updatedField })
        }
        return updateObject(state, { fields: updatedFields })
      },
      state => {
        const validationState = this.isFormValid()
        if (this.state.formValid !== validationState) {
          this.setState({ ...this.state, formValid: validationState })
        }
      }
    )
  }

  authHandler = event => {
    event.preventDefault()
    this.props.onAuth(
      this.state.fields.email.value,
      this.state.fields.password.value,
      this.state.fields.remember.value,
      this.props.type === 'login'
    )
  }

  isFormValid = () => {
    for (let field in this.state.fields) {
      if (!this.state.fields[field].valid) {
        return false
      }
    }
    return true
  }

  render() {
    let formFieldsData = []
    for (let name in this.state.fields) {
      formFieldsData.push({ name, data: this.state.fields[name] })
    }

    let formFields = formFieldsData.map(field => {
      if (field.data.displayed) {
        return (
          <InputField
            key={field.name}
            type={field.data.type}
            name={field.name}
            tabIndex={field.data.tabIndex}
            autoComplete={field.data.autoComplete}
            placeholder={field.data.placeholder}
            change={this.onChangeHandler}
            touched={field.data.touched}
            value={field.data.value}
            valid={field.data.valid}
            validationEnabled={field.data.validation ? field.data.validation.enabled : false}
            labelText={field.data.labelText}
          />
        )
      }
      return null
    })

    let form = (
      <Form>
        {formFields}
        <AuthButton disabled={!this.state.formValid} type={this.props.type} auth={this.authHandler} />
      </Form>
    )

    if (this.props.loading) {
      form = <Spinner />
    }

    let errorMessage = null
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>
    }

    return (
      <Container>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <Card>
              <AuthFormHeader type={this.props.type} />
              <CardBody>
                <Row>
                  <Col lg="12">
                    {errorMessage}
                    {form}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, remember, isLogin) => dispatch(actions.auth(email, password, remember, isLogin))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthForm)
