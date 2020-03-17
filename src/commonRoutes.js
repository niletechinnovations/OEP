import TemplatePreview from './views/Pages/Frontend/TemplatePreview';
import StartInspection from './views/Pages/Frontend/StartInspection';
import FeedBackPreviewPage from './views//Pages/Frontend/FeedBackPreviewPage';

const commonRoutes = [
  { path: '/common/template/:templateId', exact: true, name: 'Template Preview', component: TemplatePreview },
  { path: '/common/inspection/:inspectionId/:authId', exact: true, name: 'Inspection', component: StartInspection },
  { path: '/common/feedback-preview/:inspectionId/:authId', exact: true, name: 'Inspection Preview', component: FeedBackPreviewPage },
];

export default commonRoutes;
