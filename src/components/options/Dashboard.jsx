import React from 'react'

export default function Dashboard(props) {
    return (
        <div style={{ margin: "20px 0 0 20px" }}>
            <h1>Dashboard</h1>
            <h2>Total teachers: {props.teachers?.length}</h2>
        </div>
    )
}
