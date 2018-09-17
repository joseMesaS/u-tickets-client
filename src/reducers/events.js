import {UPDATE_EVENTS, ADD_EVENT} from '../actions/events';

export default (state = null, {type, payload}) => {
  switch (type) {
    case UPDATE_EVENTS:
      return payload.reduce((events, event) => {
        events[event.id] = event
        return events
      }, {});
    case ADD_EVENT:
      return {
        ...state,
        [payload.id]: payload
      };
    default:
      return state;
  }
}