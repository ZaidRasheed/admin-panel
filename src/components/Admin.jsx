import { Routes, Route } from 'react-router-dom'
import AdminContextProvider from '../context/admin context/AdminContext'

import { lazy, Suspense } from 'react'
import LoadingSpinner from './UI/LoadingSpinner'


const Layout = lazy(() => import('./layout/Layout'))
const Teachers = lazy(() => import('../pages/Teachers'))
const AddTeacher = lazy(() => import('../pages/AddTeacher'))
const Profile = lazy(() => import('../pages/Profile'))

export default function Admin() {
    return (
        <Layout>
            <AdminContextProvider>
                <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                        <Route
                            path='/'
                            element={<Teachers />}
                        />
                        <Route
                            path='/add-teacher'
                            element={<AddTeacher />}
                        />
                        <Route
                            path='/profile'
                            element={<Profile />}
                        />
                    </Routes>
                </Suspense>
            </AdminContextProvider>
        </Layout >
    )
}
