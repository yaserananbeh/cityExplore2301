import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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
      <div style={{ textAlign: 'center' }}>
        <Container>

          <Row>
            {/* <Col>1 of 3</Col> */}
            <Col>
              <Form onSubmit={this.getData}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>City Explorer</Form.Label>
                  <Form.Control type="text" placeholder="Enter City name" onChange={this.updateCityName} />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Explore!
                </Button>
              </Form>
              {(this.state.show) &&
                <>
                  <p></p>
                  <Image src={`https://maps.locationiq.com/v3/staticmap?key=pk.e510e5b65d9f07a0d956a967853d2fb2&q&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=15`} roundedCircle />
                  <p>`The City Name is :{this.state.cityData.display_name}`</p>
                  <p>`The lat : {this.state.cityData.lat}`</p>
                  <p>`The lon : {this.state.cityData.lon}`</p>

                </>
              }
            </Col>

            {/* <Col>3 of 3</Col> */}
          </Row>
        </Container>


      </div>
    )
  }
}

export default App

