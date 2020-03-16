export default {
  items: [
    {
      name: 'Dashboard',
      url: '/admin/dashboard',
      icon: 'icon-speedometer',     
    },
    {
      name: 'Manage Category',
      icon: 'icon-grid',
      url: 'admin/manage-categories',
      children: [{
          name: 'Category',
          url: '/admin/manage-categories/category',
        },
        {
          name: 'Subcategory',
          url: '/admin/manage-categories/subcategory',
        },
      ]
    },  
    {
      name: 'Manage Organization',
      url: '/admin/manage-organization',      
      icon: 'icon-organization', 
      children: [{
          name: 'Organization List',
          url: '/admin/manage-organization/organization',
        },
        {
          name: 'Employee List',
          url: '/admin/manage-organization/employee',
        },
      ]    
    },
    {
      name: 'Manage Template',
      icon: 'icon-docs',
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
      icon: 'icon-check',
      url: '/admin/manage-inspection', 
      children: [{
          name: 'Assign Inspection',
          url: '/admin/manage-inspection/assign-inspection',
        },
        {
          name: 'View Inspection',
          url: '/admin/manage-inspection/inspection',
        }        
      ]    
    },
    {
      name: 'Action',      
      icon: 'icon-note', 
      url: '/admin/action',  
    },
    {
      name: 'Manage Subscription',      
      icon: 'icon-badge', 
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
      icon: 'icon-doc', 
      url: '/admin/reports', 
      children: [{
          name: 'Subscriber List',
          url: '/admin/reports/subscriber-list',
        },
        {
          name: 'Leaderboard',
          url: '/admin/reports/leaderboard',
        }      
      ]    
    },
    /*{
      name: 'Logout',
      url: '#!',
      icon: 'icon-logout',     
    }*/
  ],
};
