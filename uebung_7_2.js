
// Teilnehmerliste erstellen
const teilenehmerListe = document.getElementById('teilnehmerListe');

// Event für Button Hinzufügenx
const btnHinzufuegen = document.getElementById('btn');

function addRedner(teilenehmerListe){
	const nameRedner = document.getElementById('nameRedner').value;
	const listenEintrag = document.createElement("li");
	listenEintrag.innerHTML = nameRedner;
	teilnehmerListe.appendChild(listenEintrag);
	document.getElementById('nameRedner').value = '';
	addTimer(listenEintrag);
}

var active = true;
var maxEinRedner = 0;
function addTimer(element){
	const zeit = document.createElement("text");
	const startAndStop = document.createElement("button");
	startAndStop.innerHTML = "Start!";
	startAndStop.addEventListener('click', xy = function(event){
		startCountdown(this, zeit);
		this.removeEventListener('click', xy);
	});
	element.appendChild(zeit);
	element.appendChild(startAndStop);
}

function startCountdown(element, zeit){
	if(maxEinRedner<1){
	maxEinRedner+=1;
	element.innerHTML = "Stop!";
	active = true;
    var time = 0;
	  const timeinterval = setInterval(() => {
		if(active){
	   	 	const t = getTime(time);
	    	zeit.innerHTML = ' ' + ('0' + t.hours).slice(-2) + ':' +
	                      ('0' + t.minutes).slice(-2) + ':' +
	                      ('0' + t.seconds).slice(-2);
			time = time + 1;
		} else {
			clearInterval(timeinterval);
		}
	  },1000);
	element.addEventListener('click', yx = function(event){ 
		endCountdown(this, zeit);
		this.removeEventListener('click', yx)
	});
	}
}

function endCountdown(element, zeit){
	maxEinRedner-=1;
	element.innerHTML = "Start!";
	active = false;
	element.addEventListener('click', xy = function(event){
		startCountdown(this, zeit);
		this.removeEventListener('click', xy);
	});
}

function getTime(total){
    const seconds = Math.floor( total % 60 );
    const minutes = Math.floor( (total/60) % 60 );
    const hours = Math.floor( (total/(60*60)) % 24 );
	return {
    	hours,
    	minutes,
    	seconds
	}
}

btnHinzufuegen.addEventListener('click', function(event){addRedner(teilenehmerListe);})