import React from 'react'
import Select from './Select'
import PropTypes from "prop-types";
import { useSearchParams } from 'react-router-dom';

function SortBy({ options }) {

    const [searchParamas, setSearchParamas] = useSearchParams();

    const SortBy = searchParamas.get('sortBy') || ''

    function handelChange(e) {
        searchParamas.set('sortBy', e.target.value)
        setSearchParamas(searchParamas)
    }

    return (
        <Select options={options} type='white' onChange={handelChange} value={SortBy} />

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
