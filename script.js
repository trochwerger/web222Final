
// function textOutline(){
// 	let el = document.querySelector("#box-1");
// }
function populateInfo(reqs){
	console.log('Fetched Data:', reqs)
	let infoSection = document.querySelector("#info");
	
	reqs.forEach(req => {
		let infoItem = document.createElement('article');
		infoItem.className = 'information';
		let head = document.createElement('header');
		let name = document.createElement('h3');
		name.innerText = `${req.first_name} ${req.last_name}`
		head.appendChild(name)
		let img = document.createElement('img');
		img.src = req.avatar;
		let div = document.createElement('div');
		div.className = 'content';
		let p = document.createElement('p');
		p.innerHTML = `Email:<br>${req.email}`;
		div.appendChild(p)
		infoItem.appendChild(head);
		infoItem.appendChild(img);
		infoItem.appendChild(div);
		infoSection.appendChild(infoItem);
	});
}

function start() {
	getReqres(function(reqList){
		populateInfo(reqList);
		// console.log(reqList);
	});

}
window.onload = start;

let pageNum ; 

function contactPage(pageNumber){
	pageNum = pageNumber;
	let infoSection = document.querySelector("#info");
	console.log(pageNum);
	infoSection.innerText = "";
	getReqres(function(reqList){
		populateInfo(reqList);
		console.log(reqList);
	});
	
}
function getReqres(callback){
	let xhr = new XMLHttpRequest();

	xhr.onload = function(){
		let jsonData = JSON.parse(this.responseText);
		callback(jsonData.data);
	};

	xhr.onerror = function() {
		console.log('Unable to get reqres JSON')
	}
	let url = `https://reqres.in/api/users?page=${pageNum}`;
	// let url = `https://reqres.in/api/users?page=1`;
	xhr.open('GET', url);
	xhr.send();
}

function showInfo(shownInfo, hiddenInfo){
	hiddenInfo.style.animation = ''
	hiddenInfo.style.visibility = 'hidden'
	shownInfo.style.visibility = 'visible'
	shownInfo.style.animation = 'fadeIn 5s'
}