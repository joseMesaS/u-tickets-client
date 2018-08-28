import React, {PureComponent} from 'react'
import {getUsers, logout} from '../../actions/users'
import {getEvents, createEvent} from '../../actions/events'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import EventsList from '../events/EventsList'
import CreateEventForm from '../events/CreateEventForm'
import './HomePage.css'
import {Jumbotron, Button, Tooltip, Modal, OverlayTrigger} from 'react-bootstrap'


class Home extends PureComponent {
  state = {createMode: false}

  componentWillMount() {
    
    if (this.props.users === null) this.props.getUsers()
    if (this.props.events === null) this.props.getEvents()
    
  }

  handleClose = () => {
    this.setState({ createMode: false });
  }

  handleShow = () => {
    this.setState({ createMode: true });
  }


  handleSubmit = (data) => {
    this.props.createEvent(data.name, data.description, data.startingTime, data.endTime, data.thumbnail)
	}

  render() {

    const tooltipLogout = (
      <Tooltip id="tooltip">
        <strong>Logout</strong> 
      </Tooltip>
    )

    const tooltipLogin = (
      <Tooltip id="tooltip">
        <strong>Login</strong> 
      </Tooltip>
    )
    
    return (
      <div className='main'>
       
       <Modal show={this.state.createMode} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a new event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateEventForm className='createEvent' onSubmit={this.handleSubmit} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Jumbotron className='header ' style={{ backgroundImage: `url(https://www.edmtunes.com/wp-content/uploads/2018/04/7.jpg)`, backgroundPositionY: 'center', backgroundSize: 'cover'}}>
          {!this.props.authenticated && 
            <OverlayTrigger placement="bottom" overlay={tooltipLogin} >
              <Link  className='log' to='/login'><i class="fas fa-user-astronaut"></i></Link>
            </OverlayTrigger>}
          {this.props.authenticated && 
            <OverlayTrigger placement="bottom" overlay={tooltipLogout} >
              <a className='log' onClick={this.props.logout} alt="Login"><i class="fas fa-user-astronaut"></i></a>
            </OverlayTrigger>}
          
          <div className='headingsHome'>
            <h1>Utickets</h1>
            <p>get a ticket for your favorite event and we pick you up there!</p>
          </div>
        </Jumbotron>
       
        <EventsList/>
        
        {this.props.authenticated && <a  className='create' onClick={this.handleShow} >Create Event</a>}
        
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users === null ? null : state.users,
  authenticated: state.currentUser !== null,
  events: state.events === null ? null : state.events

})

export default connect(mapStateToProps, { getUsers, logout, getEvents, createEvent})(Home)