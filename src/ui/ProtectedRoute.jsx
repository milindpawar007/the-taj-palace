import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { getCurrentUser } from '../services/apiAuth'
import { useGetAuthUser } from '../features/authentication/useGetAuthUser'
import Spinner from './Spinner'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Fullpage = styled.div`
     height :100vh;
     background-color: var(--color-grey-50) ;
     display: flex;
     justify-content: center;
     align-items: center;

`


function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const { user, isLoading, isAuthenticated } = useGetAuthUser();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) navigate("/login", { replace: true });
    }, [isLoading, isAuthenticated, navigate]);

    if (isLoading) return <Fullpage><Spinner /></Fullpage>;
    if (!isAuthenticated) return null; // prevent flashing protected UI
    return children;


}
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ProtectedRoute

