# EventFilter

## What is it?

This project is a part of a Event Ticket Booking project.
This project provides the larger project a way to filter events through an AWS Lambda function.
Currently this project does not have a client that shows the results, but it functions well by using Postman or any other means to access an api.

api link: `https://ex5yh2b3kl.execute-api.eu-central-1.amazonaws.com/test/myFilterEvents`

Link to the project backend: https://lippupalvelu.herokuapp.com/

### How to use

Both POST and GET requests work the same way.
The function expects a "filter" object in the request body.

Filter properties:

all filters are optional

Title: String

Categories: Array[String], array of as many categories as you like, e.g. ["Metal", "Rap", "Football"]

Dates: Array[String], 2 dates in any format e.g. ["2021-11-18", "2021-12-10"]


### Example request

Get request with the following body:
```
{
    "filter" : {
        "title": "testi",
        "categories": ["Koodaus", "Metal"],
        "dates": ["2021-11-18", "2021-12-10"]
    }
}
```

response: 

```
[
    {
        "eventId": 29,
        "title": "Posgtres Testi ",
        "description": "Testi uudella käyttäjällä",
        "price": 1,
        "startTime": "09:49",
        "user": {
            "id": 5,
            "username": "Iso Kana",
            "passwordHash": "$2a$10$icUaarodFOpFKKKmidux8.XE/D2m1CRuwWwWB0i3iuKyqK9/x.emm",
            "role": "ROLE_HOST",
            "firstName": null,
            "lastName": null,
            "email": "isokana@kana.com",
            "address": null
        },
        "category": [
            {
                "categoryid": 28,
                "name": "Koodaus"
            }
        ],
        "venue": {
            "venueId": 27,
            "name": "Kotona",
            "address": "",
            "description": ""
        },
        "startDate": "18.11.2021",
        "startDateFormatted": "2021-11-18",
        "ticketLimit": 1
    }
]
```
