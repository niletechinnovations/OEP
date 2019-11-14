import HomePage from './views/Pages/Frontend/HomePage';
import AboutPage from './views/Pages/Frontend/AboutPage';
import LoginPage from './views/Pages/Frontend/LoginPage';
import ResetPassword from './views/Pages/Frontend/ResetPassword';
import RegisterPage from './views/Pages/Frontend/RegisterPage';

const frontendRoutes = [
  { path: '/', exact: true, name: 'Home', component: HomePage },
  { path: '/home', name: 'Home', component: HomePage },  
  { path: '/about-us', exact: true,  name: 'About us', component: AboutPage },  
  { path: '/login', exact: true, name: 'Login', component: LoginPage },
  { path: '/register', exact: true,  name: 'Register', component: RegisterPage },
  { path: '/reset-password/:token', exact: true,  name: 'Reset Password', component: ResetPassword },
];

export default frontendRoutes;
