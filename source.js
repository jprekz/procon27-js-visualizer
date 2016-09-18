function submit() {
    var form = document.getElementById('form');
    form.style.display = 'none';
    var e = document.getElementById('datainput');
    var inputData = e.value;
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var minX = Number.MAX_VALUE;
    var minY = Number.MAX_VALUE;
    var maxX = Number.MIN_VALUE;
    var maxY = Number.MIN_VALUE;
    var data = [];
    dataByLine = inputData.split(/\r\n|\r|\n/);
    for (var i = 0; i < dataByLine.length; i++) {
        if (dataByLine[i] === "") continue;
        data.push(dataByLine[i].split(' '));
    }
    for (var i = 0; i < data.length; i++) {
        if (data[i].length % 2 !== 0) return 'format error';
        if (data[i].length < 6) return 'format error';
        for (var j = 0; j < data[i].length; j++) {
            data[i][j] = parseFloat(data[i][j]);
            if (j % 2 === 0) {
                minX = Math.min(minX, data[i][j]);
                maxX = Math.max(maxX, data[i][j]);
            } else {
                minY = Math.min(minY, data[i][j]);
                maxY = Math.max(maxY, data[i][j]);
            }
        }
    }
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    canvas.width = window.innerWidth * window.devicePixelRatio - 1;
    canvas.height = window.innerHeight * window.devicePixelRatio - 1;
    var scale = Math.min(
        (canvas.width - 10) / (maxX - minX),
        (canvas.height - 10) / (maxY - minY)
    );
    var viewX = function (x) { return (x - minX) * scale + 5; }
    var viewY = function (y) { return (y - minY) * scale + 5; }
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    for (var i = 0; i < data.length; i++) {
        var x, y;
        x = viewX(data[i][data[i].length - 2]);
        y = viewY(data[i][data[i].length - 1]);
        ctx.beginPath();
        ctx.moveTo(x, y);
        for (var j = 0; j < data[i].length / 2; j++) {
            x = viewX(data[i][j * 2]);
            y = viewY(data[i][j * 2 + 1]);
            ctx.lineTo(x, y);
        }
        ctx.stroke();
    }
    ctx.strokeStyle = 'rgb(255, 0, 0)';
    for (var i = 0; i < data.length; i++) {
        var x, y;
        for (var j = 0; j < data[i].length / 2; j++) {
            x = viewX(data[i][j * 2]);
            y = viewY(data[i][j * 2 + 1]);
            ctx.strokeRect(x - 2, y - 2, 4, 4);
        }
    }
}
