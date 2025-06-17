// Set current year in footer
document.getElementById("current-year").textContent = new Date().getFullYear()

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// تحسين نظام التحريك عند التمرير (Animate on Scroll)
const animateOnScrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // إذا كان العنصر مرئياً
      if (entry.isIntersecting) {
        // إضافة الصنف الخاص بالتحريك
        entry.target.classList.add("aos-animate")
        // إيقاف مراقبة العنصر بعد تحريكه (اختياري)
        // animateOnScrollObserver.unobserve(entry.target);
      } else {
        // إزالة الصنف إذا خرج العنصر من الشاشة (للتأثيرات المتكررة)
        if (entry.target.dataset.aosOnce !== "true") {
          entry.target.classList.remove("aos-animate")
        }
      }
    })
  },
  {
    // تحديد متى يتم تفعيل التأثير (عندما يكون 10% من العنصر مرئياً)
    threshold: 0.1,
    // إضافة هامش لتفعيل التأثير قبل وصول العنصر للشاشة
    rootMargin: "0px 0px -50px 0px",
  },
)

// تطبيق التأثيرات على العناصر
document.addEventListener("DOMContentLoaded", () => {
  // تحديد جميع العناصر التي تحتوي على سمة data-aos
  const animatedElements = document.querySelectorAll("[data-aos]")

  animatedElements.forEach((element) => {
    // إضافة الصنف الأساسي للتحريك
    element.classList.add("aos-init")

    // تعيين تأخير مخصص (إذا كان موجوداً)
    if (element.dataset.aosDelay) {
      element.style.transitionDelay = `${element.dataset.aosDelay}ms`
    }

    // تعيين مدة مخصصة (إذا كانت موجودة)
    if (element.dataset.aosDuration) {
      element.style.transitionDuration = `${element.dataset.aosDuration}ms`
    }

    // بدء مراقبة العنصر
    animateOnScrollObserver.observe(element)
  })
})

function updateCountdown() {
  const countdownContainer = document.querySelector(".cta-timer");
  if (!countdownContainer) return;

  const targetDateStr = countdownContainer.getAttribute("data-countdown-date");
  if (!targetDateStr) return;

  let countDownDate = new Date(targetDateStr).getTime();
  const now = Date.now();
  let distance = countDownDate - now;

  // عدد الميلي ثانية في 4 أيام
  const fourDaysMs = 4 * 24 * 60 * 60 * 1000;

  // ✅ لما التايمر يخلص، نرجع نعد من جديد لمدة 4 أيام
  if (distance < 0) {
    const newDate = new Date(now + fourDaysMs);
    countdownContainer.setAttribute(
      "data-countdown-date",
      newDate.toISOString()
    );
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days.toString().padStart(2, "0");
  document.getElementById("hours").innerHTML = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").innerHTML = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").innerHTML = seconds
    .toString()
    .padStart(2, "0");

  if (days < 1) {
    document.querySelector(".countdown").classList.add("animate-pulse");
  }
}

window.addEventListener("load", () => {
  updateCountdown();
  setInterval(updateCountdown, 1000);
});


// Add hover effect to pricing cards
const pricingCards = document.querySelectorAll(".pricing-card")
pricingCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    if (!this.classList.contains("featured")) {
      pricingCards.forEach((otherCard) => {
        if (!otherCard.classList.contains("featured")) {
          otherCard.style.transform = "scale(0.98)"
          otherCard.style.opacity = "0.8"
        }
      })
      this.style.transform = "translateY(-10px)"
      this.style.opacity = "1"
    }
  })

  card.addEventListener("mouseleave", function () {
    if (!this.classList.contains("featured")) {
      pricingCards.forEach((otherCard) => {
        if (!otherCard.classList.contains("featured")) {
          otherCard.style.transform = "scale(1)"
          otherCard.style.opacity = "1"
        }
      })
    }
  })
})
