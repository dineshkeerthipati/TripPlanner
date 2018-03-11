Ext.define('App1.store.reminder', {
    extend: 'Ext.data.Store',

    requires: [
        'App1.model.reminder'
    ],

    model: 'App1.model.reminder',

    alias: 'store.reminder'
});