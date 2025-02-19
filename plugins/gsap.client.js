import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default defineNuxtPlugin(() => {
	gsap.registerPlugin(ScrollTrigger);

	return {
		provide: {
			gsap, // gsap 전역 등록
			ScrollTrigger, // ScrollTrigger 전역 등록
		},
	};
});
