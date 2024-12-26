import React from 'react'
import './MainLayout.css'
import Header from '../components/Header'

function MainLayout({ children }) {
    return (
        <div>
            <Header />

            {children}
        </div>
    )
}

export default MainLayout
