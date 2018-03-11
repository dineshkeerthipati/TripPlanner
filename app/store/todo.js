Ext.define('App1.store.todo', {
    extend: 'Ext.data.Store',

    alias: 'store.todo',

    fields: [
        {name: 'Description', type: 'string'},
        {name: 'Status',  type: 'string'}
    ]

});