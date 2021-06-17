import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert';

export class ErrorAlert extends Component {
    render() {
        return (
            <Alert variant="danger">
                This is a {this.props.error} alert—check it out!
            </Alert>
        )
    }
}

export default ErrorAlert
