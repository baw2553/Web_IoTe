// cont.js

document.addEventListener("DOMContentLoaded", () => {
    console.log("Continuing Program page loaded successfully.");

    // แจ้งเตือนเมื่อกดปุ่มโหลด PDF
    const pdfBtn = document.querySelector('.btn-pdf');
    if(pdfBtn) {
        pdfBtn.addEventListener('click', (e) => {
            // เอา comment ออก หากต้องการป้องกันการลิงก์ไปหน้าอื่นชั่วคราว
            // e.preventDefault();
            // alert("กำลังเตรียมดาวน์โหลดไฟล์หลักสูตรต่อเนื่อง...");
        });
    }
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

// ปิด dropdown เมื่อคลิกที่พื้นที่อื่นของหน้าจอ
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