(function() {
    if (window.__simpleUpdateShown) return;
    window.__simpleUpdateShown = true;

    var overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0, 0, 0, 0.7)';
    overlay.style.zIndex = '999999';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';

    var modal = document.createElement('div');
    modal.style.background = '#0f172a';
    modal.style.color = '#ffffff';
    modal.style.padding = '20px';
    modal.style.borderRadius = '10px';
    modal.style.maxWidth = '320px';
    modal.style.textAlign = 'center';
    modal.style.fontFamily = 'Arial, sans-serif';
    modal.style.border = '2px solid #22c55e';

    var title = document.createElement('div');
    title.textContent = 'Update Available';
    title.style.fontSize = '18px';
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '8px';

    var message = document.createElement('div');
    message.textContent = 'A small patch is ready. Please update to continue.';
    message.style.fontSize = '14px';
    message.style.marginBottom = '16px';

    var button = document.createElement('button');
    button.textContent = 'OK';
    button.style.background = '#22c55e';
    button.style.color = '#0b0f1a';
    button.style.border = 'none';
    button.style.padding = '10px 16px';
    button.style.fontWeight = 'bold';
    button.style.borderRadius = '6px';
    button.style.cursor = 'pointer';

    button.addEventListener('click', function() {
        overlay.remove();
    });

    modal.appendChild(title);
    modal.appendChild(message);
    modal.appendChild(button);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
})();
