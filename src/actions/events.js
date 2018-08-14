import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const UPDATE_EVENTS = 'UPDATE_EVENTS'
export const ADD_EVENT = 'ADD_EVENT'

const updateEvents = (events) => ({
    type: UPDATE_EVENTS,
    payload: events
})

const updateEvent = (event) => ({
  type: ADD_EVENT,
  payload: event
})


export const getEvents = () => (dispatch) => {

  request
    .get(`${baseUrl}/events`)
    .then(result => dispatch(updateEvents(result.body)))
    .catch(err => console.error(err))
}


export const createEvent = (name, description, startingTime, endTime, thumbnail) => (dispatch, getState) => {

  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())
  console.log(startingTime,endTime)


  request
    .post(`${baseUrl}/events`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({ name, description, startingTime, endTime, thumbnail })
    .then(result => dispatch(updateEvent(result.body)))
    .catch(err => console.error(err))
}