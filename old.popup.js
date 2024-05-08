let scrape = async () => {
    await new Promise(r => setTimeout(r, 2000));

    const name = document.querySelector("h1.text-heading-xlarge")?.textContent;
    const connections = document.querySelector("span.link-without-visited-state > span.t-bold")?.textContent;
    const location = document.querySelector("div.mt2 > span.text-body-small")?.textContent;
    const followers = document.querySelector(".lpuTrmQcWzdYnoVWALxJgeakEvpjNYw")?.textContent;
    const bio = document.querySelector("div.text-body-medium.break-words")?.textContent;

    const profile = {
        name: name,
        connections: parseInt(connections) || 0,
        location: location,
        followers: parseInt(followers.split(" ")[0].split("+")[0].trim()) || 0,
        bio: bio
    };

    const res = await fetch("http://localhost:5000/send_profile", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile),
    });

    const data = await res.json();
    return data;
}

document.getElementById('start').addEventListener('click', async () => {
    document.getElementById('indicator').innerText = 'Scraping initialized...';

    const links = [
        "https://www.linkedin.com/in/shreerang-vaidya/",
        "https://www.linkedin.com/in/akshay-kumar/",
        "https://www.linkedin.com/in/karan-bhatia-b4039b250/",
    ];

    for (let i = 0; i < links.length; i++) {
        console.log("scraping now...");
        chrome.tabs.create({ url: links[i], active: false }, async (tab) => {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust delay as needed
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: () => scrape().then((data) => {
                    console.log(data)
                }),
            });
        });
    }
    console.log("done ")
});
