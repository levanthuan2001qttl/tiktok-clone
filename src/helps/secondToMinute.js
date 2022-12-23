const secondToMinute = (d) => {
    d = Number(d);
    // let h = Math.floor(d / 3600);
    let m = Math.floor((d % 3600) / 60);
    let s = Math.floor((d % 3600) % 60);

    // let hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
    let mDisplay = m < 10 ? `0${m}` : m;
    let sDisplay = s < 10 ? `0${s}` : s;
    return `${mDisplay}:${sDisplay}`;
};

export default secondToMinute;
