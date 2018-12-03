import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import AlbumList from './List/AlbumList'
import AlbumItem from './Item/AlbumItem'

import styles from './Album.module.css'
import { loadAlbums } from '../../store/actions'
import PropTypes from 'prop-types'

class Album extends React.Component {
  constructor(props) {
    super(props)
    this.props.loadDataAlbums(this.props.userId, this.props.authToken)
  }
  render() {
    return (
      <div className={styles.album}>
        <Switch>
          <Route exact path="/albums" component={AlbumList} />
          <Route path="/albums/:albumId" component={AlbumItem} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    authToken: state.auth.token
  }
}

Album.propTypes = {
  userId: PropTypes.string,
  authToken: PropTypes.string,
  loadDataAlbums: PropTypes.func
}

export default connect(
  mapStateToProps,
  dispatch => ({
    loadDataAlbums: (userId, authToken) => {
      dispatch(loadAlbums(userId, authToken))
    }
  })
)(Album)
