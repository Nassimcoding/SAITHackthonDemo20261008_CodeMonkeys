// 利用切換 Bootstrap 的 d-none 類別來控制顯示/隱藏
function showView(viewId) {
    // 將所有標記為 detail-view 的區塊加上 d-none
    document.querySelectorAll('.detail-view').forEach(function(el) {
        el.classList.add('d-none');
    });
    // 把被選中的區塊移除 d-none 顯示出來
    document.getElementById(viewId).classList.remove('d-none');
}

// 當點擊好友清單時，更新資訊
function showFriendDetail(name, location, avatarUrl, about) {
    document.getElementById('detail-name').innerText = name;
    document.getElementById('detail-location').innerText = location;
    document.getElementById('detail-avatar').src = avatarUrl;
    document.getElementById('detail-about').innerText = about;
    
    showView('view-friend-detail');
}

// 模擬發送邀請
function sendInvite() {
    const email = document.getElementById('friendEmail').value;
    const statusDiv = document.getElementById('invite-status');
    
    if(email) {
        // 替換 class 顯示黃色警告框
        statusDiv.className = "mt-3 alert alert-warning d-block"; 
        statusDiv.innerText = `Invitation sent to ${email}. Status: Pending...`;
        document.getElementById('friendEmail').value = '';
    } else {
        // 顯示紅色錯誤框
        statusDiv.className = "mt-3 alert alert-danger d-block";
        statusDiv.innerText = "Please enter an email address.";
    }
}

function toggleOnlineList() {
    // 抓取你要控制的那個 div
    var list = document.getElementById("onlineList");
    
    // 判斷目前的顯示狀態並切換
    if (list.style.display === "none") {
        list.style.display = "block"; // 顯示出來
    } else {
        list.style.display = "none";  // 隱藏起來
    }
}

function toggleOfflineList() {
    // 抓取你要控制的那個 div
    var list = document.getElementById("offlineList");
    
    // 判斷目前的顯示狀態並切換
    if (list.style.display === "none") {
        list.style.display = "block"; // 顯示出來
    } else {
        list.style.display = "none";  // 隱藏起來
    }
}


