Ext.define('App1.model.trip', {
    extend: 'Ext.data.Model',


    fields: [
        {name: 'Title', type: 'string'},
        {name: 'Destination',  type: 'string'},
        {
            name: 'StartDate',
            type: 'string',
            convert: function (value) {
                return new Date(value);
            }
        }
            ,
        {
            name: 'EndDate',
            type: 'string',
            convert: function (value) {
                return new Date(value);
            }
        },
        {
            name: 'Duration',
            type: 'int',
            calculate: function (data) {
                var y,m,d;
                var dur = '';
                if (data.EndDate.getFullYear() != data.StartDate.getFullYear()) {
                    y = data.EndDate.getFullYear() - data.StartDate.getFullYear();
                }
                if (data.EndDate.getMonth() != data.StartDate.getMonth()) {
                    m = data.EndDate.getMonth() - data.StartDate.getMonth();
                }
                if (data.EndDate.getDate() != data.StartDate.getDate()) {
                    d = data.EndDate.getDate() - data.StartDate.getDate();
                }

                if (typeof y != 'undefined') {
                    dur = y + 'Years';
                }
                if (typeof m != 'undefined') {
                    dur = dur + m + 'Months';
                }
                if (typeof d != 'undefined') {
                    dur = dur + d + 'Days'
                }
                return dur;
            }
        },
        {name: 'Description', type: 'string'},
        {name: 'Category',  type: 'string'},
        {name: 'Reminder', type: 'auto'},
        {name: 'Todo', type: 'auto'}
    ],
    proxy: {
        type: 'localstorage',
        id: 'tripData'
    }
});