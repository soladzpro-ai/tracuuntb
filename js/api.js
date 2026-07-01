// Hàm tìm kiếm thông minh, hỗ trợ cả chạy offline (file:///) lẫn online
async function fetchStudentScore(sbd) {
    const targetSbd = String(sbd).trim().toLowerCase();
    let bulkData = null;

    // Hướng 1: Lấy từ mảng RAM toàn cục do data_local.js định nghĩa
    if (window._localStudentData && Array.isArray(window._localStudentData)) {
        bulkData = window._localStudentData;
    }

    // Hướng 2: Dự phòng nếu file:// / chặn script, đọc trực tiếp file dưới dạng text thô
    if (!bulkData) {
        try {
            const response = await fetch('js/data_local.js');
            if (response.ok) {
                const rawText = await response.text();
                const startIdx = rawText.indexOf('[');
                const endIdx = rawText.lastIndexOf(']');
                if (startIdx !== -1 && endIdx !== -1) {
                    bulkData = JSON.parse(rawText.substring(startIdx, endIdx + 1));
                }
            }
        } catch (e) {
            console.log("Không thể fetch trực tiếp js/data_local.js text");
        }
    }

    // Hướng 3: Thử fetch data.json (khi chạy qua Live Server hoặc up mạng)
    if (!bulkData) {
        try {
            const response = await fetch('data.json');
            if (response.ok) bulkData = await response.json();
        } catch (e) {}
    }

    // Tiến hành dò tìm trong mảng dữ liệu cấu trúc lồng hocSinh
    if (bulkData && Array.isArray(bulkData)) {
        return bulkData.find(item => {
            if (!item) return false;
            if (item.hocSinh && item.hocSinh.SoBaoDanhDuThi) {
                return String(item.hocSinh.SoBaoDanhDuThi).trim().toLowerCase() === targetSbd;
            }
            const backupSbd = item.SoBaoDanhDuThi || (item.hocSinh && (item.hocSinh.sbd || item.hocSinh.SBD));
            return String(backupSbd).trim().toLowerCase() === targetSbd;
        });
    }
    throw new Error("Không tìm thấy SBD");
}

// Xuất hàm ra phạm vi toàn cục để file khác gọi được
window.fetchStudentScore = fetchStudentScore;