const zalourl = "https://chat.zalo.me/";

$(async () => {
	const tab = await getCurrentTab();
	if(tab.url.startsWith(zalourl))
		chrome.storage.sync.get("darkmode", rs => {
			$('#darkmode').prop('checked', rs.darkmode)
		});
	else {
		$('#darkmode').prop('disabled', true)
		$('#status').html('Only work on Zalo web')
		$('#status').show()		
	}

	$('#darkmode').change(() => {
		let prop = $('#darkmode').prop('checked')
		if(tab.url.startsWith(zalourl)){
			chrome.storage.sync.set({
				darkmode: prop
			});
			sendRequest('dm-popup', prop, tab)
		}
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
		if(!res.success){
			$('#status').html("Error");
			$('#status').show();
		}
	});
}