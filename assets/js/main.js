// ARSI BUILD STUDIO — main.js
(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (toggle && navLinks) {
    toggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("is-open");
      document.body.classList.toggle("nav-open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        document.body.classList.remove("nav-open");
      });
    });
  }

  // Auto year in footer
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Contact form -> (opsional) simpan ke Supabase, lalu buka WhatsApp
  var waPhone = "6282211226123"; // +62-822-1122-6123
  var form = document.querySelector("#contact-form");

  // Supabase hanya diaktifkan kalau supabase-config.js sudah diisi kredensial asli
  var supabaseClient = null;
  var cfg = window.SUPABASE_CONFIG;
  if (cfg && cfg.url && cfg.anonKey &&
      cfg.url.indexOf("PASTE_") === -1 && cfg.anonKey.indexOf("PASTE_") === -1 &&
      window.supabase && typeof window.supabase.createClient === "function") {
    supabaseClient = window.supabase.createClient(cfg.url, cfg.anonKey);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Honeypot: kalau kolom tersembunyi ini terisi, hampir pasti bot -> abaikan diam-diam
      var honeypot = form.querySelector("#company");
      if (honeypot && honeypot.value.trim() !== "") {
        return;
      }

      var name = form.querySelector("#name").value.trim();
      var need = form.querySelector("#need").value.trim();
      var message = form.querySelector("#message").value.trim();
      var statusEl = document.querySelector("#form-status");

      function openWhatsApp() {
        var text =
          "Halo Arsi Build Studio, saya " + (name || "-") +
          ". Kebutuhan: " + (need || "-") +
          ". Pesan: " + (message || "-");
        var url = "https://wa.me/" + waPhone + "?text=" + encodeURIComponent(text);
        window.open(url, "_blank", "noopener");
      }

      if (!supabaseClient) {
        // Belum dikonfigurasi -> perilaku lama, langsung WhatsApp
        openWhatsApp();
        return;
      }

      if (statusEl) { statusEl.textContent = "Mengirim..."; }

      supabaseClient
        .from("leads")
        .insert([{ name: name, need: need, message: message }])
        .then(function (res) {
          if (res.error) {
            console.error("Supabase insert error:", res.error);
            if (statusEl) {
              statusEl.textContent = "Data belum tersimpan ke server (lihat console), tapi pesan tetap dikirim via WhatsApp.";
            }
          } else if (statusEl) {
            statusEl.textContent = "Tersimpan. Membuka WhatsApp...";
          }
          openWhatsApp();
        })
        .catch(function (err) {
          console.error("Supabase insert exception:", err);
          openWhatsApp();
        });
    });
  }
})();
