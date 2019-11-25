import React, { Component }  from 'react';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';



  const RenderComments = ({dish}) => {
    const comments = dish.comments.map(comment => {
      return (
        <li key={comment.id}>
          <ul>
            <li>{comment.comment}</li>
            <li>{comment.name} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
            <li>----</li>
          </ul>
        </li>
      )
    });

    return (
      <div className="col-12 col-md-5 m-1">
        <ul className="list-unstyled">
          <li>Comments</li>
          {comments}
        </ul>
      </div>
    )
  }

  const RenderDish = ({dish}) => {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardTitle>{dish.name}</CardTitle>
            <CardBody>{dish.description}</CardBody>
        </Card>
      </div>
    )
  }

  const DishDetail = ({dish}) => {
    if (!dish)
      return <div></div>;

    return (
      <div className="container">
        <div className="row">
          <RenderDish dish={dish} />
          <RenderComments dish={dish} />
        </div>
      </div>
    ); 
  }

export default DishDetail;