const port = process.env.PORT || 8080
const { response } = require('express')
const express = require('express')
const app = express()
const yt = require('ytdl-core')


app.get('/:id', async (req, res) => {
    try {
        const referrer = req.headers.referrer || req.headers.referer
        const data = await yt.getInfo(req.params.id)
        let response = await {
            tobelsoft: {
                error: false,
                message: null,
                data: {
                    vid_details: [],
                    items: []
                }
            }
        }
        
        const items = data.player_response.streamingData.adaptiveFormats
        const details = data.player_response.videoDetails
        response.tobelsoft.data.items = items
        response.tobelsoft.data.vid_details = details

        res.status(200).json(await response)
    } catch (err) {
        response.tobelsoft.error = true
        response.tobelsoft.message = err.message
        res.status(200).json(await response)
    }
})

app.listen(port, () => {
    console.log(`Application is listening on port ${port}`)
})