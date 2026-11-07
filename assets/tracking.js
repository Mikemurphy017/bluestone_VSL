/*
 * Shared tracking for every page: Meta Pixel + LinkedIn Insight Tag.
 * Set your IDs here once; every page that includes this file picks them up.
 */
window.TRACKING_CONFIG = {
  // Meta (Facebook) Pixel ID, e.g. "123456789012345" (leave empty to disable)
  metaPixelId: "",
  // LinkedIn Insight Tag partner ID
  linkedinPartnerId: "8810122",
  // LinkedIn conversion fired on the Thank You page (booked call)
  linkedinBookedCallConversionId: 31854146,
  // StealthID visitor pixel ID (leave empty to disable)
  stealthIdPixelId: "91365404"
};

/* ---------- Meta Pixel ---------- */
(function (cfg) {
  if (!cfg.metaPixelId) return;
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', cfg.metaPixelId);
  fbq('track', 'PageView');
})(window.TRACKING_CONFIG);

/* ---------- LinkedIn Insight Tag ---------- */
(function (cfg) {
  if (!cfg.linkedinPartnerId) return;
  window._linkedin_partner_id = cfg.linkedinPartnerId;
  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
  window._linkedin_data_partner_ids.push(cfg.linkedinPartnerId);
  (function (l) {
    if (!l) {
      window.lintrk = function (a, b) { window.lintrk.q.push([a, b]); };
      window.lintrk.q = [];
    }
    var s = document.getElementsByTagName("script")[0];
    var b = document.createElement("script");
    b.type = "text/javascript"; b.async = true;
    b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
    s.parentNode.insertBefore(b, s);
  })(window.lintrk);
})(window.TRACKING_CONFIG);

/* ---------- StealthID pixel ---------- */
(function (cfg) {
  if (!cfg.stealthIdPixelId) return;
  window.pxfired = function () {
    if (typeof window.PxGrabber === "undefined") return; // blocked or failed to load
    PxGrabber.setOptions({ Label: cfg.stealthIdPixelId + "|" + window.location.href });
    PxGrabber.render();
  };
  (function (doc, tag, id) {
    if (doc.getElementById(id)) return;
    var js = doc.createElement(tag);
    js.id = id;
    js.src = "https://app.getstealthid.com/px.min.js";
    js.type = "text/javascript";
    js.onload = function () { window.pxfired(); };
    doc.head.appendChild(js);
  })(document, "script", "px-grabber");
})(window.TRACKING_CONFIG);
