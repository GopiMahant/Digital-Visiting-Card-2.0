// Template 04: Neon Noir
function renderCard(data) {
    const logoSrc = data.logo || 'assets/default-logos/logo-04.svg';
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
            background: #080010;
            color: #ffffff;
            font-family: 'Space Grotesk', sans-serif;
            position: relative;
            display: flex;
            flex-direction: column;
            padding: 20px;
            box-sizing: border-box;
        ">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                    <h2 style="
                        font-size: 26px;
                        font-weight: 700;
                        margin: 0;
                        text-shadow: 0 0 20px #ff006e;
                        color: #ffffff;
                    ">${name}</h2>
                    <p style="
                        font-size: 10px;
                        font-weight: 400;
                        margin: 5px 0 0 0;
                        text-transform: uppercase;
                        color: #8338ec;
                    ">${title}</p>
                    <div style="margin-top: 10px;">
                        ${company ? `<p style="font-size: 9px; color: #7070aa; margin: 2px 0;">${company}</p>` : ''}
                        ${phone ? `<p style="font-size: 9px; color: #7070aa; margin: 2px 0;">${phone}</p>` : ''}
                        ${email ? `<p style="font-size: 9px; color: #7070aa; margin: 2px 0;">${email}</p>` : ''}
                        ${website ? `<p style="font-size: 9px; color: #7070aa; margin: 2px 0;">${website}</p>` : ''}
                        ${address ? `<p style="font-size: 9px; color: #7070aa; margin: 2px 0;">${address}</p>` : ''}
                        ${linkedin ? `<p style="font-size: 9px; color: #7070aa; margin: 2px 0;">${linkedin}</p>` : ''}
                        ${instagram ? `<p style="font-size: 9px; color: #7070aa; margin: 2px 0;">${instagram}</p>` : ''}
                        ${tagline ? `<p style="font-size: 9px; color: #7070aa; margin: 2px 0;">${tagline}</p>` : ''}
                    </div>
                </div>
                <img src="${logoSrc}" alt="Logo" style="
                    width: 60px;
                    height: 60px;
                    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
                    border: 2px solid #ff006e;
                ">
            </div>
            <div style="
                position: absolute;
                bottom: 20px;
                left: 20px;
                right: 20px;
                height: 2px;
                background: linear-gradient(to right, #ff006e, #8338ec, #3a86ff);
            "></div>
        </div>
    `;
}

window.renderCard = renderCard;