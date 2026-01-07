async function fetchSeed() {
    try {
        const res = await fetch('http://localhost:3000/api/fitness/seed')
        const text = await res.text()
        console.log('STATUS:', res.status)
        try {
            const body = JSON.parse(text)
            console.log('BODY:', JSON.stringify(body, null, 2))
        } catch (e) {
            console.log('BODY (TEXT):', text.substring(0, 1000))
        }
    } catch (e) {
        console.error('FETCH ERROR:', e)
    }
}

fetchSeed()
