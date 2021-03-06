
$(document).ready(() => {
    // Data for app.  Gets saved to local storage when save is clicked.
    data = JSON.parse(localStorage.getItem('Day_Scheduler')) || {};

    // Put time in header.
    updateHeader();

    // Make list of hours to display.
    makeDisplay();

    // Functions for making UI elements ///////////////////////////////
    function makeDisplay() {
        const container = $('.container');
        // loop over hours and make hourrows.
        for (let hourIndex = 8; hourIndex < 18; hourIndex++) {
            // make a row.
            const row = makeRow(hourIndex);

            // fill in time column.
            const timeCol = makeTimeColumn(hourIndex);
            timeCol.appendTo(row);

            // fill in description column.
            const taskDescription = data[hourIndex.toString()];
            const descriptionCol = makeDescriptionCol(hourIndex, taskDescription);
            descriptionCol.appendTo(row);

            // fill in save button.
            const saveCol = makeSaveColumn(hourIndex);
            saveCol.appendTo(row);
            row.appendTo(container)
        }
    }

    // Returns a Bootstrap row.
    function makeRow(hourIndex) {
        const row = $('<div>')
        row.addClass('row');
        return row;
    }

    // Returns a Bootstrap column for hour.
    function makeTimeColumn(hourIndex) {
        const col = makeCol();
        col.addClass('col-2');
        col.addClass('hour');

        // Display hour by making todays date and hourIndex time.
        const hour = moment().hour(hourIndex);
        const hourFormatted = hour.format('h A');
        col.text(hourFormatted)
        return col;
    }

    // Returns a Bootstrap column for description.
    function makeDescriptionCol(hourIndex, task) {
        const col = makeCol();
        col.addClass('description');
        col.addClass('col-8');
        const colorCodingClass = getColorCoding(hourIndex);
        col.addClass(colorCodingClass);
        col.attr('padding-left', '50%');
        // Make textarea for each hour.
        const textarea = $('<textarea>');
        textarea.attr('id', hourIndex);
        textarea.text(task);
        textarea.appendTo(col);
        return col;
    }

    // Returns a Bootstrap column for save button.
    function makeSaveColumn(hourIndex) { // renmae +lumn?
        const col = makeCol();
        col.addClass('col-2');
        col.css({'padding-left': '0%'});
        // Make button
        const saveButton = $('<button>');
        saveButton.attr('id', 'saveBtn'); // Needed?
        saveButton.addClass('saveBtn');

        // Add icon to button // <i class="far fa-save">
        const icon = $('<i>');
        icon.addClass('far');
        icon.addClass('fa-save');
        icon.attr('data-hour-index', hourIndex);
        icon.appendTo(saveButton);

        saveButton.appendTo(col);
        return col;
    }

    // Returns an empty Bootstrap column as a base.
    function makeCol() {
        const col = $('<div>');
        col.addClass('col');
        return col;
    }

    // Puts today's date in header (Thursday, September 29th).
    function updateHeader() {
        const date = moment().format('dddd, MMMM Mo');
        $('#currentDay').text(date)
    }


    // Event handler /////////////////////////////
    // Save button was clicked so save task.
    $('i').click(function () {
        // Figure out which one was clicked.
        const hourIndex = $(this).data('hourIndex');

        // Get value in textarea.
        const textareaSelector = 'textarea[id=' + hourIndex + ']';
        const enteredText = $(textareaSelector).val();
        // Call func to update 'data' and save the change to local storage.
        updateTasks(hourIndex, enteredText);
    });

    // Utility Functions /////////////////////////////
    // Updates value of 'data' and saves to local storage.
    function updateTasks(hoursIndex, taskDescription) {
        data[hoursIndex] = taskDescription;
        localStorage.setItem('Day_Scheduler', JSON.stringify(data))
    }

    // Returns style name for color coding (past, present, future).
    function getColorCoding(hourIndex) {
        const currentHourIndex = moment().format('H');
        if (hourIndex === parseInt(currentHourIndex)) {
            return 'present';
        } else if (hourIndex > parseInt(currentHourIndex)) {
            return 'future';
        } else return 'past';
    }

});




