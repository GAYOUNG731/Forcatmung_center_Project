document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;
    const sliderContainer = document.querySelector('.slider');

    // 슬라이드를 보여주는 함수 (슬라이드를 부드럽게 이동)
    function showSlide(index) {
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }

        const offset = -currentSlide * 100;
        sliderContainer.style.transform = `translateX(${offset}%)`;

        // 점(dot)의 활성 상태를 업데이트
        dots.forEach((dot, idx) => {
            if (idx === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // 다음 슬라이드를 보여주는 함수
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // 이전 슬라이드를 보여주는 함수
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // 특정 슬라이드로 이동하는 함수
    function currentSlideIndex(index) {
        showSlide(index);
    }

    // 슬라이드를 자동으로 전환하는 기능 (5초마다 자동으로 다음 슬라이드로 이동)
    let autoSlide = setInterval(nextSlide, 5000);

    // 버튼 클릭 이벤트 추가
    document.querySelector('.prev').addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();  // 버튼 클릭 시 자동 슬라이드 초기화
    });

    document.querySelector('.next').addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();  // 버튼 클릭 시 자동 슬라이드 초기화
    });

    // 네비게이션 점(dot) 클릭 시 해당 슬라이드로 이동
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            currentSlideIndex(idx);
            resetAutoSlide();  // 점 클릭 시 자동 슬라이드 초기화
        });
    });

    // 자동 슬라이드를 리셋하고 다시 시작하는 함수
    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, 5000);
    }

    // 초기화: 첫 번째 슬라이드 보여주기
    showSlide(currentSlide);
});