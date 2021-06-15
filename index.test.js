const fetch = require('node-fetch')

function request(method, url, body) {
    return new Promise((resolve, reject) => {
        const s = body ? JSON.stringify(body) : undefined;
        fetch('http://localhost:3000' + url, { method, body: s }).then(async (res) => {
            let json;
            try {
                json = res.json();
            } catch (error) {
                reject(error);
            }

            if (!res.ok) {
                reject(res);
            }

            resolve(json);
        }).catch((error) => {
            reject(error);
        });
    })
}

test('GET /vibration/new', async () => {
    await expect(request('GET', '/vibration/new'))
        .resolves
        .toHaveProperty('userID');
})

test('POST /vibration/answer ERROR', async () => {
    await expect(request('POST', '/vibration/answer'))
        .rejects.toBeTruthy();
})

test('POST /vibration/answer ERROR2', async () => {
    await expect(request('POST', '/vibration/answer', { userID: 'xxx'}))
        .rejects.toBeTruthy();
})

test('Can submit an answer', async () => {
    const { userID } = await request('GET', '/vibration/new');

    await expect(request('POST', '/vibration/answer', {
        userID,
        answer: {
            questionID: 1,
            answerContent: [1,2,3],
        }
    }))
        .resolves.toBeTruthy();
})

// test('POST /vibration/answer', async () => {
//     expect(await request('GET', '/vibration/new'))
//         .toHaveProperty('.status', 200)
//         .toHaveProperty('.json.userID');
// })
