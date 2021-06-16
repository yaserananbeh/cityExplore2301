import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';

const locationAccessToken = process.env.REACT_APP_API_KEY;
const apiLink = process.env.REACT_APP_LINK;

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      cityData: {},
      show: false,
      alert: false,
      error: '',
      weatherDate: [],
      lat: '',
      lon: '',
      movieDataRes: []
    }
  }
  updateCityName = (e) => {
    this.setState({
      cityName: e.target.value,
    })
  }
  getData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${locationAccessToken} &q=${this.state.cityName}&format=json`);
      this.setState({
        cityData: res.data[0],
        show: true,
        alert: false,
        lat: res.data[0].lat,
        lon: res.data[0].lon
      })
      const weatherRes = await axios.get(`${apiLink}/weather?lat=${this.state.lat}&lon=${this.state.lon}`);
      // console.log(weatherRes.data);
      this.setState({
        weatherDate: weatherRes.data,
      })
      const movieRes = await axios.get(`${apiLink}/movie?region=${this.state.cityName}`);
      // console.log(movieRes.data);
      this.setState({
        movieDataRes: movieRes.data,
      })
    }
    catch (error) {
      // alert(error.message);
      this.setState({
        error: error.message,
        alert: true,
        show: false
      })
    }

  }

  render() {


    return (
      <div style={{ textAlign: 'center' }}>
        {this.state.alert &&
          <Alert variant="danger">
            This is a {this.state.error} alert—check it out!
          </Alert>
        }
        <Container>

          <Row>

            <Col>
              <Form onSubmit={this.getData}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>
                    <h1>
                      City Explorer
                    </h1>
                  </Form.Label>
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

            <Col>
              <h1>
                Weather Data
              </h1>
              {
                this.state.show &&

                this.state.weatherDate.map((value, idx) => {
                  return (
                    <div key={idx}>
                      <p >
                        {value.description}
                      </p>
                      <p>
                        {value.data}
                      </p>
                    </div>
                  )
                })
              }
            </Col>
            
          </Row>
          <Row className="justify-content-md-center">
          {/* <Col> */}
              <h1>
                Movie's Related
              </h1>
              {
                this.state.show &&

                this.state.movieDataRes.map((value, idx) => {
                  console.log(value.image_url)
                  return (
                    <Card 
                    key={idx}
                    style={{ width: '18rem' ,background:'#d6d5d2',padding:'10px',margin:'15px'}}>
                      
                      <Card.Img variant="top" src={value.image_url} />
                      <Card.Body>
                        <Card.Title>{value.title}</Card.Title>
                        <Card.Text>
                          {value.overview}
                        </Card.Text>
                        <Card.Text>
                          The Rate : {value.average_votes}
                        </Card.Text>
                        <Card.Text>
                          Total Votes : {value.total_votes}
                        </Card.Text>
                        <Card.Text>
                          The Released Date : {value.released_on}
                        </Card.Text>
                        <Card.Text>
                          The Popularity : {value.popularity}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  )
                })
              }
            {/* </Col> */}
          </Row>
        </Container>


      </div>
    )
  }
}

export default App

