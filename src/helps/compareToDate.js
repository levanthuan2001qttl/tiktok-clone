const compareToDate = (t2) => {
    var currentDate = new Date();
    var getDate = currentDate.toISOString().split('T')[0];
    var t2date = new Date(t2).toISOString().split('T')[0];

    var m = currentDate.getMinutes();
    var h = currentDate.getHours();
    var month = currentDate.getMonth();

    var m1 = new Date(t2).getMinutes();
    var h1 = new Date(t2).getHours();
    var month1 = new Date(t2).getMonth();

    var day1 = +new Date(t2).toISOString().split('-')[2].slice(0, 2);
    var day = +currentDate.toISOString().split('-')[2].slice(0, 2);

    if (getDate === t2date) {
        if (h === h1) {
            return m - m1 + ' phút trước';
        } else return h - h1 + ' giờ trước';
    } else {
        if (month1 === month) {
            const betwwenday = day - day1;

            if (betwwenday >= 7 && betwwenday < 14) {
                return 1 + ' tuần trước';
            } else if (betwwenday >= 14 && betwwenday < 21) {
                return 2 + ' tuần trước';
            }
            return betwwenday + ' ngày trước';
        } else {
            return month - month1 + ' tháng trước';
        }
    }
};

export default compareToDate;
