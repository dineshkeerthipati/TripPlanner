Ext.define('App1.store.trip', {
    extend: 'Ext.data.Store',

    requires: [
        'App1.model.trip'
    ],

    alias: 'store.trip',


    model: 'App1.model.trip'

});