import React from 'react'
import { connect } from 'react-redux'
import { Row } from 'reactstrap'
import { clearRemovalbeAlbumPhoto } from '../../../../store/actions'

import Photo from './Photo'

class contentAlbum extends React.Component {
  componentWillUnmount() {
    this.props.clearRemovableAlbumPhoto()
  }
  render() {
    let albumPhoto = this.props.albums.find(album => {
      if (album !== null && album.id === this.props.idAlbum) {
        return true
      }
    })
    return (
      <Row width="100%" className={'justify-content-start align-items-center'}>
        {albumPhoto.photo !== null && albumPhoto.photo !== undefined
          ? albumPhoto.photo.map(photo => {
              return <Photo key={photo.url} idAlbum={this.props.idAlbum} dataPhoto={photo} />
            })
          : ''}
      </Row>
    )
  }
}

const mapStateToProps = (state, ownProp) => {
  return {
    albums: state.albums.dataAlbums
  }
}

export default connect(
  mapStateToProps,
  dispatch => ({
    clearRemovableAlbumPhoto: () => {
      dispatch(clearRemovalbeAlbumPhoto())
    }
  })
)(contentAlbum)
