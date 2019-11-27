import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Link from 'react-router-dom';


  const RenderMenuItem = ({ dish }) => {
    return (
    <link to={`/menu/${dish.id}`}>
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardImgOverlay>
          <CardTitle>{dish.name}</CardTitle>
        </CardImgOverlay>
      </Card>
    </link>
    )
  }

  const Menu = (props) => {
    const menu = props.dishes.map((dish) => {
      return (
        <div key={dish.id} className="col-12 col-md-5 m-1">
            <RenderMenuItem dish={dish} />
        </div>
      )
    });

    return (
      <div className="container">
        <div className="row">
          {menu}
        </div>
      </div>       
  );
  }

export default Menu;