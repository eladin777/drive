<template>
  <video-player
      :src="'http://localhost:8081/rootFolder/'+store.state.video_file_path"
      poster=""
      controls
      :loop="false"
      :volume="1"
      :playback-rates="[0.5,0.7, 1.0, 1.5, 2.0]"
      :fluid="true"
      :width="1920"
      :height="1080"
  />
</template>

<script setup>
import store from "@/store";
</script>

<script>
import {defineComponent, shallowRef} from 'vue'
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import {VideoJsPlayer} from "video.js";

export default defineComponent({
  components: {
    VideoPlayer
  },
  // setup()
  // {
  //   const player = shallowRef<VideoJsPlayer>();
  //   const handleMounted = (payload: any) => {
  //     player.value = payload.player
  //     console.log('Basic player mounted', payload)
  //   }
  //
  //   const handleEvent = (log: any) => {
  //     console.log('Basic player event', log)
  //   }
  //
  //   return { player, handleMounted, handleEvent }
  // }
})
</script>

<style>
.vjs-playback-rate > .vjs-menu-button, .vjs-playback-rate .vjs-playback-rate-value
{
  top: 10px;
}
.video-js .vjs-volume-level:before
{
  color: #3fe13b;
}
.video-js .vjs-volume-panel
{
  top: 10px;
}
.vjs-icon-volume-high:before, .video-js .vjs-mute-control .vjs-icon-placeholder:before
{
  margin-top: -5px;
}
.video-js .vjs-play-progress:before
{
  color: #42f511;
}
.video-js .vjs-time-control
{
margin-left: -10px;
}

.video-js .vjs-big-play-button{
display: none;
}

.video-js .vjs-control-bar
{
  width: 40%;
  height: 50px;
  left: 30%;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: #2d2d2d;
  display: flex;
  border: #4f4f4f solid 1px;
}
.video-js .vjs-time-control{display:block;  margin-top: 10px;}
.video-js .vjs-remaining-time{display: none;}


.vjs-button > .vjs-icon-placeholder:before
{
  margin-top: 5px;
  font-size: 2.5em;
}

.video-js .vjs-play-progress
{
  background-color: #23ee1d;
}
/* 中间的播放箭头 */
.vjs-big-play-button .vjs-icon-placeholder {
  font-size: 1.63em;
}
/* 加载圆圈 */
.vjs-loading-spinner {
  font-size: 2.5em;
  width: 2em;
  height: 2em;
  border-radius: 1em;
  margin-top: -1em;
  margin-left: -1.5em;
}
</style>
