import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {getEvents} from '../../actions/events'
import {getTicketsPerEvent, createTicket} from '../../actions/tickets'
import TicketsList from '../tickets/TicketsList'
import CreateTicketForm from '../tickets/CreateTicketForm'
import {Link} from 'react-router-dom'
import { logout} from '../../actions/users'
import {Jumbotron, Button, Popover, Tooltip, Modal} from 'react-bootstrap'
import './EventsDetails.css'




class EventsDetails extends PureComponent {
    state = {createMode: false}
   
    componentWillMount() {
        this.props.getTicketsPerEvent(this.props.match.params.eventId)
        if (this.props.event === null) this.props.getEvents()
       
    }

    handleSubmit = async (data) => {
        this.props.createTicket(this.props.match.params.eventId, data.description, Number(data.price), data.thumbnail)
        this.setState({createMode: false})
        this.props.getTicketsPerEvent(this.props.match.params.eventId)

    }
    
    handleClose = () => {
        this.setState({ createMode: false });
      }
    
      handleShow = () => {
        this.setState({ createMode: true });
      }

     render() {
        const { event, tickets }= this.props
    
        if (tickets === null || event === null ) return 'Loading...1'

        return (

            <div>

                <Modal show={this.state.createMode} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create a new event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CreateTicketForm onSubmit={this.handleSubmit} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <Jumbotron className='header ' style={{ backgroundImage: `url(${event.thumbnail})`, backgroundSize: 'contain', color: 'white' }}>
                    {!this.props.authenticated && <Link  className='log' to='/login'> login </Link>}
                    {this.props.authenticated && <a className='log' onClick={this.props.logout} >logout</a>}
                    <div className="headings">
                        <h1>{event.name}</h1>
                        <p>{event.description}</p>
                    </div>
                </Jumbotron>
                
                <div id='createT' className='container'>
                    {this.props.authenticated && <Button onClick={this.handleShow} bsSize="large" block>Create Ticket</Button>}
                </div>
              
                <TicketsList eventId={this.props.match.params.eventId} />
            </div>

        )
  }
}

const mapStateToProps = (state,props) => ({
  event: state.events && state.events[props.match.params.eventId],
  authenticated: state.currentUser !== null,
  tickets: state.ticketsPerEvent === null ? null : Object.values(state.ticketsPerEvent).sort((a, b) => b.id - a.id),
  ticketsInfo: state.TicketsInfo === null ? null : state.TicketsInfo
})

export default connect(mapStateToProps, {getTicketsPerEvent, getEvents, createTicket, logout})(EventsDetails)