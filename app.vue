<template>
	<div>
		<TheLoading />
		<TheHeader />
		<div>
			<TheAboutSection />
			<TheProjectSection />
			<TheWaysSection />
			<TheContactSection />
		</div>
		<footer class="footer">&copy;2025 KELLY. ALL RIGHTS RESERVED</footer>
	</div>
</template>

<script setup>
	import Lenis from 'lenis';
	if (import.meta.env.SSR === false) {
		const lenis = new Lenis({
			duration: 1.5,
			easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smooth: true,
		});

		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);
	}
</script>

<style lang="scss"></style>
