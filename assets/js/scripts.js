console.log('hilloooooo')

$(document).ready(() => {
    makeDisplay();

    function makeDisplay() {
        const container = $('.container');
        // loop over hours and make hourrows.
        for(let i=0 ; i<24 ; i++) {
            console.log('xxxx:', container)
            // make a row.
            const row = makeRow();            
            // fill in time column.
            const timeCol = makeTimeCol();
            timeCol.appendTo(row);
            // Get tasks from storage, pass to makeDescCol():  [{time: xxx, desc: desc}]
            const tasks = getTasks();
            // fill in description column.
            const descriptionCol = makeDescriptionCol();
            descriptionCol.appendTo(row);
            // fill in save button.
            const saveCol = makeSaveCol();
            saveCol.appendTo(row);
            row.appendTo(container)
        }
    }
    
    function makeRow() {
        const row = $('<div>')
        row.addClass('row');
//        row.text('ima row')
        // set color coding.
        return row;
    }
    function makeTimeCol() {
        const col = $('<div>')
        col.addClass('col');
        col.text('time goes here')
        return col;
    }
    function makeDescriptionCol() {
        const col = $('<div>')
        col.addClass('col');
        col.text('desc pls ...')
        return col;
    }
    function makeSaveCol() {
        const col = $('<div>')
        col.addClass('col');
        col.text('save!')
        return col;
    }


    // Event handlers.
    function taskClicked() {
        console.log('task clicked!')
        // Use listener delegation.
        // change div text to text area.
        changeDivToTextarea();
        // change back when click elsewhere?
        // that's it?
    }
    function saveClicked(event) {
        console.log('save clicked!')
        // figure out which one was clicked.
        const timeslot = getTimeslot(event);
        // get value.  // get that nth child?

        // update task & save somehow?
        
        // change element to div
        changeTextareaToDiv();
    }
    // Utils
    function getTasks() {
        const list = localStorage.getItem('dayScheduler');
        return JSON.parse(list);
    }
    function changeDivToTextarea() {
    }
    function changeTextareaToDiv() {
    }
    function getTimeslot() {
    }

    let data = [
        {
            date: '2021-8-21T09:00:00',
            description: 'feed cat'
        },
        {
            date: '2021-8-21T10:00:00',
            description: 'feed dog'
        },
    ];

});




