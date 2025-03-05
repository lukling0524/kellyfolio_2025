<template>
	<header class="header intro-box end">
		<div class="header__wrap intro-box">
			<h1 aria-label="로고">
				<svg
					id="logo"
					class="logo"
					width="312.38"
					height="244.039"
					viewBox="0 0 312.38 244.039"
					tabindex="0"
				>
					<g transform="translate(940.297 -1371.172)">
						<path
							class="logo__k svg-color"
							d="M-920.1,1376.4c2,42.7-2,82-14,123.3"
							fill="none"
							stroke="#fff"
							stroke-linecap="round"
							stroke-miterlimit="10"
							stroke-width="8"
						/>
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
						<path
							class="logo__eye-l svg-color"
							d="M-714.8,1543v18"
							fill="none"
							stroke="#fff"
							stroke-linecap="round"
							stroke-miterlimit="10"
							stroke-width="8"
						/>
						<path
							class="logo__eye-r svg-color"
							d="M-689.5,1540.4c0,5.3-.7,10,.7,14.7"
							fill="none"
							stroke="#fff"
							stroke-linecap="round"
							stroke-miterlimit="10"
							stroke-width="8"
						/>
					</g>
				</svg>
			</h1>
			<button class="hamburger" aria-label="모바일 메뉴 오픈 버튼" ref="hamburgerRef">
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

		<nav class="nav" ref="navRef">
			<ul class="gnb" ref="gnbRef">
				<li id="home" class="gnb__list is-active" ref="homeRef">
					<a href="javascript:void(0)" class="gnb__item" data-name="home" @click="handleClick"
						>Home</a
					>
				</li>
				<li id="project" class="gnb__list" ref="projectRef">
					<a href="javascript:void(0)" class="gnb__item" data-name="project" @click="handleClick"
						>Project</a
					>
				</li>
				<li id="howtowork" class="gnb__list" ref="howtoworkRef">
					<a href="javascript:void(0)" class="gnb__item" data-name="howtowork" @click="handleClick"
						>How to work</a
					>
				</li>

				<li id="contact" class="gnb__list" ref="contactRef">
					<a href="javascript:void(0)" class="gnb__item" data-name="contact" @click="handleClick"
						>Contact</a
					>
				</li>
				<li class="gnb__list active-bar" ref="activeBarRef"></li>
			</ul>
		</nav>
	</header>

	<div class="progress">
		<div class="progress__bar" :style="{ width: scrollPercentage + '%' }"></div>
	</div>
</template>

<script setup>
	import { ref, onMounted, onUnmounted, nextTick } from 'vue';

	const scrollPercentage = ref(0);
	const gnbRef = ref(null);
	const activeBarRef = ref(null);
	const homeRef = ref(null);
	const howtoworkRef = ref(null);
	const projectRef = ref(null);
	const contactRef = ref(null);
	const hamburgerRef = ref(null);
	const navRef = ref(null);

	const mq_tablet = 768; // Assuming this is defined elsewhere or a constant

	const scrollTopPos = ref([]);
	let activeList = ref(null);
	let leftPos = ref(0);

	const sectionRefs = {
		home: homeRef,
		howtowork: howtoworkRef,
		project: projectRef,
		contact: contactRef,
	};

	const handleClick = event => {
		const clickedItem = event.currentTarget;
		const menuData = clickedItem.getAttribute('data-name');
		const section = document.querySelector(`.section[data-name="${menuData}"]`);

		if (!section) return;

		const sectionTopPos = section.offsetTop;

		if (window.innerWidth < mq_tablet) {
			mobileMenuOpen();
		} else {
			updateActiveBar(clickedItem);
		}

		window.scrollTo({ top: sectionTopPos, behavior: 'smooth' });

		// 모바일 메뉴가 열린채로 PC 사이즈로 변경되었을 때 메뉴 클릭시
		if (hamburgerRef.value.classList.contains('is-open')) {
			hamburgerRef.value.classList.remove('is-open');
			// Assuming you have access to the header element, use ref or querySelector
			navRef.value.closest('.header').classList.remove('menu-open');
			bodyOverflow('auto'); // Assuming this function is defined elsewhere
		}
	};

	const updateActiveBar = clickedItem => {
		activeBarRef.value.style.width = `${clickedItem.offsetWidth}px`;
		activeBarRef.value.style.left = `${clickedItem.offsetLeft}px`;

		const gnbItems = gnbRef.value.querySelectorAll('.gnb__item');

		gnbItems.forEach(el => {
			el.parentNode.classList.toggle('is-active', el === clickedItem);
		});
	};

	const mobileMenuOpen = () => {
		// Assuming this function is defined elsewhere
		// Logic to open/close mobile menu
		console.log('mobileMenuOpen');
	};

	const bodyOverflow = type => {
		// Assuming this function is defined elsewhere
		// Logic to set body overflow
		console.log(`bodyOverflow ${type}`);
	};

	onMounted(async () => {
		await nextTick(); // ensure DOM is updated

		if (homeRef.value) {
			activeList.value = homeRef.value;
			activeBarRef.value.style.width = `${activeList.value.offsetWidth}px`;
			activeBarRef.value.style.left = '0px';
		}

		const $scrollTarget = document.querySelectorAll('.section[data-name]');
		$scrollTarget.forEach(item => {
			scrollTopPos.value.push(item.offsetTop);
		});

		const handleScroll = () => {
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			scrollPercentage.value = (scrollTop / (documentHeight - windowHeight)) * 100;

			const menuList = gnbRef.value.querySelectorAll('.gnb__list');
			let currentActive = null;

			for (let i = 0; i < scrollTopPos.value.length; i++) {
				if (scrollTop >= scrollTopPos.value[i] - 100) {
					currentActive = menuList[i];
				}
			}

			menuList.forEach(el => el.classList.remove('is-active'));
			if (currentActive) {
				currentActive.classList.add('is-active');
			}

			if (currentActive) {
				activeList.value = currentActive;
				leftPos.value = activeList.value.offsetLeft;

				activeBarRef.value.style.width = `${activeList.value.offsetWidth}px`;
				activeBarRef.value.style.left = `${leftPos.value}px`;
			}
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll(); // Initial scroll check

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<style lang="scss" scoped>
	.progress {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: $progress-bar-height;
		@include get-color(background-color, color-font);
		z-index: 9999;

		&__bar {
			height: $progress-bar-height;
			@include get-color(background-color, color-mint);
			transition: width 0.05s ease; // smooth transition
		}
	}
</style>
