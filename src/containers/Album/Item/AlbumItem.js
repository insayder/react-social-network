import React from 'react'
import { Container } from 'reactstrap'
import NavAlbum from './Navigation/'
import ContentAlbum from './Content/'

const itemAlbum = props => (
  <Container>
    <NavAlbum idAlbum={props.match.params.number} />
    <ContentAlbum idAlbum={props.match.params.number} />
  </Container>
)

export default itemAlbum
