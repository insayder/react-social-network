import React from 'react'
import { Container } from 'reactstrap'
import NavAlbum from './Navigation/'
import ContentAlbum from './Content/'
import PropTypes from 'prop-types'

const itemAlbum = props => (
  <Container>
    <NavAlbum idAlbum={props.match.params.albumId} />
    <ContentAlbum idAlbum={props.match.params.albumId} />
  </Container>
)

itemAlbum.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      albumId: PropTypes.staring
    })
  })
}

export default itemAlbum
