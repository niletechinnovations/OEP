import Dashboard from './views/AdminDashboard/Dashboard/Dashboard';
import Organization from './views/AdminDashboard/Organization/Organization';
import Users from'./views/AdminDashboard/Users/Users';
import User from './views/AdminDashboard/Users/User';
import Category from './views/AdminDashboard/Category/Category';
import SubCategory from './views/AdminDashboard/SubCategory/SubCategory';
import ChangePassword from'./views/AdminDashboard/ChangePassword/ChangePassword';
import TemplateBuilder from'./views/AdminDashboard/TemplateBuilder/TemplateBuilderPage';

const adminRoutes = [
  { path: '/admin/', exact: true, name: 'Home' },
  { path: '/admin/dashboard', name: 'Dashboard', component: Dashboard },  
  { path: '/admin/users', exact: true,  name: 'Users', component: Users },  
  { path: '/admin/users/:profileId', exact: true, name: 'User Details', component: User },
  { path: '/admin/category', exact: true,  name: 'Category', component: Category },
  { path: '/admin/subcategory', exact: true,  name: 'Subcategory', component: SubCategory },
  { path: '/admin/organization', exact: true,  name: 'Organization', component: Organization },
  { path: '/admin/change-password', exact: true,  name: 'Change Password', component: ChangePassword },
  { path: '/admin/create-template', exact: true,  name: 'Create Template', component: TemplateBuilder },
];

export default adminRoutes;
