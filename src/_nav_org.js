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
      icon: 'icon-people',     
    }, 
    {
      name: 'Store',
      url: '/organization/store',
      icon: 'icon-people',     
    }, 
    {
      name: 'Manage Template',
      icon: 'icon-speedometer',
      url: 'organization/manage-template',
      children: [{
          name: 'Create Template',
          url: '/organization/manage-template/create-template',
          icon: 'icon-theme',     
        },
        {
          name: 'Template List',
          url: '/organization/manage-template/template',
          icon: 'icon-theme',     
        }
      ]
    },    
    {
      name: 'Inspection',      
      icon: 'icon-people', 
      url: 'organization/manage-inspection',
      children: [{
          name: 'Assign Inspection',
          url: '/organization/manage-inspection/assign-inspection',
          icon: 'icon-theme',     
        },
        {
          name: 'View Inspection',
          url: '/organization/manage-inspection/inspection',
          icon: 'icon-theme',     
        }
      ]    
    },
    {
      name: 'Action',      
      icon: 'icon-people', 
      url: '/organization/action',  
    },
    {
      name: 'Profile',
      url: '/organization/profile',
      icon: 'icon-user',     
    },
  ],
};
