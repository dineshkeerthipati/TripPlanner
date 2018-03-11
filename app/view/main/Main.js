Ext.define('App1.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'Ext.panel.Panel',
        'Ext.grid.Panel',
        'Ext.form.Panel',
        'Ext.dom.Element',

        'App1.view.main.MainController',
        //'App1.view.main.MainModel',
        'App1.view.tripgrid.Tripgrid',
        'App1.view.detailspanel.Detailspanel'
    ],

    controller: 'main',
    //viewModel: 'main',

    header: {
        layout: {
            align: 'strecthmax'
        },
        title: 'Stamps Trip Planner'
    },

    layout: {
        type: 'hbox'
    },

    scrollable: true,
    minHeight: 600,

    items: [
        {
            xtype: 'panel',
            flex: 1,
            bodyPadding:10,
            items: [
                {
                    xtype: 'form',
                    layout: 'hbox',
                    type: 'srch',
                    flex: 1,
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'search',
                            width: 150,
                            listeners: {
                                change: 'onChange'
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'go',
                            name: 'goBtn',
                            tooltip: 'enter Title/Destination and click on "go" to search the grid',
                            handler: 'onGoBtn'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    text: 'Add a Trip',
                    name: 'addTripBtn',
                    margin: '5 0 0 0',
                    handler: 'onAddTrip'
                },
                {
                    xtype: 'checkboxgroup',
                    fieldLabel: 'Category Filters',
                    columns: 1,
                    vertical: true,
                    items: [
                        { boxLabel: 'None', name: 'cf', inputValue: 'None' },
                        { boxLabel: 'Business', name: 'cf', inputValue: 'Business' },
                        { boxLabel: 'Vacation', name: 'cf', inputValue: 'Vacation' }
                    ],
                    listeners: {
                        change: 'onChangeCheck'
                    }
                }
            ]
        },
        {
            xtype: 'tripgrid',
            flex: 2.5

        },
        {
            xtype: 'detailspanel',
            flex: 1.5
        }
    ]
});
