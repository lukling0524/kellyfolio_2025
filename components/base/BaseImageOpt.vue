<template>
	<nuxt-img :class="props.class" :src="`/images/${props.src}`" :fallback="`/images/${props.src}`" :alt="alt" format="webp,avif" loading="lazy" />
</template>

<script setup>
	const props = defineProps({
		class: String,
		src: String,
		alt: String,
	});
</script>
