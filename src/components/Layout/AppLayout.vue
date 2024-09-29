<script>
    import imgEfeitoReta from "@/assets/efeitoReta.png";
    import imgEfeitoCircular from "@/assets/EfeitoCircular.png";
    import imgEfeitoCircular2 from "@/assets/EfeitoCircular2.png";

    export default {
        data() {
            return {
                players: [
                    {
                        id: 1,
                        name: 'Efeito Reta',
                        imagePath: imgEfeitoReta
                    },
                    {
                        id: 2,
                        name: 'Efeito Circular',
                        imagePath: imgEfeitoCircular
                    },
                    {
                        id: 3,
                        name: 'Efeito Circular 2',
                        imagePath: imgEfeitoCircular2
                    },
                    {
                        id: 4,
                        name: 'Efeito bolhas',
                        imagePath: new Image().src = ""
                    },
                    {
                        id: 5,
                        name: 'Efeito Neon',
                        imagePath: new Image().src = ""
                    },
                    {
                        id: 6,
                        name: 'Efeito Neon 2',
                        imagePath: new Image().src = ""
                    },
                ],
                file: '',
                currentVisualizer: null
            }
        },
        methods: {
            teste($event) {
                const canvas = document.getElementById("canvas");

                const ctx = canvas.getContext("2d");
            },
            handleUploadeadMusic($event, type) {
                if($event.target.files[0] || $event.dataTransfer.files[0]) {
                    switch (type) {
                        case 0:
                            this.file = $event.target.files[0]
                            break;
                        case 1:
                            [...$event.dataTransfer.files].forEach(file => {
                                this.file = file
                            });
                            break;
                    }
                    this.file = URL.createObjectURL(this.file);
                }
            },
            
        }
    }
</script>
<template>
    <div class="grid h-screen w-full grid-cols-4 grid-rows-4 gap-2 bg-gray-500 p-5">
        <canvas id="canvas" class="col-span-3 row-span-3 w-full h-full rounded-md bg-gray-400 transition ease-in-out duration-700 hover:opacity-10 hover:cursor-pointer"></canvas>
        <div class="col-span-1 row-span-3 flex rounded-md bg-gray-300"></div>
        <!-- <input type="file" @change="handleUploadeadMusic($event, 0)" @drop.prevent="handleUploadeadMusic($event, 1)" accept="audio/*" class="col-span-3 h-full"> -->
        <div class="col-span-4 row-span-1 flex justify-center items-center gap-2 rounded-md p-2 bg-gray-300">
            <div class="bg-gray-400 w-52 h-full hover:cursor-pointer hover:animate-pulse p-5"
                v-for="player in players" :key="player.id"
            >
                <img class="w-fit h-fit" :src="player.imagePath">
            </div>
        </div>
    </div>
</template>