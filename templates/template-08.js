// Template 08: Midnight Blueprint
function renderCard(data) {
    const logoSrc = data.logo || 'assets/default-logos/logo-08.svg';
    const name = data.fullName || 'Alexandra Chen';
    const title = data.jobTitle || 'Creative Director';
    const company = data.company || '';
    const phone = data.phone || '';
    const email = data.email || '';
    const website = data.website || '';
    const address = data.address || '';
    const linkedin = data.linkedin || '';
    const instagram = data.instagram || '';
    const tagline = data.tagline || '';

    return `
        <div class="card" style="
            width: 350px;
            height: 200px;
            background: #0d1b2a;
            color: #e8f4f8;
            font-family: 'Rajdhani', sans-serif;
            position: relative;
            display: flex;
            flex-direction: column;
            padding: 20px;
            box-sizing: border-box;
        ">
            <div style="border: 1px solid #e8f4f8; padding: 10px; margin-bottom: 10px;">
                <h2 style="
                    font-size: 26px;
                    font-weight: 500;
                    margin: 0;
                    letter-spacing: 0.1em;
                    color: #e8f4f8;
                ">${name}</h2>
                <p style="
                    font-size: 11px;
                    font-weight: 400;
                    margin: 5px 0 0 0;
                    text-transform: uppercase;
                    color: #ff6b35;
                ">${title}</p>
            </div>
            <div style="display: flex;">
                <div style="flex: 1;">
                    <div>
                        ${company ? `<p style="font-family: 'Share Tech Mono', monospace; font-size: 9px; color: rgba(232,244,248,0.7); margin: 2px 0;">COMPANY: ${company}</p>` : ''}
                        ${phone ? `<p style="font-family: 'Share Tech Mono', monospace; font-size: 9px; color: rgba(232,244,248,0.7); margin: 2px 0;">CONTACT: ${phone}</p>` : ''}
                        ${email ? `<p style="font-family: 'Share Tech Mono', monospace; font-size: 9px; color: rgba(232,244,248,0.7); margin: 2px 0;">EMAIL: ${email}</p>` : ''}
                        ${website ? `<p style="font-family: 'Share Tech Mono', monospace; font-size: 9px; color: rgba(232,244,248,0.7); margin: 2px 0;">WEB: ${website}</p>` : ''}
                        ${address ? `<p style="font-family: 'Share Tech Mono', monospace; font-size: 9px; color: rgba(232,244,248,0.7); margin: 2px 0;">ADDR: ${address}</p>` : ''}
                        ${linkedin ? `<p style="font-family: 'Share Tech Mono', monospace; font-size: 9px; color: rgba(232,244,248,0.7); margin: 2px 0;">LINKEDIN: ${linkedin}</p>` : ''}
                        ${instagram ? `<p style="font-family: 'Share Tech Mono', monospace; font-size: 9px; color: rgba(232,244,248,0.7); margin: 2px 0;">INSTA: ${instagram}</p>` : ''}
                        ${tagline ? `<p style="font-family: 'Share Tech Mono', monospace; font-size: 9px; color: rgba(232,244,248,0.7); margin: 2px 0;">TAG: ${tagline}</p>` : ''}
                    </div>
                </div>
                <div style="width: 80px; display: flex; align-items: center; justify-content: center;">
                    <img src="${logoSrc}" alt="Logo" style="width: 60px; height: 60px;">
                </div>
            </div>
            <!-- Grid lines -->
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(232,244,248,0.1) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(232,244,248,0.1) 20px); pointer-events: none;"></div>
        </div>
    `;
}

window.renderCard = renderCard;