
$(document).ready(() => {
    updateHeader();

    makeDisplay();

    function makeDisplay() {
        // Get tasks from storage, later pass to makeDescriptionCol().
        const tasks = getTasks();
        let num = 8;
        console.log('tasks:', tasks[num.toString()])
        
        const container = $('.container');
        // loop over hours and make hourrows.
        for(let hourIndex=0 ; hourIndex<24 ; hourIndex++) {
            // make a row.
            const row = makeRow();            

            // fill in time column.
            const timeCol = makeTimeCol(hourIndex);
            timeCol.appendTo(row);

            // fill in description column.
            console.log('tasks:', tasks[hourIndex.toString()])
            const taskDescription = tasks[hourIndex.toString()];
            const descriptionCol = makeDescriptionCol(hourIndex, taskDescription);
            descriptionCol.appendTo(row);

            // fill in save button.
            const saveCol = makeSaveCol(hourIndex);
            saveCol.appendTo(row);
            row.appendTo(container)
        }
    }
    
    // UI Makers ///////////////////////////////
    function makeRow() {
        const row = $('<div>')
        row.addClass('row');
        // set color coding.
        return row;
    }
    function makeTimeCol(hourIndex) {
        const col = makeCol();
        col.text('hour:' + hourIndex)
        return col;
    }
    function makeDescriptionCol(hourIndex, task) {
        const col = makeCol();
        col.addClass('description');
        // Make textarea for each hour.
        const textarea = $('<textarea>');
        textarea.attr('id', hourIndex);
        textarea.text(task);
        textarea.appendTo(col);
        return col;
    }
    function makeSaveCol(hourIndex) {
        const col = makeCol();
        const saveButton = $('<button>');
        saveButton.attr('id', 'saveBtn'); // Needed?
        saveButton.addClass('saveBtn');

        // Add icon
        const icon = $('<i data-hour-index=' + hourIndex + '>'); // improve this.
        icon.text('save me!');
        icon.appendTo(saveButton);

        saveButton.appendTo(col);
        return col;
    }
    function makeCol() {
        const col = $('<div>');
        col.addClass('col');
        return col;
    }
    function updateHeader() {
        // Format ex: Thursday, September 29
        const date = moment().format('dddd, MMMM Mo');
        $('#currentDay').text(date)
    }

    // Event handlers /////////////////////////////
     $('i').click( function() {
        // figure out which one was clicked.
        const hourIndex = $(this).data('hourIndex');
        console.log('got to here:', hourIndex);

        // get value.  // get that nth child?
        const textareaSelector = 'textarea[id=' + hourIndex + ']';
        const enteredText = $(textareaSelector).val();
        // update task & save somehow?
        updateTasks(hourIndex, enteredText);
        console.log('you entered:', enteredText)
    

    });

    // Utilities /////////////////////////////
    function getTasks() {
        const list = localStorage.getItem('dayScheduler');
        return JSON.parse(list);
    }
    function updateTasks(hoursIndex, taskDescription) {
        const tasks = getTasks();
        tasks[hoursIndex] = taskDescription;
        localStorage.setItem('dayScheduler', JSON.stringify(tasks))
    }

    let data = {
        8: 'feed cat @ 9am',
        14: 'feed dog @ 3pm'
    }

   localStorage.setItem('dayScheduler', JSON.stringify(data))
   // $('.description').click( (event) => {
    //     // Need to handle when user clicks twice in textarea???
    //     // change previously clicked tasks to divs, bt how???
        
    //     // Get value of hour-index custom data attribute.
    //     // const myValue = this.data('hourIndex');
    //     // console.log(myValue)
    //     const targetAttributes = event.target.attributes;
    //     const hourIndex = targetAttributes.getNamedItem('data-hour-index').value;
    //     console.log('hourIndex', hourIndex)

    //     // Get div with that attribute value, and its text.
    //     const clickedDivSelector = 'div[data-hour-index=' + hourIndex + ']';
    //     const clickedDiv = $(clickedDivSelector)
    //     const existingText = clickedDiv.text();
    // });

});




