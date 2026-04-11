// Template 05: Terra Organic
function renderCard(data) {
    const logoSrc = data.logo || 'assets/default-logos/logo-05.svg';
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
            background: #f0e6d3;
            color: #3d2b1f;
            font-family: 'Lora', serif;
            position: relative;
            border-radius: 18px;
            display: flex;
            padding: 20px;
            box-sizing: border-box;
        ">
            <div style="flex: 1;">
                <h2 style="
                    font-size: 22px;
                    font-weight: 500;
                    font-style: italic;
                    margin: 0 0 10px 0;
                    color: #3d2b1f;
                ">${name}</h2>
                <p style="
                    font-family: 'Nunito Sans', sans-serif;
                    font-size: 10px;
                    font-weight: 300;
                    margin: 0 0 20px 0;
                    letter-spacing: 0.25em;
                    color: #c2714f;
                ">${title}</p>
                <div>
                    ${company ? `<p style="font-family: 'Nunito Sans', sans-serif; font-size: 9px; color: #6b5043; margin: 2px 0;">${company}</p>` : ''}
                    ${phone ? `<p style="font-family: 'Nunito Sans', sans-serif; font-size: 9px; color: #6b5043; margin: 2px 0;">${phone}</p>` : ''}
                    ${email ? `<p style="font-family: 'Nunito Sans', sans-serif; font-size: 9px; color: #6b5043; margin: 2px 0;">${email}</p>` : ''}
                    ${website ? `<p style="font-family: 'Nunito Sans', sans-serif; font-size: 9px; color: #6b5043; margin: 2px 0;">${website}</p>` : ''}
                    ${address ? `<p style="font-family: 'Nunito Sans', sans-serif; font-size: 9px; color: #6b5043; margin: 2px 0;">${address}</p>` : ''}
                    ${linkedin ? `<p style="font-family: 'Nunito Sans', sans-serif; font-size: 9px; color: #6b5043; margin: 2px 0;">${linkedin}</p>` : ''}
                    ${instagram ? `<p style="font-family: 'Nunito Sans', sans-serif; font-size: 9px; color: #6b5043; margin: 2px 0;">${instagram}</p>` : ''}
                    ${tagline ? `<p style="font-family: 'Nunito Sans', sans-serif; font-size: 9px; color: #6b5043; margin: 2px 0;">${tagline}</p>` : ''}
                </div>
            </div>
            <div style="display: flex; align-items: center; justify-content: center; margin-left: 20px;">
                <img src="${logoSrc}" alt="Logo" style="width: 60px; height: 60px;">
            </div>
            <div style="position: absolute; bottom: 10px; right: 10px; font-size: 24px; color: #4a7c59;">🌿</div>
        </div>
    `;
}

window.renderCard = renderCard;