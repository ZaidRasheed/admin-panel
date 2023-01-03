import { useState, useMemo } from 'react'
import { useAdmin } from '../context/admin context/AdminContext'

import EditTeacherModal from '../components/options/edit teachers/EditTeacherModal'
import DeletedTeacherModal from '../components/options/edit teachers/DeletedTeacherModal'
import EnableDisableTeacherModal from '../components/options/edit teachers/EnableDisableTeacherModal'

export default function useTeachers() {
    const { teachers: teachersProps, refreshData } = useAdmin()

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [teacher, setTeacher] = useState({})
    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [enableDisableModal, setEnableDisableModal] = useState(false)

    const teachersNames = useMemo(() => {
        return teachersProps?.map(teacher => {
            return { label: teacher.firstName + ' ' + teacher.lastName }
        })
    }, [teachersProps])

    const teachersEmails = useMemo(() => {
        return teachersProps?.map(teacher => {
            return { label: teacher.email }
        })
    }, [teachersProps])

    const teachers = useMemo(() => {
        return teachersProps?.filter(teacher => {

            const fullName = teacher.firstName + ' ' + teacher.lastName
            return teacher?.email?.toLowerCase().includes(email.toLowerCase().trim()) && fullName?.toLowerCase().includes(name.trim().toLowerCase())
        })
    }, [teachersProps, email, name])

    const showDeleteTeacher = (teacher) => {
        setTeacher(teacher)
        setDeleteModal(true)
    }
    const showEditTeacher = (teacher) => {
        setTeacher(teacher)
        setEditModal(true)
    }
    const showEnableDisableTeacher = (teacher) => {
        setTeacher(teacher)
        setEnableDisableModal(true)
    }

    const DeleteModal = <>
        {deleteModal &&
            <DeletedTeacherModal
                teacher={teacher}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
                refreshData={refreshData}

            />}
    </>
    const EditModal = <>
        {editModal &&
            <EditTeacherModal
                teacher={teacher}
                editModal={editModal}
                setEditModal={setEditModal}
                refreshData={refreshData}
            />}
    </>
    const EnableDisableModal = <>
        {enableDisableModal &&
            <EnableDisableTeacherModal
                teacher={teacher}
                enableDisableModal={enableDisableModal}
                setEnableDisableModal={setEnableDisableModal}
                refreshData={refreshData}
            />}
    </>

    return {
        email,
        setEmail,
        name,
        setName,
        teacher,
        DeleteModal,
        EditModal,
        EnableDisableModal,
        teachersNames,
        teachersEmails,
        teachers,
        showDeleteTeacher,
        showEditTeacher,
        showEnableDisableTeacher
    }
}
