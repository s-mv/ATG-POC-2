let lock = false;

chrome.runtime.onMessage.addListener((req, sender, res) => {
    fetch('http://localhost:5000/send_profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    })
        .then(res => res.json())
        .then(data => {
            lock = false;
        });
});

const scrape = async () => {
    await new Promise(r => setTimeout(r, 5000));

    const name = document.querySelector("h1.text-heading-xlarge")?.textContent;
    const connections = document.querySelector("span.link-without-visited-state > span.t-bold")?.textContent;
    const location = document.querySelector("div.mt2 > span.text-body-small")?.textContent;
    const followers = document.querySelector(".lpuTrmQcWzdYnoVWALxJgeakEvpjNYw")?.textContent;
    const bio = document.querySelector("div.text-body-medium.break-words")?.textContent;

    const profile = {
        name: name,
        connections: parseInt(connections) || 0,
        location: location.trim(),
        followers: parseInt(followers.split(" ")[0].split("+")[0].trim()) || 0,
        bio: bio.trim()
    };

    chrome.runtime.sendMessage(profile);
}

let handle_data = async (link) => {
    let [tab] = await chrome.tabs.query({ active: true });

    await chrome.tabs.update(tab.id, { url: link });

    chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo, updatedTab) {
        if (tabId === tab.id && changeInfo.status === 'complete') {
            chrome.tabs.onUpdated.removeListener(listener);

            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: scrape,
            });
        }
    });

}

document.querySelector("#start").addEventListener("click", async () => {
    const links = [
        "https://www.linkedin.com/in/shreerang-vaidya/",
        "https://www.linkedin.com/in/akshay-kumar/",
        "https://www.linkedin.com/in/karan-bhatia-b4039b250/",
    ];

    for (let i = 0; i < links.length; i++) {
        while (lock) await new Promise(resolve => setTimeout(resolve, 100));
        const link = links[i];
        lock = true;
        await handle_data(link);
        await new Promise(r => setTimeout(r, 5000));

        console.log("done with scraping ", link);
    }

    alert("done scraping")
});
