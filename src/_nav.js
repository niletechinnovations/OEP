export default {
  items: [
    {
      name: 'Dashboard',
      url: '/admin/dashboard',
      icon: 'icon-speedometer',     
    },
    {
      name: 'Manage Category',
      icon: 'icon-speedometer',
      children: [{
          name: 'Category',
          url: '/admin/category',
          icon: 'icon-speedometer',     
        },
        {
          name: 'Subcategory',
          url: '/admin/subcategory',
          icon: 'icon-speedometer',     
        },
      ]
    },  
    {
      name: 'Manage Organization',
      url: '/admin/organization',
      icon: 'icon-people', 
      children: [{
          name: 'Organization List',
          url: '/admin/organization',
          icon: 'icon-people',     
        },
        {
          name: 'Employee List',
          url: '/admin/organization/employee',
          icon: 'icon-people',     
        },
      ]    
    },
    {
      name: 'Manage Template',
      icon: 'icon-speedometer',
      children: [{
          name: 'Create Template',
          url: '/admin/create-template',
          icon: 'icon-theme',     
        },
        {
          name: 'Template List',
          url: '/admin/template',
          icon: 'icon-theme',     
        }
      ]
    }, 
    {
      name: 'Inspection',      
      icon: 'icon-people', 
      children: [{
          name: 'Assign Inspection',
          url: '/admin/inspection/assign-inspection',
          icon: 'icon-theme',     
        },
        {
          name: 'View Inspection',
          url: '/admin/inspection',
          icon: 'icon-theme',     
        }        
      ]    
    },
    {
      name: 'Action',      
      icon: 'icon-people', 
      url: '/admin/action',  
    },
    {
      name: 'Reports',
      url: '#!',
      icon: 'icon-people',     
    },
    {
      name: 'Logout',
      url: '#!',
      icon: 'icon-people',     
    }
  ],
};
