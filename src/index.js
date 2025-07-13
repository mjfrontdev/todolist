import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./ThemeContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}

// PWA Install Prompt
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('beforeinstallprompt event fired');
  e.preventDefault();
  deferredPrompt = e;
  window.dispatchEvent(new Event('pwa-install-available'));
});

function showInstallPopup() {
  // اگر قبلاً نصب شده باشد، پاپ‌آپ نمایش داده نشود
  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('App is already installed');
    return;
  }

  // Detect browser and device
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isChrome = /Chrome/i.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  const isEdge = /Edg/i.test(navigator.userAgent);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  // فقط یک پاپ‌آپ مناسب نمایش بده
  if ((isChrome || isEdge) && deferredPrompt) {
    // Show custom popup for Chrome/Edge
    const popup = document.createElement('div');
    popup.innerHTML = `
      <div style="position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#6366f1;color:#fff;padding:1.2rem 2rem;border-radius:1.5rem;box-shadow:0 8px 32px rgba(99,102,241,0.18);z-index:9999;display:flex;align-items:center;gap:1rem;font-family:Vazirmatn,sans-serif;direction:rtl;">
        <span>برای نصب اپلیکیشن روی دستگاه خود اینجا کلیک کنید</span>
        <button id="pwa-install-btn" style="background:#fff;color:#6366f1;padding:0.5rem 1.2rem;border-radius:1rem;font-weight:bold;border:none;cursor:pointer;">نصب</button>
        <button id="pwa-close-btn" style="background:transparent;color:#fff;font-size:1.5rem;border:none;cursor:pointer;">&times;</button>
      </div>
    `;
    document.body.appendChild(popup);
    document.getElementById('pwa-install-btn').onclick = async () => {
      popup.remove();
      deferredPrompt.prompt();
      deferredPrompt = null;
    };
    document.getElementById('pwa-close-btn').onclick = () => popup.remove();
  } else if (isSafari && isMobile) {
    // Show instructions for Safari iOS
    const popup = document.createElement('div');
    popup.innerHTML = `
      <div style="position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#6366f1;color:#fff;padding:1.2rem 2rem;border-radius:1.5rem;box-shadow:0 8px 32px rgba(99,102,241,0.18);z-index:9999;display:flex;align-items:center;gap:1rem;font-family:Vazirmatn,sans-serif;direction:rtl;">
        <span>برای نصب اپلیکیشن، از منوی Safari گزینه <b>Add to Home Screen</b> را انتخاب کنید.</span>
        <button id="pwa-close-btn" style="background:transparent;color:#fff;font-size:1.5rem;border:none;cursor:pointer;">&times;</button>
      </div>
    `;
    document.body.appendChild(popup);
    document.getElementById('pwa-close-btn').onclick = () => popup.remove();
  }
}

window.addEventListener('pwa-install-available', showInstallPopup);
