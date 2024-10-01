const container = document.getElementById("container");
const canvas = document.getElementById("canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
ctx.lineCap = "round";
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;
ctx.shadowBlur = 20;
ctx.shadowColor = "DeepPink";
ctx.globalCompositeOperation = "xor";
const file = document.getElementById("fileupload");
const range = document.getElementById("range");
let audioSrc;
let analyzer;
var hueRange = 270;

container.addEventListener("click", () => {
    const audio = document.getElementById("audio1");
    const audioCtx = new AudioContext();
    audio.play();
    audioSrc = audioCtx.createMediaElementSource(audio1);
    analyzer = audioCtx.createAnalyser();
    audioSrc.connect(analyzer);
    analyzer.connect(audioCtx.destination);
    analyzer.fftSize = 128;
    const bufferLentgh = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLentgh);
    const barWidth = canvas.width/bufferLentgh;
    let barHeight;
    let x;

    function animate() {
        x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyzer.getByteFrequencyData(dataArray);
        drawVisualizer(bufferLentgh, x, barWidth, barHeight, dataArray);
        requestAnimationFrame(animate);
    }
    animate();
});

file.addEventListener("change", (event) => {
    /* console.log(event.target.files) */
    const files = event.target.files;
    const audio1 = document.getElementById("audio1");
    audio1.src = URL.createObjectURL(files[0]);
    audio1.load();
    audio1.play();

    analyzer = audioCtx.createAnalyser();
    audioSrc.connect(analyzer);
    analyzer.connect(audioCtx.destination);
    analyzer.fftSize = 128;
    const bufferLentgh = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLentgh);

    const barWidth = canvas.width/bufferLentgh;
    let barHeight;
    let x;

    function animate() {
        x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyzer.getByteFrequencyData(dataArray);
        drawVisualizer(bufferLentgh, x, barWidth, barHeight, dataArray);
        requestAnimationFrame(animate);
    }
    animate();

});

function changeHueValue() {
    hueRange = document.getElementById("input-range").value;
}

function drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray) {
    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 1.2;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(i * bufferLength / 1.2);
        /* para colocar esquema cor rgb */
        /* const red = i * barHeight / 15;
        const green = i * 2;
        const blue = barHeight / 4; */
        ctx.lineWidth = barHeight/7;
        const hue = hueRange + i * 3;
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.beginPath();
        ctx.moveTo(0, barHeight/1.2);
        ctx.lineTo(barHeight/1.2, barHeight);
        ctx.stroke();
        x += barWidth;
        ctx.restore();
    }
}