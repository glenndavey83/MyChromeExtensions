const css = 'html, body { overflow-y: auto !important; }';

chrome.action.onClicked.addListener( ( tab ) => {
	chrome.scripting.insertCSS(
		{
			target: { tabId: tab.Id },
			css: css,
		}
	);
});