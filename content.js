const lg = console.log


$(() =>{
	chrome.storage.sync.get("darkmode",rs => {
		lg(rs)
		if(rs.darkmode){
			sendRequest('dm-content', rs.darkmode);
		}

	})
})


function sendRequest(request, dmchange){
	chrome.runtime.sendMessage({msg: request, darkmode: dmchange}, res => {
		if(!res.success)
			lg(res)
	});
}