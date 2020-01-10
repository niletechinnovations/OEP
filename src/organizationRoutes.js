import Dashboard from './views/OrganizationDashboard/Dashboard/Dashboard';
import Profile from './views/OrganizationDashboard/Profile/Profile';
import ChangePassword from './views/OrganizationDashboard/ChangePassword/ChangePassword';
import Employee from './views/OrganizationDashboard/Employee/Employee';
import Inspection from './views/OrganizationDashboard/Inspection/InspectionLists';
import InspectionFeedBack from './views/OrganizationDashboard/Inspection/InspectionFeedBack';
import AssignInspection from './views/OrganizationDashboard/Inspection/AssignInspection';
import FeedBackPreviewPage from './views/OrganizationDashboard/Inspection/FeedBackPreviewPage';
import Store from './views/OrganizationDashboard/Store/Store';
import ActionLists from './views/OrganizationDashboard/Inspection/ActionLists';
const oragnizationRoutes = [
  { path: '/organization/', exact: true, name: 'Home' },
  { path: '/organization/dashboard', name: 'Dashboard', component: Dashboard },  
  { path: '/organization/profile', exact: true,  name: 'Profile', component: Profile }, 
  { path: '/organization/change-password', exact: true,  name: 'Change Password', component: ChangePassword },
  { path: '/organization/employee', exact: true,  name: 'Employee', component: Employee },
  { path: '/organization/store', exact: true,  name: 'Store', component: Store },
  { path: '/organization/inspection', exact: true,  name: 'Inspection', component: Inspection },
  { path: '/organization/inspection/assign-inspection', exact: true,  name: 'Assign Inspection', component: AssignInspection },
  { path: '/organization/inspection/assign-inspection/:inspectionId', exact: true,  name: 'Assign Inspection', component: AssignInspection },
  { path: '/organization/inspection/:inspectionId', exact: true,  name: 'Inspection Feedback', component: InspectionFeedBack },
  { path: '/organization/inspection/feedback/:feedBackId', exact: true,  name: 'Feedback Preview', component: FeedBackPreviewPage },
  { path: '/organization/action', exact: true,  name: 'Action', component: ActionLists },
];

export default oragnizationRoutes;
