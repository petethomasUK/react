import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Row, Col, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

  const RenderComments = ({comments, postComment, dishId}) => {
    const commentsList = <Stagger in>
    {comments.map((comment) => {
        return (
            <Fade in>
            <li key={comment.id}>
            <p>{comment.comment}</p>
            <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
            </li>
            </Fade>
        );
    })}
    </Stagger>

    return (
      <div className="col-12 col-md-5 m-1">
        <ul className="list-unstyled">
          <li>Comments</li>
          {commentsList}
        </ul>
        <CommentForm dishId={dishId} postComment={postComment} />
      </div>
    )
  }

  const RenderDish = ({dish}) => {
    return (
      <div className="col-12 col-md-5 m-1">
          <FadeTransform
            in
            transformProps={{
              exitTransform: 'scale(0.5) translateY(-50%)'
          }}>
          <Card>
            <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
              <CardTitle>{dish.name}</CardTitle>
              <CardBody>{dish.description}</CardBody>
          </Card>
        </FadeTransform>
      </div>
    )
  }

  const DishDetail = ({dish, comments, postComment, isLoading, errorMessage}) => {
    if (isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      )
    } else if (errorMessage) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      )
    } else if (dish !== null) {}
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
            <RenderComments comments={comments} postComment={postComment} dishId={dish.id}/>
          </div>
        </div>
     ); 
    }
  

  const required = (val) => val && val.length;
  const maxLength = (len) => (val) => !(val) || (val.length <= len);
  const minLength = (len) => (val) => val && (val.length >= len);

  const RenderErrors = (children) => { 
    return (
        <ul>
          {React.Children.map(children, (child, i) => {
            return <li className="text-danger" key={i}>{child}</li>
          })}
        </ul>
      )
  }

  class CommentForm extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        isNavOpen: false,
        isModalOpen: false
    };
  
      this.toggleModal = this.toggleModal.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values, event) {
    console.log('Current State is: ' + JSON.stringify(values));
    alert('Current State is: ' + JSON.stringify(values));
    this.props.postComment(this.props.dishId, values.rating, values.author, values.message);
  }

    render() {
      return (
        <div>
        <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">                
                <Col>
                  <Label htmlFor="rating">Rating</Label>
                  <Control.select id="rating" model=".rating" name="rating"
                    validators={{
                      required
                    }}
                    className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="author">Your Name</Label>
                  <Control.text model=".author" id="author" name="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                    required, minLength: minLength(3), maxLength: maxLength(15)
                  }}
                  />                                     
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    wrapper={(props) => RenderErrors(props.children)}
                    messages={{
                    required: 'Required',
                    minLength: 'Must be greater than 3 characters',
                    maxLength: 'Must be 15 characters or less'
                  }} 
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="message">Comment</Label>
                  <Control.textarea model=".message" id="message" name="message"
                  rows="6"
                  className="form-control" />
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Button type="submit" color="primary">
                  Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
        </div>
      )
    }
  }

export default DishDetail;