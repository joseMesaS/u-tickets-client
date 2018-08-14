import React, {PureComponent} from 'react'
import './CreateEventForm.css'
import {Form, FormGroup, Col, FormControl, ControlLabel, Button} from 'react-bootstrap'


export default class CreateEventForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

	render() {
		return (
      <div>
            <Form onSubmit={this.handleSubmit} horizontal>

                <FormGroup controlId="formHorizontalName">
                    <Col componentClass={ControlLabel} sm={3}>
                        Name
                    </Col>
                    <Col sm={9}>
                        <FormControl type="text" name="name" 
                            value={ this.state.name || ''	} 
                            onChange={ this.handleChange }  />
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalDescription">
                    <Col componentClass={ControlLabel} sm={3}>
                        Description
                    </Col>
                    <Col sm={9}>
                        <FormControl type="text" name="description" value={
                                this.state.description || ''
                            } onChange={ this.handleChange }/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalStartingTime">
                    <Col componentClass={ControlLabel} sm={3}>
                        Starting time
                    </Col>
                    <Col sm={9}>
                        <FormControl type="text" name="startingTime" value={
                                this.state.startingTime || ''
                            } onChange={ this.handleChange }/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalEndTime">
                    <Col componentClass={ControlLabel} sm={3}>
                        End Time
                    </Col>
                    <Col sm={9}>
                        <FormControl type="text" name="endTime" value={
                                this.state.endTime || ''
                            } onChange={ this.handleChange }  />
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalThumbnail">
                    <Col componentClass={ControlLabel} sm={3}>
                        Thumbnail
                    </Col>
                    <Col sm={9}>
                        <FormControl type="text" name="thumbnail" value={
                                this.state.thumbnail || ''
                            } onChange={ this.handleChange } />
                    </Col>
                </FormGroup>

               
                <FormGroup>
                    
                    <Button className='submitBtn' bsSize='large' type="submit">Create</Button>
                    
                </FormGroup>

        </Form>
      </div>
		)
	}
}