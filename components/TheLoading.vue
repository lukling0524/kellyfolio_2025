<template>
	<div class="wrap loading">
		<div class="intro-box">
			<div aria-label="로고">
				<svg id="logo" class="logo" width="312.38" height="244.039" viewBox="0 0 312.38 244.039" tabindex="0">
					<g transform="translate(940.297 -1371.172)">
						<path class="logo__k svg-color" d="M-920.1,1376.4c2,42.7-2,82-14,123.3" fill="none" stroke="#fff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="8" />
						<path
							class="logo__elly svg-color"
							d="M-870.1,1391c-4.7,17.3-28,49.3-47.3,53.3,5.3,7.3,30,36,36.7,42,16.7,14.7,35.3-3.3,45.3-18,6.7-9.3,14.7-30-2-32.7-10-1.3-17.3,7.3-20.7,16-8.7,24,.7,58.7,31.3,54,28.7-4,48-32,57.3-57.3,5.3-12.7,12.7-41.3,6-54.7-7.3-14.7-14,.7-16,10-4.7,16-2.7,34-2.7,50.7,0,15.3-2,37.3,9.3,49.3,18.7,22,44-40.7,47.3-54,3.2-12.5,11.3-54.7,8.7-58.7-6.7-10-18,8-20,14.7-6.7,22-2,54.7,4.7,76,11.3,36.7,38-32.7,40.7-45.3a69.91,69.91,0,0,0,1.3-12c-8,16-12,33.3-8,52,7.2,18.8,15.2,16.8,28.7,17.3,21.4-.5,28-32,33.3-53.3,6,32.7,3.6,71.3-6,104-9.3,26-18.7,60.7-50,64.7-22,2.7-46.7,2.7-61.3-17.3-7.3-10-11.3-33.3,0-42"
							fill="none"
							stroke="#fff"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-miterlimit="10"
							stroke-width="8"
						/>
						<path class="logo__eye-l svg-color" d="M-714.8,1543v18" fill="none" stroke="#fff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="8" />
						<path class="logo__eye-r svg-color" d="M-689.5,1540.4c0,5.3-.7,10,.7,14.7" fill="none" stroke="#fff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="8" />
					</g>
				</svg>
			</div>
			<button class="hamburger" aria-label="모바일 메뉴 오픈 버튼">
				<span class="line"></span>
				<span class="line"></span>
				<span class="line"></span>
			</button>
			<div id="toggle_btn" class="toggle__box">
				<input type="checkbox" id="theme-toggle" class="toggle__item" checked />
				<label for="theme-toggle" class="toggle__btn text-hide" tabindex="0">테마 토글 버튼</label>
				<div class="toggle__icon">
					<span class="item on text-hide">아이콘-라이트모드</span>
					<span class="item dark text-hide">아이콘-다크모드</span>
				</div>
			</div>
		</div>

		<nav class="nav">
			<ul class="gnb">
				<li id="home" class="gnb__list is-active"><a href="javascript:void(0)" class="gnb__item" data-name="home">Home</a></li>
				<li id="howtowork" class="gnb__list"><a href="javascript:void(0)" class="gnb__item" data-name="howtowork">How to work</a></li>
				<li id="project" class="gnb__list"><a href="javascript:void(0)" class="gnb__item" data-name="project">Project</a></li>
				<li id="contact" class="gnb__list"><a href="javascript:void(0)" class="gnb__item" data-name="contact">Contact</a></li>
				<li class="gnb__list active-bar"></li>
			</ul>
		</nav>
	</div>
</template>

<script setup>
	onMounted(() => {
		const { $gsap } = useNuxtApp();

		const path_k = document.querySelector('.logo__k'),
			path_elly = document.querySelector('.logo__elly'),
			path_eye_l = document.querySelector('.logo__eye-l'),
			path_eye_r = document.querySelector('.logo__eye-r'),
			path_k_leng = Math.ceil(path_k.getTotalLength()),
			path_elly_leng = Math.ceil(path_elly.getTotalLength()),
			path_eye_l_leng = Math.ceil(path_eye_l.getTotalLength()),
			path_eye_r_leng = Math.ceil(path_eye_r.getTotalLength());

		path_k.style.cssText = `
      stroke-dasharray: ${path_k_leng};
      stroke-dashoffset:${path_k_leng};
    `;

		path_elly.style.cssText = `
      stroke-dasharray: ${path_elly_leng};
      stroke-dashoffset: ${path_elly_leng};
    `;

		path_eye_l.style.cssText = `
      stroke-dasharray: ${path_eye_l_leng};
      stroke-dashoffset:${path_eye_l_leng};
    `;

		path_eye_r.style.cssText = `
      stroke-dasharray: ${path_eye_r_leng};
      stroke-dashoffset: ${path_eye_r_leng};
    `;

		// Viewport 크기에 따른 easing 설정
		const $mq_tablet_sm = 768;
		const eyeEase = window.innerWidth < $mq_tablet_sm ? 'sine.in' : 'elastic.out(1, 0.3)';

		// GSAP 3 애니메이션 적용
		const tween_logoDraw = $gsap.timeline({ delay: 1 });

		tween_logoDraw
			.to(path_k, { strokeDashoffset: 0, duration: 0.65, ease: 'sine.in' })
			.to(path_elly, { strokeDashoffset: 0, duration: 2.2, ease: 'sine.in' })
			.to(path_eye_l, { strokeDashoffset: 0, duration: 0.6, delay: 0.4, ease: eyeEase })
			.to(path_eye_r, { strokeDashoffset: 0, duration: 0.7, delay: 0.1, ease: eyeEase }, 'queue');
	});
</script>

<style lang="scss">
	@use '@css/layout/loading';
</style>
