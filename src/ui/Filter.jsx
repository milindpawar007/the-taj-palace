import styled, { css } from "styled-components";
import PropTypes from 'prop-types';

import React from 'react'
import { useSearchParams } from "react-router-dom";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;




function Filter({ filterField, options }) {

  const [searchParamas, setSearchParam] = useSearchParams()

  const currentFilter = searchParamas.get(filterField) || options.at(0).value;
  function handelClick(value) {
    searchParamas.set(filterField, value)
    setSearchParam(searchParamas)
  }
  return (
    <StyledFilter>

      {options.map((option, index) => (
        <FilterButton key={option.value}
          active={currentFilter === option.value}
          disabled={currentFilter === option.value}
          onClick={() => handelClick(option.value)}>{option.label}
        </FilterButton>
      ))}

    </StyledFilter>
  )
}




Filter.propTypes = {
  filterField: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

export default Filter

