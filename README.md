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

POST /vibration/pre ?
{
    userID:
    answer: {
    
    }
}

POST /vibration/post ?
{
    userID:
    answer: {

    }
}
```
