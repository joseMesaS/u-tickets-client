import React, {PureComponent} from 'react'
import {getEvents} from '../../actions/events'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Pager,ListGroup, ListGroupItem} from 'react-bootstrap'
import './EventsList.css'

class EventsList extends PureComponent {
  state = {first: 0, last: 10 }

  handlePaginationForward = () => {
    if(this.props.events.length > 10 && this.state.last < this.props.events.length) {
      this.setState({
        first: this.state.first + 10,
        last: this.state.last + 10
      })
    }
  }

  handlePaginationBack = () => {
    if(this.state.first >= 10) {
      this.setState({
        first: this.state.first - 10,
        last: this.state.last - 10
      })
    }
  }

  render() {
    const events = this.props.events
    
    if (events === null) return null
    const eventItems = events.map(event => <Link className='festivalItem' key={event.id} to={`home/events/${event.id}`} ><ListGroupItem header={event.name}>{event.description}</ListGroupItem></Link>)
    
    return (

      <div>
        <ListGroup className='container'>
         
          
            {eventItems.slice(this.state.first,this.state.last)}
          
        </ListGroup>
        <Pager>
          <Pager.Item  onClick={this.handlePaginationBack}>Previous</Pager.Item>{' '}
          <Pager.Item  onClick={this.handlePaginationForward} >Next</Pager.Item>
        </Pager>
        
      </div>

    )
  }
}

const mapStateToProps = state => ({
  events: state.events === null ? null : Object.values(state.events).sort((a, b) => b.id - a.id)
})

export default connect(mapStateToProps, { getEvents})(EventsList)