document.addEventListener("DOMContentLoaded", function() {
    // เลือกปุ่ม accordion ทั้งหมด
    const accordions = document.querySelectorAll(".accordion");

    accordions.forEach(acc => {
        acc.addEventListener("click", function() {
            // สลับคลาส active ให้ปุ่มที่คลิก
            this.classList.toggle("active");
            
            // หาข้อมูล (panel) ที่อยู่ต่อจากปุ่ม
            const panel = this.nextElementSibling;
            
            if (panel.style.maxHeight) {
                // ถ้าเปิดอยู่ ให้ปิด
                panel.style.maxHeight = null;
                panel.classList.remove("active-panel");
            } else {
                // ถ้าปิดอยู่ ให้เปิด
                panel.style.maxHeight = panel.scrollHeight + "px";
                panel.classList.add("active-panel");
            }
        });
    });
});