Ext.define('App1.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onGoBtn: function (btn) { //searches and filters the tripgrid by Title or Destination based on the textfield text
        var me = this,
            view = me.getView(),
            grid = view.down('tripgrid'),
            store = grid.getStore(),
            searchField = view.down('textfield[name="search"]'),
            value = searchField.getValue();

        store.filterBy(function(record){
            if (record.data.Title.toLowerCase().indexOf(value.toLowerCase()) > -1 || record.data.Destination.toLowerCase().indexOf(value.toLowerCase()) > -1) {
                return true;
            } else {
                return false;
            }
        });
    },

    onAddTrip: function (btn) { //changes the savebutton type to add in detailspanel in order to add the
        // new record to the trip grid
        var me = this,
            view = me.getView(),
            detailsPanel = view.down('detailspanel'),
            saveBtn = detailsPanel.down('button[itemId="saveBtn"]'),
            todoStore = detailsPanel.down('todogrid').getStore();

        //detailsPanel.show();
        saveBtn.type = 'add';
        detailsPanel.down('button[type="delete"]').hide();
        todoStore.removeAll();
        detailsPanel.getForm().reset();
    },

    onChange: function () { //clears the filter on tripgrid store if the text is empty in textfield
        var me = this,
            view = me.getView(),
            textField = view.down('textfield[name="search"]'),
            store = view.down('tripgrid').getStore(),
            value = textField.getValue(),
            vals = view.down('checkboxgroup').getValue();

        if (value.length <= 0) {
            store.clearFilter();

            if (Object.getOwnPropertyNames(vals).length > 0) {
                if (vals.cf.constructor === Array) {
                    store.filterBy(function(record, id){
                        return Ext.Array.indexOf(vals.cf, record.get("Category")) !== -1;
                    });
                } else {
                    store.filter('Category', vals.cf);
                }
            }
        }
    },
    
    onChangeCheck: function ( me, newValue, oldValue, eOpts) { //filters the tripgrid by 'Category' based on checkbox selection
        var store = me.up('app-main').down('tripgrid').store,
            vals = me.getValue();
        store.clearFilter();
        me.up('app-main').down('form[type="srch"]').getForm().reset();

        // if (Object.getOwnPropertyNames(newValue).length > 0) {
        //     store.filter('Category', newValue.cf);
        // } else {
        //     store.removeFilter('Category');
        // }
        if (Object.getOwnPropertyNames(vals).length > 0) {
            if (vals.cf.constructor === Array) {
                store.filterBy(function(record, id){
                    return Ext.Array.indexOf(vals.cf, record.get("Category")) !== -1;
                });
            } else {
                store.filter('Category', vals.cf);
            }
        }
    }
});
