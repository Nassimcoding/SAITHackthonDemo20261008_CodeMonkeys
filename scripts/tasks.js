// 1. 控制左側 Processing 選單縮放
window.toggleProcessingTasks = function() {
    var list = document.getElementById("processingTasksList");
    if (list.style.display === "none") {
        list.style.display = "block";
    } else {
        list.style.display = "none";
    }
};

// 2. 切換右側畫面的共用函數 (控制 d-none)
window.showView = function(viewId) {
    // 將所有標記為 detail-view 的區塊加上 d-none 隱藏
    document.querySelectorAll('.detail-view').forEach(function(el) {
        el.classList.add('d-none');
    });
    // 把被選中的區塊移除 d-none，讓它顯示出來
    document.getElementById(viewId).classList.remove('d-none');
};

// 3. 點擊左側任務時，把資料塞進右側並顯示
window.showTaskDetail = function(taskName, taskTime, priority) {
    // 塞入任務名稱與時間
    document.getElementById('detail-task-name').innerText = taskName;
    document.getElementById('detail-task-time').innerText = taskTime;
    
    // 塞入並設定優先級標籤
    var badge = document.getElementById('detail-priority');
    badge.innerText = priority;
    
    // 一個小巧思：如果是 High Priority 就變紅色，其他變藍色
    if (priority.includes('High')) {
        badge.className = 'badge bg-danger mb-3 px-3 py-2';
    } else if (priority.includes('Medium')) {
        badge.className = 'badge bg-warning text-dark mb-3 px-3 py-2';
    } else {
        badge.className = 'badge bg-primary mb-3 px-3 py-2';
    }

    // 塞入假資料描述 (你可以之後再透過參數傳進來)
    document.getElementById('detail-task-desc').innerText = 
        "You need to complete the task: [" + taskName + "] before the deadline. Make sure to double-check all the requirements.";

    // 呼叫 showView，把 view-task-detail 這個區塊顯示出來
    window.showView('view-task-detail');
};