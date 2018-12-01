import React, { Component } from 'react'
import { connect } from 'react-redux'

import UserInfo from '../user-info'
import Redactor from '../redactor'
import { editorStart } from '../../../../store/actions'

class UserInfoWithRedactor extends Component {
  render() {
    return this.props.editorActive ? <Redactor /> : <UserInfo />
  }
}

const mapStateToProps = state => {
  return {
    editorActive: state.profile.editorActive
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editorStart: () => dispatch(editorStart())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfoWithRedactor)
