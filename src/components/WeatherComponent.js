import React, { Component } from 'react'

export class WeatherComponent extends Component {
    render() {
        return (
            <div>
                <h1>
                    Weather Data
                </h1>
                {
                    this.props.show &&
                    this.props.weatherDate.map((value, idx) => {
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
            </div>
        )
    }
}

export default WeatherComponent
