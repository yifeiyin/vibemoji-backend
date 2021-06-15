curl -X GET  http://localhost:3000/vibration/new

curl -X POST http://localhost:3000/vibration/answer -d '
{
    "userID": "7b0dfbae-976b-47a4-a7db-8a1eaf987ae4",
    "answer": {
        "questionID": 1,
        "answerContent": [1,2,3]
    }
}
'
