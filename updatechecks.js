/**
 * Invite Friends Modal Update
 * Shows an attractive modal with app-specific share buttons
 * Only shows for returning users (not first open)
 * Supports: WhatsApp, Messenger, Facebook, Instagram, and generic share
 */
(function() {
    // Prevent duplicate execution
    if (window.__inviteFriendsShown) return;
    
    const PREMIUM_STORAGE_KEY = 'electionGame_premiumData';
    const INVITE_SHOWN_KEY = 'electionGame_inviteShown';
    
    // Share content
    const SHARE_MESSAGE = "Lastai funny cha yo game, neta haru banera khelna milni🤣, you also try";
    const APP_LINK = "https://play.google.com/store/apps/details?id=com.play.netagiri.strategy";
    const FULL_MESSAGE = SHARE_MESSAGE + "\n\n" + APP_LINK;
    
    // Check if this is a returning user (not first open)
    const premiumData = localStorage.getItem(PREMIUM_STORAGE_KEY);
    if (!premiumData) {
        // First time user - don't show invite modal
        console.log('[InviteFriends] First time user - skipping invite modal');
        return;
    }
    
    // Check if we've already shown this modal in this session
    const alreadyShownThisSession = sessionStorage.getItem(INVITE_SHOWN_KEY);
    if (alreadyShownThisSession) {
        console.log('[InviteFriends] Already shown this session - skipping');
        return;
    }
    
    // Mark as shown for this session
    sessionStorage.setItem(INVITE_SHOWN_KEY, 'true');
    window.__inviteFriendsShown = true;
    
    console.log('[InviteFriends] Returning user detected - showing invite modal');
    
    // Wait a bit for the game to initialize
    setTimeout(showInviteModal, 1500);
    
    // Helper function to open URL (tries app first, falls back to browser)
    function openUrl(url) {
        console.log('[InviteFriends] Opening URL:', url);
        window.open(url, '_system');
    }
    
    // Copy to clipboard helper
    async function copyToClipboard(text) {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                return true;
            }
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            return true;
        } catch (e) {
            console.error('[InviteFriends] Copy failed:', e);
            return false;
        }
    }
    
    // Share handlers for each app
    const shareHandlers = {
        whatsapp: function() {
            const encoded = encodeURIComponent(FULL_MESSAGE);
            // Try WhatsApp URL scheme first (works on mobile)
            openUrl('whatsapp://send?text=' + encoded);
        },
        
        messenger: function() {
            const encoded = encodeURIComponent(APP_LINK);
            // Messenger share link
            openUrl('fb-messenger://share/?link=' + encoded);
        },
        
        facebook: function() {
            const encodedUrl = encodeURIComponent(APP_LINK);
            const encodedQuote = encodeURIComponent(SHARE_MESSAGE);
            // Facebook sharer with quote
            openUrl('https://www.facebook.com/sharer/sharer.php?u=' + encodedUrl + '&quote=' + encodedQuote);
        },
        
        instagram: async function(overlay) {
            // Instagram doesn't support direct sharing - copy to clipboard and open app
            const copied = await copyToClipboard(FULL_MESSAGE);
            if (copied) {
                // Show brief toast notification
                showToast('Message copied! Paste it in Instagram 📋');
                // Try to open Instagram
                setTimeout(() => {
                    openUrl('instagram://');
                }, 800);
            }
        },
        
        other: async function() {
            // Use system share sheet via Capacitor
            try {
                if (window.shareManager && typeof window.shareManager.shareApp === 'function') {
                    await window.shareManager.shareApp();
                } else if (window.Capacitor?.Plugins?.Share) {
                    await window.Capacitor.Plugins.Share.share({ text: FULL_MESSAGE });
                } else {
                    // Web fallback - copy to clipboard
                    await copyToClipboard(FULL_MESSAGE);
                    showToast('Link copied to clipboard! 📋');
                }
            } catch (e) {
                console.error('[InviteFriends] Share error:', e);
            }
        }
    };
    
    // Toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: #22c55e;
            color: #0b0f1a;
            padding: 12px 24px;
            border-radius: 25px;
            font-family: 'Segoe UI', Arial, sans-serif;
            font-size: 14px;
            font-weight: bold;
            z-index: 9999999;
            animation: toastIn 0.3s ease, toastOut 0.3s ease 2s forwards;
            box-shadow: 0 4px 20px rgba(34, 197, 94, 0.4);
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2500);
    }
    
    function showInviteModal() {
        // Add animations and styles
        var style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes popIn {
                0% { transform: scale(0.8); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-8px); }
            }
            @keyframes toastIn {
                from { opacity: 0; transform: translateX(-50%) translateY(20px); }
                to { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
            @keyframes toastOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            .invite-app-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                border: none;
                padding: 12px 16px;
                font-size: 14px;
                font-weight: bold;
                border-radius: 12px;
                cursor: pointer;
                transition: transform 0.15s, box-shadow 0.15s, filter 0.15s;
                flex: 1;
                min-width: 0;
            }
            .invite-app-btn:active {
                transform: scale(0.95);
            }
            .invite-app-btn:hover {
                filter: brightness(1.1);
            }
            .invite-app-btn svg {
                width: 22px;
                height: 22px;
                flex-shrink: 0;
            }
        `;
        document.head.appendChild(style);
        
        // Create overlay
        var overlay = document.createElement('div');
        overlay.id = 'invite-friends-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;
        
        // Create modal
        var modal = document.createElement('div');
        modal.style.cssText = `
            background: linear-gradient(145deg, #1a1a2e 0%, #0f0f1a 100%);
            color: #ffffff;
            padding: 24px 20px;
            border-radius: 20px;
            max-width: 340px;
            width: 92%;
            text-align: center;
            font-family: 'Segoe UI', Arial, sans-serif;
            border: 3px solid #f59e0b;
            box-shadow: 0 0 40px rgba(245, 158, 11, 0.4), inset 0 0 60px rgba(245, 158, 11, 0.05);
            animation: popIn 0.4s ease;
        `;
        
        // Emoji icon
        var icon = document.createElement('div');
        icon.innerHTML = '🎮';
        icon.style.cssText = `
            font-size: 52px;
            margin-bottom: 8px;
            animation: bounce 1s ease infinite;
        `;
        
        // Title
        var title = document.createElement('div');
        title.textContent = 'Enjoying the Game?';
        title.style.cssText = `
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 6px;
            color: #f59e0b;
            text-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
        `;
        
        // Message
        var message = document.createElement('div');
        message.innerHTML = 'Invite your friends to play!<br><span style="font-size: 12px; color: #94a3b8;">Choose your favorite app to share 👇</span>';
        message.style.cssText = `
            font-size: 15px;
            margin-bottom: 18px;
            color: #e2e8f0;
            line-height: 1.4;
        `;
        
        // App buttons container - Row 1 (WhatsApp, Messenger)
        var row1 = document.createElement('div');
        row1.style.cssText = `
            display: flex;
            gap: 10px;
            margin-bottom: 10px;
        `;
        
        // WhatsApp button
        var whatsappBtn = document.createElement('button');
        whatsappBtn.className = 'invite-app-btn';
        whatsappBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
        `;
        whatsappBtn.style.background = '#25D366';
        whatsappBtn.style.color = 'white';
        whatsappBtn.addEventListener('click', function() {
            shareHandlers.whatsapp();
            overlay.remove();
        });
        
        // Messenger button
        var messengerBtn = document.createElement('button');
        messengerBtn.className = 'invite-app-btn';
        messengerBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="white">
                <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z"/>
            </svg>
            Messenger
        `;
        messengerBtn.style.background = 'linear-gradient(135deg, #00B2FF 0%, #006AFF 100%)';
        messengerBtn.style.color = 'white';
        messengerBtn.addEventListener('click', function() {
            shareHandlers.messenger();
            overlay.remove();
        });
        
        row1.appendChild(whatsappBtn);
        row1.appendChild(messengerBtn);
        
        // App buttons container - Row 2 (Facebook, Instagram)
        var row2 = document.createElement('div');
        row2.style.cssText = `
            display: flex;
            gap: 10px;
            margin-bottom: 10px;
        `;
        
        // Facebook button
        var facebookBtn = document.createElement('button');
        facebookBtn.className = 'invite-app-btn';
        facebookBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="white">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
        `;
        facebookBtn.style.background = '#1877F2';
        facebookBtn.style.color = 'white';
        facebookBtn.addEventListener('click', function() {
            shareHandlers.facebook();
            overlay.remove();
        });
        
        // Instagram button
        var instagramBtn = document.createElement('button');
        instagramBtn.className = 'invite-app-btn';
        instagramBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            Instagram
        `;
        instagramBtn.style.background = 'linear-gradient(135deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)';
        instagramBtn.style.color = 'white';
        instagramBtn.addEventListener('click', function() {
            shareHandlers.instagram(overlay);
            overlay.remove();
        });
        
        row2.appendChild(facebookBtn);
        row2.appendChild(instagramBtn);
        
        // Other/More button (full width)
        var otherBtn = document.createElement('button');
        otherBtn.className = 'invite-app-btn';
        otherBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
            </svg>
            More Options
        `;
        otherBtn.style.cssText += `
            background: linear-gradient(135deg, #64748b 0%, #475569 100%);
            color: white;
            width: 100%;
            margin-bottom: 12px;
        `;
        otherBtn.addEventListener('click', async function() {
            await shareHandlers.other();
            overlay.remove();
        });
        
        // Maybe Later button
        var laterBtn = document.createElement('button');
        laterBtn.textContent = 'Maybe Later';
        laterBtn.style.cssText = `
            background: transparent;
            color: #64748b;
            border: 1px solid #334155;
            padding: 10px 20px;
            font-size: 14px;
            border-radius: 8px;
            cursor: pointer;
            width: 100%;
            transition: background 0.2s, color 0.2s;
        `;
        
        laterBtn.addEventListener('click', function() {
            overlay.remove();
        });
        
        laterBtn.addEventListener('mouseover', function() {
            laterBtn.style.background = '#1e293b';
            laterBtn.style.color = '#94a3b8';
        });
        laterBtn.addEventListener('mouseout', function() {
            laterBtn.style.background = 'transparent';
            laterBtn.style.color = '#64748b';
        });
        
        // Assemble modal
        modal.appendChild(icon);
        modal.appendChild(title);
        modal.appendChild(message);
        modal.appendChild(row1);
        modal.appendChild(row2);
        modal.appendChild(otherBtn);
        modal.appendChild(laterBtn);
        overlay.appendChild(modal);
        
        // Add to page
        document.body.appendChild(overlay);
        
        console.log('[InviteFriends] Modal displayed with app-specific buttons');
    }
})();
