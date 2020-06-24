import React from "react"
import PropTypes from "prop-types"
import ReactPlayer from 'react-player/lazy'
import { isEmpty } from 'lodash'

const Photo = props => 
    <React.Fragment>
        <h2>NASA's Astronomy 
            {!isEmpty(props.photo.url) ?
                (props.photo.url.indexOf('youtube') === -1 ? 
                ' Picture'
                : ' Video') : null
            } of {props.photo.date}</h2>
        {!isEmpty(props.photo.url) ? 
            (props.photo.url.indexOf('youtube') === -1 ? 
                <img src={props.photo.url} alt="" />
                : <ReactPlayer url={props.photo.url} />
            ) 
        : null}
    </React.Fragment>
    
    
Photo.propTypes = {
    photo: PropTypes.object,
    date: PropTypes.string,
}

export default Photo
    
