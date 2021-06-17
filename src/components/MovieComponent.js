import React, { Component } from 'react'
import Row from 'react-bootstrap/Row';

import Card from 'react-bootstrap/Card';

export class MovieComponent extends Component {
    render() {
        return (
            <Row className="justify-content-md-center">
            {/* <Col> */}
            <h1>
              Movie's Related
            </h1>
            {
              this.props.show &&

              this.props.movieDataRes.map((value, idx) => {
                return (
                  <Card
                    key={idx}
                    style={{ width: '18rem', background: '#d6d5d2', padding: '10px', margin: '15px' }}>

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
        )
    }
}

export default MovieComponent
