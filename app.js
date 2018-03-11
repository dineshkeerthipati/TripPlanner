/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'App1.Application',

    name: 'App1',

    requires: [
        // This will automatically load all classes in the App1 namespace
        // so that application classes do not need to require each other.
        'Ext.*',
        'App1.*'
    ],

    // The name of the initial view to create.
    mainView: 'App1.view.main.Main'
});
