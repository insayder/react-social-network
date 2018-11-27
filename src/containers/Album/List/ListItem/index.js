import React from 'react';
import { Col, Card, CardTitle, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';
import { helpers } from '../../../../helpers';

import styles from './../../Album.module.css';

const listItem = props => {
  return (
    <Col md={4} width="250" className={`text-center ${styles.mrBottom}`}>
      <Link width="250" to={`/album/${props.dataAlbum.id}`}>
        <Card>
          <CardTitle>{props.dataAlbum.title}</CardTitle>
          <CardImg
            width="250"
            height="150"
            src={
              props.dataAlbum.photo[helpers.randomNumber(0, props.dataAlbum.photo.length - 1)]
                .thumbnailUrl
            }
          />
        </Card>
      </Link>
    </Col>
  );
};

export default listItem;
