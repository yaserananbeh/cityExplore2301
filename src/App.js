import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import ErrorAlert from './components/ErrorAlert'
import SearchForm from './components/SearchForm';
import CityLocation from './components/CityLocation';
import WeatherComponent from './components/WeatherComponent';
import MovieComponent from './components/MovieComponent';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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
      this.setState({
        weatherDate: weatherRes.data,
      })
      const movieRes = await axios.get(`${apiLink}/movie?region=${this.state.cityName}`);
      this.setState({
        movieDataRes: movieRes.data,
      })
    }
    catch (error) {
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
          <ErrorAlert erorr={this.state.error} />
        }
        <Container>
          <Row>
            <Col>
              <SearchForm
                getData={this.getData}
                updateCityName={this.updateCityName}
              />
              {(this.state.show) &&
                <CityLocation
                  cityData={this.state.cityData}
                />
              }
            </Col>
            <Col>
              <WeatherComponent
                show={this.state.show}
                weatherDate={this.state.weatherDate}
              />
            </Col>
          </Row>
          <MovieComponent
          show={this.state.show}
          movieDataRes={this.state.movieDataRes}
          />
        </Container>


      </div>
    )
  }
}

export default App

