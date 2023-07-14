const domain = "misskey.usbharu.dev"

chrome.runtime.onInstalled.addListener(() => {
    const properties = {
        id: "quote",
        title: "引用して投稿",
        contexts: ["selection"]
    };
    chrome.contextMenus.create({
        id: "page",
        title: "このページを投稿",
        contexts: ["page"]
    })
    chrome.contextMenus.create(properties)
});

chrome.contextMenus.onClicked.addListener(item => {
    switch (item.menuItemId) {
        case "quote" :
            quote(item)
            break;
        case "page" :
            page(item)
            break;
    }
})

function page(item) {
    chrome.tabs.query({active: true, currentWindow: true}).then((tab) => {
        const s = encodeURIComponent(`${tab[0].title}\n${item.pageUrl}`);
        chrome.windows.create({
            url: `https://${domain}/share?zen&text=${s}`,
            width: 500,
            height: 400,
            focused: true,
            type: 'popup'
        })
    });

}

function quote(item) {
    const s = encodeURIComponent(`${item.pageUrl}\n> ${item.selectionText}`);
    chrome.windows.create({
        url: `https://${domain}/share?zen&text=${s}`,
        width: 500,
        height: 400,
        focused: true,
        type: 'popup'
    })
}