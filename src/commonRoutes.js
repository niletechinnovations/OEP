import TemplatePreview from './views/Pages/Frontend/TemplatePreview';

const commonRoutes = [
  { path: '/common/template/:templateId', exact: true, name: 'Template Preview', component: TemplatePreview },
];

export default commonRoutes;
