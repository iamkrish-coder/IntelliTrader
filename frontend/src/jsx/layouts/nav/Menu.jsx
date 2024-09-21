export const MenuList = [
       
    //Dashboard
    {
        title: 'Dashboard',	
        classsChange: 'mm-collapse',		
        iconStyle: <i className="material-symbols-outlined">dashboard</i>,
        content: [
            {
                title: 'Portofolio',
                to: 'portofolio',
            },           
        ],
    },

    {
        title: 'Trading',	
        classsChange: 'mm-collapse',		
        iconStyle: <i className="material-symbols-outlined">monitoring</i>,
        content: [
            {
                title: 'Market',
                to: 'trading-market',					
            }
        ],
    },
    {
        title: 'Reports',	
        classsChange: 'mm-collapse',		
        iconStyle: <i className="material-symbols-outlined">lab_profile</i>,
        content: [
            {
                title: 'History',
                to: 'history',					
            },
            {
                title: 'Orders',
                to: 'orders',					
            },
            {
                title: 'Report',
                to: 'reports',					
            }
        ]
    },
    {
        title: 'Strategies',
        classsChange: 'mm-collapse',
        iconStyle: <i className="material-symbols-outlined">apps_outage</i>,
        content: [
            {
                title: 'Create Strategies',
                to: 'edit-profile'
            },

        ],
    }
]