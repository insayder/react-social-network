import React from 'react'
import { Container, Row } from 'reactstrap'
import { connect } from 'react-redux'

import ListItem from './ListItem'
import AlbumsNav from './Navigation'

const AlbumList = props => {
  return (
    <Container>
      <AlbumsNav />
      <Row width="100%" className={`align-items-center`}>
        {props.albums.map(value => (
          <ListItem key={value.id} dataAlbum={value} />
        ))}
      </Row>
    </Container>
  )
}

export default connect(
  state => ({
    albums: state.albums.dataAlbums
  }),
  dispatch => ({})
)(AlbumList)
