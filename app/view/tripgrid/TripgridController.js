Ext.define('App1.view.tripgrid.TripgridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tripgrid',


    onAfterRender: function () { //sets reminder automatically on the application launch.
        var me = this,
            view = me.getView();
        view.getStore().load();

        var wind = Ext.create('Ext.window.Window', {
            title: 'Reminder',
            height: 200,
            width: 400,
            closable: true,
            modal: true,
            layout: 'fit',
            items: [{
                xtype: 'form',
                type: 'rempop',
                defaultType: 'textfield',
                items:[
                    {
                        fieldLabel: 'Title',
                        name: 'Title',
                        allowBlank: false
                    },
                    {
                        fieldLabel: 'Description',
                        name: 'Description',
                        allowBlank: false
                    },
                    {
                        xtype: 'datefield',
                        name: 'remdt',
                        hidden: true
                    },
                    {
                        fieldLabel: 'Snooze Time',
                        xtype: 'timefield',
                        name: 'time',
                        increment: 10,
                        allowBlank: false
                    }
                ],
                bbar: [
                    {
                        text: 'snooze',
                        formBind: true,
                        handler: me._onSnooze
                    }, {
                        text: 'View Details',
                        handler: me._onViewDetails
                    },{
                        text: 'cancel',
                        handler: me._onCancel
                    }]
            }]
        });

        if (view.getStore().getAt(0)) {
            view.up().add(wind);
            wind.show();
            var frm = wind.down('form[type="rempop"]'),
                rec = view.getStore().getAt(0);
            frm.getForm().findField('Title').setValue(rec.data.Title);
            frm.getForm().findField('Description').setValue(rec.data.Description);
            frm.getForm().findField('remdt').setValue(rec.data.Reminder.date);
            frm.getForm().findField('time').setValue(rec.data.Reminder.time);
        } else {
            var rc = {},
                dt = new Date(),
                d = dt.getDate(),
                m = dt.getMonth()+1,
                y = dt.getFullYear(),
                dm = d+3,
                sdt = new Date(m+'/'+d+'/'+y),
                edt = new Date(m+'/'+dm+'/'+y);

            rc.Title = 'Stamps';
            rc.Description = 'Code test';
            rc.Destination = 'Stamps.com';
            rc.Category = 'None';
            rc.StartDate = sdt;
            rc.EndDate = edt;
            rc.Reminder = {date: m+'/'+d+'/'+y, time: '10:00 AM'};
            rc.Todo = [{Description: "deploy ", Status: "Create"}];
            view.store.add(rc);
            view.store.sync();

            view.up().add(wind); //debugger;
            wind.show();
            var frm = wind.down('form[type="rempop"]'),
                rec = view.getStore().getAt(0);
            frm.getForm().findField('Title').setValue(rec.data.Title);
            frm.getForm().findField('Description').setValue(rec.data.Description);
            frm.getForm().findField('remdt').setValue(rec.data.Reminder.date);
            frm.getForm().findField('time').setValue(rec.data.Reminder.time);
        }
    },

    _onSnooze: function() { //debugger;
        var me = this,
            form = me.up('form[type="rempop"]').getForm(),
            grid = me.up('app-main').down('tripgrid'),
            store = grid.getStore(),
            record = store.getAt(0),
            vals = form.getValues();
        me.up('window').close();

        record.set('Reminder', {date: vals.remdt, time: vals.time, status: ''});
        store.sync();
    },

    _onCancel: function() {
        this.up('window').close();
    },

    _onViewDetails: function () { //displays the record in detailspanel
        var me = this,
            grid = me.up('app-main').down('tripgrid'),
            window = me.up('window');
        grid.fireEvent('itemclick', grid, grid.getStore().getAt(0), null, 0);
        window.close();
    },

    onItemClick: function (me, record, item, index, e, eOpts) { //displays the selected record in detailspanel to edit
        var grid = me,
            detailsPanel = grid.up('app-main').down('detailspanel'),
            todoGrid = detailsPanel.down('todogrid'),
            todoStore = todoGrid.getStore(),
            remGrid = detailsPanel.down('remindergrid'),
            remStore = remGrid.getStore(),
            saveBtn = detailsPanel.down('button[itemId="saveBtn"]'),
            deleteBtn = detailsPanel.down('button[type="saveBtn"]'),
            todo = record.data.Todo,
            remndr = record.data.Reminder;

        detailsPanel.show();
        detailsPanel.down('button[type="delete"]').show();
        detailsPanel.getForm().setValues(record.data);
        detailsPanel.setRecIndx(index);
        saveBtn.type = 'update';

        todoStore.removeAll();
        remStore.removeAll();

        remStore.add(remndr);

        for (var i = 0; i < todo.length; i++) {
            todoStore.add(todo[i]);
        }

    }
});