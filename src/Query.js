import React, { useEffect, useState } from 'react';
import './Query.css'
import axios from 'axios'
import IlustrationError from './Ilustration/Error.jpg'
import './Lib/css/boxicons.min.css'

function countFormat(num) {
    return new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD' }).format(num)
}

function timeFormat(sec) {
    var date = new Date(0);
    date.setSeconds(sec); // specify value for SECONDS here
    var timeString = date.toISOString().substring(11, 19);
    return timeString
}

function DownloadFile(props) {
    const a = document.createElement('a')
    a.setAttribute('href', props.url)
    a.setAttribute('download', props.title)
    a.setAttribute('target', '_blank')
    a.setAttribute('rel', "noopener noreferrer")
    a.click()
}


export function Query() {
    function getYTData(q) {
        let response = []
        axios({
            method: "GET",
            url: 'https://dl.tobelsoft.my.id/'+q
        }).then((res) => {
            response = res.data
            console.log(response)
            set_error_show(false)
            set_res_show(true)
            set_v_thumbnails(res.data.tobelsoft.data.vid_details.thumbnail.thumbnails.pop().url)
            set_v_title(res.data.tobelsoft.data.vid_details.title)
            set_v_author(res.data.tobelsoft.data.vid_details.author)
            set_v_view(parseInt(res.data.tobelsoft.data.vid_details.viewCount))
            set_v_duration(parseInt(res.data.tobelsoft.data.vid_details.lengthSeconds))
            set_v_items(res.data.tobelsoft.data.items)
        }).catch((err) => {
            set_res_show(false)
            set_error_message(`Server is returned error message: ${err.message}`)
            set_error_show(true)
        })
    }

    const [url, setUrl] = useState('')
    const [q, setQ] = useState('')

    const [error_show, set_error_show] = useState(false)
    const [error_message, set_error_message] = useState('')
    const [res_show, set_res_show] = useState(false)

    const [v_thumbnails, set_v_thumbnails] = useState('')
    const [v_title, set_v_title] = useState('')
    const [v_author, set_v_author] = useState('')
    const [v_view, set_v_view] = useState(0)
    const [v_duration, set_v_duration] = useState(0)
    const [v_items, set_v_items] = useState([])

    useEffect(() => {
        const el = document.querySelector('.res-error')
        if (error_show) {
            el.classList.remove('d-none')
        } else {
            if (!el.classList.contains('d-none')) {
                el.classList.add('d-none')
            }
        }
    }, [error_show])

    useEffect(() => {
        const el = document.querySelector('.res')
        if (res_show) {
            el.classList.remove('d-none')
        } else {
            if (!el.classList.contains('d-none')) {
                el.classList.add('d-none')
            }
        }
    }, [res_show])

    useEffect(() => {
        if (q !== '' && q !== null && q !== undefined) {
            getYTData(q.split('&')[0])
        }
    }, [q])

    useEffect(() => {
        setQ((url.split('?v=')[1]))
    }, [url])

    return (
        <div className='query_page'>
            <div className='container'>
                <h1 className='title'>Download Audio and Video from YouTube</h1>
                <input className='query' type='text' value={url} placeholder='Paste link here' onChange={e => {
                    setUrl(e.target.value)
                }} />

                <div className='res'>
                    {/* Left */}
                    <div>
                        <img className='v_thumbnails' src={v_thumbnails} alt={`${v_title} - Youtube Downloader | Wiji Fiko Teren`} title={`${v_title} - Youtube Downloader | Wiji Fiko Teren`} />
                        <div className='v_title'>{ v_title }</div>
                        <div className='v_author'>{v_author}</div>
                        <hr className='separate' />
                        <div className='v_views'>Views: { countFormat(v_view).toString().replace('$', '') }</div>
                        <div className='v_duration'>Duration: { timeFormat(v_duration) }</div>
                    </div>
                    {/* Right */}
                    <div className='items'>{v_items.map((item, index) => {
                        if (item.fps == undefined || item.qualityLabel == undefined) {
                            return
                        }
                        const mime = item.mimeType
                        const format = mime.split(';')[0].split('/')[1];
                        return (
                            <div className='item' key={index}>
                                <div>
                                    <div className='fps'>FPS: { item.fps }</div>
                                    <div className='quality'>Quality: {item.qualityLabel}</div>
                                    <div className='format'>Format: {format}</div>
                                </div>
                                <div className='download'>
                                    <button onClick={DownloadFile.bind(this, {
                                        title: v_title,
                                        format: format,
                                        url: item.url
                                    })}>Download</button>
                                </div>
                            </div>
                        )
                    }) }</div>
                </div>

                <div className='res-error'>
                    <div className='title'>{ error_message }</div>
                    <img src={IlustrationError} alt="Youtube Downloader | Wiji Fiko Teren - Result error" title="Youtube Downloader | Wiji Fiko Teren - Result error" />
                </div>
            </div>
        </div>
    )
}