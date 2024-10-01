<script>
  export default {
    props: [
        'audioSrcProp'
    ],
    data() {
      return {
        audioCtx: null,
        analyzer: null,
        audioSrc: null,
        canvas: null,
        ctx: null,
        dataArray: null,
        barWidth: 0,
        hue: 0,
        hueRange: 270
      };
    },
    methods: {
      startVisualization() {
        const audioElement = this.$parent.$refs.audioElement;
        this.audioCtx = new AudioContext();
        this.audioSrc = this.audioCtx.createMediaElementSource(audioElement);
        this.analyzer = this.audioCtx.createAnalyser();
        this.audioSrc.connect(this.analyzer);
        this.analyzer.connect(this.audioCtx.destination);
        this.analyzer.fftSize = 128;
        const bufferLength = this.analyzer.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);
        this.barWidth = this.canvas.width / bufferLength;

        this.animate();
      },
      handleFileChange(event) {
        const files = event.target.files;
        const audioElement = this.$refs.audioElement;
        audioElement.src = URL.createObjectURL(files[0]);
        audioElement.load();
        audioElement.play();
        this.startVisualization();
      },
      animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.analyzer.getByteFrequencyData(this.dataArray);
        this.drawVisualizer();
        requestAnimationFrame(this.animate);
      },
      drawVisualizer() {
        let x = 0;
        const bufferLength = this.dataArray.length;
  
        for (let i = 0; i < bufferLength; i++) {
            const barHeight = this.dataArray[i] * 2;
            this.ctx.save();
            this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
            this.ctx.rotate(i * 3.2);
            this.hue = i * 0.1;
            this.ctx.strokeStyle = `hsl(${this.hue}, 100%, ${barHeight/5}%)`;
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            this.ctx.lineTo(0, barHeight);
            this.ctx.stroke();
            x += this.barWidth;

            if(i > bufferLength * 0.6) {
                this.ctx.beginPath();
                this.ctx.arc(0, 0, barHeight/1.5, 0, Math.PI * 2);
                this.ctx.stroke();
            }

            this.ctx.restore();
        }
      }
    },
    mounted() {
      this.canvas = this.$refs.canvasInfinity;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.ctx = this.canvas.getContext('2d');
      this.ctx.lineWidth = 3;
      this.ctx.globalCompositeOperation = "difference";
      this.startVisualization();
    },
    unmounted() {
      if(this.audioSrc && this.audioCtx) {
        this.audioSrc.disconnect();
        this.audioCtx.close();
      }
    }
  };
</script>
<template>
    <canvas class="w-full h-full rounded-md bg-black transition ease-in-out duration-700 hover:cursor-pointer" ref="canvasInfinity" id="canvas1"></canvas>
</template>
  
