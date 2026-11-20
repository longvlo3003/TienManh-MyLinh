
/* ============================================
   THIỆP CƯỚI TIẾN MẠNH & MỸ LINH
   JAVASCRIPT HOÀN CHỈNH
============================================ */

document.addEventListener("DOMContentLoaded", function () {

  "use strict";

  /* ====================================
     PHẦN A - THÔNG TIN THIỆP CƯỚI
     SAU NÀY CÓ THỂ THAY ĐỔI TẠI ĐÂY
  ==================================== */

  const config = {

    // CÔ DÂU VÀ CHÚ RỂ
    groom: "Tiến Mạnh",
    bride: "Mỹ Linh",

    // THÔNG TIN GIA ĐÌNH
    groomParents: "Ông Bà Hồng Thơi",
    brideParents: "Ông Bà Duẩn Chiên",

    groomAddress:
      "Hùng Cường (Đoan Khê cũ), xã Lạc Đạo, Hưng Yên",

    brideAddress:
      "Ngọc Trai (Trai Túc cũ), xã Như Quỳnh, Hưng Yên",

    // THỜI GIAN
    partyDate: "2026-11-28T16:30:00+07:00",
    ceremonyDate: "2026-11-29T01:00:00+07:00",

    // ĐỊA ĐIỂM
    venue:
      "Hùng Cường (Đoan Khê cũ), xã Lạc Đạo, tỉnh Hưng Yên",

    mapLocation:
      "Hùng Cường, xã Lạc Đạo, Hưng Yên, Việt Nam",

    // ẢNH BÌA
    coverPhoto: "./assets/images/anh-01.jpg",

    // ẢNH CHÍNH
    heroPhoto: "./assets/images/anh-09.jpg",

    // NHẠC NỀN
    musicFile: "./assets/audio/nhac-nen.mp3",
    musicVolume: 0.4,

    // MỘT MÃ QR
    qrFile: "./assets/qr/qr-chu-re.jpg",
    qrRecipient: "Chú Rể",

    bank: "Vietcombank",
    account: "338158882",
    owner: "HOANG TIEN MANH",

    // FORM XÁC NHẬN THAM DỰ
    rsvpForm: "",

    // SỐ CÁNH HOA
    petalsDesktop: 28,
    petalsMobile: 18

  };


  /* ====================================
     PHẦN B - HÀM CHUNG
  ==================================== */

  const $ = id => document.getElementById(id);

  function setText(id, value) {
    const element = $(id);

    if (element) {
      element.textContent = value;
    }
  }

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function safely(name, action) {
    try {
      action();
    } catch (error) {
      console.error("Lỗi " + name + ":", error);
    }
  }


  /* ====================================
     1. CHỨC NĂNG MỞ THIỆP
  ==================================== */

  const cover = $("cover");
  const site = $("site");
  const openBtn = $("openBtn");

  const music = $("music");
  const musicBtn = $("musicBtn");

  let petalsStarted = false;
  let revealsStarted = false;

  function openInvitation() {

    // Ẩn ảnh bìa, hiện nội dung
    cover.hidden = true;
    site.hidden = false;

    // Cuộn lên đầu trang
    window.scrollTo(0, 0);

    // Hiện điều khiển nhạc
    musicBtn.hidden = false;

    // Phát nhạc sau khi khách nhấn nút
    music.play().catch(function () {
      musicBtn.textContent = "♫ Bật nhạc";
    });

    // Bật cánh hoa xanh
    safely("cánh hoa", startPetals);

    // Bật hiệu ứng chữ và ảnh khi cuộn
    requestAnimationFrame(function () {
      safely("hiệu ứng cuộn", startReveals);
    });
  }

  // Nút mở thiệp được gắn đầu tiên
  openBtn.addEventListener("click", openInvitation);


  /* ====================================
     2. HIỂN THỊ TÊN VÀ GIA ĐÌNH
  ==================================== */

  safely("thông tin gia đình", function () {

    const couple = config.groom + " & " + config.bride;

    setText("coverNames", couple);
    setText("heroNames", couple);
    setText("footerNames", couple);

    setText("groomName", config.groom);
    setText("brideName", config.bride);

    setText("groomParents", config.groomParents);
    setText("brideParents", config.brideParents);

    setText("groomAddress", config.groomAddress);
    setText("brideAddress", config.brideAddress);

    setText("venueText", config.venue);
    setText("eventLocation", config.venue);

    document.title = "Thiệp cưới " + couple;

  });


  /* ====================================
     3. NGÀY GIỜ CƯỚI
  ==================================== */

  function formatDate(value) {

    return new Intl.DateTimeFormat("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }).format(new Date(value));

  }

  function shortDate(value) {

    return new Intl.DateTimeFormat("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(new Date(value));

  }

  safely("ngày cưới", function () {

    setText("partyTime", formatDate(config.partyDate));

    setText(
      "ceremonyTime",
      formatDate(config.ceremonyDate)
    );

    setText("coverDate", shortDate(config.partyDate));
    setText("heroDate", shortDate(config.partyDate));
    setText("footerDate", shortDate(config.partyDate));

  });


  /* ====================================
     4. ẢNH BÌA VÀ ẢNH CHÍNH
  ==================================== */

  safely("hình ảnh", function () {

    $("coverPhoto").src = config.coverPhoto;
    $("heroPhoto").src = config.heroPhoto;

  });


  /* ====================================
     5. ALBUM ẢNH CƯỚI
  ==================================== */

  safely("album ảnh", function () {

    const gallery = $("gallery");
    const dialog = $("photoDialog");
    const largePhoto = $("largePhoto");

    // Người xem bấm ảnh bất kỳ
    gallery.addEventListener("click", function (event) {

      const button = event.target.closest(".photoTile");

      if (!button) {
        return;
      }

      const image = button.querySelector("img");

      largePhoto.src = image.src;
      largePhoto.alt = image.alt;

      dialog.showModal();

    });

    // Đóng ảnh
    $("closePhoto").addEventListener(
      "click",
      function () {
        dialog.close();
      }
    );

  });


  /* ====================================
     6. GOOGLE MAPS
  ==================================== */

  safely("bản đồ", function () {

    const location =
      encodeURIComponent(config.mapLocation);

    $("mapFrame").src =
      "https://maps.google.com/maps?q=" +
      location +
      "&z=16&output=embed";

    $("mapLink").href =
      "https://www.google.com/maps/dir/?api=1&destination=" +
      location;

  });


  /* ====================================
     7. GOOGLE CALENDAR
  ==================================== */

  safely("lịch cưới", function () {

    const start = new Date(config.partyDate);

    const end = new Date(
      start.getTime() + 90 * 60 * 1000
    );

    function googleDate(date) {

      return date.toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}Z$/, "Z");

    }

    const params = new URLSearchParams({

      action: "TEMPLATE",

      text:
        "Tiệc báo hỷ " +
        config.groom +
        " & " +
        config.bride,

      dates:
        googleDate(start) +
        "/" +
        googleDate(end),

      details:
        "Trân trọng kính mời tham dự tiệc báo hỷ",

      location: config.venue

    });

    $("calendarLink").href =
      "https://calendar.google.com/calendar/render?" +
      params.toString();

  });


  /* ====================================
     8. ĐỒNG HỒ ĐẾM NGƯỢC
  ==================================== */

  safely("đếm ngược", function () {

    const weddingTime =
      new Date(config.partyDate).getTime();

    const container = $("countdown");

    function updateCountdown() {

      const remaining = weddingTime - Date.now();

      if (remaining <= 0) {

        container.textContent =
          "Ngày vui đã đến! ♡";

        return;
      }

      const days = Math.floor(
        remaining / 86400000
      );

      const hours = Math.floor(
        (remaining / 3600000) % 24
      );

      const minutes = Math.floor(
        (remaining / 60000) % 60
      );

      const seconds = Math.floor(
        (remaining / 1000) % 60
      );

      const values = [
        [days, "Ngày"],
        [hours, "Giờ"],
        [minutes, "Phút"],
        [seconds, "Giây"]
      ];

      container.replaceChildren();

      values.forEach(function (item) {

        const box = document.createElement("div");
        box.className = "countBox";

        const number = document.createElement("strong");
        number.textContent =
          String(item[0]).padStart(2, "0");

        const label = document.createElement("span");
        label.textContent = item[1];

        box.appendChild(number);
        box.appendChild(label);

        container.appendChild(box);

      });

    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

  });


  /* ====================================
     9. NHẠC CƯỚI
  ==================================== */

  safely("nhạc cưới", function () {

    music.src = config.musicFile;
    music.volume = config.musicVolume;

    function updateMusicButton() {

      musicBtn.textContent = music.paused
        ? "♫ Bật nhạc"
        : "♫ Tắt nhạc";

    }

    music.addEventListener("play", updateMusicButton);
    music.addEventListener("pause", updateMusicButton);

    musicBtn.addEventListener("click", function () {

      if (music.paused) {

        music.play().catch(function () {
          musicBtn.textContent = "♫ Bật nhạc";
        });

      } else {

        music.pause();

      }

    });

  });


  /* ====================================
     10. MỘT MÃ QR CHUYỂN KHOẢN
  ==================================== */

  safely("mã QR", function () {

    $("qrPhoto").src = config.qrFile;

    $("saveQR").href = config.qrFile;

    setText("giftRecipient", config.qrRecipient);
    setText("bankName", config.bank);
    setText("accountNumber", config.account);
    setText("accountOwner", config.owner);

  });


  /* ====================================
     11. HỘP QUÀ CÓ CHUYỂN ĐỘNG
  ==================================== */

  safely("hộp quà", function () {

    const button = $("giftOpenBtn");
    const dialog = $("giftDialog");

    let opening = false;

    button.addEventListener("click", function () {

      if (opening || dialog.open) {
        return;
      }

      opening = true;

      // Mở nắp hộp quà
      button.classList.add("opening");

      setTimeout(function () {

        button.classList.remove("opening");

        dialog.showModal();

        opening = false;

      }, 360);

    });

    // Nút X đóng cửa sổ
    $("giftCloseBtn").addEventListener(
      "click",
      function () {
        dialog.close();
      }
    );

    // Nhấp bên ngoài popup để đóng
    dialog.addEventListener("click", function (event) {

      const box = dialog.getBoundingClientRect();

      const outside =
        event.clientX < box.left ||
        event.clientX > box.right ||
        event.clientY < box.top ||
        event.clientY > box.bottom;

      if (outside) {
        dialog.close();
      }

    });

  });


  /* ====================================
     12. XÁC NHẬN THAM DỰ
  ==================================== */

  safely("xác nhận tham dự", function () {

    if (config.rsvpForm.trim() !== "") {

      $("rsvpSection").hidden = false;
      $("rsvpLink").href = config.rsvpForm;

    }

  });


  /* ====================================
     13. CÁNH HOA XANH BAY NGẪU NHIÊN
  ==================================== */

  const petalLayer = $("petalLayer");

  const petalColors = [
    "#dce9df",
    "#d3e5d9",
    "#e5eee6",
    "#cbded2",
    "#e0ede3",
    "#d2e0d6"
  ];

  function startPetals() {

    if (petalsStarted) {
      return;
    }

    petalsStarted = true;

    petalLayer.hidden = false;

    const isMobile = window.innerWidth <= 600;

    const count = isMobile
      ? config.petalsMobile
      : config.petalsDesktop;

    for (let i = 0; i < count; i++) {

      const petal = document.createElement("span");

      petal.className = "petal";

      petalLayer.appendChild(petal);

      flyPetal(petal, true);

    }

    console.log("Đã bật cánh hoa xanh.");

  }


  /* Tạo một đường bay ngẫu nhiên cho mỗi cánh */

  function flyPetal(petal, firstTime) {

    if (!petal.isConnected) {
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    const size = random(11, 22);

    const opacity = random(0.35, 0.75);

    const duration = random(9000, 19000);

    const x1 = random(-45, 45);
    const x2 = x1 + random(-80, 80);
    const x3 = x2 + random(-90, 90);
    const x4 = x3 + random(-90, 90);

    const rotation = random(280, 650);

    // Vị trí và hình dáng mới
    petal.style.left = random(0, width) + "px";

    petal.style.width = size + "px";

    petal.style.height =
      size * random(1.2, 1.5) + "px";

    petal.style.backgroundColor =
      petalColors[
        Math.floor(Math.random() * petalColors.length)
      ];

    // Mỗi lần bay sẽ có đường đi khác nhau
    const animation = petal.animate(

      [
        {
          offset: 0,
          transform:
            "translate3d(0, -30px, 0) rotate(0deg)",
          opacity: 0
        },

        {
          offset: 0.22,
          transform:
            `translate3d(${x1}px, ${height * 0.22}px, 0) rotate(${rotation * 0.2}deg)`,
          opacity: opacity
        },

        {
          offset: 0.48,
          transform:
            `translate3d(${x2}px, ${height * 0.48}px, 0) rotate(${rotation * 0.45}deg)`,
          opacity: opacity
        },

        {
          offset: 0.74,
          transform:
            `translate3d(${x3}px, ${height * 0.74}px, 0) rotate(${rotation * 0.75}deg)`,
          opacity: opacity * 0.85
        },

        {
          offset: 1,
          transform:
            `translate3d(${x4}px, ${height + 100}px, 0) rotate(${rotation}deg)`,
          opacity: 0
        }
      ],

      {
        duration: duration,

        // Lần đầu rải khắp màn hình
        delay: firstTime
          ? -random(0, duration)
          : 0,

        easing: "linear",
        iterations: 1
      }

    );

    // Kết thúc sẽ tạo đường bay mới
    animation.onfinish = function () {

      if (petal.isConnected) {
        flyPetal(petal, false);
      }

    };

  }


  /* ====================================
     14. HIỆU ỨNG CHỮ VÀ ẢNH KHI CUỘN
  ==================================== */

  function startReveals() {

    if (revealsStarted) {
      return;
    }

    revealsStarted = true;

    // Nếu trình duyệt không hỗ trợ,
    // toàn bộ nội dung vẫn hiển thị.
    if (!("IntersectionObserver" in window)) {
      return;
    }

    // Những phần tử cần hiệu ứng
    const elements = Array.from(
      site.querySelectorAll(".reveal")
    ).filter(function (element) {

      // Bỏ qua phần đang ẩn, như RSVP chưa bật
      return !element.closest("[hidden]");

    });

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(

      function (entries) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add("shown");

            // Chỉ hiện một lần, không ẩn lại
            observer.unobserve(entry.target);

          }

        });

      },

      {
        threshold: 0.07,
        rootMargin: "0px 0px -20px 0px"
      }

    );

    // Chỉ bật hiệu ứng sau khi mở thiệp
    document.body.classList.add("revealOn");

    elements.forEach(function (element) {
      observer.observe(element);
    });

    console.log("Đã bật hiệu ứng chữ và ảnh.");

  }


  /* ====================================
     15. HOÀN TẤT
  ==================================== */

  console.log("Thiệp cưới đã tải thành công.");

});
