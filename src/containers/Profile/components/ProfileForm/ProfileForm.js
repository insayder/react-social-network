import React, { Component, Fragment } from 'react'
import { Card, CardBody, Col, Container, Form, Row, Button, FormGroup, CardHeader } from 'reactstrap'
import { connect } from 'react-redux'

import InputField from '../../../../components/UI/InputField/InputField'
import Spinner from '../../../../components/UI/Spinner/Spinner'
import { checkValidity, updateObject } from '../../../../shared/utility'
import * as actions from '../../../../store/actions'

class ProfileForm extends Component {
  state = {
    fields: {
      firstName: {
        type: 'text',
        name: 'firstName',
        tabIndex: 1,
        autoComplete: 'given-name',
        placeholder: 'Имя',
        valid: false,
        value: '',
        displayed: true,
        validation: {
          enabled: true,
          rules: {
            required: true,
            minLength: 1
          }
        }
      },
      lastName: {
        tyge: 'text',
        name: 'lastName',
        tabIndex: 2,
        autoComplete: 'family-name',
        placeholder: 'Фамилия',
        validation: {
          enabled: true,
          rules: {
            required: true,
            minLength: 1
          }
        },
        valid: false,
        value: '',
        touched: false,
        displayed: true
      },
      city: {
        type: 'text',
        name: 'city',
        tabIndex: 3,
        valid: false,
        value: '',
        touched: false,
        autoComplete: 'shipping locality',
        placeholder: 'Город',
        displayed: true,
        validation: {
          enabled: true,
          rules: {
            required: true,
            minLength: 1
          }
        }
      },
      phone: {
        type: 'tel',
        name: 'phone',
        tabIndex: 3,
        valid: false,
        value: '',
        touched: false,
        autoComplete: 'tel',
        placeholder: 'Телефон',
        displayed: true,
        validation: {
          enabled: true,
          rules: {
            required: true,
            minLength: 1
          }
        }
      }
    },
    formValid: false
  }

  onChangeHandler = event => {
    const fieldName = event.target.name
    const value = event.target.value

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

  onClickHandler = event => {
    event.preventDefault()
    this.props.updateProfile(this.props.userId, this.props.idToken, {
      firstName: this.state.fields.firstName.value,
      lastName: this.state.fields.lastName.value,
      city: this.state.fields.city.value,
      phone: this.state.fields.phone.value,
      new: false
    })
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

    let errorMessage = null
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>
    }

    let content = (
      <Container>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <Row>
                  <Col lg="12">
                    <h3>Заполните форму</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col lg="12">
                    {errorMessage}
                    <Form>
                      {formFields}
                      <FormGroup>
                        <Button disabled={!this.state.formValid} color="primary" onClick={this.onClickHandler}>
                          Сохранить
                        </Button>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )

    if (this.props.loading) {
      content = <Spinner />
    }

    return <Fragment>{content}</Fragment>
  }
}

const mapStateToProps = state => {
  return {
    error: state.profile.error,
    loading: state.profile.loading,
    userId: state.auth.userId,
    idToken: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProfile: (userId, idToken, profileData) => dispatch(actions.profileUpdate(userId, idToken, profileData))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm)
