<template>
	<div>
		<!-- <TheLoading /> -->
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

<script setpup>
	import Lenis from 'lenis';

	// Initialize Lenis
	const lenis = new Lenis({
		autoRaf: true,
	});

	// Listen for the scroll event and log the event data
	lenis.on('scroll', e => {
		// console.log(e);
	});
</script>

<style lang="scss"></style>
