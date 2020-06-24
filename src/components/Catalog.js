import React, { Component } from "react"
import Gallery from "react-photo-gallery";
import { isEmpty } from 'lodash'
import { formatDate, apodUrl, apiKey } from "../App"


class Catalog extends Component {

  state = {
    error: null,
    isLoaded: false,
    data: [],
    date: new Date(),
  }

  componentDidMount() {
    const {date} = this.state 
    let arr = []
    for (let i = 0; i < 20; i++){
        date.setDate(date.getDate() - (i === 0 ? 0 : 1))
        fetch(`${apodUrl}date=${formatDate(date)}&api_key=${apiKey}`)
            .then(response => response.json())
            .then(
                result => {
                    arr.push(result)
                    this.setState({
                        isLoaded: true,
                        data: arr,
                    })
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
      }
  }

  render() {
    const {data} = this.state
    const media = !isEmpty(data) ? data.filter(item => item.url.indexOf('apod') >= 0) : null
    const photoForGalery = !isEmpty(media) ? media.map(item => ({
            src: item.url,
            width: 2,
            height: 2
        })) : null

      return (
        <div className="catalog">
            <h2>Last NASA APOD's</h2>  
            <Gallery 
                photos={!isEmpty(photoForGalery) ? photoForGalery : []}
                key={new Date().getTime()}
            />  
        </div>
      )
  }
}

export default Catalog

    
