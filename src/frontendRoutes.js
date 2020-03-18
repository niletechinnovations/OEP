import HomePage from './views/Pages/Frontend/HomePage';
import AboutPage from './views/Pages/Frontend/AboutPage';
import ContactPage from './views/Pages/Frontend/ContactPage';
import BlogPage from './views/Pages/Frontend/BlogPage';
import LoginPage from './views/Pages/Frontend/LoginPage';
import ResetPassword from './views/Pages/Frontend/ResetPassword';
import RegisterPage from './views/Pages/Frontend/RegisterPage';
import PrivacyPolicy from './views/Pages/Frontend/PrivacyPolicy';
import VerifyEmail from './views/Pages/Frontend/VerifyEmail';
import WhyJoinUs from './views/Pages/Frontend/WhyJoinUs';

const frontendRoutes = [
  { path: '/', exact: true, name: 'Home', component: HomePage },
  { path: '/home', name: 'Home', component: HomePage },  
  { path: '/privacy-policy', name: 'Privacy Policy', component:PrivacyPolicy  },  
  { path: '/about-us', exact: true,  name: 'About us', component: AboutPage },
  { path: '/why-join-us', exact: true,  name: 'Why join us', component: WhyJoinUs },
  { path: '/contact-us', exact: true,  name: 'Contact us', component: ContactPage },
  { path: '/blog', exact: true,  name: 'Blog', component: BlogPage },
  { path: '/login', exact: true, name: 'Login', component: LoginPage },
  { path: '/register', exact: true,  name: 'Register', component: RegisterPage },
  { path: '/reset-password/:token', exact: true,  name: 'Reset Password', component: ResetPassword },
  { path: '/verify-email/:token', exact: true,  name: 'Verify Email', component: VerifyEmail },
];

export default frontendRoutes;
