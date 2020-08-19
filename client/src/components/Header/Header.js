import React from 'react'
import styles from './Header.module.css'

const Header = ({text}) => {
    return (
        <h1 className="mx-auto relative font-bold text-5xl border-b-4">{text}<span className="absolute font-black border-b-8">{text}</span></h1>
    )
}

export default Header
