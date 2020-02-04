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
      children: [{
          name: 'Create Template',
          url: '/organization/create-template',
          icon: 'icon-theme',     
        },
        {
          name: 'Template List',
          url: '/organization/template',
          icon: 'icon-theme',     
        }
      ]
    },    
    {
      name: 'Inspection',      
      icon: 'icon-people', 
      children: [{
          name: 'Assign Inspection',
          url: '/organization/inspection/assign-inspection',
          icon: 'icon-theme',     
        },
        {
          name: 'View Inspection',
          url: '/organization/inspection',
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
