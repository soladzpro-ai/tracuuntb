/* ==========================================================================
   FILE XỬ LÝ API TRA CỨU ĐIỂM - PHƯƠNG ÁN 2 (FULL FILE)
   ========================================================================== */

const API_BASE_URL = "https://server-xe33.onrender.com";

// Gọi API bằng phương thức POST gửi dữ liệu JSON ngầm sang /api/search
async function fetchStudentScore(sbd) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sbd: sbd })
        });

        if (!response.ok) {
            throw new Error(`Lỗi server hoặc không tìm thấy SBD: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("❌ Lỗi API Phương án 2:", error);
        throw error;
    }
}

// Khung xử lý sự kiện hiển thị lên giao diện Chibi
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btnTraDiem') || document.querySelector('.btnSearch');
    const input = document.getElementById('sbdInput') || document.querySelector('.studentId');
    const statusBox = document.getElementById('statusMessage');
    const statusText = document.getElementById('statusText');
    const resultBox = document.getElementById('resultContainer');

    if (btn && input) {
        btn.addEventListener('click', async () => {
            const sbdValue = input.value.trim();
            if (!sbdValue) {
                alert("Cậu ơi, nhập Số Báo Danh vào đã nhé! 🐾");
                return;
            }

            if (statusBox && statusText) {
                statusText.innerText = "Đang xin dữ liệu từ máy chủ, cậu đợi xíu nha... ✨";
                statusBox.style.display = 'block';
            }
            if (resultBox) resultBox.style.display = 'none';

            try {
                const student = await fetchStudentScore(sbdValue);
                if (statusBox) statusBox.style.display = 'none';

                if (student) {
                    document.getElementById('resSBD').innerText = student.sbd || student.SBD || sbdValue;
                    document.getElementById('resName').innerText = student.hoTen || student.name || student.Ten || "Học Sinh";
                    document.getElementById('resToan').innerText = student.toan || student.Toan || "0";
                    document.getElementById('resVan').innerText = student.van || student.Van || "0";
                    document.getElementById('resAnh').innerText = student.anh || student.Anh || "0";
                    document.getElementById('resTD').innerText = student.tongDiem || student.td || student.TĐ || "0";

                    if (resultBox) resultBox.style.display = 'block';

                    if (typeof confetti === 'function') {
                        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                    }
                }
            } catch (err) {
                if (statusText) {
                    statusText.innerText = "⏰ Máy chủ phản hồi lỗi hoặc SBD chưa đúng. Cậu đợi xíu bấm lại nha! 🌸";
                }
                console.error(err);
            }
        });
    }
});

window.fetchStudentScore = fetchStudentScore;