import React, { useState, useEffect, useRef } from 'react';
import styles from './Channels.module.css';
import Create from '../Create';
import Channel from '../../components/Channel/Channel';
import Room from '../Room';

const Channels = () => {

    const [channelOffset, setChannelOffset] = useState([]);
    const [scrollTop, setScrollTop] = useState(0);
    const channelRef = useRef([]);
    const channelsContainerRef = useRef(null);
    
    const onScroll = (e) => {
        setScrollTop(e.target.scrollTop);
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
            <div ref={channelsContainerRef} className={`px-3 h-full overflow-y-auto ${styles.channels_container}`}>

                <Channel icon="coffee" name="Coffee" index={0} ref={channelRef.current} top={channelOffset[0]} to={Room} />
                <Channel icon="cogs" name="Cogs" index={1} ref={channelRef.current} top={channelOffset[1]} to={Room} />
                <Channel icon="plus" name="New Channel" index={2} ref={channelRef.current} top={channelOffset[2]} to={Create} />
                {/* <Channel icon="coffee" name="Coffee" index={3} ref={channelRef.current} top={channelOffset[3]} to={Room} />
                <Channel icon="cogs" name="Cogs" index={4} ref={channelRef.current} top={channelOffset[4]} to={Room} />
                <Channel icon="plus" name="New Channel" index={5} ref={channelRef.current} top={channelOffset[5]} to={Create} />
                <Channel icon="coffee" name="Coffee" index={6} ref={channelRef.current} top={channelOffset[6]} to={Room} />
                <Channel icon="cogs" name="Cogs" index={7} ref={channelRef.current} top={channelOffset[7]} to={Room} />
                <Channel icon="plus" name="New Channel" index={8} ref={channelRef.current} top={channelOffset[8]} to={Create} />
                <Channel icon="coffee" name="Coffee" index={9} ref={channelRef.current} top={channelOffset[9]} to={Room} />
                <Channel icon="cogs" name="Cogs" index={10} ref={channelRef.current} top={channelOffset[10]} to={Room} />
                <Channel icon="plus" name="New Channel" index={11} ref={channelRef.current} top={channelOffset[11]} to={Create} />
                <Channel icon="coffee" name="Coffee" index={12} ref={channelRef.current} top={channelOffset[12]} to={Room} />
                <Channel icon="cogs" name="Cogs" index={13} ref={channelRef.current} top={channelOffset[13]} to={Room} />
                <Channel icon="plus" name="New Channel" index={14} ref={channelRef.current} top={channelOffset[14]} to={Create} /> */}

            </div>
        </div>
    )
}

export default Channels