var map;
var pushpin = [];
var index = 0;
var data = [];
function loadMapScenario() {
    map = new Microsoft.Maps.Map(document.getElementById('myMap'), {});
    userInput();
}

// train = {latitude, longitude, num}
function addPushPin(train) {
	if (!index){
		index = 0; 
	}
    pushpin.push(new Microsoft.Maps.Pushpin(
    { 
    	latitude: train.latitude,
    	longitude: train.longitude 
    },
	{ 
		icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png',
		title: train.num 
	}));
    map.entities.push(pushpin[index]);
    index++;
    return index-1;
}

function removePushPin(idx) {
    map.entities.removeAt(idx);
    return idx;
}

window.addEventListener('load', 
  function() { 
	loadMapScenario();
  }, false);
function fixIndex(idx){
	pushpin.splice(idx, 1);
	data.splice(idx, 1);
	index--;
}

function getId(location) {
	idx = data.findIndex(x => {
		return x.latitude==location.y;});
	return idx;
}

function userInput() {
	Microsoft.Maps.Events.addHandler(map, 'click', function (mouseEvent) {
		var value = prompt('Enter number');
		var name = prompt('Enter name');
    	idx = addPushPin({
    		latitude: mouseEvent.location.latitude,
	    	longitude: mouseEvent.location.longitude, 
    		num: value.toString()
    	});
    	data.push({
    		latitude: mouseEvent.location.latitude,
	    	longitude: mouseEvent.location.longitude, 
    		num: value.toString(),
    		name: name.toString()
    	});
    	Microsoft.Maps.Events.addHandler(pushpin[idx], 'click', function (mouseEvent) {
    		idx = getId(mouseEvent.target.geometry);
			idx1 = removePushPin(idx);
			Microsoft.Maps.Events.removeHandler(pushpin[idx1],'click');
			fixIndex(idx1);
    	});
	});
}