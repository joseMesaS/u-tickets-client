import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {getEvents} from '../../actions/events'
import { editTicket, getTicketsPerEvent} from '../../actions/tickets'
import Comments from '../comments/Comments'
import EditTicketForm from './EditTicketForm'
import {ticketRisk} from '../../ticketRiskLogic'
import {Jumbotron, Well,Modal, Button, Image  } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './TicketsDetails.css'
import { logout} from '../../actions/users'



class TicketsDetails extends PureComponent {
  state = {editMode: false}

  componentWillMount = () => {
    
    this.props.getTicketsPerEvent(this.props.match.params.eventId)
  }

  editMode = () => {
    this.setState({
      editMode: this.state.editMode === false ? true : false
    })
  }

  handleClose = () => {
    this.setState({ editMode: false });
  }

  handleShow = () => {
    this.setState({ editMode: true });
  }


  editTicket = (data) => {
    this.props.editTicket(this.props.match.params.id, data)
  }

  render() {
    const { ticket, tickets, customers, ticketsInfo } = this.props
    
    if (ticket === null || customers === null || ticketsInfo === null || tickets === null ) return 'Loading...'

    const avgPrice = Object.values(tickets)
      .reduce((acc, currentticket) => {
        return  acc + currentticket.price },0) / Object.values(tickets).length

    const risk = ticketRisk(customers[ticket.user_id].tickets_offered,
      ticket.price,avgPrice,ticket.time_of_creation,ticketsInfo[ticket.id].comments_received)

    return (

      <div>

         <Jumbotron className='header '>
          {!this.props.authenticated && <Link  className='log' to='/login'> login </Link>}
          {this.props.authenticated && <a className='log' onClick={this.props.logout} >logout</a>}
          <h1>Ticket from {customers[ticket.user_id].user_name}</h1>
          <p>Risk: {risk}%</p>
          <h2>{ticket.price}&euro;</h2>
        </Jumbotron>

        <Modal show={this.state.editMode} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit ticket (only author can edit this ticket)</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditTicketForm onSubmit={this.editTicket}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
        
        <div id='infoBody' className='container'>
          <div className='frame'>
           <Image className='ticketPicture' src={ticket.thumbnail===null ? null : 'https://media.peugeot.com.mt/image/47/7/308sw-estatecars-thumbnail.108613.108613.137477.6.jpg?autocrop=1'} responsive rounded/>
          </div>
          <div className='info'>
            Description: {ticket.description}

          </div>
        </div>
        <Well className='chatBox' bsSize="large"> <Comments ticketId={this.props.match.params.id}/></Well>
        {this.props.authenticated && <a className='editTicket' onClick={this.editMode} >Edit Ticket</a>}

      </div>

    )
  }
}

const mapStateToProps = (state, props) => ({
  ticket: state.ticketsPerEvent === null ? null : state.ticketsPerEvent[props.match.params.id],
  tickets: state.ticketsPerEvent === null ? null : Object.values(state.ticketsPerEvent),
  authenticated: state.currentUser !== null,
  customers: state.Customers === null ? null : state.Customers,
  ticketsInfo: state.TicketsInfo === null ? null : state.TicketsInfo
})

export default connect(mapStateToProps, { getEvents, editTicket, getTicketsPerEvent, logout})(TicketsDetails)