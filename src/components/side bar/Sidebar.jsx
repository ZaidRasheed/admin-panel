import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem
} from 'cdbreact';

const Sidebar = (props) => {

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
            {/* <CDBSidebarMenuItem
              active={props.active === 'Dashboard' ? true : false}
              onClick={() => { props.setActive('Dashboard') }}
              icon="columns">Dashboard</CDBSidebarMenuItem> */}
            <CDBSidebarMenuItem
              active={props.active === 'Teachers' ? true : false}
              onClick={() => { props.setActive('Teachers') }}
              icon="table">Teachers</CDBSidebarMenuItem>
            <CDBSidebarMenuItem
              active={props.active === 'Add Teacher' ? true : false}
              onClick={() => { props.setActive('Add Teacher') }}
              icon="plus">
              Add Teacher
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem
              active={props.active === 'Profile' ? true : false}
              onClick={() => { props.setActive('Profile') }}
              icon="user">Profile</CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
