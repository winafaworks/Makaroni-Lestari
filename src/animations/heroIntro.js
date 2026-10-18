import gsap from "gsap";

/**
 * Animasi Stempel Hero (GSAP)
 * Dijalankan sekali per sesi kunjungan, menghormati prefers-reduced-motion.
 */
export function initHeroAnimation(containerRef, elements) {
  if (!containerRef.current) return () => {};

  // Periksa apakah preferensi reduced-motion aktif
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasAnimatedThisSession = sessionStorage.getItem("lestari_hero_animated");

  if (prefersReduced || hasAnimatedThisSession) {
    // Tampilkan kondisi akhir langsung tanpa animasi
    gsap.set([elements.badge, elements.titleLines, elements.actions], {
      opacity: 1,
      scale: 1,
      rotation: 0,
      y: 0
    });
    return () => {};
  }

  // Buat GSAP timeline
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        sessionStorage.setItem("lestari_hero_animated", "true");
      }
    });

    // Keadaan awal
    gsap.set(elements.titleLines, { y: 30, opacity: 0 });
    gsap.set(elements.badge, { scale: 1.25, rotation: -8, opacity: 0 });
    gsap.set(elements.actions, { opacity: 0, y: 15 });

    // 1. Judul naik perlahan
    tl.to(elements.titleLines, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.08
    })
    // 2. Lencana menekan seperti stempel cap
    .to(
      elements.badge,
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.45,
        ease: "back.out(1.8)"
      },
      "-=0.2"
    )
    // 3. Tombol aksi muncul
    .to(
      elements.actions,
      {
        opacity: 1,
        y: 0,
        duration: 0.4
      },
      "-=0.1"
    );
  }, containerRef);

  return () => ctx.revert();
}
