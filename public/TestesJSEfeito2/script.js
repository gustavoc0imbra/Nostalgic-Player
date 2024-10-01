const container = document.getElementById("container");
const canvas = document.getElementById("canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
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
    analyzer.fftSize = 2048;
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
    analyzer.fftSize = 2048;
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
        barHeight = dataArray[i] * 2.5;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(i * 4.184);
        /* para colocar esquema cor rgb */
        /* const red = i * barHeight / 15;
        const green = i * 2;
        const blue = barHeight / 4; */
        const hue = hueRange + i * 0.05;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        /* ctx.fillRect(0, 0, barWidth, barHeight); */
        ctx.beginPath();
        ctx.arc(10, barHeight/2, barHeight/2, 0, Math.PI/4);
        ctx.fill();
        ctx.stroke();
        x += barWidth;
        ctx.restore();
    }
}