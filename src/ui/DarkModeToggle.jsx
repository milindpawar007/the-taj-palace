import React from 'react'
import ButtonIcon from './ButtonIcon'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'
import { DarkModeProvider, useDarkMode } from '../context/DarkModeContext'

function DarkModeToggle() {
    const { isDarkMode, toggleDarkmode } = useDarkMode();
    return (
        <ButtonIcon onClick={toggleDarkmode}>
            {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
        </ButtonIcon>
    )
}

export default DarkModeToggle
