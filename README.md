### Install
`npm i`

### Start
`npm start`

```
GET /vibration/new
{
    userID: string
}


POST /vibration/answer
{
    userID:
    questionID: int
    answerContent: [int]
}

POST /vibration/pre-q
{
    userID:
    answerContent:
}

POST /vibration/post-q
{
    userID:
    answerContent:
}
```

### Curl commands for testing

```
curl -X GET  http://localhost:3000/vibration/new

curl -X POST http://localhost:3000/vibration/answer -d '
{
    "userID": "7b0dfbae-976b-47a4-a7db-8a1eaf987ae4",
    "questionID": 1,
    "answerContent": [1,2,3]
}
'

curl -X POST http://localhost:3000/vibration/pre-q -d '
{
    "userID": "7b0dfbae-976b-47a4-a7db-8a1eaf987ae4",
    "answerContent": [1,2,3]
}
'

curl -X POST http://localhost:3000/vibration/post-q -d '
{
    "userID": "7b0dfbae-976b-47a4-a7db-8a1eaf987ae4",
    "answerContent": [1,2,3]
}
'
```
