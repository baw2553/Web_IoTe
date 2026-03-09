// Dual.js

document.addEventListener("DOMContentLoaded", () => {
    console.log("Dual Degree page loaded successfully.");

    // แจ้งเตือนเมื่อกดปุ่มโหลด PDF (เผื่อไว้ทดสอบ)
    const pdfBtns = document.querySelectorAll('.btn-pdf');
    pdfBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // e.preventDefault();
            // alert("กำลังเตรียมไฟล์ PDF...");
        });
    });
});

// ฟังก์ชันเปิด/ปิดเมนู Dropdown ใน Navbar
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

// ปิด dropdown เมื่อคลิกที่พื้นที่อื่นของจอ
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