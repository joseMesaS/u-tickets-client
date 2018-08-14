import React, {PureComponent} from 'react'
import {Form, FormGroup, Col, FormControl, ControlLabel, Button} from 'react-bootstrap'

export default class EditTicketForm extends PureComponent {
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

                    <FormGroup controlId="formHorizontalDescription">
                        <Col componentClass={ControlLabel} sm={3}>
                            Description
                        </Col>
                        <Col sm={9}>
                            <FormControl type="text" name="description" 
                                value={ this.state.description || '' }
                                onChange={ this.handleChange }/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPrice">
                        <Col componentClass={ControlLabel} sm={3}>
                            Price
                        </Col>
                        <Col sm={9}>
                            <FormControl type="text" name="price" 
                                value={ this.state.price || '' }
                                onChange={ this.handleChange }/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalThumbnail">
                        <Col componentClass={ControlLabel} sm={3}>
                            Thumbnail
                        </Col>
                        <Col sm={9}>
                            <FormControl type="text" name="thumbnail" 
                                value={ this.state.thumbnail || '' }
                                onChange={ this.handleChange } />
                        </Col>
                    </FormGroup>


                    <FormGroup>
                        
                        <Button className='submitBtn' bsSize='large' type="submit">Edit</Button>
                        
                    </FormGroup>

                </Form>
            </div>
		)
	}
}