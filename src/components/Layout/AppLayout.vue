<script>
import imgEfeitoReta from "@/assets/efeitoReta.png";
import imgEfeitoCircular from "@/assets/EfeitoCircular.png";
import imgEfeitoCircular2 from "@/assets/EfeitoCircular2.png";
import imgEfeitoBolha from "@/assets/EfeitoBolhas.png";
import imgEfeitoNeon from "@/assets/EfeitoNeon.png";
import imgEfeitoNeon2 from "@/assets/EfeitoNeon2.png";
import Infinity from "../Players/Infinity.vue";
import Neon from "../Players/Neon.vue";
import Infinity2 from "../Players/Infinity2.vue";
import Bubble from "../Players/Bubble.vue";
import Neon2 from "../Players/Neon2.vue";
import Rainbow from "../Players/Rainbow.vue";

export default {
    data() {
        return {
            players: [
                {
                    id: 1,
                    name: 'Efeito Reta',
                    imagePath: imgEfeitoReta,
                    selected: true,
                },
                {
                    id: 2,
                    name: 'Efeito Circular',
                    imagePath: imgEfeitoCircular,
                    selected: false,
                },
                {
                    id: 3,
                    name: 'Efeito Circular 2',
                    imagePath: imgEfeitoCircular2,
                    selected: false,
                },
                {
                    id: 4,
                    name: 'Efeito bolhas',
                    imagePath: imgEfeitoBolha,
                    selected: false,
                },
                {
                    id: 5,
                    name: 'Efeito Neon',
                    imagePath: imgEfeitoNeon,
                    selected: false,
                },
                {
                    id: 6,
                    name: 'Efeito Neon 2',
                    imagePath: imgEfeitoNeon2,
                    selected: false,
                },
            ],
            file: {
                url: '',
                name: '',
            },
            currentVisualizer: {
                id: 1,
                selected: true
            },
            exibe: false,
            audioCtxList: null,
            audioSrc: null,
        }
    },
    components: {
        Rainbow,
        Infinity,
        Infinity2,
        Bubble,
        Neon,
        Neon2
    },
    methods: {
        handleUploadeadMusic($event, type) {
            if($event.target.files[0] || $event.dataTransfer.files[0]) {
                var uplodadedFile = null;
                switch (type) {
                    case 0:
                        uplodadedFile = $event.target.files[0]
                        break;
                    case 1:
                        [...$event.dataTransfer.files].forEach(file => {
                            uplodadedFile = file
                        });
                        break;
                }
                this.file.name = uplodadedFile.name.replace('.mp3', '');
                this.file.url = URL.createObjectURL(uplodadedFile);
                this.$refs.audioElement.src = this.file.url;
                this.exibe= true;
                /* this.audioCtxList = new AudioContext();
                this.audioSrc = this.audioCtx.createMediaElementSource(audioElement); */
                this.$refs.audioElement.load();
                this.$refs.audioElement.play();
            }
        },
        changeVisualizer(player) {

            if(this.audioSrc) {
                this.audioSrc.disconnect();
                this.audioCtxList.close();
            }

            this.players.forEach((item) => {
                player != item ? item.selected = false : item.selected = true
            });

            this.currentVisualizer = player;

            this.audioCtxList = new AudioContext();
            this.audioSrc = this.audioCtxList.createMediaElementSource(this.$refs.audioElement);
            this.audioSrc.connect(this.audioCtxList.destination);
            /* console.log(this.currentVisualizer)
            console.log(this.players) */
        },
        handleClosedComponent() {
            this.file = null;
        }
    },
    mounted() {
        this.exibe = false;
    },
}
</script>
<template>
    <div class="grid h-screen w-full grid-cols-4 grid-rows-4 gap-2 bg-gray-500 p-5">
        <Rainbow class="col-span-3 row-span-3"
                v-if="currentVisualizer.id == 1 && currentVisualizer.selected && exibe"
                :audioSrcLink="file.url"
                :audioContext="audioCtxList"
                :audioSrcProp="audioSrc"
         />
        <Infinity class="col-span-3 row-span-3"
            v-if="currentVisualizer.id == 2 && currentVisualizer.selected && exibe"
            :audioSrcProp="file.url"
        />
        <Infinity2 class="col-span-3 row-span-3" v-if="currentVisualizer.id == 3 && currentVisualizer.selected && exibe" :audioSrcProp="file.url" />
        <Bubble class="col-span-3 row-span-3" v-if="currentVisualizer.id == 4 && currentVisualizer.selected && exibe" :audioSrcProp="file.url" />
        <Neon class="col-span-3 row-span-3" v-if="currentVisualizer.id == 5 && currentVisualizer.selected && exibe" :audioSrcProp="file.url" />
        <Neon2 class="col-span-3 row-span-3" v-if="currentVisualizer.id == 6 && currentVisualizer.selected && exibe" :audioSrcProp="file.url" />
        <div class="col-span-1 row-span-3 flex flex-col justify-center items-center gap-5 rounded-md p-5 bg-gray-300">
            <svg class="w-1/4 h-1/2"
                 :class="{
                    'animate-spin': file.url
                 }"
                mlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm0-144a56.06,56.06,0,0,0-56,56,8,8,0,0,1-16,0,72.08,72.08,0,0,1,72-72,8,8,0,0,1,0,16Zm72,56a72.08,72.08,0,0,1-72,72,8,8,0,0,1,0-16,56.06,56.06,0,0,0,56-56,8,8,0,0,1,16,0Zm-40,0a32,32,0,1,0-32,32A32,32,0,0,0,160,128Zm-48,0a16,16,0,1,1,16,16A16,16,0,0,1,112,128Z"></path></svg>
            <p class="text-md font-bold">{{ file.name }}</p>
            <input type="file" class="w-full h-full" @change="handleUploadeadMusic($event, 0)" @drop.prevent="handleUploadeadMusic($event, 1)" accept="audio/*">
            
            <audio class="w-full" ref="audioElement" nodownload controls></audio>
        </div>
        <div class="col-span-4 row-span-1 flex justify-center items-center gap-2 rounded-md p-2 bg-gray-300">
            <div class="flex justify-center items-center w-52 h-full bg-gray-400 hover:cursor-pointer p-5"
                :class="{
                    'bg-gray-500': player.selected,
                    'hover:animate-pulse': !player.selected
                    }"
                v-for="player in players" :key="player.id"
                @click="changeVisualizer(player)"
            >
                <img width="100" height="100" :src="player.imagePath">
            </div>
        </div>
    </div>
</template>