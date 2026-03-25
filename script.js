// DOM elements
const inputTitle = document.querySelector(".input-film");
const inputDesc = document.querySelector(".text-box");
const btnSave = document.querySelector(".button-save");
const btnDeleteAll = document.querySelector(".button-delete");
const listContainer = document.querySelector(".list");
const countDisplay = document.getElementById("count");

// Khởi tạo danh sách phim từ localStorage
let movieList = JSON.parse(sessionStorage.getItem("movieList")) || [];

// Hàm format thời gian
function formatDate(date) {
  const pad = (n) => (n < 10 ? "0" + n : n);
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

// Hàm render danh sách phim
function renderList() {
  listContainer.innerHTML = "";

  // Cập nhật số lượng phim
  const count = movieList.length;
  countDisplay.innerHTML = `Danh sách của bạn (${count})`;

  movieList.forEach((movie, index) => {
    // Tạo phần tử chứa phim
    const div = document.createElement("div");
    div.classList.add("movie-item");
    div.style.cssText = `
      border: 1px solid #ddd; 
      border-radius: 8px; 
      padding: 12px; 
      margin-bottom: 10px; 
      position: relative;
      background-color: #fff;
    `;

    div.innerHTML = `
      <div style="font-weight: 600; font-size: 18px; display: flex; align-items: center; gap: 8px;">
        <span>🎥</span> <span>${movie.title}</span>
      </div>
      <div style="color: #555; margin-top: 6px;">${movie.desc}</div>
      <div style="color: #999; margin-top: 6px; font-size: 12px;">
        Lưu lúc: ${movie.time}
      </div>
      <button class="btn-delete-item" 
              style="position: absolute; top: 10px; right: 10px; 
                     background: #ff4d4f; border: none; border-radius: 50%; 
                     color: white; width: 24px; height: 24px; cursor: pointer;">
        ×
      </button>
    `;

    // Thêm sự kiện xóa từng item
    div.querySelector(".btn-delete-item").addEventListener("click", () => {
      movieList.splice(index, 1);
      saveAndRender();
    });

    listContainer.appendChild(div);
  });
}

// Lưu danh sách phim vào localStorage và render lại
function saveAndRender() {
  localStorage.setItem("movieList", JSON.stringify(movieList));
  renderList();
}

// Sự kiện nút Lưu phim
btnSave.addEventListener("click", () => {
  const title = inputTitle.value.trim();
  const desc = inputDesc.value.trim();

  if (!title) {
    alert("Vui lòng nhập tiêu đề phim!");
    inputTitle.focus();
    return;
  }

  if (!desc) {
    alert("Vui lòng nhập lý do / mô tả!");
    inputDesc.focus();
    return;
  }

  const now = new Date();
  movieList.push({
    title,
    desc,
    time: formatDate(now),
  });

  inputTitle.value = "";
  inputDesc.value = "";
  saveAndRender();
});

// Sự kiện nút Xóa tất cả
btnDeleteAll.addEventListener("click", () => {
  if (confirm("Bạn có chắc muốn xóa tất cả phim không?")) {
    movieList = [];
    saveAndRender();
  }
});

// Khởi tạo render khi mở trang
renderList();
