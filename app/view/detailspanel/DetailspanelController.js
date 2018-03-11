Ext.define('App1.view.detailspanel.DetailspanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.detailspanel',


    //save/update the new/exiating record
    onSave: function(btn) {
        var me = this,
            view = me.getView(),
            grid = view.up().down('tripgrid'),
            store = grid.getStore(),
            remGrid = view.down('remindergrid'),
            remStore = remGrid.getStore();
            todoGrid = view.down('todogrid'),
            todoStore = todoGrid.getStore(),
            indx = view.getRecIndx();

        var rec = {},
            todo = [],
            reminder = {},
            values = view.getForm().getValues();

        if (remStore.getAt(0)) {
            reminder = remStore.getAt(0).data;
        }

        // todoStore.each(function (record, indx) {
        //     todo.push({
        //         Description: record.data.Description,
        //         Status: record.data.Status
        //     });
        // });
        var items = todoStore.data.items;

        for (var i = 0; i < items.length; i++) {
            todo.push({
                Description: items[i].data.Description,
                Status: items[i].data.Status
            });
        }

        rec = values;
        rec.Todo = todo;
        rec.Reminder = reminder;

        if (btn.type == 'add') { //saving the new record
            var newRecord = new App1.model.trip(rec);
            store.add(newRecord);
            store.sync();
            todoStore.removeAll();
            remStore.removeAll();
            view.getForm().reset();
        } else { //updating the exiating record
            var record = store.getAt(indx);

            record.set('Title', values.Title);
            record.set('Destination', values.Destination);
            record.set('StartDate', values.StartDate);
            record.set('EndDate', values.EndDate);
            record.set('Category', values.Category);
            record.set('Todo', todo);
            record.set('Reminder', reminder);

            store.sync();
            todoStore.removeAll();
            remStore.removeAll();
            view.getForm().reset();
            view.down('button[type="delete"]').hide();
            btn.type = 'add';
        }
    },

    onCancel: function(btn) {
        var me = this,
            view = me.getView(),
            todoStore = view.down('todogrid').getStore(),
            remStore = view.down('remindergrid').getStore();
        todoStore.removeAll();
        remStore.removeAll();
        view.getForm().reset();
    },

    onDelete: function (btn) { //deletes the selected record from tripgrid
        var me = this,
            view = me.getView(),
            todoStore = view.down('todogrid').getStore(),
            reminderStore = view.down('remindergrid').getStore(),
            tripStore = view.up().down('tripgrid').getStore(),
            indx = view.getRecIndx();

        tripStore.removeAt(indx);
        tripStore.sync();
        //tripStore.reload();
        todoStore.removeAll();
        reminderStore.removeAll();
        view.getForm().reset();
        btn.hide();
        view.down('button[itemId="saveBtn"]').type = 'add';

    },

    onStartDt: function (me, newValue, oldValue, eOpts) {
        if (newValue) {
            var ed = me.up().down('datefield[name="EndDate"]'),
                m = newValue.getMonth()+1,
                d = newValue.getDate()+1,
                y = newValue.getFullYear(),
                nd = m+'/'+d+'/'+y;
            nDate = new Date(nd);
            ed.setMinValue(nDate); //setting the min value for EndDate based on user StartDate selection
        }
    }
});