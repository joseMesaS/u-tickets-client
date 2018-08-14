import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getUsers, logout} from '../../actions/users'
import {ticketRisk} from '../../ticketRiskLogic'
import './TicketsList.css'
import {ListGroupItem, ListGroup} from 'react-bootstrap'

const riskToColors = (risk) => {
  if(risk < 35) {
    return 'green'
  }else if(risk < 65) {
    return 'yellow'
  }else {
    return 'red'
  }
}

class TicketsList extends PureComponent {
  componentWillMount() {
    
  }

  render() {
    const {  tickets, customers, ticketsInfo } = this.props
    if (tickets === null || customers === null || ticketsInfo === null ) return 'Loading...'

    const avgPrice = Object.values(tickets)
      .reduce((acc, ticket) => {
        return  acc + ticket.price
         },0) / Object.values(tickets).length

    const ticketsItem = tickets.map(ticket =>
      <Link className='ticketItem' key={ticket.id} to={`/home/events/${this.props.eventId}/tickets/${ticket.id}`} >
        <ListGroupItem header={<div className='itemHeader' >
          <p className={`risk ${riskToColors(ticketRisk(customers[ticket.user_id].tickets_offered,
            ticket.price,avgPrice,ticket.time_of_creation,ticketsInfo[ticket.id].comments_received))}`}>
          </p>
          <h4>{ticket.description}{' '}{ticket.price}&euro;</h4></div>
        }>
          <p> Seller: {customers[ticket.user_id].user_name} </p>
        </ListGroupItem>
      </Link>)

    return (

      <ListGroup className='container '>
       {ticketsItem}
      </ListGroup>

    )
  }
}

const mapStateToProps =( state ) => ({
    tickets: state.ticketsPerEvent === null ? null : Object.values(state.ticketsPerEvent),
    customers: state.Customers === null ? null : state.Customers,
    ticketsInfo: state.TicketsInfo === null ? null : state.TicketsInfo
  })

export default connect(mapStateToProps,{getUsers} )(TicketsList)