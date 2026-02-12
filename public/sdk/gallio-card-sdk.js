/**
 * Gallio Card SDK v1.0.0
 * Include this script in your custom card HTML to integrate with Gallio.
 *
 * Usage:
 *   <script src="https://gallio.app/sdk/gallio-card-sdk.js"></script>
 *   <script>
 *     Gallio.onInit(function(msg) {
 *       // msg.data    - field values from the editor
 *       // msg.style   - 'default' | 'compact' | 'detailed'
 *       // msg.theme   - 'light' | 'dark'
 *       // msg.containerWidth - column width in pixels
 *     });
 *   </script>
 */
(function() {
  'use strict';

  var callbacks = { init: [], styleChange: [] };
  var lastData = null;
  var observer = null;

  function postToParent(msg) {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(msg, '*');
    }
  }

  function measureAndReport() {
    var height = Math.ceil(document.documentElement.scrollHeight);
    postToParent({ type: 'gallio:height', height: height });
  }

  function setupAutoResize() {
    if (observer) return;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(function() {
        measureAndReport();
      });
      observer.observe(document.documentElement);
    } else {
      setInterval(measureAndReport, 500);
    }
  }

  window.addEventListener('message', function(event) {
    var msg = event.data;
    if (!msg || typeof msg.type !== 'string') return;

    if (msg.type === 'gallio:init') {
      lastData = msg;
      callbacks.init.forEach(function(cb) { cb(msg); });
      requestAnimationFrame(function() {
        requestAnimationFrame(measureAndReport);
      });
    }

    if (msg.type === 'gallio:style-change') {
      callbacks.styleChange.forEach(function(cb) { cb(msg); });
      requestAnimationFrame(function() {
        requestAnimationFrame(measureAndReport);
      });
    }
  });

  window.Gallio = {
    version: '1.0.0',
    onInit: function(cb) {
      callbacks.init.push(cb);
      if (lastData) cb(lastData);
    },
    onStyleChange: function(cb) {
      callbacks.styleChange.push(cb);
    },
    reportHeight: measureAndReport
  };

  // Send ready signal
  postToParent({ type: 'gallio:ready' });

  // Start auto-resize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupAutoResize);
  } else {
    setupAutoResize();
  }
})();
