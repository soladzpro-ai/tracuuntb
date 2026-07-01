// Hàm tạo hiệu ứng xuất hiện bồng bềnh cho khối kết quả khi hiển thị
function triggerCardAnimation(element) {
    if (!element) return;
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    
    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 50);
}

window.triggerCardAnimation = triggerCardAnimation;