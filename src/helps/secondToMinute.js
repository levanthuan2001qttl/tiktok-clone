export const secondToMinute = (d) => {
    d = Number(d);
    // var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    // var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
    var mDisplay = m < 10 ? `0${m}` : m;
    var sDisplay = s < 10 ? `0${s}` : s;
    return `${mDisplay}:${sDisplay}`;
};
