Ext.define('App1.model.reminder', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'date',     type: 'string' },
        { name: 'time',      type: 'string' },
        { name: 'status',    type: 'string' }
    ]
});