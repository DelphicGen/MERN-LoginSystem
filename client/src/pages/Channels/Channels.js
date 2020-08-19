import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import styles from './Channels.module.css';
import Channel from '../../components/Channel/Channel';

const Channels = () => {

    const history = useHistory()
    const [channelOffset, setChannelOffset] = useState([]);
    const [scrollTop, setScrollTop] = useState(0);
    const channelRef = useRef([]);
    const channelsContainerRef = useRef(null);
    
    const onScroll = (e) => {
        setScrollTop(e.target.scrollTop);
    }

    const logout = () => {
        axios({
            method: 'delete',
            url: 'http://localhost:3050/api/auth/logout',
            withCredentials: true,
            headers: {'Content-Type': 'application/json' }
            })
            .then(response => {
                if(response.data === 'Ok') {
                    history.push('/')
                }
            })
    }

    useEffect(() => {
        let tempRef = channelsContainerRef.current
        tempRef.addEventListener('scroll', onScroll);

        return () => tempRef.removeEventListener('scroll', onScroll);

    }, [])

    useEffect(() => {
        let tempOffset = []
        channelRef.current.forEach(ref=> {
            tempOffset.push(ref.getBoundingClientRect().top)
        })

        setChannelOffset(tempOffset);

    }, [scrollTop])

    return (
        <div className="h-screen fixed top-0 left-0 overflow-visible bg-gray-800">
            <div ref={channelsContainerRef} style={{height: 'calc(100vh - 48px)'}} className={`px-3 overflow-y-auto ${styles.channels_container}`}>

                <Channel icon="coffee" name="Coffee" index={0} ref={channelRef.current} top={channelOffset[0]} to="/room" />
                <Channel icon="cogs" name="Cogs" index={1} ref={channelRef.current} top={channelOffset[1]} to="/room" />
                <Channel icon="plus" name="New Channel" index={2} ref={channelRef.current} top={channelOffset[2]} to="/create" />

            </div>

            <div className="cursor-pointer absolute z-10 bottom-0 w-full" onClick={logout}>
                <div className={`block p-3 text-center text-white bg-gray-600 ${styles.link}`}>
                    <FontAwesomeIcon icon={['fas', "sign-out-alt"]} size="lg" />
                </div>
                <p style={{top: 0}} className={`absolute bg-gray-900 rounded-md text-white text-center mt-2 px-1 py-2 block ${styles.channel_modal}`}>
                    Logout
                </p>
            </div>
        </div>
    )
}

export default Channels