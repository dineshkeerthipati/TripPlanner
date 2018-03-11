Ext.define('App1.view.remindergrid.RemindergridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.remindergrid',

    onReminderClick: function () { // pop up the window to set reminder
        var me = this,
            view = me.getView(),
            detailsPanel = view.up('detailspanel');

        var window = Ext.create('Ext.window.Window', {
            title: 'Set Reminder',
            height: 200,
            width: 400,
            closable: true,
            modal: true,
            layout: 'fit',
            items: [{
                xtype: 'form',
                type: 'reminder',
                items:[
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Date',
                        minValue: new Date(),
                        name: 'date',
                        allowBlank: false
                    },
                    {
                        fieldLabel: 'time',
                        xtype: 'timefield',
                        name: 'time',
                        increment: 10,
                        allowBlank: false
                    }
                ],
                bbar: [
                    {
                        text: 'save',
                        formBind: true,
                        handler: me._onSave
                    }, {
                        text: 'cancel',
                        handler: me._onCancel
                    }]
            }]
        });

        detailsPanel.add(window);
        window.show();
    },

    _onSave: function () {
        var me = this,
            form = me.up('form').getForm(),
            detailsPanel = me.up('detailspanel'),
            grid = detailsPanel.down('remindergrid'),
            store = grid.getStore(),
            window = me.up('window');
        store.removeAll();
        store.add(form.getValues());
        window.close();
    },

    _onCancel: function () {
        var me = this;
        me.up('window').close();
    }
});