<template>
	<div>
		<slot>
			<div v-on:click="add" class="rep-physical">暂未体检</div>
		</slot>
	</div>
</template>
<script>
	export default {
		data() {
			return {}
		},
		methods: {

			add: function() {
				this.$emit('increment', '123')
			}
		}
	}
</script>
