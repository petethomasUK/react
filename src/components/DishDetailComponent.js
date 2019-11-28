import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';


  const RenderComments = ({comments}) => {
    const commentsList = comments.map(comment => {
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
          {commentsList}
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

  const DishDetail = ({dish, comments}) => {
    if (!dish)
      return <div></div>;

    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={dish} />
          <RenderComments comments={comments} />
        </div>
      </div>
    ); 
  }

export default DishDetail;