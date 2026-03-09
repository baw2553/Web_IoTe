// IoT.js

document.addEventListener("DOMContentLoaded", () => {
    console.log("IoT System and Information page loaded successfully.");

    // ตัวอย่าง: หากต้องการทำ Animation ตอนเลื่อนจอลงมาเจอแบนเนอร์
    const tuitionBanner = document.querySelector('.tuition-banner');
    
    // หากมีฟังก์ชันปุ่ม PDF ต้องการให้เด้งแจ้งเตือน หรือเปิดแท็บใหม่
    const pdfBtn = document.querySelector('.btn-pdf');
    if(pdfBtn) {
        pdfBtn.addEventListener('click', (e) => {
            // ถ้ายืนยันจะให้ลิงก์ไปหน้าอื่นจริงๆ ให้ลบ e.preventDefault() ออก
            // e.preventDefault(); 
            // alert("กำลังดาวน์โหลดไฟล์หลักสูตร (PDF)...");
        });
    }
});

// หาก Navbar Menu ของคุณต้องการฟังก์ชัน toggleMenu ที่หน้าย่อย
function toggleMenu(event, menuId) {
    event.preventDefault();
    const dropdowns = document.querySelectorAll(".dropdown-content");
    dropdowns.forEach(dropdown => {
        if (dropdown.id !== menuId) {
            dropdown.style.display = "none";
        }
    });
    
    const menu = document.getElementById(menuId);
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

// ปิด dropdown เมื่อคลิกที่อื่น
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        const dropdowns = document.querySelectorAll(".dropdown-content");
        dropdowns.forEach(dropdown => {
            if (dropdown.style.display === "block") {
                dropdown.style.display = "none";
            }
        });
    }
}