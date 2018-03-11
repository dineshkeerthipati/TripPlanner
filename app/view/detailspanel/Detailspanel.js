Ext.define('App1.view.detailspanel.Detailspanel', {
    extend: 'Ext.form.Panel',

    requires: [
        //'App1.view.detailspanel.DetailspanelModel',
		'App1.view.detailspanel.DetailspanelController',
        'App1.view.remindergrid.Remindergrid',
        'App1.view.todogrid.Todogrid'
    ],

    xtype: 'detailspanel',

    config: {
        recIndx: null
    },

    minHeight: 650,
    controller: 'detailspanel',

    bodyPadding: '10',
    defaultType: 'textfield',
    items: [
        {
            fieldLabel: 'Title',
            name: 'Title',
            allowBlank: false
        }, {
            fieldLabel: 'Destination',
            name: 'Destination',
            allowBlank: false
        }, {
            fieldLabel: 'Description',
            xtype: 'textarea',
            name: 'Description',
            height: 15,
            allowBlank: false
        }, {
            fieldLabel: 'Start Date',
            xtype: 'datefield',
            name: 'StartDate',
            minValue: new Date(),
            allowBlank: false,
            listeners: {
                change: 'onStartDt'
            }
        }, {
            fieldLabel: 'End Date',
            xtype: 'datefield',
            name: 'EndDate',
            allowBlank: false
            // listeners: {
            //     change: 'onEndDt'
            // }
        }, {
            fieldLabel: 'Category',
            xtype: 'combobox',
            name: 'Category',
            queryMode: 'local',
            store: ['None', 'Business', 'Vacation'],
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'Duration',
            hidden: true,
            allowBlank: true
        }, {
            xtype: 'label',
            text: 'Reminder:'
        },{
            xtype: 'remindergrid',
        }, {
            xtype: 'label',
            text: 'TODO:'
        },{
            xtype: 'todogrid'
        }
    ],
    buttons: [
        {
            text: 'Save',
            formBind: true,
            itemId: 'saveBtn',
            type: 'add',
            tooltip: 'save the record',
            handler: 'onSave'
        },
        {
            text: 'Cancel',
            tooltip: 'reset form',
            handler: 'onCancel',
            style : {
                backgroundColor : '#808080'
            }
        },
        {
            text: 'Delete',
            type: 'delete',
            tooltip: 'delete record',
            hidden: true,
            handler: 'onDelete',
            style : {
                backgroundColor : '#E50000'
            },
        }
    ]
});