Ext.define('App1.view.todogrid.TodogridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.todogrid',

    onAdd: function () { //pop up the window to add todo
        var me = this,
            view = me.getView();

        var wind = Ext.create('Ext.window.Window', {
            title: 'Hello',
            height: 200,
            width: 400,
            closable: true,
            modal: true,
            layout: 'fit',
            items: [{
                xtype: 'form',
                type: 'todo',
                defaultType: 'textfield',
                items:[
                    {
                        fieldLabel: 'Description',
                        name: 'Description',
                        allowBlank: false
                    },
                    {
                        fieldLabel: 'Status',
                        xtype: 'combobox',
                        name: 'Status',
                        queryMode: 'local',
                        store: ['Create', 'Complete'],
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
        view.add(wind);
        wind.show();
    },

    _onSave: function () {
        var me = this,
            grid = me.up('todogrid'),
            store = grid.getStore(),
            form = me.up('form[type="todo"]'),
            window = me.up('window');
        store.add(form.getForm().getValues());
        window.close();
    },

    _onCancel: function () {
        var me = this;
        me.up('window').close();
    },

    onDelClick: function(grid, rowIndex, colIndex) { //deletes the todo
        grid.getStore().removeAt(rowIndex);
    }
});