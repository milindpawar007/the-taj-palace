import React from 'react'
import styled from 'styled-components'


const StylesHeader = styled.header`
    
    background-color: var(--color-grey-0);;
    padding: 1.2rem 4.8rem;
    border-bottom:  1px solid var(--color-grey-100);
`
function Header() {
    return (
        <StylesHeader>
            Header
        </StylesHeader>
    )
}

export default Header
