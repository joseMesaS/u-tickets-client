import {GET_TICKET, UPDATE_TICKET} from '../actions/tickets'

export default (state = null, {type, payload}) => {
  switch (type) {
    case GET_TICKET:
      return  payload
    case UPDATE_TICKET:
      return payload  
    default:
      return state
  }
}