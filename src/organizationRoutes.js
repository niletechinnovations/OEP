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
import TemplateList from './views/OrganizationDashboard/TemplateBuilder/Template';
import TemplateBuilder from './views/OrganizationDashboard/TemplateBuilder/TemplateBuilderPage';
//import PreviewTemplatePage from './views/OrganizationDashboard/TemplateBuilder/PreviewTemplatePage';
import Success from './views/OrganizationDashboard/Subscription/Success';
import CurrentSubscription from './views/OrganizationDashboard/Subscription/CurrentSubscription';
import BuySubscription from './views/OrganizationDashboard/Subscription/BuySubscription';
import Cancel from './views/OrganizationDashboard/Subscription/Cancel';
import SetUpPage from './views/OrganizationDashboard/SetUpPage';
const oragnizationRoutes = [
  { path: '/organization/', exact: true, name: 'Home' },
  { path: '/organization/dashboard', name: 'Dashboard', component: Dashboard },  
  { path: '/organization/profile', exact: true,  name: 'Profile', component: Profile }, 
  { path: '/organization/change-password', exact: true,  name: 'Change Password', component: ChangePassword },
  { path: '/organization/employee', exact: true,  name: 'Employee', component: Employee },
  { path: '/organization/store', exact: true,  name: 'Store', component: Store },
  { path: '/organization/manage-inspection/inspection', exact: true,  name: 'Inspection', component: Inspection },
  { path: '/organization/manage-inspection/assign-inspection', exact: true,  name: 'Assign Inspection', component: AssignInspection },
  { path: '/organization/manage-inspection/assign-inspection/:inspectionId', exact: true,  name: 'Assign Inspection', component: AssignInspection },
  { path: '/organization/manage-inspection/inspection/:inspectionId', exact: true,  name: 'Inspection Feedback', component: InspectionFeedBack },
  { path: '/organization/manage-inspection/inspection/:inspectionId/:feedBackId', exact: true,  name: 'Feedback Preview', component: FeedBackPreviewPage },
  { path: '/organization/action', exact: true,  name: 'Action', component: ActionLists },
  { path: '/organization/manage-template/template', exact: true,  name: 'Template Library', component: TemplateList },
  { path: '/organization/manage-template/create-template', exact: true,  name: 'Create Template', component: TemplateBuilder },
  { path: '/organization/manage-template/create-template/:templateId', exact: true,  name: 'Create Template', component: TemplateBuilder },
  { path: '/organization/subscription', exact: true,  name: 'Current Subscription', component: CurrentSubscription },
  { path: '/organization/subscription/plan', exact: true,  name: 'Subscription Plan', component: BuySubscription },
  { path: '/organization/subscription/success', exact: true,  name: 'Payment Success', component: Success },
  { path: '/organization/subscription/cancel', exact: true,  name: 'Payment Cancel', component: Cancel },
  { path: '/organization/set-up', exact: true,  name: 'Setup', component: SetUpPage },

];

export default oragnizationRoutes;
