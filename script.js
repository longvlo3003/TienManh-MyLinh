
/* ====================================
   PHẦN A: CẤU HÌNH THIỆP CƯỚI
   SỬA THÔNG TIN Ở ĐÂY
==================================== */

const config = {

  // TÊN CÔ DÂU VÀ CHÚ RỂ
  groom: "Tiến Mạnh",
  bride: "Mỹ Linh",

  // THÔNG TIN GIA ĐÌNH
  groomParents: "Ông Bà Hồng Thơi",
  brideParents: "Ông Bà Duẩn Chiên",

  groomAddress:
    "Hùng Cường (Đoan Khê cũ), xã Lạc Đạo, Hưng Yên",

  brideAddress:
    "Ngọc Trai (Trai Túc cũ), xã Như Quỳnh, Hưng Yên",

  // THỜI GIAN TỔ CHỨC
  // Định dạng: NĂM-THÁNG-NGÀY T GIỜ:PHÚT:GIÂY +07:00
  partyDate: "2026-11-28T16:30:00+07:00",

  ceremonyDate: "2026-11-29T01:00:00+07:00",

  // ĐỊA ĐIỂM
  venue:
    "Hùng Cường (Đoan Khê cũ), xã Lạc Đạo, tỉnh Hưng Yên",

  // Tìm theo địa chỉ. Nên thay bằng tọa độ chính xác.
  mapLocation:
    "Hùng Cường, xã Lạc Đạo, Hưng Yên, Việt Nam",

  // ẢNH BÌA
  cover:
    "./assets/images/anh-01.jpg",

  // ẢNH CHÍNH SAU KHI MỞ THIỆP
  hero:
    "./assets/images/anh-09.jpg",

  // ALBUM 10 ẢNH
  photos: [
    "./assets/images/anh-01.jpg",
    "./assets/images/anh-02.jpg",
    "./assets/images/anh-03.jpg",
    "./assets/images/anh-04.jpg",
    "./assets/images/anh-05.jpg",
    "./assets/images/anh-06.jpg",
    "./assets/images/anh-07.jpg",
    "./assets/images/anh-08.jpg",
    "./assets/images/anh-09.jpg",
    "./assets/images/anh-10.jpg"
  ],

  // NHẠC NỀN
  music:
    "./assets/audio/nhac-nen.mp3",

  // ÂM LƯỢNG: 0 = tắt, 1 = tối đa
  musicVolume: 0.4,

  // MÃ QR
  qr:
    "./assets/qr/qr-chu-re.jpg",

  // NGÂN HÀNG
  bank: "Vietcombank",
  accountNumber: "338158882",
  accountOwner: "HOANG TIEN MANH",

  // LINK GOOGLE FORM (ĐỂ TRỐNG NẾU CHƯA CÓ)
  rsvpForm: ""

};


/* ====================================
   PHẦN B: CHỨC NĂNG WEBSITE
   KHÔNG CẦN SỬA PHẦN NÀY
==================================== */

// Hàm tìm thành phần trong HTML
const $ = id => document.getElementById(id);

// Hàm điền chữ vào HTML
function setText(id, value) {
  $(id).textContent = value;
}


// 1. HIỂN THỊ TÊN VÀ GIA ĐÌNH

const names =
  config.groom + " & " + config.bride;

setText("coverNames", names);
setText("heroNames", names);
setText("footerNames", names);

setText("groomName", config.groom);
setText("brideName", config.bride);

setText("groomParents", config.groomParents);
setText("brideParents", config.brideParents);

setText("groomAddress", config.groomAddress);
setText("brideAddress", config.brideAddress);

setText("venueText", config.venue);
setText("eventLocation", config.venue);

document.title = "Thiệp cưới " + names;


// 2. HIỂN THỊ NGÀY CƯỚI

function formatDate(dateString) {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

setText("partyTime", formatDate(config.partyDate));
setText("ceremonyTime", formatDate(config.ceremonyDate));


// 3. ẢNH BÌA VÀ ẢNH CHÍNH

$("coverPhoto").src = config.cover;
$("heroPhoto").src = config.hero;


// 4. TẠO ALBUM ẢNH CƯỚI

const gallery = $("gallery");
const photoDialog = $("photoDialog");

config.photos.forEach((photo, index) => {

  const button = document.createElement("button");
  button.type = "button";

  const img = document.createElement("img");
  img.src = photo;
  img.alt = "Ảnh cưới số " + (index + 1);
  img.loading = "lazy";

  button.appendChild(img);

  button.addEventListener("click", () => {
    $("largePhoto").src = photo;
    photoDialog.showModal();
  });

  gallery.appendChild(button);
});

// Đóng ảnh phóng to
$("closePhoto").addEventListener("click", () => {
  photoDialog.close();
});


// 5. GOOGLE MAPS

const mapQuery =
  encodeURIComponent(config.mapLocation);

$("mapFrame").src =
  "https://maps.google.com/maps?q=" +
  mapQuery + "&z=16&output=embed";

$("mapLink").href =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  mapQuery;


// 6. QUÀ MỪNG VÀ QR

$("qrPhoto").src = config.qr;
$("qrDownload").href = config.qr;

setText("bankName", config.bank);
setText("accountNumber", config.accountNumber);
setText("accountOwner", config.accountOwner);


// 7. ĐỒNG HỒ ĐẾM NGƯỢC

const weddingTimestamp =
  new Date(config.partyDate).getTime();

function updateCountdown() {

  const remaining =
    weddingTimestamp - Date.now();

  if (remaining <= 0) {
    $("countdown").textContent =
      "Ngày vui đã đến!";
    return;
  }

  const day = Math.floor(remaining / 86400000);
  const hour = Math.floor((remaining / 3600000) % 24);
  const minute = Math.floor((remaining / 60000) % 60);
  const second = Math.floor((remaining / 1000) % 60);

  const values = [
    [day, "Ngày"],
    [hour, "Giờ"],
    [minute, "Phút"],
    [second, "Giây"]
  ];

  const container = $("countdown");
  container.replaceChildren();

  values.forEach(([value, label]) => {

    const box = document.createElement("div");
    box.className = "countBox";

    const number = document.createElement("strong");
    number.textContent =
      String(value).padStart(2, "0");

    const text = document.createElement("span");
    text.textContent = label;

    box.appendChild(number);
    box.appendChild(text);
    container.appendChild(box);

  });
}

updateCountdown();
setInterval(updateCountdown, 1000);


// 8. THÊM SỰ KIỆN VÀO GOOGLE CALENDAR

const start = new Date(config.partyDate);

// Thời lượng dự kiến 90 phút cho lịch
const end = new Date(
  start.getTime() + 90 * 60 * 1000
);

function googleDate(date) {
  return date.toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

const calendarData = new URLSearchParams({
  action: "TEMPLATE",
  text: "Tiệc báo hỷ " + names,
  dates: googleDate(start) + "/" + googleDate(end),
  details: "Trân trọng kính mời tham dự tiệc báo hỷ",
  location: config.venue
});

$("calendarLink").href =
  "https://calendar.google.com/calendar/render?" +
  calendarData.toString();


// 9. XÁC NHẬN THAM DỰ QUA GOOGLE FORM

if (config.rsvpForm.trim() !== "") {
  $("rsvpSection").hidden = false;
  $("rsvpLink").href = config.rsvpForm;
}


// 10. PHÁT NHẠC NỀN

const music = $("music");
const musicBtn = $("musicBtn");

music.src = config.music;
music.volume = config.musicVolume;

// Hiển thị trạng thái nút nhạc
function updateMusicButton() {

  if (music.paused) {
    musicBtn.textContent = "♫ Bật nhạc";
  } else {
    musicBtn.textContent = "♫ Tắt nhạc";
  }

}

music.addEventListener("play", updateMusicButton);
music.addEventListener("pause", updateMusicButton);

musicBtn.addEventListener("click", () => {

  if (music.paused) {
    music.play().catch(() => {
      musicBtn.textContent = "♫ Bật nhạc";
    });
  } else {
    music.pause();
  }

});


// 11. MỞ THIỆP CƯỚI

$("openBtn").addEventListener("click", () => {

  // Ẩn màn hình đầu
  $("cover").hidden = true;

  // Hiện nội dung thiệp
  $("main").hidden = false;

  // Hiện nút nhạc
  musicBtn.hidden = false;

  // Đưa màn hình về đầu trang
  window.scrollTo(0, 0);

  // Thử phát nhạc
  music.play().catch(() => {
    musicBtn.textContent = "♫ Bật nhạc";
  });

});
