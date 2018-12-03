import React from 'react'
import { Container, Row } from 'reactstrap'
import { connect } from 'react-redux'

import ListItem from './ListItem'
import AlbumsNav from './Navigation'
import PropTypes from 'prop-types'

class AlbumList extends React.Component {
  render() {
    return (
      <Container>
        {!this.props.isPropfile ? <AlbumsNav /> : ''}
        <Row width="100%" className="align-items-center">
          {this.props.albums !== null && this.props.albums !== undefined
            ? this.props.albums.length > 0
              ? this.props.albums.map((value, i) => {
                  return <ListItem isPropfile={this.props.isPropfile} key={value.title} dataAlbum={value} />
                })
              : ''
            : ''}
        </Row>
      </Container>
    )
  }
}

AlbumList.propTypes = {
  albums: PropTypes.array
}

export default connect(
  state => ({
    albums: state.albums.dataAlbums
  }),
  dispatch => ({})
)(AlbumList)
