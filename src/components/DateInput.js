import React from "react"
import PropTypes from "prop-types"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const DateInput = props => (
    <React.Fragment>
        <DatePicker
            value="Choose a Date"
            onChange={props.changeDate}
        />
        <button 
            className="btnCatalog"
            onClick={props.openCatalog}>
                Catalog
        </button>
    </React.Fragment>
  )

DateInput.propTypes = {
    changeDate: PropTypes.func,
}

export default DateInput
    
