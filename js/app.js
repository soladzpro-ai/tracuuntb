// File khởi tạo chính, kiểm tra trạng thái nạp của toàn bộ các file thành phần
document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 Hệ thống Tra Cứu Điểm Thi THPT NTB đã sẵn sàng!");
    
    if (!window.fetchStudentScore) {
        console.error("Lỗi: Khối api.js chưa được nạp chính xác.");
    }
    if (!window.triggerCardAnimation) {
        console.warn("Lưu ý: Khối animation.js chưa được định nghĩa.");
    }
});