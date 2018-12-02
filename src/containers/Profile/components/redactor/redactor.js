import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button, Form, FormGroup, Input } from 'reactstrap'
import { editorClose, updateUserInfo } from '../../../../store/actions'

class Redactor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      city: this.props.city,
      phone: this.props.phone
    }
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
    this.handleLastNameChange = this.handleLastNameChange.bind(this)
    this.handlePhoneChange = this.handlePhoneChange.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)

    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }
  handleFirstNameChange(e) {
    this.setState({ firstName: e.target.value })
  }
  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value })
  }
  handlePhoneChange(e) {
    this.setState({ phone: e.target.value })
  }
  handleCityChange(e) {
    this.setState({ city: e.target.value })
  }
  handleCancel() {
    this.props.editorClose()
  }
  handleSave() {
    const updateData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      city: this.state.city,
      phone: this.state.phone
    }
    this.props.updateUserInfo(updateData)
    this.props.editorClose()
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Input type="name" onChange={this.handleFirstNameChange} value={this.state.firstName} />
        </FormGroup>
        <FormGroup>
          <Input type="text" onChange={this.handleLastNameChange} value={this.state.lastName} />
        </FormGroup>
        <FormGroup>
          <Input type="phone" onChange={this.handleCityChange} value={this.state.city} />
        </FormGroup>
        <FormGroup>
          <Input type="text" onChange={this.handlePhoneChange} value={this.state.phone} />
        </FormGroup>
        <Button color="primary" onClick={this.handleSave}>
          Сохранить
        </Button>
        <Button color="secondary" onClick={this.handleCancel}>
          Отменить
        </Button>
      </Form>
    )
  }
}

const mapStateToProps = state => {
  return {
    editorActive: state.profile.editorActive,
    firstName: state.profile.firstName,
    lastName: state.profile.lastName,
    city: state.profile.city,
    phone: state.profile.phone
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUserInfo: updateData => dispatch(updateUserInfo(updateData)),
    editorClose: () => dispatch(editorClose())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Redactor)
