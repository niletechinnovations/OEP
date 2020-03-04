export default {
  items: [
    {
      name: 'Dashboard',
      url: '/organization/dashboard',
      icon: 'icon-speedometer',
    },
    {
      name: 'Employee',
      url: '/organization/employee',
      icon: 'icon-organization',     
    }, 
    {
      name: 'Store',
      url: '/organization/store',
      icon: 'icon-grid',     
    }, 
    {
      name: 'Manage Template',
      icon: 'icon-docs',
      url: 'organization/manage-template',
      children: [{
          name: 'Create Template',
          url: '/organization/manage-template/create-template'
        },
        {
          name: 'Template List',
          url: '/organization/manage-template/template'
        }
      ]
    },    
    {
      name: 'Inspection',      
      icon: 'icon-check', 
      url: 'organization/manage-inspection',
      children: [{
          name: 'Assign Inspection',
          url: '/organization/manage-inspection/assign-inspection'
        },
        {
          name: 'View Inspection',
          url: '/organization/manage-inspection/inspection'
        }
      ]    
    },
    {
      name: 'Action',      
      icon: 'icon-note', 
      url: '/organization/action',  
    },
    {
      name: 'Profile',
      url: '/organization/profile',
      icon: 'icon-user',     
    },
  ],
};
