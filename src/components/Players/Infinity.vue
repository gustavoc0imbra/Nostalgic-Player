<script>
  export default {
    props: [
        'audioSrcLink',
        'audioContext',
        'audioSrcProp'
    ],
    data() {
      return {
        analyzer: null,
        audioSrc: null,
        canvas: null,
        ctx: null,
        dataArray: null,
        barWidth: 0,
        hue: 270,
        hueRange: 0,
        audioElement: null
      };
    },
    methods: {
      startVisualization() {
        console.log(this.$props)
        this.audioElement = new Audio(this.$props.audioSrcLink);
        this.audioElement.load();
        this.audioElement.play();
        this.audioSrc = this.$props.audioContext.createMediaElementSource(this.audioElement);
        this.analyzer = this.$props.audioContext.createAnalyser();
        this.audioSrc.connect(this.analyzer);
        this.analyzer.connect(this.$props.audioContext.destination);
        this.analyzer.fftSize = 2048;
        const bufferLength = this.analyzer.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);
        this.barWidth = this.canvas.width / bufferLength;

        this.animate();
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
          const barHeight = this.dataArray[i] * 2.5;
          this.ctx.save();
          this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
          this.ctx.rotate(i * 4.184);
          this.hue = this.hueRange + i * 0.05;
          this.ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
          this.ctx.beginPath();
          this.ctx.arc(10, barHeight / 2, barHeight / 2, 0, Math.PI / 4);
          this.ctx.fill();
          this.ctx.stroke();
          x += this.barWidth;
          this.ctx.restore();
        }
      }
    },
    mounted() {
      this.canvas = this.$refs.canvasInfinity;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.ctx = this.canvas.getContext('2d');
      this.startVisualization();
    },
    unmounted() {
      if(this.analyzer) {
        this.analyzer.disconnect();
        if (this.audioElement) {
          this.audioElement.pause(); // Pausa o áudio
          this.audioElement.src = ''; // Limpa o src
          this.audioElement = null;
        }
        this.audioSrc.disconnect();
        this.audioSrc = null;
        console.log('Audio Src', this.audioSrc);
      }
    }
  };
</script>
<template>
    <canvas class="w-full h-full rounded-md bg-black transition ease-in-out duration-700 hover:cursor-pointer" ref="canvasInfinity" id="canvas1"></canvas>
</template>
  
