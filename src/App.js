import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      cityData: {},
      show: false
    }
  }
  updateCityName = (e) => {
    this.setState({
      cityName: e.target.value,
    })
  }
  getData = async (e) => {
    e.preventDefault();
    const res = await axios.get(`https://us1.locationiq.com/v1/search.php?key=pk.e510e5b65d9f07a0d956a967853d2fb2 &q=${this.state.cityName}&format=json`)
    console.log(res.data[0]);
    this.setState({
      cityData: res.data[0],
      show: true
    })
  }
  //https://us1.locationiq.com/v1/search.php?key=pk.e510e5b65d9f07a0d956a967853d2fb2 &q=amman&format=json
  render() {
    return (
      <div>
        <Form onSubmit={this.getData}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>City Name</Form.Label>
            <Form.Control type="text" placeholder="Enter City name" onChange={this.updateCityName} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Explore
          </Button>
        </Form>
        {(this.state.show) &&
        <>
        <p>{this.state.cityData.display_name}</p>
        <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.e510e5b65d9f07a0d956a967853d2fb2&q&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=15`} alt='' />

        </>
        }
      </div>
    )
  }
}

export default App

