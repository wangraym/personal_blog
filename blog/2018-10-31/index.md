---
date: "2018-10-31"
title: "Building my first Alexa skill - City Services"
category: "Coding"
---
This post is just a quick overview of the first Alexa skill I built. It was far from perfect, but I think it was a good experience and I think it's good to reflect on the work you've done to see what you really ended up with.

## Getting started
I started working in IoT and Software development at the start of July. One of the first things I quickly picked up was AWS (Amazon Web Services), which had so many different services that can be easily integrated together to build complete applications, hosted completely on the cloud, and for free within the year long free tier membership. A couple months later, after regularly hearing about my excitement with what I was learning in AWS, my significant other bought me an Amazon Echo for my birthday!

Playing music, asking about the weather, and setting alarms is cool and all, but after using AWS, obviously I wanted to do a bit more with the echo. I built City Services so I could get the hang of building skills in Alexa, and also to play around with a few AWS services.

## Alexa City Services
The city services skill allows users to query a service directory for available businesses. The user is prompted for which city they're requesting in (Toronto, Ottawa, etc) and what type of service they're looking for (Towing, Plumbing, etc). The skill takes the user's answers and queries a DynamoDB (NoSQL database service in AWS) for a list of currently open businesses that meet this criteria. The skill numbers off the results and asks the user to answer with the number of the business they want to contact, or answer with 'all' to contact all of them. 


<p align="center">
  <img src="https://raw.githubusercontent.com/wangraym/personal_blog/master/images/services_sent.png"><br/>
  Figure 1 - Chatting with Alexa City Services
</p>

Based on their answer AWS SNS (Simple Notification Service) is used to send a notification to the services requested. This can be an SMS or an email, and it contains an automated message telling the business that a user need their service. The message contains the user's full name and phone number (by which the business is expected to use to get in touch with the user). Permission for the user's full name and phone number is prompted for right when the user launches the skill. The user needs to enable permissions once on their Alexa app before any businesses will be contacted. If permissions aren't granted, the skill will be unable to retrieve the user's contact information, the request will fail, and the user will be notified and asked to enable permissions and start again.

<p align="center">
  <img src="https://raw.githubusercontent.com/wangraym/personal_blog/master/images/services_email.png"><br/>
  Figure 2 - Email Notification from Alexa City Services
</p>

## Skill/Code Architecture
I used an all Amazon architecture for this because it's free for me right now on AWS free tier, and because it's easy to integrate all of their services together. The figure below shows how my skill is laid out.

<p align="center">
    <img src="https://raw.githubusercontent.com/wangraym/personal_blog/master/images/services_flow.png")><br/>
    Figure 3 - Skill Architecture
</p>

The lambda script is written in Python. It accesses DynamoDB when it finishes probing the user for query parameters. The database table stores entries with a city-name hash key and service-type range key. This way,each entry stores a list of all businesses in a specific city, that provide a specific service. For example, a hash key value of 'toronto' and range key value of 'towing' may return an entry like this:

```python
{

  "City": "toronto",
  "Service": "towing",
  "items": [
    {
      "Hours": {
        "0": "7:00-15:00",
        "1": "7:00-15:00",
        "2": "7:00-15:00",
        "3": "7:00-15:00",
        "4": "7:00-15:00",
        "5": "7:00-15:00",
        "6": "7:00-15:00"
      },
      "Name": "Limited",
      "Arn": "SNS ARN Here"
    },

    {
      "Hours": {
        "all": "all"
      },
      "Name": "Abrams",
      "Arn": "SNS ARN"
    },

    {
      "Hours": {
        "all": "all"
      },
      "Name": "V. I. P. Towing",
      "Arn": "SNS ARN"
    }
  ]

}
```

Each item contains the business name, as well as its hours, and its AWS SNS topic ARN. As soon as the database entry is retrieved its items are parsed, discarding any businesses which are closed at the current time. This final list is saved in the attribute list that's passed back and forth to Alexa in order to avoid re-querying and re-parsing the database. Once the user requests to contact a business, that business' topic ARN is retrieved from this list in order to publish to using SNS.

## Speech Model
In Alexa you will design your speech model to classify responses you might get from your user. You can setup expected words and phrases (called 'utterances') that indicate what a user is trying to do (called 'intents'). 

In my skill I have an intent called 'menu', which has several utterances like 'cancel', 'main menu', 'go back', 'start over'. Whenever a user responds with any of these phrases, Alexa will indicate that the user wishes to return to the main menu. My code will read the intent of the request is 'menu' and will route it to a function that will respond to the user asking for confirmation.

I only have one other custom intent I call 'answer'. This is just a catch all for user responses to questions the skill will prompt for. The answer intent has sub-classifications (called 'slot') to further classify types of answers (i.e. yes/no, numbers, etc). I also utilize the AMAZON.SEARCHQUERY slot type as a catch all for general responses. I created a slot type called 'generic' and an utterance of 'search {generic}' in order to for the user to say 'search' followed by anything they want, of any length. This utterance is used to capture the search query parameters. For example, the skill will prompt you for the City you are requesting in, to which you would say 'search toronto' to register your answer. It isn't reasonable for me to type in every possible Canadian town or city (stock slot types only have AMAZON.US_CITIES, nothing for Canadians), and this list would not self maintain if names change or places need to be added.

This is not how this slot type is supposed to be used, I know that, but I can't think of a way to encapsulate a general response. 

## Handling Attributes
My skill maintains up to four different attributes: STATUS, QUERY, QUESTION, and RESPONSE.

### Status
Status handles the overall state of the skill. In regular operation, the state flow looks like this:

<p align="center">
    <img src="https://raw.githubusercontent.com/wangraym/personal_blog/master/images/services_status.png")><br/>
    Figure 4 - State Flow
</p>

The skill flows linearly at each state status to complete the following sequential tasks:

1) Obtain query parameters (city and service)               STATUS = 'query'
2) Search the database                                      STATUS = 'search'
3) Send the notification(s)                                 STATUS = 'send'

A fourth status named 'returnMenu' also exists. This is set when the user invokes a 'menu' intent. The script will prompt the user if they are sure they want to return to the beginning and set STATUS='menu'. Now, when the user gives their response, the script will route the request to a function that processes the response and decides to return to the menu (and reset attributes) or to continue with the current query.

### Query
Stores the user's responses (city, service) which will be used to query the database.

### Question
While the status is 'query', the question attribute tracks which question the user is currently being asked to answer. When the query is complete, question is set to 'done'.

### Response
Response stores the list parsed list of business results from querying the database. 

## Reflection and Next Steps
Overall, the skill works to this specific use case. I think Alexa tech is still limited to relatively straight forward applications. It was hard to come up with something some what novel that I felt like I could do. I felt like the skill could improve on these aspects:

1) Clunkiness - This skill specifically feels a bit clunky with the 'search {generic}' utterance. I think Alexa needs either a catch all utterance, or more robust NLP capabilities like in Lex on AWS. This way, I could give examples of utterances I want, and it could infer the rest for me. 

2) Use the Alexa SDK - I didn't know there was an SDK for building skills when I started. I looked at some sample code and it's way easier to read and architect the skill with the SDK, since it handles the routing for you.

3) Response checking - I don't really do many checks to make sure the responses from the users are valid. One thing I thought could be done is at the beginning of the session I could do a scan of the hash and range keys from the table to get a list of keys. This way, I can construct a list of appropriate responses. If the user does not give an appropriate response, they can be re-prompted

I might publish the skill later on so you can try it too. If I do this, I'll update this post and provide a list of query parameters that will return good results. I'll also probably not have the lambda actually send out emails since the free tier for emails isn't that high.


That's all I have for this first post. I hope it made sense. For next posts, I will either feature some past code again or do a tutorial for accessing Alexa user data. I think I'm going to build an Alexa blackjack game skill next too.

Thanks for reading!