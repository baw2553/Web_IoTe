const params = new URLSearchParams(window.location.search);
const topicId = params.get('id');

let isAdmin = sessionStorage.getItem('isAdmin') === 'true';

let storedUser = localStorage.getItem('currentUser'); 

let currentUser = null; 
if (storedUser) {

    currentUser = isAdmin ? '👑 Admin(' + storedUser + ')' : storedUser;
}


const commentForm = document.getElementById('commentForm');
const authorInput = document.getElementById('cAuthor');

if (currentUser) {
    if (authorInput) {
        authorInput.value = currentUser; 
        authorInput.readOnly = true; 
        authorInput.style.backgroundColor = '#e9ecef'; 
        authorInput.style.color = '#555';
    }
} else {
    if (commentForm) {
        commentForm.innerHTML = `
            <div style="text-align: center; padding: 25px; background-color: #333; color: white; border-radius: 8px; margin-top: 20px; border: 1px solid #555;">
                <h4 style="margin-bottom: 10px; color: #f37b21;">🔒 คุณต้องเข้าสู่ระบบก่อน</h4>
                <p style="font-size: 14px; color: #ccc; margin-bottom: 15px;">กรุณาเข้าสู่ระบบที่หน้าหลักเพื่อร่วมแสดงความคิดเห็นในกระทู้นี้</p>
                <button type="button" onclick="window.location.href='../forum.html'" style="padding: 10px 20px; background: #f37b21; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
                    กลับไปหน้าหลักเพื่อเข้าสู่ระบบ
                </button>
            </div>
        `;
    }
}

function loadTopicDetail() {
    fetch(`../get_topic_detail.php?id=${topicId}`) 
    .then(res => res.json())
    .then(topic => {
        if(topic.error) {
            document.getElementById('topicContent').innerHTML = "<p>ไม่พบกระทู้</p>";
            return;
        }
        
        document.getElementById('topicContent').innerHTML = `
            <h1 style="color: #f37021;">${topic.title}</h1>
            <p style="color: #888; font-size: 0.9em;">โดย: <b style="color: #3094ff;">${topic.author}</b> | หมวดหมู่: ${topic.category} | วันที่: ${topic.date}</p>
            <p style="font-size: 1.1rem; margin-top: 20px; line-height: 1.6;">${topic.content || 'ไม่มีรายละเอียดเพิ่มเติม'}</p>
        `;

        const commentList = document.getElementById('commentList');
        commentList.innerHTML = '';
        
        if(topic.comments.length === 0) {
            commentList.innerHTML = "<p style='color:#888; text-align:center; padding: 20px 0;'>ยังไม่มีความคิดเห็น เป็นคนแรกที่คอมเมนต์สิ!</p>";
        } else {
            topic.comments.forEach(c => {
                let deleteBtnHTML = '';
                // แอดมินลบได้ทุกอัน หรือ เจ้าของคอมเมนต์ลบของตัวเองได้
                if (isAdmin || c.author === currentUser) {
                    deleteBtnHTML = `<button onclick="deleteComment(${c.id}, ${topicId})" style="float: right; background: #dc3545; padding: 3px 8px; border-radius: 4px; border: none; color: white; cursor: pointer; font-size: 12px;">🗑️ ลบ</button>`;
                }

                commentList.innerHTML += `
                    <div class="comment-box">
                        ${deleteBtnHTML}
                        <strong>${c.author}</strong> <span style="font-size: 0.8em; color: #888; margin-left: 10px;">🕒 ${c.date}</span>
                        <p style="margin: 10px 0 0 0; color: #333;">${c.message}</p>
                    </div>
                `;
            });
        }
    });
}

// ==========================================
// 3. ฟังก์ชันลบคอมเมนต์
// ==========================================
window.deleteComment = function(commentId, tId) {
    if(confirm('⚠️ แน่ใจหรือไม่ว่าต้องการลบคอมเมนต์นี้?')) {
        fetch('../delete_comment.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: commentId, topic_id: tId })
        })
        .then(res => res.json())
        .then(result => {
            if(result.status === 'success') {
                loadTopicDetail();
            }
        });
    }
};

// ==========================================
// 4. ส่งคอมเมนต์ใหม่ (ทำงานเฉพาะตอนล็อคอินแล้ว)
// ==========================================
if(commentForm && currentUser) {
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const commentData = {
            topic_id: topicId,
            author: currentUser, // ใช้ชื่อจากระบบล็อคอินเลย
            message: document.getElementById('cMessage').value
        };

        fetch('../save_comment.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(commentData)
        })
        .then(res => res.json())
        .then(result => {
            if(result.status === 'success') {
                document.getElementById('cMessage').value = ''; // ล้างกล่องข้อความ
                loadTopicDetail(); // โหลดคอมเมนต์มาแสดงใหม่
            }
        });
    });
}

// โหลดข้อมูลเมื่อเปิดหน้า
if(topicId) loadTopicDetail();