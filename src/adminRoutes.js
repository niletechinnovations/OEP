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



const adminRoutes = [
  { path: '/admin/', exact: true, name: 'Home' },
  { path: '/admin/dashboard', name: 'Dashboard', component: Dashboard },  
  { path: '/admin/users', exact: true,  name: 'Users', component: Users },  
  { path: '/admin/users/:profileId', exact: true, name: 'User Details', component: User },
  { path: '/admin/category', exact: true,  name: 'Category', component: Category },
  { path: '/admin/subcategory', exact: true,  name: 'Subcategory', component: SubCategory },
  { path: '/admin/organization', exact: true,  name: 'Organization', component: Organization },
  { path: '/admin/organization/employee', exact: true,  name: 'Employee', component: Employee },
  { path: '/admin/organization/employee/:organizationId', exact: true,  name: 'Employee', component: Employee },
  { path: '/admin/organization/store', exact: true,  name: 'Store', component: Store },
  { path: '/admin/organization/store/:organizationId', exact: true,  name: 'Store', component: Store },
  { path: '/admin/change-password', exact: true,  name: 'Change Password', component: ChangePassword },
  { path: '/admin/template', exact: true,  name: 'Template List', component: TemplateList },
  { path: '/admin/create-template', exact: true,  name: 'Create Template', component: TemplateBuilder },
  { path: '/admin/create-template/:templateId', exact: true,  name: 'Create Template', component: TemplateBuilder },
  { path: '/admin/preview/:inspectionId', exact: true,  name: 'Preview Template', component: PreviewTemplatePage },
  { path: '/admin/inspection', exact: true,  name: 'Inspection', component: Inspection }, 
  { path: '/admin/inspection/action', exact: true,  name: 'Action', component: FeedBackPreviewPage }, 
  { path: '/admin/inspection/assign-inspection', exact: true,  name: 'Assign Inspection', component: AssignInspection },
  { path: '/admin/inspection/assign-inspection/:inspectionId', exact: true,  name: 'Assign Inspection', component: AssignInspection },
  { path: '/admin/inspection/:inspectionId', exact: true,  name: 'Inspection Feedback', component: InspectionFeedBack },
  { path: '/admin/inspection/feedback/:feedBackId', exact: true,  name: 'Feedback Preview', component: FeedBackPreviewPage },
  { path: '/admin/action', exact: true,  name: 'Action', component: ActionLists },

];

export default adminRoutes;
