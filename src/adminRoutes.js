import Dashboard from './views/AdminDashboard/Dashboard/Dashboard';
import Organization from './views/AdminDashboard/Organization/Organization';
import Users from'./views/AdminDashboard/Users/Users';
import User from './views/AdminDashboard/Users/User';
import Category from './views/AdminDashboard/Category/Category';
import SubCategory from './views/AdminDashboard/SubCategory/SubCategory';
import ChangePassword from'./views/AdminDashboard/ChangePassword/ChangePassword';
import TemplateList from'./views/AdminDashboard/TemplateBuilder/Template';
import TemplateBuilder from'./views/AdminDashboard/TemplateBuilder/TemplateBuilderPage';
import PreviewTemplatePage from'./views/AdminDashboard/TemplateBuilder/PreviewTemplatePage';
import Employee from './views/AdminDashboard/Organization/Employee/Employee';
import Inspection from './views/AdminDashboard/Inspection/InspectionLists';
import InspectionFeedBack from './views/AdminDashboard/Inspection/InspectionFeedBack';
import AssignInspection from './views/AdminDashboard/Inspection/AssignInspection';
import FeedBackPreviewPage from './views/AdminDashboard/Inspection/FeedBackPreviewPage';
import Store from './views/AdminDashboard/Organization/Store/Store';
import ActionLists from './views/AdminDashboard/Inspection/ActionLists';
import Subscription from './views/AdminDashboard/Subscription/Subscription';
import SubscriberList from './views/AdminDashboard/Reports/Subscriber';
import LeaderBoard from './views/AdminDashboard/Reports/LeaderBoard';
import WeeklyReports from './views/AdminDashboard/Reports/WeeklyReports';
import Profile from './views/AdminDashboard/Profile/Profile';

const adminRoutes = [
  { path: '/admin/', exact: true, name: 'Home' },
  { path: '/admin/dashboard', name: 'Dashboard', component: Dashboard },  
  { path: '/admin/users', exact: true,  name: 'Users', component: Users },  
  { path: '/admin/profile', exact: true,  name: 'Profile', component: Profile }, 
  { path: '/admin/users/:profileId', exact: true, name: 'User Details', component: User },
  { path: '/admin/manage-categories/category', exact: true,  name: 'Category', component: Category },
  { path: '/admin/manage-categories/subcategory', exact: true,  name: 'Subcategory', component: SubCategory },
  { path: '/admin/manage-organization/organization', exact: true,  name: 'Organization', component: Organization },
  { path: '/admin/manage-organization/employee', exact: true,  name: 'Employee', component: Employee },
  { path: '/admin/manage-organization/employee/:organizationId', exact: true,  name: 'Employee', component: Employee },
  { path: '/admin/manage-organization/store', exact: true,  name: 'Store', component: Store },
  { path: '/admin/manage-organization/store/:organizationId', exact: true,  name: 'Store', component: Store },
  { path: '/admin/change-password', exact: true,  name: 'Change Password', component: ChangePassword },
  { path: '/admin/manage-template/template', exact: true,  name: 'Template Library', component: TemplateList },
  { path: '/admin/manage-template/create-template', exact: true,  name: 'Create Template', component: TemplateBuilder },
  { path: '/admin/manage-template/create-template/:templateId', exact: true,  name: 'Create Template', component: TemplateBuilder },
  { path: '/admin/manage-template/preview/:inspectionId', exact: true,  name: 'Preview Template', component: PreviewTemplatePage },
  { path: '/admin/manage-inspection/inspection', exact: true,  name: 'Inspection', component: Inspection }, 
  { path: '/admin/manage-inspection/inspection/action', exact: true,  name: 'Action', component: FeedBackPreviewPage }, 
  { path: '/admin/manage-inspection/assign-inspection', exact: true,  name: 'Assign Inspection', component: AssignInspection },
  { path: '/admin/manage-inspection/assign-inspection/:inspectionId', exact: true,  name: 'Assign Inspection', component: AssignInspection },
  { path: '/admin/manage-inspection/inspection/:inspectionId', exact: true,  name: 'Inspection Feedback', component: InspectionFeedBack },
  { path: '/admin/manage-inspection/inspection/:inspectionId/:feedBackId', exact: true,  name: 'Feedback Preview', component: FeedBackPreviewPage },
  { path: '/admin/action', exact: true,  name: 'Action', component: ActionLists },
  { path: '/admin/subscription', exact: true,  name: 'Subscription', component: Subscription },
  { path: '/admin/reports/subscriber-list', exact: true,  name: 'Subscriber List', component: SubscriberList },
  { path: '/admin/reports/leaderboard', exact: true,  name: 'LeaderBoard', component: LeaderBoard },
  { path: '/admin/reports/weekly-reports', exact: true,  name: 'Weekly Reports', component: WeeklyReports },

];

export default adminRoutes;
