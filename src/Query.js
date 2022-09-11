import React, { useEffect, useState } from 'react';
import './Query.css'

export function Query() {
    const [url, setUrl] = useState('')
    const [q, setQ] = useState('')

    useEffect(() => {
        if (q !== '' && q !== null && q != undefined) {
            console.log(q)
        }
    }, [q])

    useEffect(() => {
        setQ((url.split('?v=')[1]))
    }, [url])

    return (
        <div className='query_page'>
            <div className='container'>
                <h1 className='title'>Download Audio and Video from YouTube</h1>
                <input className='query' type='text' value={url} placeholder='Search or paste link here' onChange={e => {
                    setUrl(e.target.value)
                }} />
            </div>
        </div>
    )
}