import React, { Component } from 'react'
import { connect } from 'react-redux'

import { editorStart, profileFetch } from '../../../../store/actions'
import firebase from 'firebase'
class UserInfo extends Component {
  constructor(props) {
    super(props)

    this.editorStart = this.editorStart.bind(this)
  }
  editorStart() {
    this.props.editorStart()
  }
  componentDidMount() {
  }
  render() {
    return (
      <div>
        <p>
          {this.props.firstName} {this.props.lastName}
        </p>
        <p>{this.props.city}</p>
        <p>{this.props.phone}</p>
        <p>{this.props.job}</p>
        <button onClick={this.editorStart}>Редактировать</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    editorActive: state.profile.editorActive,
    firstName: state.profile.firstName,
    lastName: state.profile.lastName,
    city: state.profile.city,
    phone: state.profile.phone,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    profileFetch: userId => dispatch(profileFetch(userId)),
    editorStart: () => dispatch(editorStart())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo)
