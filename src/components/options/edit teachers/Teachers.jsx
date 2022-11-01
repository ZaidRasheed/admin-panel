import { useState, useMemo } from 'react'

import { Button } from 'react-bootstrap'

import { Trash, Pencil, ExclamationTriangleFill } from 'react-bootstrap-icons';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import DeletedTeacherModal from './DeletedTeacherModal';
import EditTeacherModal from './EditTeacherModal';
import EnableDisableTeacherModal from './EnableDisableTeacherModal';

export default function Teachers(props) {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [teacher, setTeacher] = useState({})
    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [enableDisableModal, setEnableDisableModal] = useState(false)

    const teachersNames = useMemo(() => {
        return props?.teachers?.map(teacher => {
            return { label: teacher.firstName + ' ' + teacher.lastName }
        })
    }, [props?.teachers])
    const teachersEmails = useMemo(() => {
        return props?.teachers?.map(teacher => {
            return { label: teacher.email }
        })
    }, [props?.teachers])
    const teachers = useMemo(() => {
        return props?.teachers?.filter(teacher => {
            return teacher?.email?.toLowerCase().includes(email.toLowerCase().trim()) && teacher?.firstName?.toLowerCase().includes(name.trim().toLowerCase())
        })
    }, [props?.teachers, email, name])

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
    return (
        <TableContainer sx={{ margin: 1, padding: 5 }} style={{ maxHeight: '100vh', overflow: 'hidden' }}>
            {deleteModal &&
                <DeletedTeacherModal
                    teacher={teacher}
                    deleteModal={deleteModal}
                    setDeleteModal={setDeleteModal}
                    refreshData={props.refreshData}

                />
            }
            {editModal &&
                <EditTeacherModal
                    teacher={teacher}
                    editModal={editModal}
                    setEditModal={setEditModal}
                    refreshData={props.refreshData}
                />
            }
            {enableDisableModal &&
                <EnableDisableTeacherModal
                    teacher={teacher}
                    enableDisableModal={enableDisableModal}
                    setEnableDisableModal={setEnableDisableModal}
                    refreshData={props.refreshData}
                />
            }
            <h1 className='display-2'>Search</h1>
            <Box sx={{ flexGrow: 1, marginBottom: 3, marginTop: 4 }}>
                <Grid container spacing={10}>
                    <Grid item xs={4}>
                        <Autocomplete
                            disablePortal
                            selectOnFocus
                            clearOnBlur
                            options={teachersNames}
                            onChange={(e, value) => {
                                if (value)
                                    setName(value.label)
                                else
                                    setName('')
                            }}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Name" />}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Autocomplete
                            disablePortal
                            selectOnFocus
                            clearOnBlur
                            options={teachersEmails}
                            onChange={(e, value) => {
                                if (value)
                                    setEmail(value.label)
                                else
                                    setEmail('')
                            }}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Email" />}
                        />
                    </Grid>
                </Grid>
                {/* <Button className='mt-3' variant='outline-primary' onClick={props.refreshData}>refresh</Button> */}
            </Box>
            <Paper
                style={{ minHeight: 'auto', maxHeight: '900px', overflow: 'auto' }}
            >
                <Table
                    stickyHeader
                    sx={{ maxHeight: 400 }}
                    aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: 'white', backgroundColor: '#242A31' }}>Name</TableCell>
                            <TableCell style={{ color: 'white', backgroundColor: '#242A31' }} align="center">Email</TableCell>
                            <TableCell style={{ color: 'white', backgroundColor: '#242A31' }} align="center">Edit</TableCell>
                            <TableCell style={{ color: 'white', backgroundColor: '#242A31' }} align="center">Enable/Disable</TableCell>
                            <TableCell style={{ color: 'white', backgroundColor: '#242A31' }} align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teachers?.map((teacher, i) => (
                            <TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" >
                                    {teacher.firstName} {teacher.lastName}
                                </TableCell>
                                <TableCell align="center">{teacher.email}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant='outline-success'
                                        onClick={() => { showEditTeacher(teacher) }}><Pencil />
                                    </Button>
                                </TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant={teacher.disabled === true ? 'warning' : 'outline-warning'}
                                        onClick={() => { showEnableDisableTeacher(teacher) }}><ExclamationTriangleFill />
                                    </Button>
                                </TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant='outline-danger'
                                        onClick={() => { showDeleteTeacher(teacher) }}><Trash />
                                    </Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </TableContainer >
    )
}
