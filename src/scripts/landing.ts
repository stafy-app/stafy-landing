// Vanilla page-level behaviour: scroll reveal, animated fills, counter, nav state,
// parallax and the report-modal trigger. Keeps static React sections free of client JS.
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

const io = new IntersectionObserver(
	(entries) => {
		for (const e of entries) {
			if (!e.isIntersecting) continue;
			e.target.classList.add("in");
			// Intro stagger delays must not linger on hover afterwards (see `.settled` in Problem.tsx).
			setTimeout(() => e.target.classList.add("settled"), 4000);
			io.unobserve(e.target);
		}
	},
	{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
);
document.querySelectorAll(".rv").forEach((el) => io.observe(el));

const fio = new IntersectionObserver(
	(entries) => {
		for (const e of entries) {
			if (!e.isIntersecting) continue;
			const t = e.target as HTMLElement;
			t.querySelectorAll<HTMLElement>("[data-w]").forEach((f) => (f.style.width = f.dataset.w + "%"));
			t.querySelectorAll<HTMLElement>("[data-h]").forEach((f) => (f.style.height = f.dataset.h + "%"));
			t.classList.add("on");
			fio.unobserve(t);
		}
	},
	{ threshold: 0.35 },
);
document.querySelectorAll("[data-bars],[data-rates],[data-spark]").forEach((el) => fio.observe(el));

const counter = document.getElementById("counter");
if (counter && !reduce) {
	counter.textContent = "0 lei";
	const cio = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (!e.isIntersecting) continue;
				cio.unobserve(e.target);
				const to = Number((e.target as HTMLElement).dataset.to);
				const t0 = performance.now();
				const tick = (t: number) => {
					const p = Math.min(1, (t - t0) / 1500);
					const k = 1 - Math.pow(1 - p, 3);
					e.target.textContent = Math.round(to * k).toLocaleString("ro-RO") + " lei";
					if (p < 1) requestAnimationFrame(tick);
				};
				requestAnimationFrame(tick);
			}
		},
		{ threshold: 0.5 },
	);
	cio.observe(counter);
}

const nav = document.getElementById("nav");
const app = document.getElementById("app");
const pars = [...document.querySelectorAll<HTMLElement>("[data-par]")];
let raf = 0;
const onScroll = () => {
	if (raf) return;
	raf = requestAnimationFrame(() => {
		raf = 0;
		const y = scrollY;
		nav?.classList.toggle("stuck", y > 8);
		if (reduce) return;
		pars.forEach((p) => (p.style.transform = `translate3d(0,${(y * Number(p.dataset.par)).toFixed(1)}px,0)`));
		if (app) app.style.transform = `translate3d(0,${(-y * 0.025).toFixed(1)}px,0)`;
	});
};
addEventListener("scroll", onScroll, { passive: true });
onScroll();

document.addEventListener("click", (e) => {
	if ((e.target as Element).closest("[data-open-contact]")) {
		const drawer = document.getElementById("contact-drawer") as HTMLDialogElement | null;
		if (drawer) {
			e.preventDefault(); // without the drawer, the element's own mailto: href still works
			if (!drawer.open) drawer.showModal();
		}
		return;
	}
	if ((e.target as Element).closest("[data-open-report]")) {
		(document.getElementById("report-modal") as HTMLDialogElement | null)?.showModal();
	}
});

const tab = document.getElementById("contact-tab");
if (tab) {
	let pastHero = false;
	let atFinal = false;
	const sync = () => {
		tab.classList.toggle("on", pastHero && !atFinal);
		tab.classList.toggle("off", !(pastHero && !atFinal));
	};
	const top = document.getElementById("top");
	if (top) {
		new IntersectionObserver(([e]) => {
			pastHero = !e.isIntersecting;
			sync();
		}).observe(top);
	}
	const fin = document.getElementById("final");
	if (fin) {
		new IntersectionObserver(
			([e]) => {
				atFinal = e.isIntersecting;
				sync();
			},
			{ threshold: 0.25 },
		).observe(fin);
	}
}
