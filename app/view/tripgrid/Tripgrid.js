Ext.define('App1.view.tripgrid.Tripgrid', {
    extend: 'Ext.grid.Panel',

    requires: [
        //'App1.view.tripgrid.TripgridModel',
		'App1.view.tripgrid.TripgridController',
        'App1.store.trip'
    ],


    xtype: 'tripgrid',

    store: {
        type: 'trip'
    },

    controller: 'tripgrid',

    minWidth: 500,
    minHeight: 550,
    margin: '15 0 0 0',
    border: true,

    // selModel: {
    //     selType: 'checkboxmodel',
    //     mode: 'SINGLE',
    //     ignoreRightMouseSelection: true,
    //     allowDeselect: false,
    //     toggleOnClick: false,
    //     listeners: {
    //         select: 'onSelect'
    //     }
    // },

    viewConfig: {
        enableTextSelection: true
    },

    columns: [
        { text: 'Title', dataIndex: 'Title', flex: 1, menuDisabled: true, sortable: true },
        { text: 'Destination', dataIndex: 'Destination', flex: 1, menuDisabled: true, sortable: true },
        { text: 'Duration', dataIndex: 'Duration', width: 75, menuDisabled: true, sortable: true },
        { text: 'Category', dataIndex: 'Category', width: 100, menuDisabled: true, sortable: true },
        {
            text: '<html>Reminder <br>set</html>',
            dataIndex: 'Reminder',
            renderer: function (record) {
                if (Object.getOwnPropertyNames(record).length > 0) {
                    return 'true';
                } else {
                    return 'false';
                }
            },
            width: 75,
            menuDisabled: true,
            sortable: true
        },
        { 
            text: '<html>Items needed <br># items complete</html>', 
            dataIndex: 'Todo',
            renderer: function (record) {
                var cmpltCnt = 0;
                for (var i = 0; i < record.length; i++) {
                    if (record[i].Status == 'Complete') {
                        cmpltCnt++;
                    }
                }
                return '<html>Total items: </html>' + record.length + '<html> <br>#Items complete: </html>' + cmpltCnt;
            },
            flex: 1, menuDisabled: true, sortable: true
        },
        {
            text: '<html>Trip Planning<br> State</html>',
            dataIndex: 'Todo',
            renderer: function (record) {
                var cmpltCnt = 0,
                    crtCnt = 0;
                for (var i = 0; i < record.length; i++) {
                    if (record[i].Status == 'Complete') {
                        cmpltCnt++;
                    }
                    if (record[i].Status == 'Create') {
                        crtCnt++;
                    }
                }

                if (record.length == cmpltCnt && record.length > 0) {
                    return 'Ready';
                } else if (cmpltCnt != 0 && cmpltCnt < record.length && crtCnt !=0 && crtCnt < record.length) {
                    return 'In Progress';
                } else if (record.length != 0 && cmpltCnt == 0) {
                    return 'Created';
                } else {
                    return 'No TODO list'
                }
            },
            width: 105, menuDisabled: true, sortable: true }
    ],

    listeners: {
        afterrender: 'onAfterRender',
        itemclick: 'onItemClick'
    }
});