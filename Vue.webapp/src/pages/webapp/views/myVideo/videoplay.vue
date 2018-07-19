<template>
	<div class="playeritem">
		<div class="player">

      <video-player v-if="videoUrl" class="vjs-custom-skin" ref="videoPlayer" :options="player1"
                    customEventName="changed" @ready="playerIsReady" @changed="playerStateChanged($event)">
			</video-player>
      <video-player v-else class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions" customEventName="changed"
                    @ready="playerIsReady" @changed="playerStateChanged($event)">
			</video-player>
		</div>
	</div>
</template>

<script>
	// videojs hotkeys plugin

	require('videojs-flash');
	require('videojs-hotkeys');
	require('video.js/dist/video-js.css');
	require('vue-video-player/src/custom-theme.css');
	export default {
		props: ['videoUrl'],
		mounted: function() {
      var str = document.getElementById('vjs_video_3');
			/*视频地址*/
      console.log(this.$route.query.videorul)
		},
		data() {

			return {
        videorul: this.$route.query.videorul,
				player1: {
					autoplay: false,
					sources: [{
            /* type: "video/mp4",*/
            src: this.$route.query.videorul
          }
          ],
					language: 'zh-CN',
					/*    techOrder: ['flash'],
					    poster: "/vue-video-player/static/images/author-2.jpg"*/
				},
				playerOptions: {
					autoplay: false,
					sources: [{
            type: "video/webm",
            src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
					}],
					language: 'zh-CN',
					/*    techOrder: ['flash'],
					    poster: "/vue-video-player/static/images/author-2.jpg"*/
				}
			}
		},
		computed: {
			player() {
				return this.$refs.videoPlayer.player
			},
		},
		watch: {
			videoUrl(valsrc) {
				//异步接收src

        this.playerOptions.sources[0].src = valsrc

      }
		},
		methods: {
			playerStateChanged(playerCurrentState) {
				// console.log('example 2: state changed', playerCurrentState)
			},
			playerIsReady(player) {
				/*  console.log('example 2 ready!', player)*/
				player.hotkeys({
					volumeStep: 0.1,
					seekStep: 5,
					enableModifiersForNumbers: false,
					fullscreenKey: function(event, player) {
						// override fullscreen to trigger when pressing the F key or Ctrl+Enter
						return((event.which === 70) || (event.ctrlKey && event.which === 13));
					}
				})
			}
		}
	}
</script>

<style>
	.video-js {
		max-height: 500px;
	}

  #vjs_video_3 {
		max-height: 500px;
	}
</style>
