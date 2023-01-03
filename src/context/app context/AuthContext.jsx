import { createContext, useContext, useEffect, useState } from "react"
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signOut,
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
} from "firebase/auth"

import {
    collection, doc,
    getDocs, getDoc,
} from 'firebase/firestore'

import { auth, db } from "./firebase.jsx"

const BASE_URL = import.meta.env.VITE_API_URL

const UserContext = createContext()

export const UserAuth = () => {
    return useContext(UserContext)
}

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth)
    }

    const sendResetPasswordLink = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const createCredential = (email, password) => {
        const credential = EmailAuthProvider.credential(
            email,
            password
        )
        return credential
    }

    const resetPassword = async (oldPassword, newPassword) => {
        try {
            const credential = createCredential(currentUser.email, oldPassword)
            await reauthenticateWithCredential(currentUser, credential)
            await updatePassword(currentUser, newPassword)
            return { status: 'success', message: 'Password updated successfully.' }
        }
        catch (error) {
            switch (error.code) {
                case 'auth/weak-password': {
                    return { status: 'error', message: 'Weak Password.' }
                }
                case 'auth/wrong-password': {
                    return { status: 'error', message: 'Wrong password please provide your current password, or reset your password through email.' }
                }
                default: {
                    return { status: 'error', message: 'Failed to update password.' }
                }
            }
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setCurrentUser(user)
            }
            else {
                setCurrentUser(null)
            }
            setLoading(false)
        })

        return () => {
            unsubscribe()
        }
    }, [])



    function getAdminData(adminId) {
        const adminDoc = doc(db, 'admins', adminId)
        return new Promise((resolve, reject) => {
            getDoc(adminDoc)
                .then(res => {
                    if (res.exists())
                        return resolve(res.data())
                    return reject({ error: "Admin Doesn't exist" })

                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    function getAllTeachers() {
        const teachersCol = collection(db, 'teachers')
        return new Promise((resolve, reject) => {
            getDocs(teachersCol)
                .then((snapshot) => {
                    let teachers = []
                    snapshot.docs.forEach(doc => {
                        teachers.push(doc.data())
                    })
                    resolve(teachers)
                })
                .catch(err => {
                    reject(err.message)
                })
        })
    }

    async function createTeacher(teacher) {
        if (teacher.firstName.length < 2 || teacher.lastName < 2) {
            return { status: 'error', message: 'Please provide a valid first and last name.' }
        }
        const regName = /^[a-zA-Z ]+$/

        if (!regName.test(teacher.firstName.trim()) || !regName.test(teacher.lastName.trim())) {
            return { status: 'error', message: 'Name should only contain alphabets.' }
        }
        if (teacher.gender !== 'male' && teacher.gender !== 'female') {
            return { status: 'error', message: 'Please choose a gender.' }
        }
        if (teacher.email.length < 5) {
            return { status: 'error', message: 'Please provide a valid email address.' }
        }
        if (teacher.password.length < 6) {
            return { status: 'error', message: 'Short Password.' }
        }
        if (teacher.password !== teacher.passwordConfirm) {
            return { status: 'error', message: 'Passwords do not match' }
        }
        if (teacher.disabled !== 'enabled' && teacher.disabled !== 'disabled') {
            return { status: 'error', message: 'Please choose whether the account is enabled or disabled.' }
        }

        const validatedTeacher = {
            firstName: teacher.firstName,
            lastName: teacher.lastName,
            email: teacher.email,
            gender: teacher.gender,
            password: teacher.password,
            disabled: teacher.disabled
        }
        console.log(validatedTeacher)
        try {
            const token = await currentUser.getIdToken(true)
            console.log('first')
            try {
                const response = await fetch(BASE_URL + '/add_teacher', {
                    method: 'POST',
                    body: JSON.stringify(validatedTeacher),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        token: token
                    }
                })
                console.log('second')

                return response.json()
            }
            catch (error) {
                return { status: 'error', message: 'Error in sending request' }
            }
        }
        catch (error) {
            return { status: 'error', message: 'Error in Authenticating admin' }
        }
    }


    async function deleteTeacher(teacherId) {
        try {
            const token = await currentUser.getIdToken(true)
            try {
                const response = await fetch(BASE_URL + '/delete_teacher', {
                    method: 'DELETE',
                    body: JSON.stringify({ id: teacherId }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        token: token
                    }
                })
                return response.json()
            }
            catch (error) {
                return { status: 'error', message: 'Error in sending request' }
            }
        }
        catch (error) {
            return { status: 'error', message: 'Error in Authenticating admin' }
        }
    }

    async function editTeachersName(teacherId, firstName, lastName) {
        const regName = /^[a-zA-Z ]+$/

        if (!regName.test(firstName.trim()) || !regName.test(lastName.trim())) {
            return { status: 'error', message: 'Name should only contain alphabets.' }
        }
        try {
            const token = await currentUser.getIdToken(true)
            try {
                const response = await fetch(BASE_URL + '/edit_teacher_name', {
                    method: 'PUT',
                    body: JSON.stringify({
                        id: teacherId,
                        firstName: firstName,
                        lastName: lastName
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        token: token
                    }
                })
                return response.json()
            }
            catch (error) {
                return { status: 'error', message: 'Error in sending request' }
            }
        }
        catch (error) {
            return { status: 'error', message: 'Error in Authenticating admin' }
        }
    }

    async function enabledDisableTeacher(status, teacherId) {
        if (!teacherId) {
            return { status: 'error', message: 'Invalid teacher ID.' }
        }
        if (status !== 'enable' && status !== 'disable') {
            return { status: 'error', message: 'Please choose whether the account is enabled or disabled.' }
        }
        try {
            const token = await currentUser.getIdToken(true)
            try {
                const response = await fetch(BASE_URL + '/enable_disable_teacher', {
                    method: 'PUT',
                    body: JSON.stringify({
                        id: teacherId,
                        disable: status === 'disable' ? true : false
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        token: token
                    }
                })
                return response.json()
            }
            catch (error) {

                return { status: 'error', message: 'Error in sending request' }
            }
        }
        catch (error) {
            return { status: 'error', message: 'Error in Authenticating admin' }
        }

    }


    const values = {
        currentUser,
        logIn,
        sendResetPasswordLink,
        resetPassword,
        logOut,

        getAdminData,
        getAllTeachers,
        createTeacher,
        deleteTeacher,
        editTeachersName,
        enabledDisableTeacher
    }
    return (
        <UserContext.Provider value={values}>
            {!loading && children}
        </UserContext.Provider>
    )
}

