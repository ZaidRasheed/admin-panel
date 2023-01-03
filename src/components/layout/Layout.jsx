import React from 'react'
import Sidebar from '../side bar/Sidebar'
export default function Layout(props) {
    return (
        <div style={{ display: "flex", maxHeight: '100vh' }}>
            <Sidebar />
            {props.children}
        </div>
    )
}
