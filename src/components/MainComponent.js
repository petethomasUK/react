import React, { Component }  from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import DishDetail from './DishDetailComponent';
import { DISHES } from '../shared/dishes';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      selectedDish: null,
    };
  }

  onDishSelect(dishId) {
    this.setState({
      selectedDish: dishId
    });
  }

  render() {

    return (
      <div>
        <Header />
        <Menu dishes={DISHES} 
          onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
      </div>               
    );
  }
}

export default Main;