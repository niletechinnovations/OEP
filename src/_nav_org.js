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
      name: 'Profile',
      url: '/organization/profile',
      icon: 'icon-user',     
    },
  ],
};
