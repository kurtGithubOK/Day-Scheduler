
$(document).ready(() => {
    // Data for app.  Gets saved to local storage when save is clicked.
    data = JSON.parse(localStorage.getItem('Day_Scheduler')) || {};

    // Put time in header.
    updateHeader();

    // Make list of hours to display.
    makeDisplay();

    function makeDisplay() {
        // // Get tasks from storage, later pass to makeDescriptionCol().
        // const tasks = getTasks() || {};
        // let num = 8;
        // console.log('tasks:', tasks[num.toString()])
        
        const container = $('.container');
        // loop over hours and make hourrows.
        for(let hourIndex=0 ; hourIndex<24 ; hourIndex++) {
            // make a row.
            const row = makeRow(hourIndex);            

            // fill in time column.
            const timeCol = makeTimeCol(hourIndex);
            timeCol.appendTo(row);

            // fill in description column.
            console.log('data passed to cols:', data[hourIndex.toString()])
            const taskDescription = data[hourIndex.toString()];
            const descriptionCol = makeDescriptionCol(hourIndex, taskDescription);
            descriptionCol.appendTo(row);

            // fill in save button.
            const saveCol = makeSaveCol(hourIndex);
            saveCol.appendTo(row);
            row.appendTo(container)
        }
    }
    
    // Functions for making UI elements ///////////////////////////////
    function makeRow(hourIndex) {
        const row = $('<div>')
        row.addClass('row');
        // set color coding.
        const currentHourIndex = moment().format('H');
        let colorCodingClass = 'past';
        if(hourIndex === parseInt(currentHourIndex)) {
            colorCodingClass = 'present';
        } else if(hourIndex > parseInt(currentHourIndex)) {
            colorCodingClass = 'future';
        }
        row.addClass(colorCodingClass);
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
    function makeSaveCol(hourIndex) { // renmae +lumn?
        const col = makeCol();
        // Make button
        const saveButton = $('<button>');
        saveButton.attr('id', 'saveBtn'); // Needed?
        saveButton.addClass('saveBtn');

        // Add icon to button
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

    // Event handler /////////////////////////////
    // Save task description.
     $('i').click( function() {
        // figure out which one was clicked.
        const hourIndex = $(this).data('hourIndex');
        console.log('got to here:', hourIndex);

        // get value.  // get that nth child?
        const textareaSelector = 'textarea[id=' + hourIndex + ']';
        const enteredText = $(textareaSelector).val();
        // update task & save somehow?
        console.log('you entered:', enteredText)
        updateTasks(hourIndex, enteredText);
    

    });

    // Utility Functions /////////////////////////////
    function updateTasks(hoursIndex, taskDescription) {
        // const tasks = getTasks();
        data[hoursIndex] = taskDescription;
        localStorage.setItem('Day_Scheduler', JSON.stringify(data))
    }
    
    // function getTasks() {
    //     const list = localStorage.getItem('dayScheduler');
    //     return JSON.parse(list);
    // }
//     let data = {
//         8: 'feed cat @ 9am',
//         14: 'feed dog @ 3pm'
//     }

//    localStorage.setItem('dayScheduler', JSON.stringify(data))
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




