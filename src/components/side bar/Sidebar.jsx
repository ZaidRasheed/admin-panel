import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem
} from 'cdbreact'

import { useLocation, useNavigate } from 'react-router-dom'
const Sidebar = () => {

  const navigate = useNavigate()
  const url = useLocation()
  const page = url.pathname.split(('/admin-panel'))[1]

  return (
    <div
      style={{ display: 'inline-block', height: '100vh', overflow: 'scroll initial' }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#242A31">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          Admin Panel
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <CDBSidebarMenuItem
              active={page === '' || page === '/'}
              onClick={() => navigate('./')}
              icon="table">Teachers</CDBSidebarMenuItem>
            <CDBSidebarMenuItem
              active={page === '/add-teacher'}
              onClick={() => navigate('./add-teacher')}
              icon="plus">
              Add Teacher
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem
              active={page === '/profile'}
              onClick={() => navigate('./profile')}
              icon="user">Profile</CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  )
}

export default Sidebar
