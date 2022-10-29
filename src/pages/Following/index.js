import Portal from '~/components/Portal';
import { Slider } from 'antd';
import { useState } from 'react';
function Following() {
    const [songCurrentTime, setSongCurrentTime] = useState(0);
    const [songDuration, setSongDuration] = useState(0);

    const handleChangeCurrentTime = (value) => {
        console.log({ value });
        let currentTime = (songDuration * value) / 100;
        //  audioRef.current.currentTime = currentTime;
        console.log({ currentTime });
    };
    return (
        <div style={{ height: '400px', backgroundColor: '#ccc' }}>
            <Slider
                value={(songCurrentTime / songDuration) * 100 || 0}
                defaultValue={songCurrentTime}
                onChange={handleChangeCurrentTime}
            />
        </div>
    );
}

export default Following;
