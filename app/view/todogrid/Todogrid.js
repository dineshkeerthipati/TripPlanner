Ext.define('App1.view.todogrid.Todogrid', {
    extend: 'Ext.grid.Panel',

    requires: [
        //'App1.view.todogrid.TodogridModel',
		'App1.view.todogrid.TodogridController',
        'App1.store.todo'
    ],

    xtype: 'todogrid',

    store: {
        type: 'todo'
    },

    //title: 'TODO list:',

    bodyPadding: 10,
    //width: 250,
    minHeight: 150,
    scrollable: true,
    border: true,

    controller: 'todogrid',

    selModel: 'rowmodel',
    plugins: {
        ptype: 'rowediting',
        clicksToEdit: 2
    },

    viewConfig: {
        enableTextSelection: true
    },

    columns: [
        {
            text: 'Description',
            dataIndex: 'Description',
            width: 150,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        },
        {
            text: 'Status',
            dataIndex: 'Status',
            width: 100,
            editor: {
                xtype: 'combobox',
                queryMode: 'local',
                store: ['Create', 'Complete'],
                allowBlank: false
            }
        },
        {
            menuDisabled: true,
            sortable: false,
            xtype: 'actioncolumn',
            width: 50,
            items: [
                {
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete',
                    handler: 'onDelClick'
                }
            ]
        }
    ],
    bbar: [
        {
            text: 'Add TODO',
            scale: 'small',
            handler: 'onAdd'
        }
    ]
});