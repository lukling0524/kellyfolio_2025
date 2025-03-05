<template>
	<div v-if="show" class="modal" :class="animationClass" ref="modal">
		<div class="modal__dimmed" @click.self="emit('close')"></div>
		<div class="modal__wrap">
			<div class="modal__content">
				<div class="modal__content--wrap">
					<div v-if="modalHeader" class="modal__header">
						<h3 class="modal__header--text">{{ modalHeader }}</h3>
					</div>
					<div class="modal__body">
						<!-- <div v-if="icon !== null" class="modal__icon">
							<img :src="`/images/ico-alert_${icon}.svg`" :alt="`${icon} icon`" />
						</div> -->
						<slot name="contents">
							<p class="modal__title">{{ modalTitle }}</p>
							<p class="modal__desc">{{ modalDesc }}</p>
						</slot>
					</div>
				</div>
				<div v-if="modalFooter" class="modal__footer btn-box">
					<slot name="footer"></slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		show: false,
		animationClass: '',
		icon: null,
		modalHeader: '',
		modalTitle: '',
		modalDesc: '',
		modalFooter: true,
	});

	const emit = defineEmits(['close']);
</script>

<style lang="scss" scoped>
	@use '@css/layout/modal';
</style>
