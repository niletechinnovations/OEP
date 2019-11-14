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
      name: 'Organization',
      url: '/admin/organization',
      icon: 'icon-people',     
    },
    {
      name: 'Manage Template',
      icon: 'icon-speedometer',
      children: [{
          name: 'Create Template',
          url: '/admin/create-template',
          icon: 'icon-theme',     
        }
      ]
    }, 
    {
      name: 'Create Inspection',
      url: '#!',
      icon: 'icon-people',     
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
