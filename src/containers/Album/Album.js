import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import AlbumList from './List/AlbumList'
import AlbumItem from './Item/AlbumItem'

import styles from './Album.module.css'
import { loadAlbums } from '../../store/actions'

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
          <Route path="/albums/:number" component={AlbumItem} />
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

export default connect(
  mapStateToProps,
  dispatch => ({
    loadDataAlbums: (userId, authToken) => {
      dispatch(loadAlbums(userId, authToken))
    }
  })
)(Album)
