Ext.define('App1.view.remindergrid.Remindergrid', {
    extend: 'Ext.grid.Panel',

    requires: [
        'App1.view.remindergrid.RemindergridController',
        'App1.store.reminder'
    ],

    xtype: 'remindergrid',

    controller: 'remindergrid',

    store: {
        type: 'reminder'
    },

    //title: 'Reminder:',

    //width: 150,
    minHeight: 115,
    scrollable: true,
    border: true,

    columns: [
        {
            text: 'Date',
            dataIndex: 'date'
        },
        {
            text: 'Time',
            dataIndex: 'time'
        }
    ],
    bbar: [
        {
            text: 'Set Reminder',
            scale: 'small',
            handler: 'onReminderClick'
        }
    ]
});