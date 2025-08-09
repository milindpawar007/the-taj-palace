import React from 'react'
import Select from './Select'
import PropTypes from "prop-types";

function SortBy({ options }) {
    return (
        <Select options={options} />

    )
}


SortBy.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    ).isRequired
};

export default SortBy
