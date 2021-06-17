import React, { Component } from 'react'
import Image from 'react-bootstrap/Image';



export class CityLocation extends Component {
    render() {
        return (
            <>
                <p></p>
                <Image src={`https://maps.locationiq.com/v3/staticmap?key=pk.e510e5b65d9f07a0d956a967853d2fb2&q&center=${this.props.cityData.lat},${this.props.cityData.lon}&zoom=15`} roundedCircle />
                <p>`The City Name is :{this.props.cityData.display_name}`</p>
                <p>`The lat : {this.props.cityData.lat}`</p>
                <p>`The lon : {this.props.cityData.lon}`</p>

            </>
        )
    }
}

export default CityLocation
