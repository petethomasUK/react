import React, { Component }  from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Card>
            
            <CardBody>
                <CardTitle>Name</CardTitle>
                <CardText>Desc</CardText>
            </CardBody>
        </Card>
    ); 
  }
}

export default DishDetail;