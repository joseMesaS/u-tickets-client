import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {getCommentsPerTicket, createComment} from '../../actions/comments'
import {getUsers, logout} from '../../actions/users'
import {FormGroup, FormControl, Modal, Button,ControlLabel } from 'react-bootstrap'
import './Comments.css'

class Comments extends PureComponent {
    state = {comment: false, editMode: false}

	handleChange = (event) => {
        const {name, value} = event.target

        this.setState({
            [name]: value
        })
    }

    handleClose = () => {
        this.setState({ editMode: false })
        this.props.createComment(this.props.ticketId, this.state.message)
    }
    
    handleShow = () => {
        this.setState({ editMode: true });
    }
    
    componentWillMount() {
        this.props.getCommentsPerTicket(this.props.ticketId)
        if (this.props.users === null) this.props.getUsers()

    }

    render() {
        const {  comments, users }= this.props
        
        if (comments === null || users === null ) return 'Loading...2'
        
        return (
            <div>
                { this.props.authenticated && <Button onClick={this.handleShow}  block>send a comment</Button>}

                <div className='commentsBox'>
                    {comments.map(comment => <p key={comment.id}><span className='purple' >{this.props.users[comment.user_id].name}</span>:{' '} {comment.message}</p>)}
                </div>

               { this.props.authenticated && 
                 <Modal show={this.state.editMode} onHide={this.handleClose}>
                 <Modal.Header closeButton>
                     <Modal.Title>send a Comment</Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                     <form>
                         <FormGroup controlId="formControlsTextarea">
                             <ControlLabel>Textarea</ControlLabel>
                             <FormControl componentClass="textarea" placeholder="textarea" name="message" 
                                 value={ this.state.message || '' } onChange={ this.handleChange }/>
                          </FormGroup>
                     </form>
                 </Modal.Body>
                 <Modal.Footer>
                     <Button type="submit" onClick={this.handleClose}>send</Button>
                 </Modal.Footer>
             </Modal>      
               }
            </div>
        )
    }
}

const mapStateToProps =( state ) => ({
    comments: state.commentsPerTicket === null ? null : Object.values(state.commentsPerTicket),
    authenticated: state.currentUser !== null,
    users: state.users === null ? null : state.users
  })

export default connect(mapStateToProps, {getCommentsPerTicket, createComment, getUsers})(Comments)