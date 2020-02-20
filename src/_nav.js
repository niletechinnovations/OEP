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
      url: 'admin/manage-categories',
      children: [{
          name: 'Category',
          url: '/admin/manage-categories/category',
          icon: 'icon-speedometer',     
        },
        {
          name: 'Subcategory',
          url: '/admin/manage-categories/subcategory',
          icon: 'icon-speedometer',     
        },
      ]
    },  
    {
      name: 'Manage Organization',
      url: '/admin/manage-organization',      
      icon: 'icon-people', 
      children: [{
          name: 'Organization List',
          url: '/admin/manage-organization/organization',
          icon: 'icon-people',     
        },
        {
          name: 'Employee List',
          url: '/admin/manage-organization/employee',
          icon: 'icon-people',     
        },
      ]    
    },
    {
      name: 'Manage Template',
      icon: 'icon-speedometer',
      url: '/admin/manage-template',
      children: [{
          name: 'Create Template',
          url: '/admin/manage-template/create-template',
          icon: 'icon-theme',     
        },
        {
          name: 'Template List',
          url: '/admin/manage-template/template',
          icon: 'icon-theme',     
        }
      ]
    }, 
    {
      name: 'Inspection',      
      icon: 'icon-people',
      url: '/admin/manage-inspection', 
      children: [{
          name: 'Assign Inspection',
          url: '/admin/manage-inspection/assign-inspection',
          icon: 'icon-theme',     
        },
        {
          name: 'View Inspection',
          url: '/admin/manage-inspection/inspection',
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
      name: 'Manage Subscription',      
      icon: 'icon-people', 
      url: '/admin/subscription', 
      children: [{
          name: 'Subscription Plan',
          url: '/admin/subscription',
          icon: 'icon-theme',     
        }       
      ]    
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
