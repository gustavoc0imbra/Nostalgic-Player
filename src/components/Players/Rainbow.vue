<script>
  export default {
    props: [
        'audioSrcLink',
        'audioContext',
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
        hueRange: 270,
        audioElement: null
      };
    },
    methods: {
      startVisualization() {
        this.audioElement = this.$parent.$refs.audioSrcProp;
        this.audioCtx = this.$props.audioContext;
        /* this.audioElement.load();
        this.audioElement.play(); */
        /* this.audioSrc = this.audioCtx.createMediaElementSource(this.audioElement); */
        this.audioSrc = this.$props.audioSrcProp;
        this.analyzer = this.audioCtx.createAnalyser();
        this.audioSrc.connect(this.analyzer);
        this.analyzer.connect(this.audioCtx.destination);
        this.analyzer.fftSize = 512;
        const bufferLength = this.analyzer.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);
        this.barWidth = this.canvas.width/bufferLength;

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
           const barHeight = this.dataArray[i] * 2;
            this.ctx.save();
            this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
            this.ctx.rotate(i * Math.PI * 5 / bufferLength);
            /* para colocar esquema cor rgb */
            /* const red = i * barHeight / 15;
            const green = i * 2;
            const blue = barHeight / 4; */
            this.hue = i * 6;
            this.ctx.fillStyle = 'white';
            this.ctx.fillRect(0,0,this.barWidth, 20);
            /* ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`; */
            this.ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
            this.ctx.fillRect(0, 0, this.barWidth, barHeight);
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
      /* if(this.audioSrc && this.audioCtx) {
        this.audioSrc.disconnect();
        this.audioCtx.close();
        this.audioCtx = null;
        this.audioSrc = null;
        this.analyzer = null;
        this.ctx = null;
        this.audioElement = null;
        this.dataArray = null;
        this.$emit('componentClosed');
      } */
    }
  };
</script>
<template>
    <canvas class="w-full h-full rounded-md bg-black transition ease-in-out duration-700 hover:opacity-10 hover:cursor-pointer" ref="canvasInfinity" id="canvas1"></canvas>
</template>
  
