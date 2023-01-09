const zalourl = "https://chat.zalo.me/";

$(() => {
	chrome.storage.sync.get("darkmode", rs => {
		$('#darkmode').prop('checked', rs.darkmode)

	})
	$('#darkmode').change(async() => {
		let prop = $('#darkmode').prop('checked')
		// $('#status').html(JSON.stringify(prop))

		chrome.storage.sync.set({
			darkmode: prop
		});
		let tab = await getCurrentTab();

		if(tab.url.startsWith(zalourl))
			sendRequest('dmchange', prop, tab)
		else{
			$('#status').html('Only work in Zalo web')
			$('#status').show()
		}

		
	})
})

async function getCurrentTab() {
	let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
	let [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}

function sendRequest(request, dmchange, currentTab){
	chrome.runtime.sendMessage({msg: request, darkmode: dmchange, tab: currentTab}, res => {
		if(!res.success)
			$('#status').html("Error")
	});
}