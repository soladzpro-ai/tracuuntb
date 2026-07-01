document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btnTraDiem');
    const input = document.getElementById('sbdInput');
    const statusBox = document.getElementById('statusMessage');
    const statusText = document.getElementById('statusText');
    const resultBox = document.getElementById('resultContainer');
    const tableBody = document.getElementById('tableBodyScores');

    if (!btn || !input) return;

    btn.addEventListener('click', async () => {
        const sbdValue = input.value.trim();
        if (!sbdValue) {
            alert("Cậu nhập Số Báo Danh vào trước nhé! 🌸");
            return;
        }

        // Bật trạng thái loading
        statusText.innerHTML = "✨ Đang truy xuất bảng điểm, đợi tớ xíu nha...";
        statusBox.style.display = 'block';
        if (resultBox) resultBox.style.display = 'none';

        try {
            // Gọi hàm tìm kiếm từ file api.js
            const rawData = await window.fetchStudentScore(sbdValue);
            statusBox.style.display = 'none';

            const info = rawData.hocSinh;

            // Đổ dữ liệu vào Khối 2 (Thông tin thí sinh)
            document.getElementById('resSBD').innerText = info.SoBaoDanhDuThi || sbdValue;
            document.getElementById('resName').innerText = (info.HoVaTen || "Thí sinh").toUpperCase();
            
            const elemPhong = document.getElementById('resPhongThi') || document.getElementById('resPhogThi');
            if (elemPhong) elemPhong.innerText = info.PhongThi || "Phòng thi";

            // Đổ dữ liệu vào Khối 3 (Bảng điểm 5 cột)
            let tableHTML = "";
            if (info.ListKetQuaMonThi && Array.isArray(info.ListKetQuaMonThi)) {
                info.ListKetQuaMonThi.forEach(mon => {
                    const diemHienThi = (mon.DiemThi !== null && mon.DiemThi !== undefined) ? mon.DiemThi : "Chưa công bố";
                    tableHTML += `
                        <tr>
                            <td class="font-bold">${mon.TenMonHoc || "Môn thi"}</td>
                            <td>${mon.NgayThiText || "02/06/2026"}</td>
                            <td>${info.DiemThi || "THPT Nguyễn Thái Bình"}</td>
                            <td>${mon.GioThi || "--:--"}</td>
                            <td class="score-text">${diemHienThi}</td>
                        </tr>
                    `;
                });
            } else {
                tableHTML = `<tr><td colspan="5" style="text-align:center;">Không tìm thấy danh sách môn thi.</td></tr>`;
            }

            tableBody.innerHTML = tableHTML;
            
            // Gọi hiệu ứng hiển thị bồng bềnh từ animation.js trước khi hiện hộp kết quả
            if (window.triggerCardAnimation) window.triggerCardAnimation(resultBox);
            
            resultBox.style.display = 'block';

            // Kích hoạt pháo hoa từ thư viện (nếu có)
            if (typeof confetti === 'function') {
                confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
            }

            // Kích hoạt hiệu ứng bụi phấn từ particles.js ăn mừng bổ sung
            if (window.launchCelebrateParticles) window.launchCelebrateParticles();

        } catch (err) {
            statusText.innerHTML = "❌ Không tìm thấy số báo danh này rồi! Cậu kiểm tra lại xem gõ đúng chưa nha! 🌸";
            statusBox.style.display = 'block';
            if (resultBox) resultBox.style.display = 'none';
        }
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') btn.click();
    });
});