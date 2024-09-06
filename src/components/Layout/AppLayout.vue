<script>
    export default {
        data() {
            return {
                players: [
                    {
                        id: 1,
                        name: 'Efeito 1',
                    },
                    {
                        id: 2,
                        name: 'Efeito 2',
                    },
                    {
                        id: 3,
                        name: 'Efeito 3'
                    }
                ]
            }
        },
        methods: {
            teste($event) {
                const canvas = document.getElementById("canvas");

                const ctx = canvas.getContext("2d");
            }
        }
    }
</script>
<template>
    <div class="grid h-screen w-full grid-cols-4 gap-2 bg-gray-500 p-5">
        <canvas id="canvas" class="col-span-3  w-full h-full rounded-md bg-gray-400 transition ease-in-out duration-700 hover:opacity-10 hover:cursor-pointer"></canvas>
        <div class="col-span-1 bg-gray-300"></div>
        <div class="col-span-4 flex justify-center items-center gap-2 bg-gray-300">
            <div class="bg-gray-400 hover:cursor-pointer hover:animate-pulse p-5"
                v-for="player in players" :key="player.id"
            >
                {{ player.name }}
            </div>
        </div>
    </div>
</template>