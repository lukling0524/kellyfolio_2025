<template>
	<section class="about">
		<div class="section__container">
			<article class="about__intro">
				<div class="about__visual">
					<div class="avatar">
						<canvas ref="avatarCanvas" class="avatar__sequence" width="398" height="506"></canvas>
					</div>
				</div>

				<div class="about__title">
					<h2 class="section__title">
						<span class="font-accent">움직이는 화면</span>을 그리는 <br />
						UI개발자 김경화 입니다<span class="font-accent">.</span>
					</h2>
					<a class="btn" href="https://jellykelly.notion.site/6f4f9535fe184d178a17f4619f16eca1" target="_blank">
						<span class="btn__text">이력서 바로가기</span>
						<div class="ico-link">
							<svg class="svg-color" fill="#000000" viewBox="-5 -5 60.00 60.00">
								<title>링크 아이콘</title>
								<g stroke-width="0"></g>
								<g class="svg-color" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="4"></g>
								<g>
									<path class="ico-link__arrow" d="M38.288 10.297l1.414 1.415-14.99 14.99-1.414-1.414z"></path>
									<path class="ico-link__arrow" d="M40 20h-2v-8h-8v-2h10z"></path>
									<path d="M35 38H15c-1.7 0-3-1.3-3-3V15c0-1.7 1.3-3 3-3h11v2H15c-.6 0-1 .4-1 1v20c0 .6.4 1 1 1h20c.6 0 1-.4 1-1V24h2v11c0 1.7-1.3 3-3 3z"></path>
								</g>
							</svg>
						</div>
					</a>
				</div>
			</article>

			<article class="about__text">
				<div class="about__text--box">
					<p class="about__text--item">저는 동적 웹사이트 및 사용자가 만족할 수 있는 서비스를 만드는 것에 열정을 가진 3년 차 웹 퍼블리셔입니다.</p>
					<p class="about__text--item">
						시멘틱한 마크업, 컴포넌트 단위의 스타일시트 작성, 자바스크립트로 UI 인터랙션을 구현하여,<br />
						화면 정의서와 디자인 시안을 완벽하게 웹 페이지로 전환할 수 있습니다.
					</p>
					<p class="about__text--item">
						작업의 효율성과 완성도를 높이기 위해 기획팀과 디자인팀, 개발팀과 협력하는 데 탁월하며,<br />
						직관적이고 효과적인 웹 경험을 만들기 위해 늘 사용자의 요구를 이해하고자 합니다.
					</p>
					<p class="about__text--item">
						저는 평생 배우는 사람이고 제 기술을 향상시킬 새롭고 혁신적인 방법을 항상 찾고 있습니다.<br />
						꾸준히 성장하고 발전하며 함께 일하고 싶은 동료가 되기를 바랍니다.
					</p>
				</div>
			</article>
		</div>
	</section>
</template>

<script setup>
	const { $gsap, $ScrollTrigger } = useNuxtApp();
	const avatarCanvas = ref(null);
	const avatarImgSqc = [];
	const totalFrames = 70; // 총 프레임 수(image sequence 이미지 개수)

	// 사전 이미지 로드
	function preloadImages() {
		let loadedImages = 0;

		return new Promise((resolve, reject) => {
			for (let i = 1; i <= totalFrames; i++) {
				const formattedIndex = String(i).padStart(2, '0');
				const img = new Image();

				img.src = `/images/imagesequence/avatar-${formattedIndex}.png`;
				img.onload = () => {
					avatarImgSqc.push(img);
					loadedImages++;

					if (loadedImages === totalFrames) {
						resolve();
					}
				};
				img.onerror = error => {
					reject(`❗️이미지 로드 실패: ${img.src}`);
				};
			}
		});
	}
	onMounted(async () => {
		try {
			await preloadImages(); // 모든 이미지 로드까지 대기

			const canvas = avatarCanvas.value;
			const ctx = canvas.getContext('2d');
			const img = { crntImg: 0 };

			$gsap.to(img, {
				crntImg: totalFrames - 1,
				duration: 1,
				snap: 'crntImg',
				immediateRender: true,
				onUpdate: () => {
					const scrollPos = window.scrollY;
					const imgToDraw = avatarImgSqc[Math.round(img.crntImg)];

					ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous image
					ctx.drawImage(imgToDraw, 0, 0, canvas.width, canvas.height); // Draw current image
				},
				scrollTrigger: {
					trigger: '.about',
					start: 'top top',
					end: '+=1800px',
					scrub: 1,
					pin: '.about',
					markers: false,
				},
			});
		} catch (error) {
			console.error('❗️이미지 로딩 에러:', error);
		}
	});
</script>
