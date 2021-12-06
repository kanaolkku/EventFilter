const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const filters = { categories: ["Football", "Metal", "Food"], dateRange: ["2020-11-16", "2021-12-15"] }

const getData = async () => {
    // gets the event data from the backend
    const data = await fetch('https://lippupalvelu.herokuapp.com/api/events/')
    return await data.json();
}


const dateChecker = (events, dateRange) => {
    // if no date filter, return all events

    if (!dateRange) {
        return events
    }
    // transfrom date strings from filter into date objects
    const dateRange1 = new Date(dateRange[0]);
    const dateRange2 = new Date(dateRange[1]);

    return events.filter(event => {
        //transform date string from event into date object
        const dateObject = new Date(event.startDateFormatted);
        // if the event's date exists in the given date range, return true
        return dateObject >= dateRange1 && dateObject <= dateRange2
    })
}

const categoryChecker = (events, filterCategories) => {
    // if no event filter, return all events
    if (!filterCategories) {
        return events
    }

    // filter events by given categories
    let eventsFilteredArray = events.filter(event => {
        let isCategoryInEvent = false;
        //map categories of particular event
        const eventCategories = event.category.map(category => {
            return category.name
        })
        // check if event's categories include any filter category
        eventCategories.forEach(category => {
            if (filterCategories.includes(category)) {
                isCategoryInEvent = true;
            }
        })
        return isCategoryInEvent;
    })

    return eventsFilteredArray;
}

const titleChecker = (events, filterTitle) => {
    // if no filter title, return all events
    if (!filterTitle) {
        return events;
    }
    // filter events that match the keyword
    return events.filter(event => event.title.toLowerCase().includes(filterTitle.toLowerCase()));
}

const filterEvents = (arr, filters) => {
    //check titles
    const titleFiltered = titleChecker(arr, filters.title)
    //check dates
    const datesFiltered = dateChecker(titleFiltered, filters.dates)
    //check categories
    const catFiltered = categoryChecker(datesFiltered, filters.categories)

    return catFiltered;
}

exports.handler = async (event, context) => {
    // declare body, statuscode and headers
    let body;
    let statusCode = 200;
    const headers = { 'Content-Type': 'application/json' }

    try {
        //get request body and parse it
        const requestBody = JSON.parse(event.body);
        //fetch data from backend server
        const data = await getData();
        // get filters from request body
        if (requestBody.filter) {
            const filters = requestBody.filter;
            // filter event data with the filters in the requestBody
            body = filterEvents(data, filters);
        } else {
            body = data;
        }
    } catch (err) {
        // catch errors
        statusCode = 400;
        body = "An error has occurred, please add a filter object to your request!";
    } finally {
        // JSON-ify the body
        body = JSON.stringify(body)
    }

    return {
        statusCode,
        body,
        headers
    };
};