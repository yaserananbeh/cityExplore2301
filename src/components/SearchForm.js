import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export class SearchForm extends Component {
    render() {
        return (
            <Form onSubmit={this.props.getData}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>
                        <h1>
                            City Explorer
                        </h1>
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter City name" onChange={this.props.updateCityName} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Explore!
                </Button>
            </Form>
        )
    }
}

export default SearchForm
