import React, { Component } from "react"
import DateInput from "./components/DateInput"
import Photo from "./components/Photo.js"
import Catalog from "./components/Catalog"
import './App.css'

export const apiKey = 'lToNPLq7sV6ofpabhnCEvi0PCN0gcj7MpdvcxaHM'
export const apodUrl = 'https://api.nasa.gov/planetary/apod?'

export const formatDate = moment => {
  let year = moment.getFullYear()
  let month = moment.getMonth() + 1
  let day = moment.getDate()
  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
}

class App extends Component {

  state = {
    error: null,
    isLoaded: false,
    date: '',
    photoInfo: {},
    isCatalogOpen: false
  };

  componentDidMount() {

    const url = localStorage.getItem('nasaDate') ? 
      `${apodUrl}date=${localStorage.getItem('nasaDate')}&api_key=${apiKey}` 
      : `${apodUrl}api_key=${apiKey}`

    fetch(url)
      .then(response => response.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            photoInfo: result,
            date: result.date
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

  handleChange = date => {
    this.setState({
      startDate: date,
      isCatalogOpen: false
    })
    localStorage.setItem('nasaDate', formatDate(date))
    this.getPhoto(formatDate(date))
  }

  getPhoto = date => {
    fetch(`${apodUrl}date=${date}&api_key=${apiKey}`)
      .then(response => response.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            photoInfo: result,
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

  openCatalog = () => {
    this.setState({
      isCatalogOpen: true
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <React.Fragment>
            <DateInput 
              changeDate={this.handleChange} 
              openCatalog ={this.openCatalog}
            />
            {this.state.isCatalogOpen ? 
              <Catalog /> :
              <Photo 
               photo={this.state.photoInfo}
               date ={this.state.date} 
              />
            }
          </React.Fragment>
        </header>
      </div>
    )
  }
}

export default App
