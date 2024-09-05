(function(s){var w,f={},o=window,l=console,m=Math,z='postMessage',x='HackTimer.js by turuslan: ',v='Initialisation failed',p=0,r='hasOwnProperty',y=[].slice,b=o.Worker;function d(){do{p=0x7FFFFFFF>p?p+1:0}while(f[r](p))return p}if(!/MSIE 10/i.test(navigator.userAgent)){try{s=o.URL.createObjectURL(new Blob(["var f={},p=postMessage,r='hasOwnProperty';onmessage=function(e){var d=e.data,i=d.i,t=d[r]('t')?d.t:0;switch(d.n){case'a':f[i]=setInterval(function(){p(i)},t);break;case'b':if(f[r](i)){clearInterval(f[i]);delete f[i]}break;case'c':f[i]=setTimeout(function(){p(i);if(f[r](i))delete f[i]},t);break;case'd':if(f[r](i)){clearTimeout(f[i]);delete f[i]}break}}"]))}catch(e){}}if(typeof(b)!=='undefined'){try{w=new b(s);o.setInterval=function(c,t){var i=d();f[i]={c:c,p:y.call(arguments,2)};w[z]({n:'a',i:i,t:t});return i};o.clearInterval=function(i){if(f[r](i))delete f[i],w[z]({n:'b',i:i})};o.setTimeout=function(c,t){var i=d();f[i]={c:c,p:y.call(arguments,2),t:!0};w[z]({n:'c',i:i,t:t});return i};o.clearTimeout=function(i){if(f[r](i))delete f[i],w[z]({n:'d',i:i})};w.onmessage=function(e){var i=e.data,c,n;if(f[r](i)){n=f[i];c=n.c;if(n[r]('t'))delete f[i]}if(typeof(c)=='string')try{c=new Function(c)}catch(k){l.log(x+'Error parsing callback code string: ',k)}if(typeof(c)=='function')c.apply(o,n.p)};w.onerror=function(e){l.log(e)};l.log(x+'Initialisation succeeded')}catch(e){l.log(x+v);l.error(e)}}else l.log(x+v+' - HTML5 Web Worker is not supported')})('HackTimerWorker.min.js');





var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
var isEdge = false;
var isIE = !(window.ActiveXObject) && "ActiveXObject" in window

if(navigator.appName == "Netscape"){
   isEdge = navigator.appVersion.indexOf('Edge') > -1; // EDGE
}

var logContainer = document.getElementById("eventLog__container");
var manufactureContainer = document.getElementById("manufacture__container");
var developContainer = document.getElementById("develop__container");

var shipNameSpan = document.getElementById("ship__name");
var shipStatusSpan = document.getElementById("ship__status");
var shipName = shipNameSpan.value;
var editIcon = document.getElementById("edit__icon");

var updateShipName = function() {
    shipName = shipNameSpan.value;
}

var soundArray = [];
var globalVolume = 0.3;

shipNameSpan.oninput = updateShipName;

editIcon.onclick = function(){shipNameSpan.select();};

var confirmText = function(e) {
    if (e.keyCode == 13) {
        shipNameSpan.blur();
    }
}

shipNameSpan.addEventListener("keyup", confirmText);


ga('create', 'UA-43853280-4', 'auto');

var mobDisc = document.getElementById("mobile-disclaimer");
if (window.innerWidth < 769) {
    mobDisc.style.display = 'flex';
    addEventListener('resize', function(){
        if (window.innerWidth > 769) {
            if (mobDisc != null) {
                mobDisc.parentNode.removeChild(mobDisc);
                mobDisc = null;
            }
        }
    })
} else {
    mobDisc.parentNode.removeChild(mobDisc);
}

var oldLogcontainer;
if (isFirefox || isEdge) {
    (function(w, d) {
    var raf = w.requestAnimationFrame || w.setImmediate || function(c) { return setTimeout(c, 0); };

    function initEl(el) {
      if (el.hasOwnProperty('data-simple-scrollbar')) return;
      Object.defineProperty(el, 'data-simple-scrollbar', new SimpleScrollbar(el));
    }

    // Mouse drag handler
    function dragDealer(el, context) {
      var lastPageY;

      el.addEventListener('mousedown', function(e) {
        lastPageY = e.pageY;
        el.classList.add('ss-grabbed');
        d.body.classList.add('ss-grabbed');

        d.addEventListener('mousemove', drag);
        d.addEventListener('mouseup', stop);

        return false;
      });

      function drag(e) {
        var delta = e.pageY - lastPageY;
        lastPageY = e.pageY;

        raf(function() {
          context.el.scrollTop += delta / context.scrollRatio;
        });
      }

      function stop() {
        el.classList.remove('ss-grabbed');
        d.body.classList.remove('ss-grabbed');
        d.removeEventListener('mousemove', drag);
        d.removeEventListener('mouseup', stop);
      }
    }

    // Constructor
    function ss(el) {
      this.target = el;

      this.bar = '<div class="ss-scroll">';

      this.wrapper = d.createElement('div');
      this.wrapper.setAttribute('class', 'ss-wrapper');

      this.el = d.createElement('div');
      this.el.setAttribute('class', 'ss-content');

      this.wrapper.appendChild(this.el);

      while (this.target.firstChild) {
        this.el.appendChild(this.target.firstChild);
      }
      this.target.appendChild(this.wrapper);

      this.target.insertAdjacentHTML('beforeend', this.bar);
      this.bar = this.target.lastChild;

      dragDealer(this.bar, this);
      this.moveBar();

      this.el.addEventListener('scroll', this.moveBar.bind(this));
      this.el.addEventListener('mouseenter', this.moveBar.bind(this));

      this.target.classList.add('ss-container');

      var css = window.getComputedStyle(el);
    	if (css['height'] === '0px' && css['max-height'] !== '0px') {
      	el.style.height = css['max-height'];
      }
    }

    ss.prototype = {
      moveBar: function(e) {
        var totalHeight = this.el.scrollHeight,
            ownHeight = this.el.clientHeight,
            _this = this;

        this.scrollRatio = ownHeight / totalHeight;

        raf(function() {
          // Hide scrollbar if no scrolling is possible
          if(_this.scrollRatio === 1) {
            _this.bar.classList.add('ss-hidden')
          } else {
            _this.bar.classList.remove('ss-hidden')
            _this.bar.style.cssText = 'height:' + (_this.scrollRatio) * 100 + '%; top:' + (_this.el.scrollTop / totalHeight ) * 100 + '%;right:-' + (_this.target.clientWidth - _this.bar.clientWidth) + 'px;';
          }
        });
      }
    }

    function initAll() {
      var nodes = d.querySelectorAll('*[ss-container]');

      for (var i = 0; i < nodes.length; i++) {
        initEl(nodes[i]);
      }
    }

    d.addEventListener('DOMContentLoaded', initAll);
    ss.initEl = initEl;
    ss.initAll = initAll;

    w.SimpleScrollbar = ss;
  })(window, document);


  SimpleScrollbar.initEl(logContainer);
  SimpleScrollbar.initEl(manufactureContainer);
  SimpleScrollbar.initEl(developContainer);

  oldLogcontainer = logContainer;
  logContainer.childNodes[0].childNodes[0].id = 'eventLog__container';
  logContainer.style.paddingTop = 0 + 'px';
  logContainer.style.paddingBottom = 0 + 'px';
  logContainer.style.height = 245 + 'px';
  logContainer.id = '';
  logContainer.style.overflowY = 'hidden';
  logContainer = document.getElementById('eventLog__container');
  logContainer.style.paddingBottom = 35 + 'px';

  manufactureContainer.childNodes[0].childNodes[0].id = 'manufacture__container';
  manufactureContainer.id = '';
  manufactureContainer.style.overflowY = 'hidden';
  manufactureContainer = document.getElementById('manufacture__container');

  developContainer.childNodes[0].childNodes[0].id = 'develop__container';
  developContainer.id = '';
  developContainer.style.overflowY = 'hidden';
  developContainer = document.getElementById('develop__container');

  if(window.innerHeight < 721) {
      oldLogcontainer.style.height = 229 + 'px';
  } else {
      oldLogcontainer.style.height = 245 + 'px';
  }
}



if (isIE) {

    var vidDisc = document.createElement('div');
    vidDisc.classList.add('mobile-disclaimer');
    document.body.appendChild(vidDisc);
    vidDisc.style.display = 'flex';

    var vidDiscInner = document.createElement('div');
    vidDiscInner.classList.add('mobile-disclaimer__inner');
    vidDisc.appendChild(vidDiscInner);

    var vidDiscP = document.createElement('div');

    thingMuted = true;

    vidDiscP.innerHTML = "Looks like you're using Internet Explorer, which isn't great for flying spaceships.<br/>Come back in a different browser aye?";
    vidDiscInner.appendChild(vidDiscP);
}





var inactive__popup = document.getElementById("inactive-tab");
var screenFocus = true;
var screenFocusReal = true;

function onFocus() {
    screenFocus = true;
    screenFocusReal = true;
    inactive__popup.style.display = 'none';
    planetOne.trail = [];
}
function onBlur() {
    screenFocusReal = false;

    if (!thingdrawVis) {
        screenFocus = false;
        inactive__popup.style.display = 'flex';
    }
}

window.onfocus = onFocus;
window.onblur = onBlur;

// document.addEventListener('touchstart', function(e)
// {
//     e.preventDefault();
// }, false);





function bigNumber(x) {
    var result = '';
    var xStr = x.toString(10);
    var digitCount = xStr.indexOf('e') === -1 ? xStr.length : (parseInt(xStr.substr(xStr.indexOf('e') + 1)) + 1);

    for (var i = 1; i <= digitCount; i++) {
        var mod = (x % Math.pow(10, i)).toString(10);
        var exponent = (mod.indexOf('e') === -1) ? 0 : parseInt(mod.substr(mod.indexOf('e')+1));
        if ((exponent === 0 && mod.length !== i) || (exponent > 0 && exponent !== i-1)) {
            result = '0' + result;
        }
        else {
            result = mod.charAt(0) + result;
        }
    }
    return result;
}

function easeOutQuart(t, b, c, d) {
	t /= d;
	t--;
	return -c * (t*t*t*t - 1) + b;
};

function easeInOutExpo(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
	t--;
	return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
};

function easeOutExpo(t, b, c, d) {
	return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
};

function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getRndBias(min, max, bias, influence) {
    var rnd = Math.random() * (max - min) + min,   // random in range
        mix = Math.random() * influence;           // random mixer
    return(rnd * (1 - mix) + bias * mix);     // mix full range and bias
}


//calculates B's gravity on A and updates A's position accordingly:
function calculateGravity(a, b) {
    var netForceVector = [0, 0]; //starts a new force vector

    var gravOffset = [b.pos[0] - a.pos[0], b.pos[1] - a.pos[1]]; //x & y are stored in an array and calculated seperately
    var rSquared = Math.pow(Math.sqrt(Math.pow(gravOffset[0], 2) + Math.pow(gravOffset[1], 2)), 2); //(the square root of (x & y offset squared)) squared
    var gravityMagnitude = bigG * b.mass * a.mass / rSquared; //calculates the strength of gravity's affect
    var gravityFeltVector = [
      gravityMagnitude * (gravOffset[0] / Math.sqrt(Math.pow(gravOffset[0], 2) + Math.pow(gravOffset[1], 2))),
      gravityMagnitude * (gravOffset[1] / Math.sqrt(Math.pow(gravOffset[0], 2) + Math.pow(gravOffset[1], 2)))
      ]; //converts this into a vector

    netForceVector[0] += gravityFeltVector[0];
    netForceVector[1] += gravityFeltVector[1];//adds this to the force (can remove this - just here in case I want to add multiple gravity sources, can accumulate effect)

    var accelerationVector = [netForceVector[0] / a.mass, netForceVector[1] / a.mass]; //works out how much this should affect A taking it's mass into consideration

    a.vel[0] += accelerationVector[0];
    a.vel[1] += accelerationVector[1];
    a.pos[0] += a.vel[0];
    a.pos[1] += a.vel[1];
}

//http://gamedev.stackexchange.com/questions/69649/using-atan2-to-calculate-angle-between-two-vectors
var angleBetweenPoints = function(vectorA, vectorB) {
    return Math.abs(Math.atan2(vectorA[1], vectorA[0]) - Math.atan2(vectorB[1],  vectorB[0]));
}

//Written using: http://stackoverflow.com/questions/31346862/check-if-point-is-between-two-other-points-and-from-a-certain-distance-from-the
var inShadow = function(physObj, linePoint1, linePoint2, radius, body) {

    var distanceFromPoint =
        (((linePoint2[1] - linePoint1[1]) * physObj[0]) - ((linePoint2[0] - linePoint1[0]) * physObj[1]) + (linePoint2[0] * linePoint1[1]) - (linePoint2[1] * linePoint1[0]))
        /
        (
          (((linePoint2[1] - linePoint1[1]) * (linePoint2[1] - linePoint1[1])) + ((linePoint2[0] - linePoint1[0]) * (linePoint2[0] - linePoint1[0])))
         /
          (((linePoint2[1] - linePoint1[1]) * (linePoint2[1] - linePoint1[1])) + ((linePoint2[0] - linePoint1[0]) * (linePoint2[0] - linePoint1[0])))
        );
    var angleDiff = angleBetweenPoints([body.pos[0], body.pos[1]], [linePoint2[0], linePoint2[1]]);
    // console.log(distanceFromPoint);
    return (((distanceFromPoint / 1000) < (radius*2) && (distanceFromPoint / 1000) > -(radius*2)) && angleDiff < 1);
}





var manufactureTooltip = document.getElementById("manufacture__tooltip");
var wrapperMain = document.getElementById("wrapper__main");
var lockedItems = [];
var availableItems = [];

// var manufactureTooltip__pos = 0;

var spudMass = 3;//100
var taterMass = 9;//1000

var spudMassMultiplier = 1;
var taterMassMultiplier = 1;


var solarCost = 15;
var potatoCost = 100;
var probeCost = 600;
var spudnikCost = 9700;
var potatoPlantCost = 144000;
var taterTowerCost = 2300000;
var spudGunCost = 21000000;
var potatoLauncherCost = 110000000;

var solarPower = 0.01;
var potatoPower = 0.1;
var probePower = 0.8;
var spudnikPower = 4.2;
var potatoPlantPower = 23;
var taterTowerPower = 160;
var spudGunPower = 800;
var potatoLauncherPower = 4200;

var solarBlurb = "They need a bit of love.<br/><span id='powerGain'>1w/10secs</span> while in sunlight";
var potatoBlurb = "Genetically modified for more power output.<br/><span id='powerGain'>1</span>w/sec";
var probeBlurb = "Modified spud for planetary harvesting.<br/><span id='powerGain'>8</span>w/sec | 1.5x production in free fall";
var spudnikBlurb = "The first potato satellite.<br/><span id='powerGain'>42</span>w/sec";
var potatoPlantBlurb = "Harvests power from the planet surface.<br/><span id='powerGain'>230</span>w/sec";
var taterTowerBlurb = "Mass-produce power potatoes.<br/><span id='powerGain'>1,400</span>w/sec";
var spudGunBlurb = "Spud mass is based on TOTAL item count<br/><span id='powerGain'>8</span>Kw/sec | 1 spud with <span id='spudGain'>" + spudMass*spudMassMultiplier + "</span> mass/10secs";
var potatoLauncherBlurb = "Tater mass is based on TOTAL item count<br/><span id='powerGain'>42</span>Kw/sec | 1 tater with <span id='spudGain'>" + taterMass*taterMassMultiplier + "</span> mass/12secs";


var solarSound = [];
for (var ks = 0; ks < 5; ks++) {
    solarSound[ks] = new Audio('audio/items/solarpanel.mp3');
    solarSound[ks].volume = 0.5;
    soundArray.push(solarSound[ks]);

}

var potatoSound = [];
for (var ks = 0; ks < 5; ks++) {
    potatoSound[ks] = new Audio('audio/items/potato.mp3');
    potatoSound[ks].volume = 0.5;
    soundArray.push(potatoSound[ks]);
}

var probeSound = [];
for (var ks = 0; ks < 5; ks++) {
    probeSound[ks] = new Audio('audio/items/probetato.mp3');
    probeSound[ks].volume = 0.5;
    soundArray.push(probeSound[ks]);
}

var spudnikSound = [];
for (var ks = 0; ks < 5; ks++) {
    spudnikSound[ks] = new Audio('audio/items/spudnik.mp3');
    spudnikSound[ks].volume = 0.5;
    soundArray.push(spudnikSound[ks]);
}

var potatoPlantSound = [];
for (var ks = 0; ks < 5; ks++) {
    potatoPlantSound[ks] = new Audio('audio/items/plant.mp3');
    potatoPlantSound[ks].volume = 0.5;
    soundArray.push(potatoPlantSound[ks]);
}

var taterTowerSound = [];
for (var ks = 0; ks < 5; ks++) {
    taterTowerSound[ks] = new Audio('audio/items/tower.mp3');
    taterTowerSound[ks].volume = 0.5;
    soundArray.push(taterTowerSound[ks]);
}

var spudGunSound = [];
for (var ks = 0; ks < 5; ks++) {
    spudGunSound[ks] = new Audio('audio/items/gun.mp3');
    spudGunSound[ks].volume = 0.5;
    soundArray.push(spudGunSound[ks]);
}

var potatoLauncherSound = [];
for (var ks = 0; ks < 5; ks++) {
    potatoLauncherSound[ks] = new Audio('audio/items/launcher.mp3');
    potatoLauncherSound[ks].volume = 0.5;
    soundArray.push(potatoLauncherSound[ks]);
}

var icon__solar = document.getElementById("icon__solar");
var icon__potato = document.getElementById("icon__potato");
var icon__probe = document.getElementById("icon__probe");
var icon__spudnik = document.getElementById("icon__spudnik");
var icon__potatoplant = document.getElementById("icon__potatoplant");
var icon__tatertower = document.getElementById("icon__tatertower");
var icon__spudgun = document.getElementById("icon__spudgun");
var icon__potatolauncher = document.getElementById("icon__potatolauncher");

var icon__cleanPanels = document.getElementById("icon__cleanPanels");
var icon__polishedPanels = document.getElementById("icon__polishedPanels");
var icon__goldenPanels = document.getElementById("icon__goldenPanels");
var icon__probetatoFoil = document.getElementById("icon__probetatoFoil");
var icon__solarAmbience = document.getElementById("icon__solarAmbience");
var icon__podModule = document.getElementById("icon__podModule");
var icon__landship = document.getElementById("icon__landship");
var icon__systemView = document.getElementById("icon__systemView");
var icon__planetBoosters = document.getElementById("icon__planetBoosters");
var icon__approachEventHorizon = document.getElementById("icon__approachEventHorizon");
var icon__kinetigen01 = document.getElementById("icon__kinetigen01");
var icon__kinetigen02 = document.getElementById("icon__kinetigen02");
var icon__kinetigen03 = document.getElementById("icon__kinetigen03");
var icon__kinetigen04 = document.getElementById("icon__kinetigen04");
var icon__landshipAgain = document.getElementById("icon__landshipAgain");
var icon__spudnikUpgrade = document.getElementById("icon__spudnikUpgrade");
var icon__potatoUpgrade = document.getElementById("icon__potatoUpgrade");
var icon__probetatoUpgrade = document.getElementById("icon__probetatoUpgrade");
var icon__potatoplantUpgrade = document.getElementById("icon__potatoplantUpgrade");
var icon__taterUpgrade = document.getElementById("icon__taterUpgrade");
var icon__spudgunUpgrade = document.getElementById("icon__spudgunUpgrade");
var icon__potatoLauncherUpgrade = document.getElementById("icon__potatoLauncherUpgrade");
var icon__irishPride = document.getElementById("icon__irishPride");



var spudGunRate = 0.01;
var taterGunRate = 0.008;

var boughtSpudGuns = false;
var boughtPotatoLaunchers = false;

var ItemConstruct = function(eleId, initialCost, header, asterisk, resource, gain, tooltip, acondition, savedItemCount, itemSound, itemIcon) {

    this.el = document.createElement('div');
    this.el.id = eleId;
    this.el.className += "manufacture__item--locked";
    manufactureContainer.appendChild(this.el);

    // this.iconSpan = itemIcon;
    this.el.appendChild(itemIcon);
    itemIcon.style.display = 'block';

    this.headerSpan = document.createElement('div');
    this.headerSpan.id = "name";
    this.headerSpan.className += "manufacture__name";
    this.el.appendChild(this.headerSpan);
    this.headerSpan.innerHTML = asterisk;

    this.costLineSpan = document.createElement('div');
    this.costLineSpan.id = "costLine";
    this.costLineSpan.className += "manufacture__cost";
    this.el.appendChild(this.costLineSpan);
    this.costLineSpan.innerHTML = "<span id='cost'>" + numberWithCommas(initialCost) + "</span> power";

    this.costSpan = this.el.querySelector("#cost");

    this.countSpan = document.createElement('div');
    this.countSpan.id = "count";
    this.countSpan.className += "manufacture__count";
    this.el.appendChild(this.countSpan);
    this.countSpan.innerHTML = savedItemCount;


    this.sound = itemSound;
    this.soundInt = 0;

    this.playSound = function() {

        if (!thingMuted) {

            this.sound[this.soundInt].currentTime = 0;
            this.sound[this.soundInt].play();
            this.soundInt++;
            if (this.soundInt >= this.sound.length) {
                this.soundInt = 0;
            }
        }
    }

    // this.el.onmouseenter = playHoverSound;

    this.header       = header;
    this.initialCost  = initialCost;
    this.currentCost  = initialCost;
    this.currentCount = savedItemCount;
    this.resource     = resource;
    this.gain         = gain;
    this.tooltip      = tooltip;
    this.conditions   = acondition;
    this.revealed     = false;


    this.reveal = function() {
        this.headerSpan.innerHTML = this.header;
        this.countSpan.style.display = "inline";
        if (this.conditions == true) {
            this.el.addEventListener("click", buildItem);
        }

        this.el.className = "manufacture__item";
        this.costLineSpan.style.color = "#00ffc2";

        this.revealed = true;

        this.tooltipSpan = document.createElement('div');
        this.tooltipSpan.id = "tooltip";
        this.tooltipSpan.classList.add("manufacture__tooltip");
        this.el.insertBefore(this.tooltipSpan, this.el.childNodes[0]);
        this.tooltipSpan.innerHTML = this.tooltip;
        this.powerSpan = this.el.querySelector("#powerGain");
        this.spudSpan = this.el.querySelector("#spudGain");

        if (this.el.id == "item__solar") {
            if (!gotIrishPride) {
                if (this.gain*10 < 1) {
                    var newSeconds = 1/(this.gain*10);
                    this.powerSpan.innerHTML = "1w/" + newSeconds.toFixed(1) + "secs";
                } else {
                    this.powerSpan.innerHTML = this.gain*10 + "w/sec";
                }
            } else {
                if (this.gain*20 < 1) {
                    var newSeconds = 1/(this.gain*20);
                    this.powerSpan.innerHTML = "1w/" + newSeconds.toFixed(1) + "secs";
                } else {
                    this.powerSpan.innerHTML = this.gain*20 + "w/sec";
                }
            }
        } else if (this.el.id == "item__spudGun" || this.el.id == "item__potatoLauncher") {
            if (!gotIrishPride) {
                this.powerSpan.innerHTML = ((this.gain*10)/1000).toFixed(0);
            } else {
                this.powerSpan.innerHTML = ((this.gain*20)/1000).toFixed(0);
            }
        } else {
            if (!gotIrishPride) {
                this.powerSpan.innerHTML = numberWithCommas(this.gain*10);
            } else {
                this.powerSpan.innerHTML = numberWithCommas(this.gain*20);
            }
        }


        this.tooltipBg = document.createElement('div');
        this.tooltipBg.className += "manufacture__tooltip--bg";
        this.el.insertBefore(this.tooltipBg, this.tooltipSpan.nextSibling);

        this.costLineSpan.classList.add("manufacture__cost--animate");

        var dropped = lockedItems.shift();
        availableItems.push(this);
    }
}

var totalItemsBought;


var buildItem = function() {

    for (var j = 0; j < availableItems.length; j++) {

        if (availableItems[j].el.id == this.id) {
            availableItems[j].el.id;
            var itemToBuild = availableItems[j];
        }
    }
    if (power >= itemToBuild.currentCost && itemToBuild.conditions == true) {
        //PERHAPS MOVE//
        if (gotPlanetBoosters) {
            var totalItemCount = 0;
            for (var i = 0; i < availableItems.length; i++) {
                if (availableItems[i].el.id != "item__spudGun" && availableItems[i].el.id != "item__potatoLauncher") {
                    totalItemCount += availableItems[i].currentCount;
                }
            }

            if (itemSpudGun != undefined) {
                if (itemSpudGun.revealed == true) {
                    spudMassMultiplier = (totalItemCount*6).toFixed(0);
                    itemSpudGun.spudSpan.innerHTML = spudMass*spudMassMultiplier;
                }
            }
            if (itemPotatoLauncher != undefined) {
                if (itemPotatoLauncher.revealed == true) {
                    taterMassMultiplier = (totalItemCount*6).toFixed(0);
                    itemPotatoLauncher.spudSpan.innerHTML = taterMass*taterMassMultiplier;
                }
            }
        }
        ///////////////
        power -= itemToBuild.currentCost;
        itemToBuild.playSound();
        itemToBuild.currentCount ++;

        totalItemsBought++;
        console.log("buy item");
        if(window.location.href.indexOf("kongregate") > -1){
        // if(location.hostname.match('kongregate')){
            console.log("submitting item count to Kong");
            kongregate.stats.submit('totalItemsBought', totalItemsBought);
        }

        // itemToBuild.currentCost = parseInt(itemToBuild.initialCost * (1.15 * itemToBuild.currentCount));

        // var costMulti = 0.05 * (itemToBuild.currentCount);
        // if (costMulti > 0.4) {
        //     costMulti=0.4;
        // }
        // itemToBuild.currentCost = (itemToBuild.currentCost * (1+costMulti)).toFixed(0);
        var multiplier = 1.15;
        if (itemToBuild.currentCost >= itemToBuild.initialCost * 2000) {
            multiplier = 1.1;
        }
        if (itemToBuild.currentCost >= itemToBuild.initialCost * 30000) {
            multiplier = 1.05;
        }
        if (itemToBuild.currentCost >= itemToBuild.initialCost * 100000) {
            multiplier = 1.02;
        }
        if (itemToBuild.currentCost >= itemToBuild.initialCost * 150000) {
            multiplier = 1.01;
        }

        itemToBuild.currentCost = (itemToBuild.currentCost * multiplier).toFixed(0);
        // itemToBuild.currentCount += 200; //DELETE THIS
        itemToBuild.costSpan.innerHTML = numberWithCommas(itemToBuild.currentCost);
        itemToBuild.countSpan.innerHTML = numberWithCommas(itemToBuild.currentCount);
        updateResources();
        updateResourceGain();
        switch (itemToBuild.el.id) {
            case "item__solar":
                kinetigenAddPanel();
                if (cleanPanels == null && itemSolar.currentCount >= 3) {
                    createResearch("cleanPanels");
                }
                if (itemSolar.currentCount == 1) {
                    ga('set', {
                                'userId': USER_ID,
                                'dimension1': shipName,
                                'dimension2': USER_ID,
                                'metric4': 1
                              });
                    ga('send', 'pageview');
                    ga('set', {
                                'metric4': 0
                              });
                }
                break;
            case "item__potato":
                if (potatoUpgrade == null && itemPotato.currentCount >= 3) {
                    createResearch("potatoUpgrade");
                }
                if (itemPotato.currentCount == 1) {
                    ga('set', {
                                'userId': USER_ID,
                                'dimension1': shipName,
                                'dimension2': USER_ID,
                                'metric5': 1
                              });
                    ga('send', 'pageview');
                    ga('set', {
                                'metric5': 0
                              });
                }
                break;
            case "item__probe":
                createProbe();
                if (itemProbe.currentCount == 1 && atmosphere__data == 0) {
                    ga('set', {
                                'userId': USER_ID,
                                'dimension1': shipName,
                                'dimension2': USER_ID,
                                'metric6': 1
                              });
                    ga('send', 'pageview');
                    ga('set', {
                                'metric6': 0
                              });
                }
                break;

            case "item__spudnik":
                if (spudnikUpgrade == null && itemSpudnik.currentCount >= 2) {
                    createResearch("spudnikUpgrade");
                }
                createSpudnik();
                if (itemSpudnik.currentCount == 1) {
                    ga('set', {
                                'userId': USER_ID,
                                'dimension1': shipName,
                                'dimension2': USER_ID,
                                'metric7': 1
                              });
                    ga('send', 'pageview');
                    ga('set', {
                                'metric7': 0
                              });
                }
                break;
            case "item__potatoPlant":
                if (potatoPlantUpgrade == null && itemPotatoPlant.currentCount >= 2) {
                    createResearch("potatoPlantUpgrade");
                }
                createPotatoPlant();
                if (itemPotatoPlant.currentCount == 1) {
                    ga('set', {
                                'userId': USER_ID,
                                'dimension1': shipName,
                                'dimension2': USER_ID,
                                'metric8': 1
                              });
                    ga('send', 'pageview');
                    ga('set', {
                                'metric8': 0
                              });
                }
                break;
            case "item__taterTower":
                if (taterTowerUpgrade == null && itemTaterTower.currentCount >= 2) {
                    createResearch("taterTowerUpgrade");
                }
                createTaterTower();
                if (itemTaterTower.currentCount == 1) {
                    ga('set', {
                                'userId': USER_ID,
                                'dimension1': shipName,
                                'dimension2': USER_ID,
                                'metric18': 1
                              });
                    ga('send', 'pageview');
                    ga('set', {
                                'metric18': 0
                              });
                }
                break;
            case "item__spudGun":
                if (spudGunUpgrade == null && itemSpudGun.currentCount >= 2) {
                    createResearch("spudGunUpgrade");
                }
                createSpudgun();
                if (itemSpudGun.currentCount == 1) {
                    ga('set', {
                                'userId': USER_ID,
                                'dimension1': shipName,
                                'dimension2': USER_ID,
                                'metric9': 1
                              });
                    ga('send', 'pageview');
                    ga('set', {
                                'metric9': 0
                              });
                }
                break;
            case "item__potatoLauncher":
                if (potatoLauncherUpgrade == null && itemPotatoLauncher.currentCount >= 2) {
                    createResearch("potatoLauncherUpgrade");
                }
                createLauncher();
                if (itemPotatoLauncher.currentCount == 1) {
                    ga('set', {
                                'userId': USER_ID,
                                'dimension1': shipName,
                                'dimension2': USER_ID,
                                'metric10': 1
                              });
                    ga('send', 'pageview');
                    ga('set', {
                                'metric10': 0
                              });
                }
                break;
        }
    }
    checkItems();
    checkResearch();
}


function checkItems() {

    for (var i = 0; i < lockedItems.length; i++) {

        if (power >= lockedItems[i].currentCost * 0.8) {

            switch(lockedItems[i].el.id) {
                case "item__potato":
                    itemProbe = new ItemConstruct("item__probe", probeCost, "Probetato", "*********", "power", probePower, probeBlurb, true, 0, probeSound, icon__probe);
                    lockedItems.push(itemProbe);
                    break;
                case "item__probe":
                    itemSpudnik = new ItemConstruct("item__spudnik", spudnikCost, "Spudnik", "*******", "power", spudnikPower, spudnikBlurb, true, 0, spudnikSound, icon__spudnik);
                    lockedItems.push(itemSpudnik);
                    break;
                case "item__spudnik":
                    var thisCondition = landedProbes.length > 0;
                    itemPotatoPlant = new ItemConstruct("item__potatoPlant", potatoPlantCost, "Potato Plant", "****** *****", "power", potatoPlantPower, potatoPlantBlurb, thisCondition, 0, potatoPlantSound, icon__potatoplant);
                    if (!thisCondition) {
                        itemPotatoPlant.costLineSpan.innerHTML = "<span id='cost' style='display:none;'></span>" + "Requires landed probetato";
                    }
                    lockedItems.push(itemPotatoPlant);
                    break;
                case "item__potatoPlant":
                    var thisCondition = false;
                    if (shipLanded == true) {
                        thisCondition = true;
                    }
                    itemTaterTower = new ItemConstruct("item__taterTower", taterTowerCost, "Tater Tower", "***** *****", "power", taterTowerPower, taterTowerBlurb, thisCondition, 0, taterTowerSound, icon__tatertower);
                    if (!thisCondition) {
                        itemTaterTower.costLineSpan.innerHTML = "<span id='cost' style='display:none;'></span>" + "Requires landed pod";
                    }
                    lockedItems.push(itemTaterTower);
                    break;
                case "item__taterTower":
                    var thisCondition = false;
                    if (gotPlanetBoosters == true) {
                        thisCondition = true;
                    }
                    itemSpudGun = new ItemConstruct("item__spudGun", spudGunCost, "Spud Gun", "**** ***", "power", spudGunPower, spudGunBlurb, thisCondition, 0, spudGunSound, icon__spudgun);
                    if (!thisCondition) {
                        itemSpudGun.costLineSpan.innerHTML = "<span id='cost' style='display:none;'></span>" + "Requires planet boosters";
                    }

                    lockedItems.push(itemSpudGun);
                    break;
                case "item__spudGun":
                    var thisCondition = false;
                    if (gotPlanetBoosters == true) {
                        thisCondition = true;
                    }
                    itemPotatoLauncher = new ItemConstruct("item__potatoLauncher", potatoLauncherCost, "Potato Launcher", "****** ********", "power", potatoLauncherPower, potatoLauncherBlurb, thisCondition, 0, potatoLauncherSound, icon__potatolauncher);
                    if (!thisCondition) {
                        itemPotatoLauncher.costLineSpan.innerHTML = "<span id='cost' style='display:none;'></span>" + "Requires planet boosters";
                    }
                    lockedItems.push(itemPotatoLauncher);
                    break;
            }
            lockedItems[i].reveal();
        }
    }

    for (var i = 0; i < availableItems.length; i++) {

        if (power >= availableItems[i].currentCost && availableItems[i].conditions == true) {
            if (availableItems[i].el.id == "item__potatoPlant" && !potatoPlantUnlock) {
                availableItems[i].el.addEventListener("click", buildItem);
                potatoPlantUnlock = true;
            }
            if (availableItems[i].el.id == "item__taterTower" && !taterTowerUnlock) {
                availableItems[i].el.addEventListener("click", buildItem);
                taterTowerUnlock = true;
            }
            if (availableItems[i].el.id == "item__spudGun" && !spudGunUnlock) {
                availableItems[i].el.addEventListener("click", buildItem);
                spudGunUnlock = true;
            }
            if (availableItems[i].el.id == "item__potatoLauncher" && !potatoLauncherUnlock) {
                availableItems[i].el.addEventListener("click", buildItem);
                potatoLauncherUnlock = true;
            }

            availableItems[i].el.className = "manufacture__item";
            availableItems[i].costLineSpan.style.color = "#00ffc2";
        } else {

            availableItems[i].el.className = "manufacture__item--locked";
            availableItems[i].costLineSpan.style.color = "#ff3e3e";
        }
    }
}

var potatoPlantUnlock = false;
var taterTowerUnlock = false;
var spudGunUnlock = false;
var potatoLauncherUnlock = false;

var itemSolar;
var itemProbe
var itemSpudnik;
var itemPotatoPlant;
var itemTaterTower;
var itemSpudGun;
var itemPotatoLauncher;





var developmentTooltip = document.getElementById("development__tooltip");
var systViewButton = document.getElementById("center__header--syst");
var planViewButton = document.getElementById("center__header--plan");

//SOUND
var researchSound = [];
var researchNo = 1;
var researchInt = 0;
for (var ks = 0; ks < 6; ks++) {
    researchSound[ks] = new Audio('audio/research' + researchNo + '.mp3');
    researchSound[ks].volume = 0.5;
    soundArray.push(researchSound[ks]);
    researchNo++;
    if (researchNo > 3) {
        researchNo = 1;
    }
}

var podLaunch__sound = new Audio('audio/pod/launch.mp3');
soundArray.push(podLaunch__sound);
//SOUND

var gotKinetigen01 = false;
var gotKinetigen02 = false;
var gotKinetigen03 = false;
var gotKinetigen04 = false;

var gotHeatshields = false;
var gotParachutes  = false;
var gotSystView  = false;
var gotHopperHeatshields  = false;
var gotHopperLanding = false;
var gotLandship = false;
var gotLandshipAgain = false;
var gotPlanetBoosters = false;
var gotApproachEventHorizon = false;

var gotCleanPanels = false;
var gotPolishedPanels = false;
var gotGoldenPanels = false;
var gotSolarAmbience  = false;

var gotPotatoUpgrade = false;

var gotProbetatoUpgrade = false;

var gotSpudnikUpgrade = false;

var gotPotatoPlantUpgrade = false;

var gotTaterTowerUpgrade = false;

var gotSpudGunUpgrade = false;

var gotPotatoLauncherUpgrade = false;

var gotIrishPride = false;



var kinetigen01__cost = 200;
var kinetigen02__cost = 60000;
var kinetigen03__cost = 200000;
var kinetigen04__cost = 15000000;

var heatShields__cost = 500;
var parachutes__cost = 700;
var hopperHeatshields__cost = 3000000;
var hopperLanding__cost = 3000000;
var landship__cost = 1000000;
var systView__cost = 10000000;
var planetBoosters__cost = 15000000;
var approachEventHorizon__cost = 500000000;
var landshipAgain__cost = 10;

var cleanPanels__cost = 100;
var polishedPanels__cost = 10000;
var goldenPanels__cost = 250000;
var solarAmbience__cost = 2000;

var potatoUpgrade__cost = 6000;

var probetatoUpgrade__cost = 90000;

var spudnikUpgrade__cost = 300000;

var potatoPlantUpgrade__cost = 1500000;

var taterTowerUpgrade__cost = 10300000;

var spudGunUpgrade__cost = 100000000;

var potatoLauncherUpgrade__cost = 210000000;

var irishPride__cost = 150000000;




var cleanPanels = null;
var polishedPanels = null;
var goldenPanels = null;
var kinetigen01 = null;
var kinetigen02 = null;
var kinetigen03 = null;
var kinetigen04 = null;
var heatshields = null;
var parachutes = null;
var solarAmbience = null;
var systView = null;
var hopperHeatshields = null;
var hopperLanding = null;
var landship = null;
var landshipAgain = null;
var planetBoosters = null;
var approachEventHorizon = null;
var potatoUpgrade = null;
var probetatoUpgrade = null;
var spudnikUpgrade = null;
var potatoPlantUpgrade = null;
var taterTowerUpgrade = null;
var spudGunUpgrade = null;
var potatoLauncherUpgrade = null;
var irishPride = null;

var dataNeeded = 0;

var availableResearch = [];
var researchedStuff = [];

var shipReleaseFailSafe = false;
var shipLandFailSafe = false;

var ResearchConstruct = function(eleId, cost, header, resource, tooltip, icon) {

    this.el = document.createElement('div');
    this.el.id = eleId;
    this.el.className += "manufacture__item--locked";
    var priceyElement = 999999999999;
    for(var i = 0; i < availableResearch.length; i++) {
        if (availableResearch[i].cost > cost) {
            if (availableResearch[i].cost < priceyElement) {
                priceyElement = availableResearch[i].el;
            }
        }
    }
    if (priceyElement != 999999999999) {
        developContainer.insertBefore(this.el, priceyElement);
    }
    if (priceyElement == 999999999999) {
        developContainer.appendChild(this.el);
    }

    this.el.appendChild(icon);
    icon.style.display = 'block';

    this.headerSpan = document.createElement('div');
    this.headerSpan.id = "name";
    this.headerSpan.className += "manufacture__name";
    this.el.appendChild(this.headerSpan);
    this.headerSpan.innerHTML = header;

    this.costLineSpan = document.createElement('div');
    this.costLineSpan.id = "costLine";
    this.costLineSpan.className += "manufacture__cost";
    this.costLineSpan.classList.add("manufacture__cost--animate");
    this.el.appendChild(this.costLineSpan);
    this.costLineSpan.innerHTML = numberWithCommas(cost) + " power";

    this.tooltipSpan = document.createElement('div');
    this.tooltipSpan.id = "tooltip";
    this.tooltipSpan.classList.add("manufacture__tooltip");
    this.el.insertBefore(this.tooltipSpan, this.el.childNodes[0]);
    this.tooltipSpan.innerHTML = tooltip;

    this.tooltipBg = document.createElement('div');
    this.tooltipBg.className += "manufacture__tooltip--bg";
    this.el.insertBefore(this.tooltipBg, this.tooltipSpan.nextSibling);

    this.header       = header;
    this.cost         = cost;
    this.resource     = resource;
    this.tooltip      = tooltip;


    this.el.addEventListener("click", researchThing);
}


var researchThing = function(thing, loadingSave) {
    var reIndex;
    for (var j = 0; j < availableResearch.length; j++) {

        if (availableResearch[j].el.id == this.id || availableResearch[j].el.id == thing) {
            availableResearch[j].el.id;
            var researchToDevelop = availableResearch[j];
            reIndex = j;
        }
    }
    if (power >= researchToDevelop.cost || loadingSave) {
        if (!loadingSave) {
            power -= researchToDevelop.cost;
            if (!thingMuted) {

                researchSound[researchInt].play();
                researchInt++;
                if (researchInt >= researchSound.length) {
                    researchInt = 0;
                }
            }
        }

        switch(researchToDevelop.el.id) {
            case "cleanPanels":
                gotCleanPanels = true;
                researchedStuff.push(cleanPanels);
                if(!loadingSave) {
                    pushLog("Panels are looking presentable.<br/>3 watts every 10 seconds!");
                    createResearch("solarAmbience");
                    createResearch("polishedPanels");
                }
                itemSolar.gain = 0.03;
                if (!gotIrishPride) {
                    if (itemSolar.gain*10 < 1) {
                        var newSeconds = 1/(itemSolar.gain*10);
                        itemSolar.powerSpan.innerHTML = "1w/" + newSeconds.toFixed(1) + "secs";
                    } else {
                        itemSolar.powerSpan.innerHTML = itemSolar.gain*10 + "w/sec";
                    }
                } else {
                    if (itemSolar.gain*20 < 1) {
                        var newSeconds = 1/(itemSolar.gain*20);
                        itemSolar.powerSpan.innerHTML = "1w/" + newSeconds.toFixed(1) + "secs";
                    } else {
                        itemSolar.powerSpan.innerHTML = itemSolar.gain*20 + "w/sec";
                    }
                }
                // itemSolar.tooltipSpan.innerHTML = "They need a bit of love.<br/><span id='powerGain'>1w/5secs</span> while in sunlight";
                // itemSolar.powerSpan = itemSolar.el.querySelector("#powerGain");
                availableResearch.splice(reIndex, 1);
                break;
            case "polishedPanels":
                gotPolishedPanels = true;
                researchedStuff.push(polishedPanels);
                if(!loadingSave) {
                    pushLog("Panels are looking dashing.<br/>Double the efficiency.");
                    createResearch("goldenPanels");
                }
                itemSolar.gain = 0.1;
                if (!gotIrishPride) {
                    if (itemSolar.gain*10 < 1) {
                        var newSeconds = 1/(itemSolar.gain*10);
                        itemSolar.powerSpan.innerHTML = "1w/" + newSeconds.toFixed(1) + "secs";
                    } else {
                        itemSolar.powerSpan.innerHTML = itemSolar.gain*10 + "w/sec";
                    }
                } else {
                    if (itemSolar.gain*20 < 1) {
                        var newSeconds = 1/(itemSolar.gain*20);
                        itemSolar.powerSpan.innerHTML = "1w/" + newSeconds.toFixed(1) + "secs";
                    } else {
                        itemSolar.powerSpan.innerHTML = itemSolar.gain*20 + "w/sec";
                    }
                }
                // itemSolar.tooltipSpan.innerHTML = "They need a bit of love.<br/><span id='powerGain'>1w/2.5secs</span> while in sunlight";
                // itemSolar.powerSpan = itemSolar.el.querySelector("#powerGain");
                availableResearch.splice(reIndex, 1);
                break;
            case "goldenPanels":
                gotGoldenPanels = true;
                researchedStuff.push(goldenPanels);
                if(!loadingSave) {
                    pushLog("Oh yes, check out dem panels.<br/>4watts per second per panel!");
                }
                itemSolar.gain = 0.4;
                if (!gotIrishPride) {
                    if (itemSolar.gain*10 < 1) {
                        var newSeconds = 1/(itemSolar.gain*10);
                        itemSolar.powerSpan.innerHTML = "1w/" + newSeconds.toFixed(1) + "secs";
                    } else {
                        itemSolar.powerSpan.innerHTML = itemSolar.gain*10 + "w/sec";
                    }
                } else {
                    if (itemSolar.gain*20 < 1) {
                        var newSeconds = 1/(itemSolar.gain*20);
                        itemSolar.powerSpan.innerHTML = "1w/" + newSeconds.toFixed(1) + "secs";
                    } else {
                        itemSolar.powerSpan.innerHTML = itemSolar.gain*20 + "w/sec";
                    }
                }
                availableResearch.splice(reIndex, 1);
                break;
            case "potatoUpgrade":
                gotPotatoUpgrade = true;
                researchedStuff.push(potatoUpgrade);
                if(!loadingSave) {
                    pushLog("Yes that's much better &mdash; no idea what kinda potato we had before. Not even sure it was a potato if I'm honest.");
                }
                itemPotato.gain = (itemPotato.gain * 3).toFixed(1);
                if (!gotIrishPride) {
                    itemPotato.powerSpan.innerHTML = numberWithCommas(itemPotato.gain*10);
                } else {
                    itemPotato.powerSpan.innerHTML = numberWithCommas(itemPotato.gain*20);
                }
                // itemPotato.tooltipSpan.innerHTML = "Genetically modified for more power output.<br/><span id='powerGain'>2</span>w/sec";
                // itemPotato.powerSpan = itemPotato.el.querySelector("#powerGain");
                availableResearch.splice(reIndex, 1);
                break;
            case "probetatoUpgrade":
                gotProbetatoUpgrade = true;
                researchedStuff.push(probetatoUpgrade);
                if(!loadingSave) {
                    pushLog("Probetato are all rooted in.");
                }
                itemProbe.gain = (itemProbe.gain * 4).toFixed(1);
                if (!gotIrishPride) {
                    itemProbe.powerSpan.innerHTML = numberWithCommas(itemProbe.gain*10);
                } else {
                    itemProbe.powerSpan.innerHTML = numberWithCommas(itemProbe.gain*20);
                }
                // itemProbe.tooltipSpan.innerHTML = "Modified spud for planetary harvesting.<br/><span id='powerGain'>16</span>w/sec | 1.5x production in free fall";
                // itemProbe.powerSpan = itemProbe.el.querySelector("#powerGain");
                availableResearch.splice(reIndex, 1);
                break;
            case "spudnikUpgrade":
                gotSpudnikUpgrade = true;
                researchedStuff.push(spudnikUpgrade);
                if(!loadingSave) {
                    pushLog("<span style='font-family:sans-serif'>&#1053;&#1077;&#1087;&#1083;&#1086;&#1093;&#1086;, &#1090;&#1086;&#1074;&#1072;&#1088;&#1080;&#1097;</span>");
                }
                itemSpudnik.gain = (itemSpudnik.gain * 3).toFixed(1);
                if (!gotIrishPride) {
                    itemSpudnik.powerSpan.innerHTML = numberWithCommas(itemSpudnik.gain*10);
                } else {
                    itemSpudnik.powerSpan.innerHTML = numberWithCommas(itemSpudnik.gain*20);
                }
                // itemSpudnik.tooltipSpan.innerHTML = "The first potato satellite.<br/><span id='powerGain'>84</span>w/sec";
                // itemSpudnik.powerSpan = itemSpudnik.el.querySelector("#powerGain");
                availableResearch.splice(reIndex, 1);
                break;
            case "potatoPlantUpgrade":
                gotPotatoPlantUpgrade = true;
                researchedStuff.push(potatoPlantUpgrade);
                if(!loadingSave) {
                    pushLog("If we keep up these tater upgrades the bloody planet will be a King Edward soon.");
                }
                itemPotatoPlant.gain = (itemPotatoPlant.gain * 3).toFixed(1);
                if (!gotIrishPride) {
                    itemPotatoPlant.powerSpan.innerHTML = numberWithCommas(itemPotatoPlant.gain*10);
                } else {
                    itemPotatoPlant.powerSpan.innerHTML = numberWithCommas(itemPotatoPlant.gain*20);
                }
                // itemPotatoPlant.tooltipSpan.innerHTML = "Mass-produce power potatoes.<br/><span id='powerGain'>460</span>w/sec";
                // itemPotatoPlant.powerSpan = itemPotatoPlant.el.querySelector("#powerGain");
                availableResearch.splice(reIndex, 1);
                break;
            case "taterTowerUpgrade":
                gotTaterTowerUpgrade = true;
                researchedStuff.push(taterTowerUpgrade);
                if(!loadingSave) {
                    pushLog("Ahh I do love a good hashie. Tater Towers production x2 &mdash; greasy stuff.");
                }
                itemTaterTower.gain = (itemTaterTower.gain * 2).toFixed(1);
                if (!gotIrishPride) {
                    itemTaterTower.powerSpan.innerHTML = numberWithCommas(itemTaterTower.gain*10);
                } else {
                    itemTaterTower.powerSpan.innerHTML = numberWithCommas(itemTaterTower.gain*20);
                }
                // itemTaterTower.tooltipSpan.innerHTML = "Mass-produce power potatoes.<br/><span id='powerGain'>2800</span>w/sec";
                // itemTaterTower.powerSpan = itemTaterTower.el.querySelector("#powerGain");
                availableResearch.splice(reIndex, 1);
                break;
            case "spudGunUpgrade":
                gotSpudGunUpgrade = true;
                researchedStuff.push(spudGunUpgrade);
                if(!loadingSave) {
                    pushLog("Solar Spuds activated &mdash; full circle!");
                }
                itemSpudGun.gain = (itemSpudGun.gain * 2).toFixed(1);
                if (!gotIrishPride) {
                    itemSpudGun.powerSpan.innerHTML = ((itemSpudGun.gain*10)/1000).toFixed(0);
                } else {
                    itemSpudGun.powerSpan.innerHTML = ((itemSpudGun.gain*20)/1000).toFixed(0);
                }
                // itemSpudGun.tooltipSpan.innerHTML = "Like a small Death Star<br/><span id='powerGain'>16,000</span>w/sec | <span id='spudGain'>1 spud/10secs</span>";
                // itemSpudGun.spudSpan = itemSpudGun.el.querySelector("#spudGain");
                // itemSpudGun.powerSpan = itemSpudGun.el.querySelector("#powerGain");
                availableResearch.splice(reIndex, 1);
                break;
            case "potatoLauncherUpgrade":
                gotPotatoLauncherUpgrade = true;
                researchedStuff.push(potatoLauncherUpgrade);
                if(!loadingSave) {
                    pushLog("Potato Launchers covered in plates, as requested. Not sure how that helps to gain power but I'll run with it!");
                }
                itemPotatoLauncher.gain = (itemPotatoLauncher.gain * 2).toFixed(1);
                if (!gotIrishPride) {
                    itemPotatoLauncher.powerSpan.innerHTML = ((itemPotatoLauncher.gain*10)/1000).toFixed(0);
                } else {
                    itemPotatoLauncher.powerSpan.innerHTML = ((itemPotatoLauncher.gain*20)/1000).toFixed(0);
                }
                // itemPotatoLauncher.tooltipSpan.innerHTML = "Like a small Starkiller Base<br/><span id='powerGain'>84,000</span>w/sec | <span id='spudGain'>1 tater/12secs</span>";
                // itemPotatoLauncher.spudSpan = itemPotatoLauncher.el.querySelector("#spudGain");
                // itemPotatoLauncher.powerSpan = itemPotatoLauncher.el.querySelector("#powerGain");
                availableResearch.splice(reIndex, 1);
                break;
            case "irishPride":
                gotIrishPride = true;
                researchedStuff.push(irishPride);
                if(!loadingSave) {
                    pushLog("Aye ya fookin' git'em lad.");
                }
                availableResearch.splice(reIndex, 1);
                for (var i = 0; i < availableItems.length; i++) {
                    if (availableItems[i].el.id == "item__solar") {
                        if (availableItems[i].gain*20 < 1) {
                            var newSeconds = 1/(availableItems[i].gain*20);
                            availableItems[i].powerSpan.innerHTML = "1w/" + newSeconds.toFixed(1) + "secs";
                        } else {
                            availableItems[i].powerSpan.innerHTML = (availableItems[i].gain*20).toFixed(0); + "w/sec";
                        }
                    } else if (availableItems[i].el.id == "item__spudGun" || availableItems[i].el.id == "item__potatoLauncher") {
                        availableItems[i].powerSpan.innerHTML = ((availableItems[i].gain*20)/1000).toFixed(0);
                    } else {
                        availableItems[i].powerSpan.innerHTML = numberWithCommas(availableItems[i].gain*20);
                    }
                }
                break;
            case "kinetigen01":
                gotKinetigen01 = true;
                researchedStuff.push(kinetigen01);
                if(!loadingSave) {
                    pushLog("The kinetic generator now gives you 3 watts every time you press it.<br/>Welcome to value town!");
                    createResearch("kinetigen02");
                }
                kinetigenGain = 3;
                var kHiFiBar = {
                    "maxHeight": walkerCanal * 0.8,
                    "height": 0,
                    "strokeHeight": 0,
                    "dir": 1,
                    "width": 4,
                    "maxSpeed": 6,
                    "speed": 0,
                    "speedRamp": 0.3,
                    "color": "#ff3e3e",
                    "xpos": kinetigenScreen.width / 2 - 8,
                    "ypos": walkerCanal,
                }
                kinetigenHiFiBars.push(kHiFiBar);

                var kHiFiBar = {
                    "maxHeight": walkerCanal * 0.8,
                    "height": 0,
                    "strokeHeight": 0,
                    "dir": 1,
                    "width": 4,
                    "maxSpeed": 6,
                    "speed": 0,
                    "speedRamp": 0.3,
                    "color": "#ff3e3e",
                    "xpos": kinetigenScreen.width / 2 + 4,
                    "ypos": walkerCanal,
                }
                kinetigenHiFiBars.push(kHiFiBar);
                availableResearch.splice(reIndex, 1);
                break;
            case "kinetigen02":
                gotKinetigen02 = true;
                researchedStuff.push(kinetigen02);
                if(!loadingSave) {
                    pushLog("Kinetigen now produces less modest 100 watts per cycle");
                    createResearch("kinetigen03");
                }
                kinetigenGain = 50;
                var kHiFiBar = {
                    "maxHeight": -(walkerCanal * 0.8),
                    "height": 0,
                    "strokeHeight": 0,
                    "dir": 0,
                    "width": 4,
                    "maxSpeed": -6,
                    "speed": 0,
                    "speedRamp": -0.3,
                    "color": "#ff3e3e",
                    "xpos": kinetigenScreen.width / 2 - 2,
                    "ypos": kinetigenScreen.height - walkerCanal + 2,
                }
                kinetigenHiFiBars.push(kHiFiBar);
                var kHiFiBar = {
                    "maxHeight": -(walkerCanal * 0.7),
                    "height": 0,
                    "strokeHeight": 0,
                    "dir": 0,
                    "width": 4,
                    "maxSpeed": -6,
                    "speed": 0,
                    "speedRamp": -0.3,
                    "color": "#ff3e3e",
                    "xpos": kinetigenScreen.width / 2 - 8,
                    "ypos": kinetigenScreen.height - walkerCanal + 2,
                }
                kinetigenHiFiBars.push(kHiFiBar);

                var kHiFiBar = {
                    "maxHeight": -(walkerCanal * 0.7),
                    "height": 0,
                    "strokeHeight": 0,
                    "dir": 0,
                    "width": 4,
                    "maxSpeed": -6,
                    "speed": 0,
                    "speedRamp": -0.3,
                    "color": "#ff3e3e",
                    "xpos": kinetigenScreen.width / 2 + 4,
                    "ypos": kinetigenScreen.height - walkerCanal + 2,
                }
                kinetigenHiFiBars.push(kHiFiBar);
                availableResearch.splice(reIndex, 1);
                break;
            case "kinetigen03":
                gotKinetigen03 = true;
                researchedStuff.push(kinetigen03);
                if(!loadingSave) {
                    pushLog("Kinetigen now produces an admirable 500 watts per cycle");
                    createResearch("kinetigen04");
                }
                kinetigenGain = 500;

                var kHiFiBar = {
                    "maxHeight": walkerCanal * 0.7,
                    "height": 0,
                    "strokeHeight": 0,
                    "dir": 1,
                    "width": 4,
                    "maxSpeed": 6,
                    "speed": 0,
                    "speedRamp": 0.45,
                    "color": "rgb(0, 255, 194)",
                    "xpos": kinetigenScreen.width / 2 - 14,
                    "ypos": walkerCanal,
                }
                kinetigenHiFiBars.push(kHiFiBar);

                var kHiFiBar = {
                    "maxHeight": walkerCanal * 0.6,
                    "height": 0,
                    "strokeHeight": 0,
                    "dir": 1,
                    "width": 4,
                    "maxSpeed": 6,
                    "speed": 0,
                    "speedRamp": 0.45,
                    "color": "rgb(0, 255, 194)",
                    "xpos": kinetigenScreen.width / 2 - 20,
                    "ypos": walkerCanal,
                }
                kinetigenHiFiBars.push(kHiFiBar);

                var kHiFiBar = {
                    "maxHeight": walkerCanal * 0.7,
                    "height": 0,
                    "strokeHeight": 0,
                    "dir": 1,
                    "width": 4,
                    "maxSpeed": 6,
                    "speed": 0,
                    "speedRamp": 0.45,
                    "color": "rgb(0, 255, 194)",
                    "xpos": kinetigenScreen.width / 2 + 10,
                    "ypos": walkerCanal,
                }
                kinetigenHiFiBars.push(kHiFiBar);

                var kHiFiBar = {
                    "maxHeight": walkerCanal * 0.6,
                    "height": 0,
                    "strokeHeight": 0,
                    "dir": 1,
                    "width": 4,
                    "maxSpeed": 6,
                    "speed": 0,
                    "speedRamp": 0.45,
                    "color": "rgb(0, 255, 194)",
                    "xpos": kinetigenScreen.width / 2 + 16,
                    "ypos": walkerCanal,
                }
                kinetigenHiFiBars.push(kHiFiBar);

                var kHiFiBar = {
                    "maxHeight": -(walkerCanal * 0.6),
                    "height": 0,
                    "strokeHeight": 0,
                    "dir": 0,
                    "width": 4,
                    "maxSpeed": -6,
                    "speed": 0,
                    "speedRamp": -0.45,
                    "color": "rgb(0, 255, 194)",
                    "xpos": kinetigenScreen.width / 2 - 14,
                    "ypos": kinetigenScreen.height - walkerCanal + 2,
                }
                kinetigenHiFiBars.push(kHiFiBar);

                var kHiFiBar = {
                    "maxHeight": -(walkerCanal * 0.5),
                    "height": 0,
                    "strokeHeight": 0,
                    "dir": 0,
                    "width": 4,
                    "maxSpeed": -6,
                    "speed": 0,
                    "speedRamp": -0.45,
                    "color": "rgb(0, 255, 194)",
                    "xpos": kinetigenScreen.width / 2 - 20,
                    "ypos": kinetigenScreen.height - walkerCanal + 2,
                }
                kinetigenHiFiBars.push(kHiFiBar);

                var kHiFiBar = {
                    "maxHeight": -(walkerCanal * 0.6),
                    "height": 0,
                    "strokeHeight": 0,
                    "dir": 0,
                    "width": 4,
                    "maxSpeed": -6,
                    "speed": 0,
                    "speedRamp": -0.45,
                    "color": "rgb(0, 255, 194)",
                    "xpos": kinetigenScreen.width / 2 + 10,
                    "ypos": kinetigenScreen.height - walkerCanal + 2,
                }
                kinetigenHiFiBars.push(kHiFiBar);

                var kHiFiBar = {
                    "maxHeight": -(walkerCanal * 0.5),
                    "height": 0,
                    "strokeHeight": 0,
                    "dir": 0,
                    "width": 4,
                    "maxSpeed": -6,
                    "speed": 0,
                    "speedRamp": -0.45,
                    "color": "rgb(0, 255, 194)",
                    "xpos": kinetigenScreen.width / 2 + 16,
                    "ypos": kinetigenScreen.height - walkerCanal + 2,
                }
                kinetigenHiFiBars.push(kHiFiBar);

                availableResearch.splice(reIndex, 1);
                break;
            case "kinetigen04":
                gotKinetigen04 = true;
                researchedStuff.push(kinetigen04);
                if(!loadingSave) {
                    pushLog("Kinetigen now produces a flippin' 10,000 watts per cycle");
                    ga('set', {
                                'userId': USER_ID,
                                'dimension1': shipName,
                                'dimension2': USER_ID,
                                'metric16': 1
                              });
                    ga('send', 'pageview');
                    ga('set', {
                                'metric16': 0
                              });
                }
                kinetigenGain = 10000;

                var kHiFiBar = {
                    "maxHeight": walkerCanal * 0.5,
                    "height": 0,
                    "strokeHeight": 0,
                    "dir": 1,
                    "width": 4,
                    "maxSpeed": 6,
                    "speed": 0,
                    "speedRamp": 0.6,
                    "color": "#ffdf5a",
                    "xpos": kinetigenScreen.width / 2 - 26,
                    "ypos": walkerCanal,
                }
                kinetigenHiFiBars.push(kHiFiBar);

                var kHiFiBar = {
                    "maxHeight": walkerCanal * 0.4,
                    "height": 0,
                    "strokeHeight": 0,
                    "dir": 1,
                    "width": 4,
                    "maxSpeed": 6,
                    "speed": 0,
                    "speedRamp": 0.6,
                    "color": "#ffdf5a",
                    "xpos": kinetigenScreen.width / 2 - 32,
                    "ypos": walkerCanal,
                }
                kinetigenHiFiBars.push(kHiFiBar);

                var kHiFiBar = {
                    "maxHeight": walkerCanal * 0.3,
                    "height": 0,
                    "strokeHeight": 0,
                    "dir": 1,
                    "width": 4,
                    "maxSpeed": 6,
                    "speed": 0,
                    "speedRamp": 0.6,
                    "color": "#ffdf5a",
                    "xpos": kinetigenScreen.width / 2 - 38,
                    "ypos": walkerCanal,
                }
                kinetigenHiFiBars.push(kHiFiBar);

                var kHiFiBar = {
                    "maxHeight": walkerCanal * 0.5,
                    "height": 0,
                    "strokeHeight": 0,
                    "dir": 1,
                    "width": 4,
                    "maxSpeed": 6,
                    "speed": 0,
                    "speedRamp": 0.6,
                    "color": "#ffdf5a",
                    "xpos": kinetigenScreen.width / 2 + 22,
                    "ypos": walkerCanal,
                }
                kinetigenHiFiBars.push(kHiFiBar);

                var kHiFiBar = {
                    "maxHeight": walkerCanal * 0.4,
                    "height": 0,
                    "strokeHeight": 0,
                    "dir": 1,
                    "width": 4,
                    "maxSpeed": 6,
                    "speed": 0,
                    "speedRamp": 0.6,
                    "color": "#ffdf5a",
                    "xpos": kinetigenScreen.width / 2 + 28,
                    "ypos": walkerCanal,
                }
                kinetigenHiFiBars.push(kHiFiBar);

                var kHiFiBar = {
                    "maxHeight": walkerCanal * 0.3,
                    "height": 0,
                    "strokeHeight": 0,
                    "dir": 1,
                    "width": 4,
                    "maxSpeed": 6,
                    "speed": 0,
                    "speedRamp": 0.6,
                    "color": "#ffdf5a",
                    "xpos": kinetigenScreen.width / 2 + 34,
                    "ypos": walkerCanal,
                }
                kinetigenHiFiBars.push(kHiFiBar);

                var kHiFiBar = {
                    "maxHeight": -(walkerCanal * 0.4),
                    "height": 0,
                    "strokeHeight": 0,
                    "dir": 0,
                    "width": 4,
                    "maxSpeed": -6,
                    "speed": 0,
                    "speedRamp": -0.6,
                    "color": "#ffdf5a",
                    "xpos": kinetigenScreen.width / 2 - 26,
                    "ypos": kinetigenScreen.height - walkerCanal + 2,
                }
                kinetigenHiFiBars.push(kHiFiBar);

                var kHiFiBar = {
                    "maxHeight": -(walkerCanal * 0.3),
                    "height": 0,
                    "strokeHeight": 0,
                    "dir": 0,
                    "width": 4,
                    "maxSpeed": -6,
                    "speed": 0,
                    "speedRamp": -0.6,
                    "color": "#ffdf5a",
                    "xpos": kinetigenScreen.width / 2 - 32,
                    "ypos": kinetigenScreen.height - walkerCanal + 2,
                }
                kinetigenHiFiBars.push(kHiFiBar);

                var kHiFiBar = {
                    "maxHeight": -(walkerCanal * 0.2),
                    "height": 0,
                    "strokeHeight": 0,
                    "dir": 0,
                    "width": 4,
                    "maxSpeed": -6,
                    "speed": 0,
                    "speedRamp": -0.6,
                    "color": "#ffdf5a",
                    "xpos": kinetigenScreen.width / 2 - 38,
                    "ypos": kinetigenScreen.height - walkerCanal + 2,
                }
                kinetigenHiFiBars.push(kHiFiBar);

                var kHiFiBar = {
                    "maxHeight": -(walkerCanal * 0.4),
                    "height": 0,
                    "strokeHeight": 0,
                    "dir": 0,
                    "width": 4,
                    "maxSpeed": -6,
                    "speed": 0,
                    "speedRamp": -0.6,
                    "color": "#ffdf5a",
                    "xpos": kinetigenScreen.width / 2 + 22,
                    "ypos": kinetigenScreen.height - walkerCanal + 2,
                }
                kinetigenHiFiBars.push(kHiFiBar);

                var kHiFiBar = {
                    "maxHeight": -(walkerCanal * 0.3),
                    "height": 0,
                    "strokeHeight": 0,
                    "dir": 0,
                    "width": 4,
                    "maxSpeed": -6,
                    "speed": 0,
                    "speedRamp": -0.6,
                    "color": "#ffdf5a",
                    "xpos": kinetigenScreen.width / 2 + 28,
                    "ypos": kinetigenScreen.height - walkerCanal + 2,
                }
                kinetigenHiFiBars.push(kHiFiBar);

                var kHiFiBar = {
                    "maxHeight": -(walkerCanal * 0.2),
                    "height": 0,
                    "strokeHeight": 0,
                    "dir": 0,
                    "width": 4,
                    "maxSpeed": -6,
                    "speed": 0,
                    "speedRamp": -0.6,
                    "color": "#ffdf5a",
                    "xpos": kinetigenScreen.width / 2 + 34,
                    "ypos": kinetigenScreen.height - walkerCanal + 2,
                }
                kinetigenHiFiBars.push(kHiFiBar);

                availableResearch.splice(reIndex, 1);
                break;
            case "heatshields":
                gotHeatshields = true;
                researchedStuff.push(heatshields);
                if(!loadingSave) {
                    pushLog("All potatoes are now foil-wrapped to withstand re-entry heat & the odd fan-assisted oven.");
                }
                availableResearch.splice(reIndex, 1);
                break;
            // case "parachutes":
            //     gotParachutes = true;
            //     researchedStuff.push(parachutes);
            //     if(!loadingSave) {
            //         pushLog("Parachutes added to all probetatoes.");
            //     }
            //     availableResearch.splice(reIndex, 1);
            //     break;
            case "solarAmbience":
                gotSolarAmbience = true;
                researchedStuff.push(solarAmbience);
                if(!loadingSave) {
                    pushLog("Solar panels now generate power from ambient light.");
                }
                solarAmbienceGain = 0.25;
                availableResearch.splice(reIndex, 1);
                break;
            case "systView":
                gotSystView = true;
                researchedStuff.push(systView);
                if(!loadingSave) {
                    pushLog("Right, check the System Peeker. Let's get this story straight.");
										systViewButton.style.animationName = 'header_flash';
										systViewButton.style.animationDuration = '1s';
										systViewButton.style.animationIterationCount = 'infinite';
                    // queueLog(800, "Yep! Pretty likely we're on Earth.<br/>Right. So, my plan. This'll sound silly, but bare with me.");
                    // queueLog(800, "The following is all based on my total misunderstanding of this Stephen Hawkings book I just picked up in my data thingy...");
                    // queueLog(800, "So, according to this disproven 'Big Crunch' theory, the universe at some point is going to reverse direction and all mush together.");
                    // queueLog(800, "If I've misunderstood correctly, time MIGHT go backwards during the shrinking of spacetime. Probably not but let's go with it...")
                    // queueLog(1000, "If - right - we put these huge, fuck-off-massive boosters onto this planet, then we can remain in a stable orbit while firing more taters into the sun...");
                    // queueLog(600, "This will increase it's mass, meaning that we'll have to go faster to stay in it's orbit.");
                    // queueLog(800, "The faster we go, the slower our perception of time relative to the universe - time travel! Matthew McConaughey type shit!");
                    // queueLog(1000, "With enough mass, the sun will collapse in on itself into a black hole type deal. At this point we can approach it's event horizon.");
                    // queueLog(1300, "At this point, time will become infinite. Now I'm 90% sure that this is a euphemism for madenning death, but I'm a robot who can't feel and you're a person experiencing a very linear narrative so...");
                    // queueLog(800, "With time being infitnite we'll reach the big crunchey-crunch in no time. Or infinite time, I'm pretty confused at this point.");
                    // queueLog(1200, "Anyway, THEN we'll probably? Get a big ol' bang. Time reverses and goes back to going forward. Hopefully the universe ends up in a more-or-less identical state to before, but this time we (I) know how the human race dies!");
                    // queueLog(1000, "We return to Earth, let them know. We're heroes. Roll credits.");
                    // queueLog(800, "Fuck off with your plot holes.<br/>Let's do this.");

                    // pushLog("Lets go future wadap.");

                }
                systViewButton.style.display = 'inline';
                systViewButton.style.cursor = 'pointer';
                availableResearch.splice(reIndex, 1);
                break;
            case "hopperHeatshields":
                gotHopperHeatshields = true;
                researchedStuff.push(hopperHeatshields);
                if(!loadingSave) {
                    pushLog(shipName + "'s person-pod is ready for separation. Ship will remain in orbit for thing-making operations.<br/>It'll take a trolley-load of power to get us out of orbit &mdash; fire when ready, using the Idea Lister.");
                    createResearch("landship");
                    // createResearch("hopperLanding");
                }
                availableResearch.splice(reIndex, 1);
                break;
            // case "hopperLanding":
            //     gotHopperLanding = true;
            //     researchedStuff.push(hopperLanding);
            //     if(!loadingSave) {
            //         pushLog(shipName + "'s person-pod is ready for some crashy-crashy land-and-mashy.");
            //         createResearch("landship");
            //     }
            //     availableResearch.splice(reIndex, 1);
            //     break;
            case "landship":
                researchedStuff.push(landship);
                gotLandship = true;
                if(!loadingSave) {
                    if (!thingMuted) {
                        podLaunch__sound.play();
                    }
                    shipReleaseFailSafe = true;

                    setTimeout(function() {
                        userPod = new PhysicsBody("pod", userBody.pos[0], userBody.pos[1], 3, userBody.vel[0]*0.6, userBody.vel[1]*0.6, 10, "#3060cf",    planetOne);
                        physicsBodies.push(userPod);

                        for (var i = 0; i < probeParticleCount; i++) {
                            var probeParticleLife = getRandomInt(probeParticleLifeMin, probeParticleLifeMax);
                            var particleVelX = getRandomInt(2, 4);
                            var particleVelY = getRandomInt(2, 4);
                            var newParticle = new PhysicsBody('particle', userBody.pos[0] + (userBody.radius/2), userBody.pos[1] + (userBody.radius/2), 1, userBody.vel[0]/particleVelX, userBody.vel[1]/particleVelY, 4, "rgba(255, 255, 255, 0.5)", planetOne);
                            newParticle.life = probeParticleLife;
                            orbitParticles.push(newParticle);

                        }
                        shipReleaseFailSafe = false;
                    }, 600);

                    queueLog(66, "Ejecting pod for atmospheric entry...");
                    queueLog(3, "With our separation from the<br/>" + shipName + ", our Thing Maker can focus on bigger things.");
                    shipStatusSpan.innerHTML = "<span>Ship Status:</span> lonely";
                    // userBody.vel[0] *= 0.6;
                    // userBody.vel[1] *= 0.6;
                    // for (var x = 0; x < physicsBodies.length; x++) {
                    //     if (physicsBodies[x] == userBody) {
                    //         physicsBodies.splice(x, 1);
                    //     }
                    // }
                }
                // userBody.landingZone = getRndBias(15, 40, 0, 1);
                // userBody.terminalVelocity__set = false;
                availableResearch.splice(reIndex, 1);
                break;
            case "landshipAgain":
                gotLandship = true;
                gotLandshipAgain = true;
                researchedStuff.push(landshipAgain);
                if(!loadingSave) {
                    landingStage = "space";
                    pushLog(shipName + " is firing boosters for atmospheric entry...");
                    userBody.vel[0] *= 0.6;
                    userBody.vel[1] *= 0.6;
                    for (var x = 0; x < physicsBodies.length; x++) {
                        if (physicsBodies[x] == userBody) {
                            physicsBodies.splice(x, 1);
                        }
                    }

                    for (var i = 0; i < probeParticleCount; i++) {
                        var probeParticleLife = getRandomInt(probeParticleLifeMin, probeParticleLifeMax);
                        var particleVelX = getRandomInt(2, 4);
                        var particleVelY = getRandomInt(2, 4);
                        var newParticle = new PhysicsBody('particle', userBody.pos[0] + (userBody.radius/2), userBody.pos[1] + (userBody.radius/2), 1, userBody.vel[0]/particleVelX, userBody.vel[1]/particleVelY, 4, "rgba(255, 255, 255, 0.5)", planetOne);
                        newParticle.life = probeParticleLife;
                        orbitParticles.push(newParticle);

                    }
                    if (!thingMuted) {
                        podLaunch__sound.play();
                    }
                }
                availableResearch.splice(reIndex, 1);
                break;
            case "planetBoosters":
                gotPlanetBoosters = true;
                researchedStuff.push(planetBoosters);
                if(!loadingSave) {
                    queueLog(132, "Excellent! Earth the space ship, ready for time travel stuff.");
                    queueLog(132, "Build Spud Guns to increase the sun's mass, increasing our speed and therefore speeding up time...<br/>or whatever.");
                    queueLog(132, "The more things you've built &mdash; solar panels, probetatoes, etc. &mdash; the higher the mass of the spuds & taters that we can fire into the sun.");
                    for (var i = 0; i < physicsBodies2.length; i++) {

                        if (physicsBodies2[i].type === "planetOne") {

                            physicsBodies2.splice(i, 1);
                        }
                    }
                    planetOneRad = Math.sqrt(Math.pow(sPlanetOne.gravSrc.pos[0] - sPlanetOne.pos[0], 2) + Math.pow(sPlanetOne.gravSrc.pos[1] - sPlanetOne.pos[1], 2));
                    sol.radius -= (sol.mass / blackHoleMass) * sunCollapseRadius;
                    solStartRad = sol.radius;
                    createResearch("irishPride");
                    shipStatusSpan.innerHTML = "<span>Ship Status:</span> planet?";
                }

                var totalItemCount = 0;
                for (var i = 0; i < availableItems.length; i++) {
                    if (availableItems[i].el.id != "item__spudGun" && availableItems[i].el.id != "item__potatoLauncher") {
                        totalItemCount += availableItems[i].currentCount;
                    }
                }

                if (itemSpudGun != undefined) {
                    itemSpudGun.conditions = true;
                    itemSpudGun.costLineSpan.innerHTML = "<span id='cost'>" + numberWithCommas(itemSpudGun.currentCost) + "</span> power";
                    itemSpudGun.costSpan = itemSpudGun.el.querySelector("#cost");
                    if (itemSpudGun.revealed == true) {
                        spudMassMultiplier = (totalItemCount*6).toFixed(0);
                        itemSpudGun.spudSpan.innerHTML = spudMass*spudMassMultiplier;
                    }
                }
                if (itemPotatoLauncher != undefined) {
                    itemPotatoLauncher.conditions = true;
                    itemPotatoLauncher.costLineSpan.innerHTML = "<span id='cost'>" + numberWithCommas(itemPotatoLauncher.currentCost) + "</span> power";
                    itemPotatoLauncher.costSpan = itemPotatoLauncher.el.querySelector("#cost");
                    if (itemPotatoLauncher.revealed == true) {
                        taterMassMultiplier = (totalItemCount*6).toFixed(0);
                        itemPotatoLauncher.spudSpan.innerHTML = taterMass*taterMassMultiplier;
                    }
                }


                sunMassProgress.style.display = "block";
                sunMassProgress.max = blackHoleMass;
                sunMassProgress.value = sol.mass;
                // status__surface.style.display = "none";
                status__atmosphere.style.display = "none";
                status__inhabitants.style.display = "none";
                statusLog.push(sunMassProgress);
                availableResearch.splice(reIndex, 1);
                break;
            case "approachEventHorizon":
                gotApproachEventHorizon = true;
                researchedStuff.push(approachEventHorizon);
                if(!loadingSave) {
                    pushLog("Approaching event horizon...<br/>As we get closer and faster, time will move faster around us... See you after the Big Crunch.");
                }
                availableResearch.splice(reIndex, 1);

                clearInterval(saveInter);
                options__save.style.background = "rgb(18, 148, 117)";
                options__save.style.borderColor = "rgb(18, 148, 117)";
                options__savefreq30s.style.borderColor = "#767676";
                options__savefreq30s.style.color = "#767676";
                options__savefreq60s.style.borderColor = "#767676";
                options__savefreq60s.style.color = "#767676";
                options__savefreq5m.style.borderColor = "#767676";
                options__savefreq5m.style.color = "#767676";
                options__savefreq30m.style.borderColor = "#767676";
                options__savefreq30m.style.color = "#767676";
                options__autosaveY.style.borderColor = "#767676";
                options__autosaveY.style.color = "#767676";
                options__autosaveN.style.borderColor = "#767676";
                options__autosaveN.style.color = "#767676";

                switch (thingSaveFreq) {
                    case "30s":
                        options__savefreq30s.style.color = "#161419";
                        options__savefreq30s.style.background = "#767676";
                        break;
                    case "60s":
                        options__savefreq60s.style.color = "#161419";
                        options__savefreq60s.style.background = "#767676";
                        break;
                    case "5m":
                        options__savefreq5m.style.color = "#161419";
                        options__savefreq5m.style.background = "#767676";
                        break;
                    case "30m":
                        options__savefreq30m.style.color = "#161419";
                        options__savefreq30m.style.background = "#767676";
                        break;
                }
                if (thingAutoSave == true) {
                    options__autosaveY.style.background = "#767676";
                    options__autosaveY.style.color = "#161419";
                } else if (thingAutoSave == false) {
                    options__autosaveN.style.background = "#767676";
                    options__autosaveN.style.color = "#161419";
                }

                break;
        }

        researchToDevelop.el.parentNode.removeChild(researchToDevelop.el);

        // updateResources();
        updateResourceGain();
        checkItems();
        checkResearch();
    }
}


function checkResearch() {

    for (var i = 0; i < availableResearch.length; i++) {
        if (power >= availableResearch[i].cost) {
            availableResearch[i].el.className = "manufacture__item";
            availableResearch[i].costLineSpan.style.color = "#00ffc2";
        } else {
            availableResearch[i].el.className = "manufacture__item--locked";
            availableResearch[i].costLineSpan.style.color = "#ff3e3e";
        }
    }

    if (inhabitants__data < inhabitants__dataNeeded && inhabitants__started) {
        inhabitants__data += powerGain;
        inhabitantsProgress.value = inhabitants__data;
        status__inhabitants.innerHTML = numberWithCommas(inhabitants__data.toFixed(0)) + "/" + numberWithCommas(inhabitants__dataNeeded.toFixed(0)) + " <span class='status__container__span'>(" + ((inhabitants__data/inhabitants__dataNeeded)*100).toFixed(0) + "%) until we work out what this thing is.</span>";
        if (inhabitants__data >= inhabitants__dataNeeded) {
            status__gravSrc.innerHTML = "Orbiting mass: <span class='status__container__span'>Earth</span>";
            status__gravSrc.style.background = statusNotificationCol;
            status__inhabitants.innerHTML = "Inhabitants: <span>all dead</span>";
            status__inhabitants.style.background = statusNotificationCol;
            inhabitantsProgress.style.display = 'none';
            queueLog(132, "Comparing the data to what little info I have on file, it looks like we're on our home planet Terra, which can't be right as it's meant to not be dead...");
            queueLog(132, "If that's correct, it must be the year " + realDate.getFullYear() + ". I've updated our date records.");
            queueLog(132, "Develop landing technology &#8212; I want to get a closer look at this thing.");
            inhabitants__discovered = true;
            createResearch("hopperHeatshields");
            setTimeout(statusNotification, notificationDelay);
        }
    }
}



function createResearch(title) {
    switch(title) {
        case "cleanPanels":
            cleanPanels = new ResearchConstruct("cleanPanels", cleanPanels__cost, "Clean Solar Panels", "power", "The solar panels are covered in red dust.<br/>Clean them for 3w / 10 seconds.", icon__cleanPanels);
            availableResearch.push(cleanPanels);
            break;
        case "polishedPanels":
            polishedPanels = new ResearchConstruct("polishedPanels", polishedPanels__cost, "Polished Solar Panels", "power", "Get some Mr.Sheen on those bad boys<br/>for 1watt per second.", icon__polishedPanels);
            availableResearch.push(polishedPanels);
            break;
        case "goldenPanels":
            goldenPanels = new ResearchConstruct("goldenPanels", goldenPanels__cost, "Golden Solar Panels", "power", "We can afford a bit of luxury.<br/>Panels will produce 4w / second.", icon__goldenPanels);
            availableResearch.push(goldenPanels);
            break;
        case "heatshields":
            heatshields = new ResearchConstruct("heatshields", heatShields__cost, "Probetato Foil", "power", "Wrap them in foil to stop them burning.<br/>Perhaps add some Lea & Perrins?", icon__probetatoFoil);
            availableResearch.push(heatshields);
            break;
        // case "parachutes":
        //     parachutes = new ResearchConstruct("parachutes", parachutes__cost, "Probetato 'chutes", "power", "TOOLTIPPLACEHOLDER");
        //     availableResearch.push(parachutes);
        //     break;
        case "solarAmbience":
            solarAmbience = new ResearchConstruct("solarAmbience", solarAmbience__cost, "Solar Ambience", "power", "Upgraded solar panels will produce<br/>0.25x in shadow through ambient light.", icon__solarAmbience);
            availableResearch.push(solarAmbience);
            break;
        case "hopperHeatshields":
            hopperHeatshields = new ResearchConstruct("hopperHeatshields", hopperHeatshields__cost, "Pod Module", "power", "Prepare escape pod for a harsh landing.<br/>Ship will remain in orbit producing things.", icon__podModule);
            availableResearch.push(hopperHeatshields);
            break;
        // case "hopperLanding":
        //     hopperLanding = new ResearchConstruct("hopperLanding", hopperLanding__cost, "Pod Landing Stuff", "power", "Add capability for your " + shipName + " to elegantly (crash) land.");
        //     availableResearch.push(hopperLanding);
        //     break;
        case "landship":
            landship = new ResearchConstruct("landship", landship__cost, "Return to Earth.", "power", "Eject from your hopper and return to Earth.", icon__landship);
            availableResearch.push(landship);
            break;
        case "systView":
            systView = new ResearchConstruct("systView", systView__cost, "System Peeker", "power", "Upgrade the radar thing. <br/>See the local system", icon__systemView);
            availableResearch.push(systView);
            break;
        case "planetBoosters":
            planetBoosters = new ResearchConstruct("planetBoosters", planetBoosters__cost, "Planet Boosters", "power", "We'll need to increase our velocity to remain in orbit as Sol's mass is increased.", icon__planetBoosters);
            availableResearch.push(planetBoosters);
            break;
        case "approachEventHorizon":
            approachEventHorizon = new ResearchConstruct("approachEventHorizon", approachEventHorizon__cost, "Approach Hole", "power", "Time will become infinite.<br/>Or you'll full-on die? This is just silly.", icon__approachEventHorizon);
            availableResearch.push(approachEventHorizon);
            break;
        case "kinetigen01":
            kinetigen01 = new ResearchConstruct("kinetigen01", kinetigen01__cost, "Kinetigen Tweak", "power", "Messing with the kinetic generator's internals will get us 3 watts per cycle.", icon__kinetigen01);
            availableResearch.push(kinetigen01);
            break;
        case "kinetigen02":
            kinetigen02 = new ResearchConstruct("kinetigen02", kinetigen02__cost, "Kinetigen Overclock", "power", "Upgrade the Kinetigen to produce 100 watts per click.", icon__kinetigen02);
            availableResearch.push(kinetigen02);
            break;
        case "kinetigen03":
            kinetigen03 = new ResearchConstruct("kinetigen03", kinetigen03__cost, "Atomic Kinetigen", "power", "Each Kinetigen press could power a small town &#8212; 500watts per click.", icon__kinetigen03);
            availableResearch.push(kinetigen03);
            break;
        case "kinetigen04":
            kinetigen04 = new ResearchConstruct("kinetigen04", kinetigen04__cost, "Super Kinetigen", "power", "Each Kinetigen press is enough to make the galaxy wince &#8212; 10,000watts per click.", icon__kinetigen04);
            availableResearch.push(kinetigen04);
            break;
        case "landshipAgain"://DONT ADD TO SAVE
            landshipAgain = new ResearchConstruct("landshipAgain", landshipAgain__cost, "Return to ReEarth.", "power", "Return to Earth for the first time in &infin; years again.", icon__landshipAgain);
            availableResearch.push(landshipAgain);
            break;
        case "spudnikUpgrade":
            spudnikUpgrade = new ResearchConstruct("spudnikUpgrade", spudnikUpgrade__cost, "Golden Spudnik Foil", "power", "Reflect power back to your ship efficiently.<br/>Spudnik power-gain x3", icon__spudnikUpgrade);
            availableResearch.push(spudnikUpgrade);
            break;
        case "potatoUpgrade":
            potatoUpgrade = new ResearchConstruct("potatoUpgrade", potatoUpgrade__cost, "Maris Pipers", "power", "Quality mash.<br/>Potato power-gain x3", icon__potatoUpgrade);
            availableResearch.push(potatoUpgrade);
            break;
        case "probetatoUpgrade":
            probetatoUpgrade = new ResearchConstruct("probetatoUpgrade", probetatoUpgrade__cost, "Probetato Roots", "power", "Bore further into the surface for more gains.<br/>Probetato power-gain x4", icon__probetatoUpgrade);
            availableResearch.push(probetatoUpgrade);
            break;
        case "potatoPlantUpgrade":
            potatoPlantUpgrade = new ResearchConstruct("potatoPlantUpgrade", potatoPlantUpgrade__cost, "PotatoPlant Roots", "power", "Suck the nutrients out of the surface.<br/>PotatoPlant power-gain x3", icon__potatoplantUpgrade);
            availableResearch.push(potatoPlantUpgrade);
            break;
        case "taterTowerUpgrade":
            taterTowerUpgrade = new ResearchConstruct("taterTowerUpgrade", taterTowerUpgrade__cost, "Monolithic Hashies", "power", "Unhealthier they must be good right?<br/>TaterTower power-gain x2", icon__taterUpgrade);
            availableResearch.push(taterTowerUpgrade);
            break;
        case "spudGunUpgrade":
            spudGunUpgrade = new ResearchConstruct("spudGunUpgrade", spudGunUpgrade__cost, "SolarSpuds", "power", "Line the spudguns with solar panels<br/>Spudgun power-gain x2", icon__spudgunUpgrade);
            availableResearch.push(spudGunUpgrade);
            break;
        case "potatoLauncherUpgrade":
            potatoLauncherUpgrade = new ResearchConstruct("potatoLauncherUpgrade", potatoLauncherUpgrade__cost, "Plated Launchers", "power", "Cover the launchers in reflective panels.<br/>Potato Launcher power-gain x2", icon__potatoLauncherUpgrade);
            availableResearch.push(potatoLauncherUpgrade);
            break;
        case "irishPride":
            irishPride = new ResearchConstruct("irishPride", irishPride__cost, "Irish Pride", "power", "All potato things produce twice the power.", icon__irishPride);
            availableResearch.push(irishPride);
            break;
    }
}





var powerSpan = document.getElementById("watts--total");
var powerGainSpan = document.getElementById("watts--ps");

var power = 0;
var totalPowerProduced = 0;
var data = 0;
var totalSolarProduced = 0;
var firedSpuds = 0;
var firedTaters = 0;

var solarAmbienceGain = 0;
var powerGain = 0;

var sunlight = 1;

var powerLastTurn = 0; //ADD TO SAVE

var oneHundredMil;
var oneHundredMilPrev;


var updateResources = function() {
    if (shipInSunlight) {
        sunlight = 1;
    } else {
        sunlight = solarAmbienceGain;
    }

    powerGain = 0;
    for (var i = 0; i < availableItems.length; i++) {
        if (availableItems[i].el.id == "item__solar") {
            var localSolarGain = (availableItems[i].currentCount * availableItems[i].gain * sunlight);
            powerGain += localSolarGain;
            if (gotIrishPride) {
                powerGain += powerGain;
            }
            totalSolarProduced += localSolarGain;
        } else if (availableItems[i].el.id == "item__probe") {
            var localProbeGain = (probes.length * availableItems[i].gain * 1.5);
            localProbeGain += (landedProbes.length * availableItems[i].gain);
            powerGain += localProbeGain;
            if (gotIrishPride) {
                powerGain += localProbeGain;
            }
        } else if (availableItems[i].el.id == "item__potatoPlant") {
            var localPotatoPlantGain = landedPotatoPlants.length * availableItems[i].gain;
            powerGain += localPotatoPlantGain;
            if (gotIrishPride) {
                powerGain += localPotatoPlantGain;
            }
        } else if (availableItems[i].el.id == "item__taterTower") {
            var localTaterTowerGain = landedTaterTowers.length * availableItems[i].gain;
            powerGain += localTaterTowerGain;
            if (gotIrishPride) {
                powerGain += localTaterTowerGain;
            }
        } else {
            powerGain += (availableItems[i].currentCount * availableItems[i].gain);
            if (gotIrishPride) {
                powerGain += (availableItems[i].currentCount * availableItems[i].gain);
            }
        }
        if (!blackHoleMade) {
            if (availableItems[i].el.id == "item__spudGun") {
                firedSpuds += (availableItems[i].currentCount * spudGunRate);
            }
            if (availableItems[i].el.id == "item__potatoLauncher") {
                firedTaters += (availableItems[i].currentCount * taterGunRate);
            }
        }
    }

    if (power > 99999999) {
        oneHundredMil = true;
    } else {
        oneHundredMil = false;
    }
    if (oneHundredMil != oneHundredMilPrev) {
        if (oneHundredMil == true) {
            powerSpan.style.fontSize = 34 + 'px';
        } else {
            powerSpan.style.fontSize = 45 + 'px';
        }
    }

    power += powerGain;
    totalPowerProduced += powerGain;

    oneHundredMilPrev = oneHundredMil;

    powerSpan.innerHTML = numberWithCommas(power.toFixed(0));

    updateResourceGain();
    checkItems();
    checkResearch();

    if (intro) {
        if (powerLastTurn != power.toFixed(0)) {

            var powerDiff = power.toFixed(0) - powerLastTurn;



            if (powerDiff > totalNeeded) {
                powerDiff = totalNeeded;
            }

            for (var i = 0; i < powerDiff; i++) {

                switch (screentoActivate) {
                    case "thingMaker":
                        tmAddStuff();
                        break;
                    case "develop":
                        deAddStuff();
                        break;
                    case "information":
                        inAddStuff();
                        break;
                    case "center":
                        cpAddStuff();
                        break;
                }

            }
        }
        powerLastTurn = power.toFixed(0);
    }
}
setInterval(updateResources, 100);


var updateResourceGain = function() {

    var powerGainedFixed = 0;

    powerGainedFixed = (powerGain * 10);
    powerGainSpan.innerHTML = numberWithCommas(Math.round( powerGainedFixed * 10 ) / 10);

}





var canvasWrap = document.getElementById("wrapper--center");
var oCanvas = document.getElementById("center__canvas");
var octx = oCanvas.getContext("2d");

var bigG = 6.673e-4; //gravitational number

var orientation = "";

oCanvas.width = canvasWrap.offsetWidth;
oCanvas.height = canvasWrap.offsetHeight;
if (oCanvas.width > oCanvas.height) {
    orientation = "L";
}
else
    orientation = "P";
var canvasCenter = [oCanvas.width/2, oCanvas.height/2];

var shipInSunlight = true;
var shipInSunlightInitial = shipInSunlight;

window.addEventListener('resize', function(event){
    if (intro) {
        thingMakerCanvas.width = thingMaker__container.offsetWidth;
        thingMakerCanvas.height = thingMaker__container.offsetHeight;
        tmAnchor = [thingMakerCanvas.width/2, thingMakerCanvas.height/3];

        developCanvas.width = develop__container.offsetWidth;
        developCanvas.height = develop__container.offsetHeight;
        deAnchor = [developCanvas.width/2, developCanvas.height/3];

        informationCanvas.width = information__container.offsetWidth;
        informationCanvas.height = information__container.offsetHeight;
        inAnchor = [informationCanvas.width/2, informationCanvas.height/2];

        centerPowerCanvas.width = canvasWrap.offsetWidth;
        centerPowerCanvas.height = canvasWrap.offsetHeight;
        cpAnchor = [centerPowerCanvas.width/2, centerPowerCanvas.height/2];
    }

    if (isFirefox || isEdge) {
        if(window.innerHeight < 721) {
            oldLogcontainer.style.height = 229 + 'px';
        } else {
            oldLogcontainer.style.height = 245 + 'px';
        }
    }



    oCanvas.width = canvasWrap.offsetWidth;
    oCanvas.height = canvasWrap.offsetHeight;

    logNotificationPosition = [oCanvas.width - 10, rect.top + 30];

    if (oCanvas.width > oCanvas.height) {
        orientation = "L";
    }
    else
        orientation = "P";
    canvasCenter = [oCanvas.width/2, oCanvas.height/2];

    planetOne.trail = [];
    sCanvas.width = canvasWrap.offsetWidth;
    sCanvas.height = canvasWrap.offsetHeight;
    if (sCanvas.width > sCanvas.height) {
        sOrientation = "L";
    }
    else
        sOrientation = "P";
    sCanvasCenter = [sCanvas.width/2, oCanvas.height/2];
});

window.addEventListener('fullscreenchange', function(event){
  if (intro) {
      thingMakerCanvas.width = thingMaker__container.offsetWidth;
      thingMakerCanvas.height = thingMaker__container.offsetHeight;
      tmAnchor = [thingMakerCanvas.width/2, thingMakerCanvas.height/3];

      developCanvas.width = develop__container.offsetWidth;
      developCanvas.height = develop__container.offsetHeight;
      deAnchor = [developCanvas.width/2, developCanvas.height/3];

      informationCanvas.width = information__container.offsetWidth;
      informationCanvas.height = information__container.offsetHeight;
      inAnchor = [informationCanvas.width/2, informationCanvas.height/2];

      centerPowerCanvas.width = canvasWrap.offsetWidth;
      centerPowerCanvas.height = canvasWrap.offsetHeight;
      cpAnchor = [centerPowerCanvas.width/2, centerPowerCanvas.height/2];
  }



  oCanvas.width = canvasWrap.offsetWidth;
  oCanvas.height = canvasWrap.offsetHeight;

  logNotificationPosition = [oCanvas.width - 10, rect.top + 30];

  if (oCanvas.width > oCanvas.height) {
      orientation = "L";
  }
  else
      orientation = "P";
  canvasCenter = [oCanvas.width/2, oCanvas.height/2];

  planetOne.trail = [];
  sCanvas.width = canvasWrap.offsetWidth;
  sCanvas.height = canvasWrap.offsetHeight;
  if (sCanvas.width > sCanvas.height) {
      sOrientation = "L";
  }
  else
      sOrientation = "P";
  sCanvasCenter = [sCanvas.width/2, oCanvas.height/2];
});



var PhysicsBody = function(type, posX, posY, radius, velX, velY, mass, colour, gravSrc, planetName, planetActualName) {
    this.type    = type;
    this.pos     = [posX, posY];
    this.relPos  = [this.pos[0] + canvasCenter[0], this.pos[1] + canvasCenter[1]];
    this.vel     = [velX, velY];
    this.radius  = radius;
    this.mass    = mass;
    this.colour  = colour;
    this.gravSrc = gravSrc;
    this.planetName = planetName;
    this.planetActualName = planetActualName;
    this.trailLength = 10;
    if (this.type == "planet") {
        this.trailLength = 8;
        if (this.planetActualName == "localP1") {
            this.trailLength = 15;
        }
    }

    p2 = [this.relPos[0] + oCanvas.width, this.relPos[1] + oCanvas.width];


    this.shadPos = [[this.relPos[0], this.relPos[1]], p2];
    this.trail = [];

    this.updatePosition = function() {
        this.relPos = [this.pos[0] + canvasCenter[0], this.pos[1] + canvasCenter[1]];
    }
    this.sUpdatePosition = function() {
        this.relPos = [this.pos[0] + sCanvasCenter[0], this.pos[1] + sCanvasCenter[1]];
    }

    this.drawSelf = function() {

        octx.beginPath();

        if (this.type == "tower") {
            octx.moveTo(this.relPos[0], this.relPos[1]);
            octx.lineTo(this.relPos[0] - (this.vel[0]*50), this.relPos[1] - (this.vel[1]*50));
            octx.lineWidth = this.radius;
            octx.strokeStyle = this.colour;
            octx.stroke();
        }
        else if (this.type !== "ship" && this.type !== "pod" && this.type !== "potatoPlant" && this.type !== "particle") {
            octx.arc(this.relPos[0], this.relPos[1], this.radius, 0, Math.PI * 2);
            octx.fillStyle = this.colour;
            octx.fill();
        }
        else {
            octx.rect(this.relPos[0], this.relPos[1], this.radius, this.radius);
            octx.fillStyle = this.colour;
            octx.fill();
        }

        octx.closePath();
    }
    this.sDrawSelf = function() {
        sctx.beginPath();

        if (this.type == "sun" || this.type == "planet" || this.type == "planetOne") {
            sctx.arc(this.relPos[0], this.relPos[1], this.radius, 0, Math.PI * 2);
        } else {
            sctx.rect(this.relPos[0] - 1, this.relPos[1] - 1, this.radius, this.radius);
        }
        sctx.fillStyle = this.colour;
        sctx.fill();
        sctx.closePath();
    }
    this.sDrawShad = function() {

        sctx.beginPath();
        this.shadPos[0] = [this.relPos[0], this.relPos[1]];
        sctx.moveTo(this.shadPos[0][0], this.shadPos[0][1]);

        this.shadPos[1] = [this.shadPos[0][0] - (this.gravSrc.relPos[0] - this.relPos[0])*1, this.shadPos[0][1] - (this.gravSrc.relPos[1] - this.relPos[1])*1];
        sctx.lineTo(this.shadPos[1][0], this.shadPos[1][1]);
        sctx.lineWidth = this.radius * 2;
        // Create gradient
        grd = octx.createLinearGradient(this.shadPos[0][0], this.shadPos[0][1], this.shadPos[1][0], this.shadPos[1][1]);

        // Add colors
        grd.addColorStop(1.000, 'rgba(7, 12, 18, 0.000)');
        grd.addColorStop(0.000, 'rgba(7, 12, 18, 1.000)');
        sctx.strokeStyle =  grd;

        // sctx.strokeStyle = "#070c12";
        sctx.stroke();
        sctx.closePath();
    }

    this.drawShad = function() {

        octx.beginPath();
        if (this.type != "ship" && this.type != "pod") {
            this.shadPos[0] = [sPlanetOne.shadPos[0][0] - sPlanetOne.relPos[0] + this.relPos[0], sPlanetOne.shadPos[0][1] - sPlanetOne.relPos[1] + this.relPos[1]];
        } else {
            this.shadPos[0] = [sPlanetOne.shadPos[0][0] - sPlanetOne.relPos[0] + this.relPos[0] + this.radius/2, sPlanetOne.shadPos[0][1] - sPlanetOne.relPos[1] + this.relPos[1] + this.radius/2];
        }
        octx.moveTo(this.shadPos[0][0], this.shadPos[0][1]);

        // this.shadPos[1] = [sPlanetOne.shadPos[1][0] - sPlanetOne.relPos[0] + this.relPos[0], sPlanetOne.shadPos[1][1] - sPlanetOne.relPos[1] + this.relPos[1]];
        this.shadPos[1] = [this.shadPos[0][0] + (sPlanetOne.shadPos[1][0] - sPlanetOne.shadPos[0][0])*10, this.shadPos[0][1] + (sPlanetOne.shadPos[1][1] - sPlanetOne.shadPos[0][1])*10];

        octx.lineTo(this.shadPos[1][0], this.shadPos[1][1]);

        octx.lineWidth = this.radius * 2;
        octx.strokeStyle = "#070c12";
        octx.stroke();
        octx.closePath();

    }
}

var annotationLines = [];

var AnnotationLine = function(p1, p2, follow) {

    this.life = 3;
    this.follow = follow;

    this.p1 = p1;
    this.p2 = p2;



    this.drawSelf = function() {
        if (screenFocusReal) {
            octx.beginPath();

            if (this.follow = true) {

                var tempP1 = [p1.relPos[0], p1.relPos[1]];

                var posOffset = [this.p2[0] - tempP1[0], this.p2[1] - tempP1[1]];
                var posMagnitude = Math.sqrt(Math.pow(posOffset[0], 2) + Math.pow(posOffset[1], 2));
                var posNormalized = [posOffset[0]/posMagnitude, posOffset[1]/posMagnitude];

                tempP1[0] = tempP1[0] + (posNormalized[0] * 10);
                tempP1[1] = tempP1[1] + (posNormalized[1] * 10);

                octx.moveTo(tempP1[0], tempP1[1]);
                octx.lineTo(this.p2[0], this.p2[1]);
            } else {
                octx.moveTo(this.p1[0], this.p1[1]);
                octx.lineTo(this.p2[0], this.p2[1]);
            }
            octx.moveTo(this.p2[0], this.p2[1] - 5);
            octx.lineTo(this.p2[0], this.p2[1] + 5);
            octx.lineWidth = 1;
            octx.strokeStyle = "#fff";
            octx.stroke();
            octx.closePath();

            this.life -= 1;
        } else if (this.follow == true) {
            this.life -= 1;
        }
    }
}

var updateAnnotationLines = function() {
    for (var i = 0; i < annotationLines.length; i++) {
      annotationLines[i].drawSelf();
        if (annotationLines[i].life < 0) {
            annotationLines.splice(i, 1);
        }
    }
}



var physicsBodies = [];
//                               type,    X,    Y,rad,     vlX,vlY,    mass,    colour, gravSrc
var planetOne = new PhysicsBody("planet", 0,    0, 50,       0,  0,    32000, "#fc4646", null     , null, "localP1");
physicsBodies.push(planetOne);
var userBody =  new PhysicsBody("ship"  , 0, -160,  4,    0.4,  0,    10  , "#fff",    planetOne);
physicsBodies.push(userBody);
var userPod;



var updatePhysicsBodies = function() {

    for (var i = 0; i < physicsBodies.length; i++) {

        if (physicsBodies[i].gravSrc != null) {

            calculateGravity(physicsBodies[i], physicsBodies[i].gravSrc);
        }
        physicsBodies[i].updatePosition();
    }
    if (screenFocus) {
        if (!blackHoleShrunk || re__earth) {
            for (var i = 0; i < physicsBodies.length; i++) {
                physicsBodies[i].drawShad();
            }
        }

        if (gotPlanetBoosters && !re__earth) {
            drawTrail(planetOne);
        }

        if (gotLandshipAgain && landingStage != "landed") {

            calculateGravity(userBody, userBody.gravSrc);
            userBody.drawShad();
        }

        for (var i = 0; i < physicsBodies.length; i++) {
            physicsBodies[i].drawSelf();
        }
        if (gotLandshipAgain) {

            drawLandedShip();
        }
    }
}
var draw = function() {

    if (screenFocus) {
        octx.clearRect(0,0,oCanvas.width, oCanvas.height);
    }

    // if (gotLandship && landingStage != "landed" && !blackHoleShrunk) {
    //     userBody.drawShad();
    // }

    updatePhysicsBodies();
    updateProbes();
    updateLandedProbes();
    updateSpudniks();
    updatePotatoPlants();
    updateLandedPotatoPlants();
    updateTaterTowers();
    updateLandedTaterTowers();
    fireSpudVis();
    updateSpudguns();
    updateLaunchers();
    drawOrbitParticles();
    if ((gotLandship && landingStage != "landed" && userPod) || gotLandshipAgain) {
        shipLandingSequence();
    } else if (screenFocus && gotLandship && userPod) {
        drawLandedPod();
    }
    drawLandingParticles();

    if (!blackHoleShrunk) {
        shipInSunlight = !inShadow([userBody.relPos[0] + (userBody.radius/2), userBody.relPos[1] + (userBody.radius/2)], [planetOne.shadPos[0][0], planetOne.shadPos[0][1]], [planetOne.shadPos[1][0], planetOne.shadPos[1][1]], planetOne.radius, userBody);
    } else {
        shipInSunlight = true;
    }
    updateAnnotationLines();
    adjustReflections();

    if (groundView == true) {
        drawEndLanding();
    }
    if (queuedLogs.length > 0 || qT > 0) {
        queueLog();
    }
    if (messageSoundCountdown > 0) {
        messageSoundCountdown--;
    }
    animateIntros();

    if (messagePulseGo) {
        if (document.title == "SPACEPLAN" && messagePulse <= 0) {
            document.title = "Stuff Happened!";
            messagePulse = 70;
        }
        if (document.title == "Stuff Happened!" && messagePulse <= 0) {
            document.title = "SPACEPLAN";
            messagePulse = 70;
        }
        messagePulse--;
    }
}
setInterval(draw, 30); //FPS (*3)





var sCanvas = document.getElementById("center__sunCanvas");
var sctx = sCanvas.getContext("2d");

sCanvas.width = canvasWrap.offsetWidth;
sCanvas.height = canvasWrap.offsetHeight;
if (sCanvas.width > sCanvas.height) {
    sOrientation = "L";
}
else
    sOrientation = "P";
var sCanvasCenter = [sCanvas.width/2, sCanvas.height/2];

var mercuryBlurb = "Mercury got merked.";
var venusBlurb = "Venus just got baked.";
var marsBlurb = "Mars' water evaporated (also Mars is dead).";
var jupiterBlurb = "Jupiter is rising (like dough... burnt dough... super burnt dough).";
var saturnBlurb = "Saturn? More like Saburn!";
var uranusBlurb = "Uranus is on fiyah!";
var neptuneBlurb = "Neptune boiled then went all steamy.";
var plutoBlurb = "Pluto isn't even a dwarf planet now. Because it's dead.";

var storySaid = false

var planetOneRad;


var physicsBodies2 = [];
var sol;
//                               type,  X,    Y,rad,     vlX,vlY,    mass,    colour, gravSrc
var sol        = new PhysicsBody("sun", 0,    0, 50,       0,  0,    3000, "#ffdf5a", null     , "", "sol");
var sPlanetOne = new PhysicsBody("planetOne", 200,   0, 2,      0,  0.1,    100, "#fc4646", sol, "", "earth");
physicsBodies2.push(sPlanetOne);

var mercury = new PhysicsBody("planet", 0,   85, 1,      -0.15, 0,    200000, "#ffcc00", sol, mercuryBlurb, "mercury");
physicsBodies2.push(mercury);
var venus = new PhysicsBody("planet", 170,   0, 2,      0,  0.105,    2000000, "#86ffca", sol, venusBlurb, "venus");
physicsBodies2.push(venus);
var mars = new PhysicsBody("planet", 300,   0, 1,      0,  0.075,    200000, "#ff7443", sol, marsBlurb, "mars");
physicsBodies2.push(mars);
var jupiter = new PhysicsBody("planet", 0,  -350, 15,      0.06,  0,    200000000, "#ffa043", sol, jupiterBlurb, "jupiter");
physicsBodies2.push(jupiter);
var saturn = new PhysicsBody("planet", 380,   0, 12,      0,  0.06,    200000000, "#f9d293", sol, saturnBlurb, "saturn");
physicsBodies2.push(saturn);
var uranus = new PhysicsBody("planet", -450,   0, 7,      0,  -0.045,    20000000, "#18E6FF", sol, uranusBlurb, "uranus");
physicsBodies2.push(uranus);
var neptune = new PhysicsBody("planet", 500,   0, 7,      0,  0.06,    20000000, "#45B9FF", sol, neptuneBlurb, "neptune");
physicsBodies2.push(neptune);
var pluto = new PhysicsBody("planet", 520,   0, 1,      0,  0.045,    200000, "#D9F5FF", sol, plutoBlurb, "pluto");
physicsBodies2.push(pluto);

physicsBodies2.push(sol);

sol.sUpdatePosition();

var intoHole__played = false;

var sUpdatePhysicsBodies = function() {

    for (var i = 0; i < physicsBodies2.length; i++) {
        if (physicsBodies2[i].gravSrc != null) {
            calculateGravity(physicsBodies2[i], physicsBodies2[i].gravSrc);
        }
        physicsBodies2[i].sUpdatePosition();
    }

    if (gotPlanetBoosters) {
        for (var i = 0; i < physicsBodies2.length; i++) {
            if (physicsBodies2[i].gravSrc != null) {
                var distOffset = Math.sqrt(Math.pow(physicsBodies2[i].gravSrc.pos[0] - physicsBodies2[i].pos[0], 2) + Math.pow(physicsBodies2[i].gravSrc.pos[1] - physicsBodies2[i].pos[1], 2));

                if (distOffset < physicsBodies2[i].gravSrc.radius - physicsBodies2[i].radius) {
                    physicsBodies2[i].gravSrc.mass += physicsBodies2[i].mass / 1000;
                    pushLog(physicsBodies2[i].planetName);
                    physicsBodies2.splice(i, 1);
                }
            }
        }
    }

    if (screenFocus) {

        for (var i = 0; i < physicsBodies2.length; i++) {

            if (physicsBodies2[i].type === "planet" || physicsBodies2[i].type === "planetOne") {

                physicsBodies2[i].sDrawShad();
            }
        }

        for (var i = 0; i < physicsBodies2.length; i++) {
            physicsBodies2[i].sDrawSelf();
        }

        if (gotPlanetBoosters && !re__earth) {
            if (!blackHoleShrunk) {
                sPlanetOne.sDrawShad();
            }
            sDrawPlanetTrail(planetOne);
            sPlanetOne.sDrawSelf();
        }
    }
}

var prevAngle = 0;
var sDraw = function() {
    if (screenFocus){
        sctx.clearRect(0,0,sCanvas.width, sCanvas.height);
    }

    if (!re__earth && blackHoleMade){
        blackHoleParticlesAnimate();
    }

    if (gotPlanetBoosters && !re__earth) {
        var newVelocity = correctPlanetVelocity();
        sPlanetOne.vel[0] = newVelocity[0];
        sPlanetOne.vel[1] = newVelocity[1];
        sPlanetOne.pos[0] += sPlanetOne.vel[0];
        sPlanetOne.pos[1] += sPlanetOne.vel[1];
        var distOffset = Math.sqrt(Math.pow(sPlanetOne.gravSrc.pos[0] - sPlanetOne.pos[0], 2) + Math.pow(sPlanetOne.gravSrc.pos[1] - sPlanetOne.pos[1], 2));
        var diff = planetOneRad / distOffset;
        sPlanetOne.pos[0] *= diff;
        sPlanetOne.pos[1] *= diff;
        sPlanetOne.sUpdatePosition();
        if (!blackHoleMade) {
            sunMassProgress.value = sol.mass;
            sunMassProgressSpan.innerHTML = "Sun mass: <span class='status__container__span'>" + numberWithCommas(sol.mass) + " / " + numberWithCommas(blackHoleMass) + " (" + ((sol.mass/blackHoleMass) * 100).toFixed(2) + "%)</span>";
            sol.radius = solStartRad + ((sol.mass / blackHoleMass) * sunCollapseRadius);
            if (sol.mass >= blackHoleMass) {
                blackHoleMade = true;
                pushLog("Sun's collapsing into a gaping big hole.");
                sunMassProgress.style.display = "none";
                sunMassProgressSpan.innerHTML = "Sun status: <span class='status__container__span'>literally a black hole</span>";
            }
        } else if (screenFocus && !re__earth) {

            if (blackHoleMade && !blackHoleShrunk) {
                if (solShrinkT < solShrinkD) {
                    var newSolRad = easeOutExpo(solShrinkT, solShrinkB, solShrinkC, solShrinkD);
                    solShrinkT+=0.01;
                    sol.radius = newSolRad;
                } else {
                    blackHoleShrunk = true;
                    sol.radius = 10;
                    pushLog("Sun's all puckered up.");
                    sol.colour = "#000";
                    createResearch("approachEventHorizon");
                    shipStatusSpan.innerHTML = "<span>Ship Status:</span> dizzy";
                }
            }

            if (particleFire == true) {
                for (var bat = 0; bat < particleBatch; bat++) {
                    var particle = new FallParticle;
                }
                particleFire = false;
            } else {
                particleCounter++;
                if (particleCounter > particleFreq) {
                    particleFire = true;
                    particleCounter = 0;
                }
            }
        }
        fireSpuds();
        updateSpuds();
    }

    sUpdatePhysicsBodies();

    if (gotApproachEventHorizon && !horizonReached) {
        if (planetOneRad > 0) {
            planetOneRad -= 0.3;
        } else {
            horizonReached = true;
        }
        if (planetOneRad < 20 && !intoHole__played) {
            if (!thingMuted) {
                intohole__sound.play();
            }
            intoHole__played = true;
        }
        if (particleFire == true && !horizonReached) {
            for (var bat = 0; bat < particleBatch; bat++) {
                var particle = new FallParticle;
            }
            particleFire = false;
        } else {
            particleCounter++;
            if (particleCounter > particleFreq) {
                particleFire = true;
                particleCounter = 0;
            }
        }
    } else if (horizonReached == true) {
        intoTheHole();
    }

    updateDate();
}
setInterval(sDraw, 30); //FPS (*3)



var planetLookerType = document.getElementById("center__header__planType");
var systemPeekerType = document.getElementById("center__header__systType")

var planetBoostersNeedCreate = false;

var planetView__sound = [];
var systemView__sound = [];

var planetView__soundInt = 0;
var systemView__soundInt = 0;

for (var ks = 0; ks < 5; ks++) {
    planetView__sound[ks] = new Audio('audio/views/planet.mp3');
    systemView__sound[ks] = new Audio('audio/views/system.mp3');
    soundArray.push(planetView__sound[ks]);
    soundArray.push(systemView__sound[ks]);
}

var toggleCanvas = function(el) {

    if (gotSystView) {
        if (el.id === "center__header--plan") {
            oCanvas.style.display = 'block';
            sCanvas.style.display = 'none';

            planViewButton.className = "center__header--plan";
            systViewButton.className = "center__header--syst";
            systViewButton.style.display = 'inline';
            planViewButton.style.cursor = 'auto';
            systViewButton.style.cursor = 'pointer';

            systemPeekerType.className = "center__header--systSmall";
            planetLookerType.className = "center__header--systLarge";


            if (!thingMuted) {
                planetView__sound[planetView__soundInt].play();
                planetView__soundInt++;
                if (planetView__soundInt >= planetView__sound.length) {
                    planetView__soundInt = 0;
                }
            }

        } else if (el.id === "center__header--syst") {
            systViewButton.style.cssText = " ";

            oCanvas.style.display = 'none';
            sCanvas.style.display = 'block';

            systViewButton.className = "center__header--plan";
            planViewButton.className = "center__header--syst";
            planViewButton.style.display = 'inline';
            systViewButton.style.cursor = 'auto';
            planViewButton.style.cursor = 'pointer';

            planetLookerType.className = "center__header--systSmall";
            systemPeekerType.className = "center__header--systLarge";

            if (!thingMuted) {
                systemView__sound[systemView__soundInt].play();
                systemView__soundInt++;
                if (systemView__soundInt >= systemView__sound.length) {
                    systemView__soundInt = 0;
                }
            }

            if (storySaid == false) {
                planetBoostersNeedCreate = true;
                queueLog(264, "Yep! Pretty likely we're on Earth...");
                queueLog(264, "So, my plan. This will sound silly,<br/>but try to bear with me.");
                queueLog(264, "This idea is based entirely on my total misunderstanding of some Stephen<span class='no-break'>&nbsp;</span>Hawkings book I just picked up in my data thingy...");
                queueLog(264, "So, according to this disproven 'Big<span class='no-break'>&nbsp;</span>Crunch' theory, the universe at some point is going to reverse direction and all mush together.");
                queueLog(264, "If I've misunderstood correctly, time MIGHT go backwards during the shrinking of spacetime.<br/>Probably not but let's go with it...")
                queueLog(333, "If &mdash; right &mdash; we put these huge, fuck-off-massive boosters onto this planet,<br/>then we can remain in a stable orbit while firing more taters into the sun...");
                setTimeout(function() {
                  createResearch("planetBoosters");
                  planetBoostersNeedCreate = false;
                }, 9990);
                queueLog(200, "This will increase its mass, meaning that we'll have to go faster to stay in its orbit.");
                queueLog(264, "The faster we go, the slower our perception of time relative to the universe &mdash; time travel!<br/>Matthew<span class='no-break'>&nbsp;</span>McConaughey type shit!");
                queueLog(333, "With enough mass, the sun will collapse in on itself into a black hole type deal.<br/>Then? We approach its event horizon!");
                queueLog(433, "At the event horizon, time will become infinite. Now I'm 90% sure that this is a euphemism for maddening death,<br/>but I'm a robot who can't feel and you're a person experiencing a very linear narrative so...");
                queueLog(264, "With time being infinite we'll reach the big crunchey-crunch in no time.<br/>Or infinite time, I'm pretty confused at this point to be honest.");
                queueLog(400, "Anyway, THEN we'll probably? Get a big ol' bang. Time reverses and goes back to going forward. Hopefully the universe ends up in a more-or-less identical state to before, but this time we (I) know how the human race dies!");
                queueLog(264, "We return to Earth, let them know.<br/>We're heroes. Roll credits.");
                queueLog(264, "Fuck off with your plot holes.<br/>Let's do this. Planet Boosters!");
                storySaid = true;
            }
        }
    }
}





status__gravSrc = document.getElementById("status__gravSrc");
status__atmosphere = document.getElementById("status__atmosphere");
// status__surface = document.getElementById("status__surface");
status__inhabitants = document.getElementById("status__inhabitants");

status__gravSrc.innerHTML = "Orbiting mass: <span class='status__container__span'>no idea</span>";

var probes = [];
var landedProbes = [];

var spudniks = [];

var potatoPlants = [];
var landedPotatoPlants = [];

var taterTowers = [];
var landedTaterTowers = [];

var spudguns = [];
var launchers = [];

var terminalVelocity = 0.2;
var parachuteVelocity = 0.1;

var launchPhrases = [
    "Good bye, sweet potato.",
    "Our little Arran Comet.",
    "Challenger is go.",
];

var launchPhrasesSaid = [];

var orbitParticles = [];
var probeParticleCount = 6;
var probeParticleLifeMin = 100;
var probeParticleLifeMax = 200;

var createProbe = function () {

    for (var i = 0; i < probeParticleCount; i++) {
        var probeParticleLife = getRandomInt(probeParticleLifeMin, probeParticleLifeMax);
        var particleVelX = getRandomInt(2, 4);
        var particleVelY = getRandomInt(2, 4);
        var newParticle = new PhysicsBody('particle', userBody.pos[0] + (userBody.radius/2), userBody.pos[1] + (userBody.radius/2), 1, userBody.vel[0]/particleVelX, userBody.vel[1]/particleVelY, 4, "rgba(255, 255, 255, 0.5)", planetOne);
        newParticle.life = probeParticleLife;
        orbitParticles.push(newParticle);

    }
    //type, X, Y,rad, vlX, vlY, mass, colour, gravSrc
    var newProbe =  new PhysicsBody("probe", userBody.pos[0] + (userBody.radius/2), userBody.pos[1] + (userBody.radius/2), 1, userBody.vel[0]/2, userBody.vel[1]/2, 4, "#fff", planetOne);
    newProbe.landingZone = getRndBias(0, 30, 0, 1);
    newProbe.terminalVelocity__set = false;
    if ((probes.length === 0 && landedProbes.length === 0) || (atmosphere__data < atmosphere__dataNeeded)) {
        if (launchPhrases.length > 0) {
            var phrase = getRandomInt(0, launchPhrases.length-1);
            pushLog("Probe launched. " + launchPhrases[phrase]);
            var droppedPhrase = launchPhrases.splice(phrase, 1);
            launchPhrasesSaid.push(droppedPhrase);
        } else {
            pushLog("Probe launched.");
        }

        var annotation = new AnnotationLine(newProbe, logNotificationPosition, true);
        annotationLines.push(annotation);
    }
    probes.push(newProbe);
}

var updateProbes = function () {
    for (var i = 0; i < probes.length; i++) {

        calculateGravity(probes[i], probes[i].gravSrc);

        probes[i].updatePosition();
    }

    if (screenFocus) {
        for (var i = 0; i < probes.length; i++) {
            probes[i].drawSelf();
        }
    }

    for (var i = 0; i < probes.length; i++) {

        var gravOffset = Math.sqrt(Math.pow(probes[i].gravSrc.pos[0] - probes[i].pos[0], 2) + Math.pow(probes[i].gravSrc.pos[1] - probes[i].pos[1], 2));

        if (gravOffset < probes[i].gravSrc.radius + 10) {

            if (screenFocus) {
                drawTrail(probes[i]);
            }

            if (!gotHeatshields) {

                itemProbe.currentCount --;
                itemProbe.countSpan.innerHTML = itemProbe.currentCount;

                if (heatshields == null) {
                    switch (atmosphere__data) {
                        case 0:
                            pushLog("Probetato lost &mdash; data gained.<br/>Check the Fact Holder and send<br/>some more taters down to solve<br/>this predicament.");
                            break;
                        case 1:
                            pushLog("Probetato lost &mdash; data gained.");
                            break;
                    }
                    atmosphere__data++;
                    var annotation = new AnnotationLine(probes[i], logNotificationPosition, false);
                    annotationLines.push(annotation);
                    status__atmosphere.innerHTML = atmosphere__data + "/" + atmosphere__dataNeeded + " <span class='status__container__span'>data for breakthrough</span>";
                    status__atmosphere.style.background = statusNotificationCol;
                    atmosphereProgress.style.display = 'block';
                    atmosphereProgress.max = atmosphere__dataNeeded;
                    atmosphereProgress.value = atmosphere__data;
                    // statusLog.push(atmosphereProgress);
                    setTimeout(statusNotification, 200);
                } else {
                    pushLog("Probetato lost &mdash; baked on atmospheric entry.");
                    var annotation = new AnnotationLine(probes[i], logNotificationPosition, false);
                    annotationLines.push(annotation);
                }

                if (heatshields == null && atmosphere__data >= atmosphere__dataNeeded) {
                    pushLog("Our probetatoes are getting baked in the thick atmosphere &mdash; foil heatshields should keep them cosey.<br/>Check the Idea Lister.");
                    status__atmosphere.innerHTML = "Atmosphere: <span class='status__container__span'>thick</span>";
                    status__atmosphere.style.background = statusNotificationCol;
                    atmosphereProgress.style.display = 'none';
                    createResearch("heatshields");
                    setTimeout(statusNotification, 200);
                }

                probes.splice(i, 1);

            } else {

                probes[i].vectorMagnitude = Math.sqrt(Math.pow(probes[i].vel[0], 2) + Math.pow(probes[i].vel[1], 2));

                if (probes[i].vectorMagnitude > terminalVelocity) {
                    probes[i].vel[0] *= 0.95;
                    probes[i].vel[1] *= 0.95;
                }

                if (gravOffset < (probes[i].gravSrc.radius - probes[i].landingZone) + 4) {

                    if (probes[i].vectorMagnitude > parachuteVelocity && gotParachutes) {
                        probes[i].vel[0] *= 0.95;
                        probes[i].vel[1] *= 0.95;
                    }

                    if (gravOffset < probes[i].gravSrc.radius - probes[i].landingZone) {

                        // if (!gotParachutes) {
                        //
                        //     itemProbe.currentCount --;
                        //     itemProbe.countSpan.innerHTML = itemProbe.currentCount;
                        //
                        //     if (parachutes == null) {
                        //         ground__data += 1;
                        //         pushLog("Probetato lost ~ data gained - check Information screen.");
                        //         var annotation = new AnnotationLine(probes[i], logNotificationPosition, false);
                        //         annotationLines.push(annotation);
                        //         status__surface.innerHTML = ground__data + "/" + ground__dataNeeded + " data for breakthrough";
                        //         status__surface.style.background = statusNotificationCol;
                        //         setTimeout(statusNotification, 200);
                        //     } else {
                        //         pushLog("Probetato lost ~ mashed on planet surface.");
                        //         var annotation = new AnnotationLine(probes[i], logNotificationPosition, false);
                        //         annotationLines.push(annotation);
                        //     }
                        //
                        //     if (parachutes == null && ground__data >= ground__dataNeeded) {
                        //
                        //         pushLog("Probetatoes are getting mashed on impact - parachute development needed.<br/>Check Development screen.");
                        //         status__surface.innerHTML = "Surface: <span>hard</span>";
                        //         status__surface.style.background = statusNotificationCol;
                        //         parachutes = new ResearchConstruct("parachutes", parachutes__cost, "Probetato 'chutes", "power", "TOOLTIPPLACEHOLDER");
                        //         availableResearch.push(parachutes);
                        //         setTimeout(statusNotification, 200);
                        //     }
                        //
                        //     probes.splice(i, 1);
                        //
                        // } else {

                            if (landedProbes.length === 0) {
                                pushLog("Probetato landed successfully...<br/>This place looks familiar.");
                                var annotation = new AnnotationLine(probes[i], logNotificationPosition, true);
                                annotationLines.push(annotation);
                                if (itemPotatoPlant != undefined) {
                                    itemPotatoPlant.conditions = true;
                                    itemPotatoPlant.costLineSpan.innerHTML = "<span id='cost'>" + numberWithCommas(itemPotatoPlant.currentCost) + "</span> power";
                                    itemPotatoPlant.costSpan = itemPotatoPlant.el.querySelector("#cost");
                                }

                                ga('set', {
                                            'userId': USER_ID,
                                            'dimension1': shipName,
                                            'dimension2': USER_ID,
                                            'metric17': 1
                                          });
                                ga('send', 'pageview');
                                ga('set', {
                                            'metric17': 0
                                          });
                                createResearch("probetatoUpgrade");
                            }
                            landedProbes.push(probes[i]);
                            probes.splice(i, 1);
                        // }
                    }
                }
            }
        }
    }
}

var updateLandedProbes = function() {
    for (var i = 0; i < landedProbes.length; i++) {
        if (screenFocus) {
            landedProbes[i].drawSelf();
        }
        landedProbes[i].updatePosition();
    }
}


var createSpudnik = function() {
    var newSpudnik = new PhysicsBody("spudnik", userBody.pos[0] + (userBody.radius/2), userBody.pos[1] + (userBody.radius/2), 1, userBody.vel[0] * 0.8, userBody.vel[1] * 0.8, 4, "#fff", planetOne);
    spudniks.push(newSpudnik);

    for (var i = 0; i < probeParticleCount; i++) {
        var probeParticleLife = getRandomInt(probeParticleLifeMin, probeParticleLifeMax);
        var particleVelX = getRandomInt(8, 10)/10;
        var particleVelY = getRandomInt(8, 10)/10;
        var newParticle = new PhysicsBody('particle', userBody.pos[0] + (userBody.radius/2), userBody.pos[1] + (userBody.radius/2), 1, userBody.vel[0]*particleVelX, userBody.vel[1]*particleVelY, 4, "rgba(255, 255, 255, 0.5)", planetOne);
        newParticle.life = probeParticleLife;
        orbitParticles.push(newParticle);

    }
}

var updateSpudniks = function () {
    for (var i = 0; i < spudniks.length; i++) {
        calculateGravity(spudniks[i], spudniks[i].gravSrc);

        spudniks[i].updatePosition();
    }

    if (screenFocus) {
        for (var i = 0; i < spudniks.length; i++) {
            spudniks[i].drawSelf();
        }
    }
}


var createPotatoPlant = function() {
    var newPotatoPlant = new PhysicsBody("potatoPlant", userBody.pos[0] + (userBody.radius/2), userBody.pos[1] + (userBody.radius/2), 3, userBody.vel[0] * 0.2, userBody.vel[1] * 0.2, 4, "#fff", planetOne);

    newPotatoPlant.landingZone = getRndBias(0, 30, 0, 1);
    newPotatoPlant.terminalVelocity__set = false;

    if (potatoPlants.length === 0 && landedPotatoPlants.length === 0) {
        pushLog("Potato Plant launched.");
        var annotation = new AnnotationLine(newPotatoPlant, logNotificationPosition, true);
        annotationLines.push(annotation);
    }

    potatoPlants.push(newPotatoPlant);

    for (var i = 0; i < probeParticleCount; i++) {
        var probeParticleLife = getRandomInt(probeParticleLifeMin, probeParticleLifeMax);
        var particleVelX = getRandomInt(3, 6)/10;
        var particleVelY = getRandomInt(3, 6)/10;
        var newParticle = new PhysicsBody('particle', userBody.pos[0] + (userBody.radius/2), userBody.pos[1] + (userBody.radius/2), 1, userBody.vel[0]*particleVelX, userBody.vel[1]*particleVelY, 4, "rgba(255, 255, 255, 0.5)", planetOne);
        newParticle.life = probeParticleLife;
        orbitParticles.push(newParticle);

    }
}

var updatePotatoPlants = function () {
    for (var i = 0; i < potatoPlants.length; i++) {

        calculateGravity(potatoPlants[i], potatoPlants[i].gravSrc);

        potatoPlants[i].updatePosition();
    }

    if (screenFocus) {

        for (var i = 0; i < potatoPlants.length; i++) {
            potatoPlants[i].drawSelf();
        }
    }

    for (var i = 0; i < potatoPlants.length; i++) {

        var gravOffset = Math.sqrt(Math.pow(potatoPlants[i].gravSrc.pos[0] - potatoPlants[i].pos[0], 2) + Math.pow(potatoPlants[i].gravSrc.pos[1] - potatoPlants[i].pos[1], 2))

        if (gravOffset < potatoPlants[i].gravSrc.radius + 10) {

            if (screenFocus) {
                drawTrail(potatoPlants[i]);
            }

            potatoPlants[i].vectorMagnitude = Math.sqrt(Math.pow(potatoPlants[i].vel[0], 2) + Math.pow(potatoPlants[i].vel[1], 2));

            if (potatoPlants[i].vectorMagnitude > terminalVelocity) {
                potatoPlants[i].vel[0] *= 0.95;
                potatoPlants[i].vel[1] *= 0.95;
            }

            if (gravOffset < (potatoPlants[i].gravSrc.radius - potatoPlants[i].landingZone) + 4) {

                if (potatoPlants[i].vectorMagnitude > parachuteVelocity) {
                    potatoPlants[i].vel[0] *= 0.95;
                    potatoPlants[i].vel[1] *= 0.95;
                }

                if (gravOffset < potatoPlants[i].gravSrc.radius - potatoPlants[i].landingZone) {

                    if (landedPotatoPlants.length === 0) {
                        queueLog(66, "PotatoPlant landed successfully.");
                        queueLog(133, "Impact uncovered ancient stuff...<br/>We'll excavate the site with more power.<br/>Check the Fact Holder for progress.");
                        var annotation = new AnnotationLine(potatoPlants[i], logNotificationPosition, true);
                        annotationLines.push(annotation);
                        inhabitantsProgress.style.display = 'block';
                        inhabitantsProgress.max = inhabitants__dataNeeded;
                        inhabitantsProgress.value = inhabitants__data;
                        statusLog.push(inhabitantsProgress);
                        inhabitants__started = true;
                    }

                    landedPotatoPlants.push(potatoPlants[i]);
                    potatoPlants.splice(i, 1);
                }
            }
        }
    }
}

var updateLandedPotatoPlants = function() {
    for (var i = 0; i < landedPotatoPlants.length; i++) {

        landedPotatoPlants[i].updatePosition();

        if (screenFocus) {
            landedPotatoPlants[i].drawSelf();
        }
    }
}

var createTaterTower = function() {
    // var towerSpeed = getRandomInt(0, 300)/1000;
    var newTaterTower = new PhysicsBody("tower", userBody.pos[0] + (userBody.radius/2), userBody.pos[1] + (userBody.radius/2), 8, userBody.vel[0] * 0.1, userBody.vel[1] * 0.1, 4, "#fff", planetOne);

    if (taterTowers.length === 0 && landedTaterTowers.length === 0) {
        pushLog("Tater Tower launched.");
        var annotation = new AnnotationLine(newTaterTower, logNotificationPosition, true);
        annotationLines.push(annotation);
    }

    taterTowers.push(newTaterTower);

    for (var i = 0; i < probeParticleCount; i++) {
        var probeParticleLife = getRandomInt(probeParticleLifeMin, probeParticleLifeMax);
        var particleVelX = getRandomInt(1, 4)/10;
        var particleVelY = getRandomInt(1, 4)/10;
        var newParticle = new PhysicsBody('particle', userBody.pos[0] + (userBody.radius/2), userBody.pos[1] + (userBody.radius/2), 1, userBody.vel[0]*particleVelX, userBody.vel[1]*particleVelY, 4, "rgba(255, 255, 255, 0.5)", planetOne);
        newParticle.life = probeParticleLife;
        orbitParticles.push(newParticle);

    }
}

var updateTaterTowers = function () {
    for (var i = 0; i < taterTowers.length; i++) {

        calculateGravity(taterTowers[i], taterTowers[i].gravSrc);

        taterTowers[i].updatePosition();
    }

    if (screenFocus) {

        for (var i = 0; i < taterTowers.length; i++) {
            taterTowers[i].drawSelf();
        }
    }

    for (var i = 0; i < taterTowers.length; i++) {

        var gravOffset = Math.sqrt(Math.pow(taterTowers[i].gravSrc.pos[0] - taterTowers[i].pos[0], 2) + Math.pow(taterTowers[i].gravSrc.pos[1] - taterTowers[i].pos[1], 2))

        // taterTowers[i].radius = Math.sqrt(Math.pow(potatoPlants[i].vel[0], 2) + Math.pow(potatoPlants[i].vel[1], 2));

        if (gravOffset < taterTowers[i].gravSrc.radius - 2) {

            // if (landedPotatoPlants.length === 0) {
            //     pushLog("PotatoPlant landed successfully.");
            //     pushLog("Impact uncovered ancient ruins... more plants can excavate these quicker. Check Information screen.");
            //     var annotation = new AnnotationLine(potatoPlants[i], logNotificationPosition, true);
            //     annotationLines.push(annotation);
            //     inhabitantsProgress.style.display = 'block';
            //     inhabitantsProgress.max = inhabitants__dataNeeded;
            //     inhabitantsProgress.value = inhabitants__data;
            //     statusLog.push(inhabitantsProgress);
            //     inhabitants__started = true;
            // }
            var vectorPerpL = [taterTowers[i].vel[1], -taterTowers[i].vel[0]];
            var vectorPerpR = [-taterTowers[i].vel[1], taterTowers[i].vel[0]];
            var vectorBack = [-taterTowers[i].vel[0], -taterTowers[i].vel[1]];

            for (var par = 0; par < 5; par++) {

                var perpBias = getRandomInt(10, 30)/100;
                var velBias = 1 - perpBias;

                var vectorDirL = [(vectorPerpR[0]*perpBias) + (vectorBack[0]*velBias), (vectorPerpR[1]*perpBias) + (vectorBack[1]*velBias)];
                var vectorDirR = [(vectorPerpL[0]*perpBias) + (vectorBack[0]*velBias), (vectorPerpL[1]*perpBias) + (vectorBack[1]*velBias)];

                var velx = getRandomInt(800, 1000)/1000;
                var vely = getRandomInt(800, 1000)/1000;

                var newPar = new PhysicsBody("particle", taterTowers[i].pos[0], taterTowers[i].pos[1], 1, vectorDirL[0], vectorDirL[1], 10, planetOne.colour,    planetOne);
                landingParticles.push(newPar);
                var newPar = new PhysicsBody("particle", taterTowers[i].pos[0], taterTowers[i].pos[1], 1, vectorDirR[0], vectorDirR[1], 10, planetOne.colour,    planetOne);
                landingParticles.push(newPar);

            }

            // if (landedTaterTowers.length === 0) {
            //   pushLog("Lets go future wadap.");
            //   createResearch("planetBoosters");
            // }

            landedTaterTowers.push(taterTowers[i]);
            taterTowers.splice(i, 1);
        }
    }
}

var updateLandedTaterTowers = function() {
    for (var i = 0; i < landedTaterTowers.length; i++) {

        landedTaterTowers[i].updatePosition();

        if (screenFocus) {
            landedTaterTowers[i].drawSelf();
        }
    }
}



var createSpudgun = function() {
    var newSpudgun = new PhysicsBody("spudgun", userBody.pos[0] + (userBody.radius/2), userBody.pos[1] + (userBody.radius/2), 4, userBody.vel[0] * 1.4, userBody.vel[1] * 1.4, 4, "#fff", planetOne);
    spudguns.push(newSpudgun);

    for (var i = 0; i < probeParticleCount; i++) {
        var probeParticleLife = getRandomInt(probeParticleLifeMin, probeParticleLifeMax);
        var particleVelX = getRandomInt(10, 14)/10;
        var particleVelY = getRandomInt(10, 14)/10;
        var newParticle = new PhysicsBody('particle', userBody.pos[0] + (userBody.radius/2), userBody.pos[1] + (userBody.radius/2), 1, userBody.vel[0]*particleVelX, userBody.vel[1]*particleVelY, 4, "rgba(255, 255, 255, 0.5)", planetOne);
        newParticle.life = probeParticleLife;
        orbitParticles.push(newParticle);

    }
}

var updateSpudguns = function () {
    for (var i = 0; i < spudguns.length; i++) {

        if (spudguns[i].orbitCorrected != true) {
            var distOffset = Math.sqrt(Math.pow(spudguns[i].gravSrc.pos[0] - spudguns[i].pos[0], 2) + Math.pow(spudguns[i].gravSrc.pos[1] - spudguns[i].pos[1], 2));
            var distOffsetUserBody = Math.sqrt(Math.pow(userBody.gravSrc.pos[0] - userBody.pos[0], 2) + Math.pow(userBody.gravSrc.pos[1] - userBody.pos[1], 2));
        }

        if (spudguns[i].orbitCorrected != true && distOffset > distOffsetUserBody * 1.3) {

            var velocity = Math.sqrt((bigG * spudguns[i].gravSrc.mass * spudguns[i].mass / distOffset)) * 0.45;

            var vectorPerp = [((spudguns[i].gravSrc.pos[1] - spudguns[i].pos[1])/distOffset), -((spudguns[i].gravSrc.pos[0] - spudguns[i].pos[0]) / distOffset)];
            var correctedVel = [vectorPerp[0] * velocity, vectorPerp[1] * velocity];
            spudguns[i].vel = [correctedVel[0], correctedVel[1]];

            spudguns[i].orbitCorrected = true;
        }

        calculateGravity(spudguns[i], spudguns[i].gravSrc);

        spudguns[i].updatePosition();
    }

    if (screenFocus) {
        for (var i = 0; i < spudguns.length; i++) {
            spudguns[i].drawSelf();
        }
    }
}

var createLauncher = function() {
    var newLauncher = new PhysicsBody("spudgun", userBody.pos[0] + (userBody.radius/2), userBody.pos[1] + (userBody.radius/2), 8, userBody.vel[0] * 1.4, userBody.vel[1] * 1.4, 4, "#fff", planetOne);
    launchers.push(newLauncher);

    for (var i = 0; i < probeParticleCount; i++) {
        var probeParticleLife = getRandomInt(probeParticleLifeMin, probeParticleLifeMax);
        var particleVelX = getRandomInt(10, 14)/10;
        var particleVelY = getRandomInt(10, 14)/10;
        var newParticle = new PhysicsBody('particle', userBody.pos[0] + (userBody.radius/2), userBody.pos[1] + (userBody.radius/2), 1, userBody.vel[0]*particleVelX, userBody.vel[1]*particleVelY, 4, "rgba(255, 255, 255, 0.5)", planetOne);
        newParticle.life = probeParticleLife;
        orbitParticles.push(newParticle);

    }
}

var updateLaunchers = function () {
    for (var i = 0; i < launchers.length; i++) {

        if (launchers[i].orbitCorrected != true) {
            var distOffset = Math.sqrt(Math.pow(launchers[i].gravSrc.pos[0] - launchers[i].pos[0], 2) + Math.pow(launchers[i].gravSrc.pos[1] - launchers[i].pos[1], 2));
            var distOffsetUserBody = Math.sqrt(Math.pow(userBody.gravSrc.pos[0] - userBody.pos[0], 2) + Math.pow(userBody.gravSrc.pos[1] - userBody.pos[1], 2));
        }

        if (launchers[i].orbitCorrected != true && distOffset > distOffsetUserBody*1.15) {

            var velocity = Math.sqrt((bigG * launchers[i].gravSrc.mass * launchers[i].mass / distOffset)) * 0.45;

            var vectorPerp = [((launchers[i].gravSrc.pos[1] - launchers[i].pos[1])/distOffset), -((launchers[i].gravSrc.pos[0] - launchers[i].pos[0]) / distOffset)];
            var correctedVel = [vectorPerp[0] * velocity, vectorPerp[1] * velocity];
            launchers[i].vel = [correctedVel[0], correctedVel[1]];

            launchers[i].orbitCorrected = true;
        }

        calculateGravity(launchers[i], launchers[i].gravSrc);

        launchers[i].updatePosition();
    }

    if (screenFocus) {
        for (var i = 0; i < launchers.length; i++) {
            launchers[i].drawSelf();
        }
    }
}



var drawTrail = function(physBod) {


    if (physBod.type == "planet") {
        if (physBod.trail[0] != null) {
            if (physBod.trail[physBod.trail.length - 1][0].toFixed(0) != sPlanetOne.relPos[0].toFixed(0) || physBod.trail[physBod.trail.length - 1][1].toFixed(0) != sPlanetOne.relPos[1].toFixed(0)) {
                physBod.trail.push([sPlanetOne.relPos[0], sPlanetOne.relPos[1]]);
            }
        } else {
            physBod.trail.push([sPlanetOne.relPos[0], sPlanetOne.relPos[1]]);
        }
    } else {
        if (physBod.trail[0] != null) {
            if (physBod.trail[physBod.trail.length - 1][0].toFixed(0) != physBod.relPos[0].toFixed(0) || physBod.trail[physBod.trail.length - 1][1].toFixed(0) != physBod.relPos[1].toFixed(0)) {
                physBod.trail.push([physBod.relPos[0], physBod.relPos[1]]);
            }
        } else {
            physBod.trail.push([physBod.relPos[0], physBod.relPos[1]]);
        }
    }
    if (physBod.trail.length > physBod.trailLength) {
        physBod.trail.shift();
    }
    var trailOpacity = 1;
    for (var t = physBod.trail.length - 1; t > -1; t--) {
        octx.beginPath();
        octx.globalAlpha = trailOpacity;

        if (physBod.type == "planet") {
            octx.arc(physBod.trail[t][0] - sPlanetOne.relPos[0] + physBod.relPos[0], physBod.trail[t][1] - sPlanetOne.relPos[1] + physBod.relPos[1], (physBod.radius*trailOpacity) *0.99, 0, Math.PI * 2);
            octx.fillStyle = "rgb(0, 255, 194)";
            octx.fill();
        }
        else if (physBod.type !== "ship" && physBod.type !== "pod" && physBod.type !== "potatoPlant" && physBod.type !== "particle") {
            octx.arc(physBod.trail[t][0], physBod.trail[t][1], physBod.radius*trailOpacity, 0, Math.PI * 2);
            octx.fillStyle = physBod.colour;
            octx.fill();
        }
        else {
            octx.rect(physBod.trail[t][0], physBod.trail[t][1], physBod.radius*trailOpacity, physBod.radius);
            octx.fillStyle = physBod.colour;
            octx.fill();
        }

        octx.closePath();
        trailOpacity -= 1/physBod.trailLength;
    }
    octx.globalAlpha = 1;
}
var sDrawPlanetTrail = function(physBod) {
    var trailOpacity = 1;
    for (var t = physBod.trail.length - 1; t > -1; t--) {
        sctx.beginPath();
        sctx.globalAlpha = trailOpacity;
        sctx.arc(physBod.trail[t][0], physBod.trail[t][1], ((sPlanetOne.radius)*trailOpacity) *0.98, 0, Math.PI * 2);
        sctx.fillStyle = "rgb(0, 255, 194)";
        sctx.fill();
        sctx.closePath();
        sctx.globalAlpha = 1;
        trailOpacity -= 1/physBod.trailLength;
    }
}




var drawOrbitParticles = function() {
    if (orbitParticles.length > 0) {
        var particlesToKill = [];
        for (var i = 0; i < orbitParticles.length; i++) {
            calculateGravity(orbitParticles[i], orbitParticles[i].gravSrc);
            if (screenFocus) {
                orbitParticles[i].drawSelf();
            }
            orbitParticles[i].updatePosition();
            orbitParticles[i].life -= 1;
            if (orbitParticles[i].life <= 0) {
                particlesToKill.push(i);
            }
        }
        if (orbitParticles.length > 30) {
            var overCap = orbitParticles.length - 30;
            for (var i = 0; i < overCap; i++) {
                particlesToKill.push(31+i);
            }
        }
        if (particlesToKill.length > 0) {
            spliceArray(orbitParticles, particlesToKill);
        }
    }
}





var statusLogContainer = document.getElementById("status__container");
var atmosphereProgress = document.getElementById("status__atmosphereBar");
var inhabitantsProgress = document.getElementById("status__inhabitantsBar");
var sunMassProgress = document.getElementById("status__sunMassBar");
var sunMassProgressSpan = document.getElementById("status__sunMass");

// var logTimer = document.getElementById("event__timer");


var statusLog = [];

statusLog.push(status__gravSrc);
// statusLog.push(status__surface);
statusLog.push(status__atmosphere);
statusLog.push(status__inhabitants);


var atmosphere__data = 0;
// var ground__data = 0;
var inhabitants__data = 0;

var atmosphere__dataNeeded = 3;
// var ground__dataNeeded = 2;
var inhabitants__dataNeeded = 1000000;

var inhabitants__started = false;
var inhabitants__discovered = false;

var notificationDelay = 200;
var statusNotificationCol = "rgba(255, 255, 255, 0.7)";
var logNotificationCol = "rgba(255, 255, 255, 0.9)";

var rect = logContainer.getBoundingClientRect();
var logNotificationPosition = [oCanvas.width - 10, rect.top + 180];

var pushStatus = function(newMessage) {
    var newStatus = document.createElement('p');
    newStatus.innerHTML = newMessage;
    statusLogContainer.insertBefore(newStatus, statusLogContainer.childNodes[0]);
    statusLog.push(newMessage);
}


var eventLog = [];
var eventLogMessages = [];

var queuedLogs = [];
var qT = 0;

var messageSoundGap = 300;
var messageSoundCountdown = 0;

var messageBegin__sound = new Audio('audio/messages/begin.mp3');
var messageProcede__sound = [];
messageProcede__sound[1] = new Audio('audio/messages/procede1.mp3');
messageProcede__sound[2] = new Audio('audio/messages/procede2.mp3');
messageProcede__sound[3] = new Audio('audio/messages/procede3.mp3');
var messageConclude__sound = new Audio('audio/messages/conclude.mp3');

soundArray.push(messageBegin__sound);
soundArray.push(messageProcede__sound[1]);
soundArray.push(messageProcede__sound[2]);
soundArray.push(messageProcede__sound[3]);
soundArray.push(messageConclude__sound);

// var qTinit = 0;

var queueLog = function(delay, newWords) {

    if (newWords!=undefined) {
        queuedLogs.push([newWords, delay]);
        // logTimer.style.display = "block";
    } else if (queuedLogs.length > 0 || qT > 0) {
        if (qT == 0) {
            pushLog(queuedLogs[0][0]);
            qT = queuedLogs[0][1];
            var droppedLog = queuedLogs.shift();
            // if (queuedLogs.length < 1) {
            //     logTimer.style.display = "none";
            // }
            // else {
            //     qTinit = queuedLogs[0][1];
            // }
        }
        // logTimer.style.height = 100 - ((qT/qTinit) * 100);
        qT--;
        if (qT < 0) {
            qT = 0;
        }
    }
}
queueLog();

var pushLog = function(newMessage, loading) {
    var newLog = document.createElement('p');
    newLog.innerHTML = newMessage;
    newLog.className += "eventLog__event";
    // logContainer.insertBefore(newLog, logContainer.childNodes[0]);
    logContainer.appendChild(newLog);
    newLog.parentNode.scrollTop = newLog.offsetTop;
    eventLog.push(newLog);
    eventLogMessages.push(newMessage);
    newLog.style.background = logNotificationCol;
    setTimeout(statusNotification, 200);

    if (!loading) {
        if (queuedLogs.length == 1) {
            if (!thingMuted) {
                messageConclude__sound.play();
            }
        } else {
            if (messageSoundCountdown <= 0) {
                if (!thingMuted) {
                    messageBegin__sound.play();
                }
            } else {
                if (!thingMuted) {
                    var theSound = getRandomInt(1, 3);
                    messageProcede__sound[theSound].play();
                }
            }
        }
    messageSoundCountdown = messageSoundGap;
    }
}
var messagePulse = 0;
var messagePulseGo = false;
var statusNotification = function() {
    if (screenFocusReal) {
        document.title = "SPACEPLAN";
        messagePulse = 0;
        messagePulseGo = false;
        for (var e = 0; e < eventLog.length; e++) {
            if (eventLog[e].style.background != "transparent") {
                if (!isFirefox && !isEdge) {
                    eventLog[e].style.transition = "all 1s";
                }
                eventLog[e].style.background = "transparent";
            }

        }
        for (var e = 0; e < statusLog.length; e++) {
            if (statusLog[e].style.background != "transparent") {
                statusLog[e].style.transition = "all 0s";
                statusLog[e].style.background = "transparent";
            }
        }
    } else {
        messagePulseGo = true;
        requestAnimationFrame(statusNotification);
    }
}





var uiReflections = document.getElementsByClassName("overlay__reflection");
var shipInSunlightAlt = true;
var shipInSunlightInitialAlt = true;
var adjustReflections = function() {

    if (!gotLandship) {
        if (shipInSunlight != shipInSunlightInitial) {

            if (shipInSunlight == true) {

                for (var i = 0; i < uiReflections.length; i++) {

                    uiReflections[i].classList.remove("overlay__reflection__shade");
                }
            }
            else {

                for (var i = 0; i < uiReflections.length; i++) {

                    uiReflections[i].classList.add("overlay__reflection__shade");
                }
            }
            kinetigenSolarStrengthChange();
            updateResourceGain();

            shipInSunlightInitial = shipInSunlight;

        }
    } else if (!blackHoleShrunk) {
        if (shipInSunlightAlt != shipInSunlightInitialAlt) {

            if (shipInSunlightAlt == true) {
                for (var i = 0; i < uiReflections.length; i++) {

                    uiReflections[i].classList.remove("overlay__reflection__shade");
                }
            }
            else {

                for (var i = 0; i < uiReflections.length; i++) {

                    uiReflections[i].classList.add("overlay__reflection__shade");
                }
            }

            shipInSunlightInitialAlt = shipInSunlightAlt;

        }
        if (userPod) {
            shipInSunlightAlt = !inShadow([userPod.relPos[0] + (userPod.radius/2), userPod.relPos[1] + (userPod.radius/2)], [planetOne.shadPos[0][0], planetOne.shadPos[0][1]], [planetOne.shadPos[1][0], planetOne.shadPos[1][1]], planetOne.radius, userPod);
        }

        if (shipInSunlight != shipInSunlightInitial) {

            kinetigenSolarStrengthChange();
            updateResourceGain();

            shipInSunlightInitial = shipInSunlight;

        }

    } else if (shipInSunlight != shipInSunlightInitial) {

        if (shipInSunlight == true) {

            for (var i = 0; i < uiReflections.length; i++) {

                uiReflections[i].classList.remove("overlay__reflection__shade");
            }
        }
        else {

            for (var i = 0; i < uiReflections.length; i++) {

                uiReflections[i].classList.add("overlay__reflection__shade");
            }
        }
        kinetigenSolarStrengthChange();
        updateResourceGain();

        shipInSunlightInitial = shipInSunlight;

    }
}

var fallParticles = [];
var spitParticles = [];
var particleCounter = 0;
var particleFreq = 5;
var particleBatch = 1;
var particleFire = false;

var SpitParticle = function(seed, rad) {

    this.startDist = 10;
    this.speed = 234.3;

    this.seed = [seed[0], seed[1]];

    this.pos = [this.seed[0], this.seed[1]];


    // this.speed = 10;
    // this.offset = [sol.pos[0] - this.pos[0], sol.pos[1] - this.pos[1]];
    // this.perp = [this.offset[1], -this.offset[0]];

    this.posMagnitude = Math.sqrt(Math.pow(this.pos[0], 2) + Math.pow(this.pos[1], 2));
    this.posNormalized = [this.pos[0]/this.posMagnitude, this.pos[1]/this.posMagnitude];
    this.pos = [this.posNormalized[0] * this.startDist, this.posNormalized[1] * this.startDist];

    this.relPos = [this.pos[0] + sCanvasCenter[0], this.pos[1] + sCanvasCenter[1]];

    spitParticles.push(this);

    this.mass = 100000;
    this.rad = rad;
    this.col = "#fff";

    // this.vel = [this.seed[0] + (this.perp[0] * this.speed), this.seed[1] + (this.perp[0] * this.speed)];

    this.vel = [this.seed[0], this.seed[1]];


    this.velMagnitude = Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));
    this.velNormalized = [this.vel[0]/this.velMagnitude, this.vel[1]/this.velMagnitude];
    this.vel = [this.velNormalized[0] * this.speed, this.velNormalized[1] * this.speed];

    this.updatePosition = function() {
        this.relPos = [this.pos[0] + sCanvasCenter[0], this.pos[1] + sCanvasCenter[1]];
    }

    this.drawSelf = function() {
        if (screenFocus) {
            var posMagnitude = Math.sqrt(Math.pow(this.pos[0], 2) + Math.pow(this.pos[1], 2));
            var brightness = posMagnitude/200;
            var div = getRandomInt(0, 3);
            // this.col = "rgba(255, 255, 255, " + brightness + ")";
            this.col = "rgb(" + parseInt(255 * brightness/div) + ", " + parseInt(255 * brightness) + ", " + 255 + ")";
            sctx.beginPath();
            sctx.rect(this.relPos[0], this.relPos[1], this.rad, this.rad);
            sctx.fillStyle = this.col;
            sctx.fill();
            sctx.closePath();

            sctx.beginPath();
            sctx.moveTo(this.relPos[0], this.relPos[1]);
            sctx.lineTo(this.relPos[0] - this.vel[0], this.relPos[1] - this.vel[1]);
            sctx.lineWidth = this.rad;
            sctx.strokeStyle = this.col;
            sctx.stroke();
            sctx.closePath();

            this.offsetMagnitude = Math.sqrt(Math.pow(sol.pos[0] - this.pos[0], 2) + Math.pow(sol.pos[1] - this.pos[1], 2));
            if (this.offsetMagnitude > 40) {
                this.escape = true;
            }

            if (this.escape == true && this.offsetMagnitude < 40) {
                this.delete = true;
            }
        }
    }
}

var FallParticle = function() {

    this.speed = getRandomInt(0, 30)/10;

    if (Math.random() > 0.5) {
        if (Math.random() > 0.5) {
            this.pos = [0 - sCanvasCenter[0], getRandomInt(0, sCanvas.height) - sCanvasCenter[1]];
        } else {
            this.pos = [sCanvas.width - sCanvasCenter[0], getRandomInt(0, sCanvas.height) - sCanvasCenter[1]]
        }
    } else {
        if (Math.random() > 0.5) {
            this.pos = [getRandomInt(0, sCanvas.width) - sCanvasCenter[0], 0 - sCanvasCenter[1]];
        } else {
            this.pos = [getRandomInt(0, sCanvas.width) - sCanvasCenter[0], sCanvas.height - sCanvasCenter[1]];
        }
    }

    this.relPos = [this.pos[0] + sCanvasCenter[0], this.pos[1] + sCanvasCenter[1]];

    fallParticles.push(this);

    this.mass = 100000;
    this.rad = getRandomInt(1, 2);
    this.col = "#fff";

    // this.vel = [this.seed[0] + (this.perp[0] * this.speed), this.seed[1] + (this.perp[0] * this.speed)];
    var offsetMagnitude = Math.sqrt(Math.pow(sol.pos[0] - this.pos[0], 2) + Math.pow(sol.pos[1] - this.pos[1], 2));
    var offset = [sol.pos[0] - this.pos[0], sol.pos[1] - this.pos[1]];
    var offsetNormalized = [offset[0]/offsetMagnitude, offset[1]/offsetMagnitude];
    var perp = [offsetNormalized[1], -offsetNormalized[0]];

    this.vel = [perp[0] * this.speed, perp[1] * this.speed];

    this.updatePosition = function() {
        this.relPos = [this.pos[0] + sCanvasCenter[0], this.pos[1] + sCanvasCenter[1]];
    }

    this.drawSelf = function() {
        if (screenFocus) {
            this.offsetMagnitude = Math.sqrt(Math.pow(sol.pos[0] - this.pos[0], 2) + Math.pow(sol.pos[1] - this.pos[1], 2));
            sctx.beginPath();
            sctx.rect(this.relPos[0], this.relPos[1], this.rad, this.rad);
            sctx.fillStyle = this.col;
            sctx.fill();
            sctx.closePath();
        }
    }
}

var tallParticles = [];
var tallParticleCounter = 0;
var tallParticleFreq = 60;
var tallParticleFire = false;

var TallParticle = function() {

    if (Math.random() >= 0.5) {
        this.dir = 1;
        this.spread = 0.1;
    } else {
        this.dir = -1;
        this.spread = -0.1;
    }

    this.posX = sCanvasCenter[0];
    this.width = 0;

    tallParticles.push(this);

    this.animate = function() {

        sctx.beginPath();
        sctx.rect(this.posX, 0, this.width, sCanvas.height);
        sctx.fillStyle = 'rgba(' + 22 + ', ' + 20 + ', ' + 25 + ',' + (Math.random() + 0.5) + ')';
        sctx.fill();

        this.width += this.spread;
        this.posX += this.dir;
    }
}


var tallWhiteParticles = [];
var tallWhiteParticleCounter = 0;
var tallWhiteParticleFreq = 120;
var tallWhiteParticleFire = false;


var TallWhiteParticle = function() {

    if (Math.random() >= 0.5) {
        this.dir = 1;
    } else {
        this.dir = -1;
    }

    this.posX = sCanvasCenter[0];
    this.width = 1;
    this.speed = 0;

    tallWhiteParticles.push(this);

    this.animate = function() {

        sctx.beginPath();
        sctx.rect(this.posX, 0, this.width, sCanvas.height);
        sctx.fillStyle = '#fff';
        sctx.fill();

        this.posX += this.dir;
        this.speed += 0.2;
    }
}

var blackHoleParticlesAnimate = function() {
    for (var p = 0; p < tallParticles.length; p++) {
        tallParticles[p].animate();
        if (tallParticles[p].posX < 0 || tallParticles[p].posX > sCanvas.width) {
            tallParticles.splice(p, 1);
        }
    }

    for (var p = 0; p < fallParticles.length; p++) {
        calculateGravity(fallParticles[p], sol);
        fallParticles[p].updatePosition();
        fallParticles[p].drawSelf();

        if (fallParticles[p].offsetMagnitude < 20 || fallParticles[p].relPos[0] < 0 || fallParticles[p].relPos[0] > sCanvas.width || fallParticles[p].relPos[1] < 0 || fallParticles[p].relPos[1] > sCanvas.height) {
            if (fallParticles[p].offsetMagnitude < 20) {
                var spit = new SpitParticle(fallParticles[p].vel, fallParticles[p].rad);

            }
            fallParticles.splice(p, 1);
        }
    }
    if (fallParticles.length > 100) {
        var dropped = fallParticles.shift();
    }
    for (var p = 0; p < spitParticles.length; p++) {
        calculateGravity(spitParticles[p], sol);
        spitParticles[p].updatePosition();
        spitParticles[p].drawSelf();
        if (spitParticles[p].delete == true || spitParticles[p].relPos[0] < 0 || spitParticles[p].relPos[0] > sCanvas.width || spitParticles[p].relPos[1] < 0 || spitParticles[p].relPos[1] > sCanvas.height) {
            spitParticles.splice(p, 1);
        }
    }

    for (var p = 0; p < tallWhiteParticles.length; p++) {
        tallWhiteParticles[p].animate();
        if (tallWhiteParticles[p].posX < 0 || tallWhiteParticles[p].posX > sCanvas.width) {
            tallWhiteParticles.splice(p, 1);
        }
    }
}



//SOUND
// var itemHoverSound = [];
// var itemHoverSoundInt = 0;
// for (var ks = 0; ks < 5; ks++) {
//     itemHoverSound[ks] = new Audio('audio/prism-3.mp3');
//     itemHoverSound[ks].volume = 0.1;
// }
//
// var playHoverSound = function() {
//     if (!thingMuted) {
//         itemHoverSound[itemHoverSoundInt].currentTime = 0
//         itemHoverSound[itemHoverSoundInt].play();
//         itemHoverSoundInt++;
//         if (itemHoverSoundInt >= itemHoverSound.length) {
//             itemHoverSoundInt = 0;
//         }
//     }
//
// }

// var playSound = function(soundToPlay, soundInt) {
//
//     soundToPlay[soundInt].currentTime = 0
//     soundToPlay[soundInt].play();
//     soundInt++;
//     if (soundInt >= soundToPlay.length) {
//         soundInt = 0;
//     }
//
// }





var kinetigenButtonPadding = document.getElementById("kinetigen__button-padding");
var kinetigenScreen = document.getElementById("kinetigen__screen");
var kctx = kinetigenScreen.getContext("2d");

var keyDownSound = [];
var keyUpSound = [];

var keyDownSoundInt = 0;
var keyUpSoundInt = 0;

for (var ks = 0; ks < 15; ks++) {
    keyDownSound[ks] = new Audio('audio/keyDown.mp3');
    keyDownSound[ks].volume = 0.5;
    soundArray.push(keyDownSound[ks]);
}

for (var ks = 0; ks < 15; ks++) {
    keyUpSound[ks] = new Audio('audio/keyUp.mp3');
    keyUpSound[ks].volume = 0.6;
    soundArray.push(keyUpSound[ks]);
}



var kinetigenGain = 1;



var walkerSolarTracker = totalSolarProduced.toFixed(0);

kinetigenScreen.width = kinetigenScreen.offsetWidth;
kinetigenScreen.height = kinetigenScreen.offsetHeight;

var walkerCanal = (kinetigenScreen.offsetHeight - kinetigenButtonPadding.offsetHeight) / 2;
var walkerArray = [];

var solar_gradient_N=kctx.createLinearGradient(0,0,0,walkerCanal);
solar_gradient_N.addColorStop(0,"rgba(255, 223, 90, 0)");
solar_gradient_N.addColorStop(1,"rgba(255, 223, 90, 0.1)");
var solar_gradient_E=kctx.createLinearGradient(kinetigenScreen.width - walkerCanal,0,kinetigenScreen.width,0);
solar_gradient_E.addColorStop(0,"rgba(255, 223, 90, 0.1)");
solar_gradient_E.addColorStop(1,"rgba(255, 223, 90, 0)");
var solar_gradient_S=kctx.createLinearGradient(0,kinetigenScreen.height - walkerCanal,0,kinetigenScreen.height);
solar_gradient_S.addColorStop(0,"rgba(255, 223, 90, 0.1)");
solar_gradient_S.addColorStop(1,"rgba(255, 223, 90, 0)");
var solar_gradient_W=kctx.createLinearGradient(0,0,walkerCanal,0);
solar_gradient_W.addColorStop(0,"rgba(255, 223, 90, 0)");
solar_gradient_W.addColorStop(1,"rgba(255, 223, 90, 0.1)");

var panelPos = [];

var animateTimeout;

var kinetigenClick = function() {

    clearTimeout(animateTimeout);

    power += parseFloat(kinetigenGain);
    totalPowerProduced += parseFloat(kinetigenGain);
    powerSpan.innerHTML = numberWithCommas(power.toFixed(0));

    kinetigenScreen.style.transition = "all 0s";
    kinetigenScreen.style.backgroundColor = "#281922";

    for (var h = 0; h < kinetigenHiFiBars.length; h++) {

        kinetigenHiFiBars[h].height = kinetigenHiFiBars[h].maxHeight;
        kinetigenHiFiBars[h].strokeHeight = kinetigenHiFiBars[h].maxHeight;
        kinetigenHiFiBars[h].speed = 0;
        kinetigenHiFiBars[h].finished = false;
    }

    if (!thingMuted) {
        keyDownSound[keyDownSoundInt].play();
        keyDownSoundInt++;
        if (keyDownSoundInt >= keyDownSound.length) {
            keyDownSoundInt = 0;
        }
    }

    checkItems();
    checkResearch();
    animateTimeout = setTimeout(kinetigenAnimate, 40);
}

var kinetigenRelease = function() {

    if (!thingMuted) {
        keyUpSound[keyUpSoundInt].play();
        keyUpSoundInt++;
        if (keyUpSoundInt >= keyUpSound.length) {
            keyUpSoundInt = 0;
        }
    }

}

var kinetigenAnimate = function() {

    kinetigenScreen.style.transition = "all 0.5s";
    kinetigenScreen.style.backgroundColor = "#1a1a1a";//281922

}

var panelX = [0, kinetigenScreen.width - 2, 0, kinetigenScreen.width - 2];
var panelY = [kinetigenScreen.height/2 - 1, kinetigenScreen.height/2 - 1, kinetigenScreen.height/2 + 2, kinetigenScreen.height/2 + 2];
var panel = 1;

var kinetigenAddPanel = function() {

    kctx.beginPath();

    if (shipInSunlight) {

        kctx.globalAlpha = 1;
    } else {

        kctx.globalAlpha = 0.3;
    }


    if (panel == 1) {

        panelPos.push([panelX[0], panelY[0]]);
        kctx.rect(panelX[0], panelY[0], 2, 2);
        if (panelY[0] > 0) {
            panelY[0] -= 3;
        } else {
            panelX[0] += 3;
        }
        panel = 2;
    } else if (panel == 2) {

        panelPos.push([panelX[1], panelY[1]]);
        kctx.rect(panelX[1], panelY[1], 2, 2);
        if (panelY[1] > 0) {
            panelY[1] -= 3;
        } else {
            panelX[1] -= 3;
        }
        panel = 3;
    } else if (panel == 3) {

        panelPos.push([panelX[2], panelY[2]]);
        kctx.rect(panelX[2], panelY[2], 2, 2);
        if (panelY[2] < kinetigenScreen.height - 3) {
            panelY[2] += 3;
        } else {
            panelX[2] += 3;
        }
        panel = 4;
    } else if (panel == 4) {

        panelPos.push([panelX[3], panelY[3]]);
        kctx.rect(panelX[3], panelY[3], 2, 2);
        if (panelY[3] < kinetigenScreen.height - 3) {
            panelY[3] += 3;
        } else {
            panelX[3] -= 3;
        }
        panel = 1;
    }

    kctx.fillStyle = "#ffdf5a";
    kctx.fill();
    kctx.closePath();
    kctx.globalAlpha = 1;
}

var kinetigenUpdateWalkers = function() {
    if (screenFocus) {
        if (!gotPolishedPanels) {
            for (var i = 0; i < walkerArray.length; i++) {

                walkerArray[i].trail.push([walkerArray[i].pos[0], walkerArray[i].pos[1]]);

                if (walkerArray[i].trail.length > walkerArray[i].trailLength) {

                    var droppedTrail = walkerArray[i].trail.shift();
                }

                for (var j = walkerArray[i].trail.length - 1; j > -1; j--) {

                    kctx.beginPath();
                    kctx.globalAlpha = (1 - ((walkerArray[i].trail.length - j)/walkerArray[i].trail.length));
                    kctx.rect(walkerArray[i].trail[j][0], walkerArray[i].trail[j][1], 1, 2);
                    kctx.fillStyle = walkerArray[i].color;
                    kctx.fill();
                    kctx.closePath();
                    kctx.globalAlpha = 1;
                }

                kctx.beginPath();
                kctx.rect(walkerArray[i].pos[0], walkerArray[i].pos[1], 1, 1);
                kctx.fillStyle = walkerArray[i].color;
                kctx.fill();
                kctx.closePath();

                if (walkerArray[i].direction === 'N') {

                    walkerArray[i].pos[1] -= walkerArray[i].speed;

                    if (Math.random() > walkerArray[i].turnChance) {

                        if (Math.random() > 0.5) {

                            walkerArray[i].pos[0] += 1;
                        } else {

                            walkerArray[i].pos[0] -= 1;
                        }
                    }
                } else if (walkerArray[i].direction === 'NE') {

                    walkerArray[i].pos[0] += walkerArray[i].speed;
                    walkerArray[i].pos[1] -= walkerArray[i].speed;

                    if (Math.random() > walkerArray[i].turnChance) {

                        if (Math.random() > 0.5) {

                            walkerArray[i].pos[0] += 1;
                        } else {

                            walkerArray[i].pos[1] -= 1;
                        }
                    }
                } else if (walkerArray[i].direction === 'E') {

                    walkerArray[i].pos[0] += walkerArray[i].speed;

                    if (Math.random() > walkerArray[i].turnChance) {

                        if (Math.random() > 0.5) {

                            walkerArray[i].pos[1] += 1;
                        } else {

                            walkerArray[i].pos[1] -= 1;
                        }
                    }
                } else if (walkerArray[i].direction === 'SE') {

                    walkerArray[i].pos[0] += walkerArray[i].speed;
                    walkerArray[i].pos[1] += walkerArray[i].speed;

                    if (Math.random() > walkerArray[i].turnChance) {

                        if (Math.random() > 0.5) {

                            walkerArray[i].pos[0] += 1;
                        } else {

                            walkerArray[i].pos[1] += 1;
                        }
                    }
                } else if (walkerArray[i].direction === 'S') {

                    walkerArray[i].pos[1] += walkerArray[i].speed;

                    if (Math.random() > walkerArray[i].turnChance) {

                        if (Math.random() > 0.5) {

                            walkerArray[i].pos[0] += 1;
                        } else {

                            walkerArray[i].pos[0] -= 1;
                        }
                    }
                } else if (walkerArray[i].direction === 'SW') {

                    walkerArray[i].pos[0] -= walkerArray[i].speed;
                    walkerArray[i].pos[1] += walkerArray[i].speed;

                    if (Math.random() > walkerArray[i].turnChance) {

                        if (Math.random() > 0.5) {

                            walkerArray[i].pos[0] -= 1;
                        } else {

                            walkerArray[i].pos[1] += 1;
                        }
                    }
                } else if (walkerArray[i].direction === 'W') {

                    walkerArray[i].pos[0] -= walkerArray[i].speed;

                    if (Math.random() > walkerArray[i].turnChance) {

                        if (Math.random() > 0.5) {

                            walkerArray[i].pos[1] += 1;
                        } else {

                            walkerArray[i].pos[1] -= 1;
                        }
                    }
                } else if (walkerArray[i].direction === 'NW') {

                    walkerArray[i].pos[0] -= walkerArray[i].speed;
                    walkerArray[i].pos[1] -= walkerArray[i].speed;

                    if (Math.random() > walkerArray[i].turnChance) {

                        if (Math.random() > 0.5) {

                            walkerArray[i].pos[0] -= 1;
                        } else {

                            walkerArray[i].pos[1] -= 1;
                        }
                    }
                }

                if (walkerArray[i].pos[0] > walkerCanal && walkerArray[i].pos[0] < kinetigenScreen.width - walkerCanal && walkerArray[i].pos[1] > walkerCanal && walkerArray[i].pos[1] < kinetigenScreen.height - walkerCanal) {

                    kctx.beginPath();
                    kctx.globalAlpha = walkerArray[i].opacity;
                    kctx.fillStyle = solar_gradient_N;
                    kctx.fillRect(walkerCanal, 0, kinetigenScreen.width - (walkerCanal*2),walkerCanal);
                    kctx.closePath();
                    kctx.beginPath();
                    kctx.globalAlpha = walkerArray[i].opacity;
                    kctx.fillStyle = solar_gradient_E;
                    kctx.fillRect(kinetigenScreen.width - walkerCanal, walkerCanal, walkerCanal, kinetigenScreen.height - (walkerCanal*2));
                    kctx.closePath();
                    kctx.beginPath();
                    kctx.globalAlpha = walkerArray[i].opacity;
                    kctx.fillStyle = solar_gradient_S;
                    kctx.fillRect(walkerCanal,kinetigenScreen.height - walkerCanal, kinetigenScreen.width - (walkerCanal*2),walkerCanal);
                    kctx.closePath();
                    kctx.beginPath();
                    kctx.globalAlpha = walkerArray[i].opacity;
                    kctx.fillStyle = solar_gradient_W;
                    kctx.fillRect(0, walkerCanal, walkerCanal, kinetigenScreen.height - (walkerCanal*2));
                    kctx.closePath();
                    walkerArray[i].opacity -= 0.1;
                    if (walkerArray[i].opacity <= 0) {
                        walkerArray[i].opacity = 0;
                    }
                    kctx.globalAlpha = 1;
                }
                if (walkerArray[i].trail[0][0] > walkerCanal && walkerArray[i].trail[0][0] < kinetigenScreen.width - walkerCanal && walkerArray[i].trail[0][1] > walkerCanal && walkerArray[i].trail[0][1] < kinetigenScreen.height - walkerCanal) {

                    walkerArray.splice(i, 1);
                } else if (walkerArray[i].pos[0] >= kinetigenScreen.width - 3 || walkerArray[i].pos[0] <= 3 || walkerArray[i].pos[1] >= kinetigenScreen.height - 3 || walkerArray[i].pos[1] <= 3) {

                    walkerArray.splice(i, 1);
                }
            }
        } else {
            for (var i = 0; i < walkerArray.length; i++) {

                kctx.globalAlpha = walkerArray[i].opacity;
                kctx.beginPath();
                kctx.moveTo(walkerArray[i].pos[0], walkerArray[i].pos[1]);
                kctx.lineTo(kinetigenScreen.width/2, kinetigenScreen.height/2);
                kctx.strokeStyle = walkerArray[i].color;
                kctx.lineWidth = 1;
                kctx.stroke();
                kctx.closePath();

                walkerArray[i].life--;
                walkerArray[i].opacity -= 0.1;

                kctx.globalAlpha = 1;

                if (walkerArray[i].life <= 0 || walkerArray[i].opacity <= 0) {
                    walkerArray.splice(i, 1);
                }
            }
        }
    }
}

var kinetigenSolarStrengthChange = function() {
    kctx.clearRect(0,0,kinetigenScreen.width, kinetigenScreen.height);

    kctx.beginPath();

    if (shipInSunlight) {

        kctx.globalAlpha = 1;
    } else {

        kctx.globalAlpha = 0.3;
    }

    for (var p = 0; p < panelPos.length; p++) {

        kctx.rect(panelPos[p][0], panelPos[p][1], 2, 2);
    }

    kctx.fillStyle = "#ffdf5a";
    kctx.fill();
    kctx.closePath();
    kctx.globalAlpha = 1;
}


var kinetigenNextPanel = 0;

var kinetigenFireWalkers = function() {

    if (walkerSolarTracker < totalSolarProduced.toFixed(0)) {

        var walkersToGen = totalSolarProduced.toFixed(0) - walkerSolarTracker;

        if (walkersToGen > itemSolar.currentCount * 0.15) {
            walkersToGen = itemSolar.currentCount * 0.15;
        }

        if (screenFocus) {
            if (!gotPolishedPanels) {
                for(var o = 0; o < walkersToGen; o++) {


                    if (panelPos[kinetigenNextPanel][0] + 1 > walkerCanal && panelPos[kinetigenNextPanel][0] + 1 < kinetigenScreen.width - walkerCanal && panelPos[kinetigenNextPanel][1] > kinetigenScreen.height - walkerCanal) {
                        newDir = 'N';
                        newPos = [panelPos[kinetigenNextPanel][0] + 1, panelPos[kinetigenNextPanel][1] - 2];
                    } else if (panelPos[kinetigenNextPanel][0] + 1 < walkerCanal && panelPos[kinetigenNextPanel][1] > kinetigenScreen.height - walkerCanal) {
                        newDir = 'NE';
                        newPos = [panelPos[kinetigenNextPanel][0] + 3, panelPos[kinetigenNextPanel][1] - 2];
                    } else if (panelPos[kinetigenNextPanel][0] + 1 < walkerCanal && panelPos[kinetigenNextPanel][1] > walkerCanal && panelPos[kinetigenNextPanel][1] < kinetigenScreen.height - walkerCanal) {
                        newDir = 'E';
                        newPos = [panelPos[kinetigenNextPanel][0] + 3, panelPos[kinetigenNextPanel][1]];
                    } else if (panelPos[kinetigenNextPanel][0] + 1 < walkerCanal && panelPos[kinetigenNextPanel][1] < walkerCanal) {
                        newDir = 'SE';
                        newPos = [panelPos[kinetigenNextPanel][0] + 3, panelPos[kinetigenNextPanel][1] + 3];
                    } else if (panelPos[kinetigenNextPanel][0] + 1 > walkerCanal && panelPos[kinetigenNextPanel][0] + 1 < kinetigenScreen.width - walkerCanal && panelPos[kinetigenNextPanel][1] < walkerCanal) {
                        newDir = 'S';
                        newPos = [panelPos[kinetigenNextPanel][0] + 1, panelPos[kinetigenNextPanel][1] + 3];
                    } else if (panelPos[kinetigenNextPanel][0] + 1 > kinetigenScreen.width - walkerCanal && panelPos[kinetigenNextPanel][1] < walkerCanal) {
                        newDir = 'SW';
                        newPos = [panelPos[kinetigenNextPanel][0] - 2, panelPos[kinetigenNextPanel][1] + 3];
                    } else if (panelPos[kinetigenNextPanel][0] + 1 > kinetigenScreen.width - walkerCanal && panelPos[kinetigenNextPanel][1] > walkerCanal && panelPos[kinetigenNextPanel][1] < kinetigenScreen.height - walkerCanal) {
                        newDir = 'W';
                        newPos = [panelPos[kinetigenNextPanel][0] - 2, panelPos[kinetigenNextPanel][1]];
                    } else if (panelPos[kinetigenNextPanel][0] + 1 > kinetigenScreen.width - walkerCanal && panelPos[kinetigenNextPanel][1] > kinetigenScreen.height - walkerCanal) {
                        newDir = 'NW';
                        newPos = [panelPos[kinetigenNextPanel][0] - 2, panelPos[kinetigenNextPanel][1] - 2];
                    }

                    var walker = {

                        "pos": newPos,
                        "speed": 4,
                        "trail": [],
                        "trailLength": 10,
                        "opacity": 0.5,
                        "color": "#ffdf5a",
                        "turnChance": 0.5,
                        "direction": newDir,
                        "life": 10
                    };

                    kinetigenNextPanel ++;
                    if (kinetigenNextPanel == panelPos.length) {

                        kinetigenNextPanel = 0;
                    }

                    walkerArray.push(walker);
                }
            } else {
                for(var o = 0; o < walkersToGen; o++) {

                    var walker = {
                        "pos": [panelPos[kinetigenNextPanel][0], panelPos[kinetigenNextPanel][1]],
                        "color": "#ffdf5a",
                        "life": 10,
                        "opacity": 1
                    };

                    kinetigenNextPanel ++;
                    if (kinetigenNextPanel == panelPos.length) {

                        kinetigenNextPanel = 0;
                    }

                    walkerArray.push(walker);
                }
            }
        }
    }

    walkerSolarTracker = totalSolarProduced.toFixed(0);
}


var kinetigenDrawSplits = function() {

    kctx.beginPath();
    kctx.moveTo(2.5, kinetigenScreen.height - 2.5);
    kctx.lineTo(kinetigenScreen.width - 2.5, kinetigenScreen.height - 2.5);
    kctx.lineTo(kinetigenScreen.width - 2.5, 2.5);
    kctx.lineTo(2.5, 2.5);
    kctx.lineTo(2.5, kinetigenScreen.height - 2.5);
    kctx.lineWidth = 1;
    kctx.strokeStyle = "#000";
    kctx.stroke();
    kctx.closePath();
}



var kinetigenHiFiBars = [];

var kHiFiBar = {

    "maxHeight": walkerCanal * 0.9,
    "height": 0,
    "strokeHeight": 0,
    "dir": 1,
    "width": 4,
    "maxSpeed": 6,
    "speed": 0,
    "speedRamp": 0.25,
    "color": "#ff3e3e",
    "xpos": kinetigenScreen.width / 2 - 2,
    "ypos": walkerCanal,
}
kinetigenHiFiBars.push(kHiFiBar);

var kinetigenBarDrop = function() {

    for (var h = 0; h < kinetigenHiFiBars.length; h++) {

        if (kinetigenHiFiBars[h].finished != true) {
            kctx.beginPath();
            kctx.rect(kinetigenHiFiBars[h].xpos, kinetigenHiFiBars[h].ypos, kinetigenHiFiBars[h].width, -kinetigenHiFiBars[h].height + 3);
            kctx.fillStyle = "#fff";
            kctx.fill();
            kctx.closePath();

            kctx.beginPath();
            kctx.rect(kinetigenHiFiBars[h].xpos, kinetigenHiFiBars[h].ypos - kinetigenHiFiBars[h].strokeHeight, kinetigenHiFiBars[h].width, 3);
            kctx.fillStyle = kinetigenHiFiBars[h].color;
            kctx.fill();
            kctx.closePath();

            if (kinetigenHiFiBars[h].dir === 1) {
                if ((kinetigenHiFiBars[h].height > 0 || kinetigenHiFiBars[h].strokeHeight > 0)){

                    kinetigenHiFiBars[h].height -= kinetigenHiFiBars[h].speed;
                    kinetigenHiFiBars[h].strokeHeight -= kinetigenHiFiBars[h].speed / 2;
                    if ((kinetigenHiFiBars[h].speed < kinetigenHiFiBars[h].maxSpeed)){

                        kinetigenHiFiBars[h].speed += kinetigenHiFiBars[h].speedRamp;
                    } else {

                        kinetigenHiFiBars[h].speed = kinetigenHiFiBars[h].maxSpeed;
                    }

                } else {
                    kinetigenHiFiBars[h].finished = true;

                }
                if ((kinetigenHiFiBars[h].height < 0)){

                    kinetigenHiFiBars[h].height = 0;
                }
            }
            else if (kinetigenHiFiBars[h].dir === 0) {
                if ((kinetigenHiFiBars[h].height < 3 || kinetigenHiFiBars[h].strokeHeight < 3)){

                    kinetigenHiFiBars[h].height -= kinetigenHiFiBars[h].speed;
                    kinetigenHiFiBars[h].strokeHeight -= kinetigenHiFiBars[h].speed / 2;
                    if ((kinetigenHiFiBars[h].speed > kinetigenHiFiBars[h].maxSpeed)){

                        kinetigenHiFiBars[h].speed += kinetigenHiFiBars[h].speedRamp;
                    } else {

                        kinetigenHiFiBars[h].speed = kinetigenHiFiBars[h].maxSpeed;
                    }

                }
                if ((kinetigenHiFiBars[h].height > 3)){

                    kinetigenHiFiBars[h].height = 3;
                }
                if ((kinetigenHiFiBars[h].strokeHeight > 2)){

                    kinetigenHiFiBars[h].strokeHeight = 5;
                }
                if ((kinetigenHiFiBars[h].strokeHeight > 2)&&(kinetigenHiFiBars[h].height > 3)){
                    kinetigenHiFiBars[h].finished = true;
                }
            }
        }
    }
}


var kinetigenWalker = function() {
    if (screenFocus) {
        kctx.clearRect(2,2,kinetigenScreen.width - 4, kinetigenScreen.height - 4);
    }

    kinetigenUpdateWalkers();
    kinetigenFireWalkers();

    if (screenFocus) {
        kinetigenBarDrop();
        kinetigenDrawSplits();
    }

}
setInterval(kinetigenWalker, 30); //FPS (*3)





var initDate = new Date("0000-01-01");
var realDate = new Date("2343-04-12")
var shipDateSpan = document.getElementById("ship__date");

var updateDate = function() {
    if (!groundView) {
        var angleDiff = angleBetweenPoints([sPlanetOne.pos[0], sPlanetOne.pos[1]], [1,0]) * 57.44;
        if (angleDiff.toFixed(0) != prevAngle) {
            var daysToAdd = angleDiff.toFixed(0) - prevAngle;
            if (!inhabitants__discovered) {
                initDate.setDate(initDate.getDate() + Math.abs(daysToAdd));

                var initY = initDate.getFullYear();
                var initM = initDate.getMonth();
                var initD = initDate.getDate();

                var n = initY;
                var z = z || '0';
                n = n + '';
                var initY = n.length >= 4 ? n : new Array(4 - n.length + 1).join(z) + n;
                var n = initM + 1;
                var z = z || '0';
                n = n + '';
                var initM = n.length >= 2 ? n : new Array(2 - n.length + 1).join(z) + n;
                var n = initD;
                var z = z || '0';
                n = n + '';
                var initD = n.length >= 2 ? n : new Array(2 - n.length + 1).join(z) + n;

                shipDateSpan.innerHTML = initY + "." + initM + "." + initD;
            } else {

                realDate.setDate(realDate.getDate() + Math.abs(daysToAdd));

                var initY = realDate.getFullYear();
                var initM = realDate.getMonth();
                var initD = realDate.getDate();

                var n = initY;
                var z = z || '0';
                n = n + '';
                var initY = n.length >= 4 ? n : new Array(4 - n.length + 1).join(z) + n;
                var n = initM + 1;
                var z = z || '0';
                n = n + '';
                var initM = n.length >= 2 ? n : new Array(2 - n.length + 1).join(z) + n;
                var n = initD;
                var z = z || '0';
                n = n + '';
                var initD = n.length >= 2 ? n : new Array(2 - n.length + 1).join(z) + n;

                shipDateSpan.innerHTML = initY + "." + initM + "." + initD;
            }
        }
        prevAngle = angleDiff.toFixed(0);
    }
}





var landingStage = "space";
var landingParticles = [];
var shipLanded = false;

var groundView = false;

var wrapperEnding = document.getElementById("ending__wrapper");

var podLand__sound = new Audio('audio/pod/land.mp3');
soundArray.push(podLand__sound);

var hitground = false;
var landPlayed = false;

var shipLandingSequence = function() {
    if (!gotLandshipAgain) {
        var gravOffset = Math.sqrt(Math.pow(userPod.gravSrc.pos[0] - userPod.pos[0], 2) + Math.pow(userPod.gravSrc.pos[1] - userPod.pos[1], 2))

        if (gravOffset < userPod.gravSrc.radius + 15) {
            if (landingStage == "space") {
                pushLog("Entering atmosphere...");
                landingStage = "atmosphere";

                var distOffset = Math.sqrt(Math.pow(userPod.gravSrc.pos[0] - userPod.pos[0], 2) + Math.pow(userPod.gravSrc.pos[1] - userPod.pos[1], 2));
                var velocity = Math.sqrt((bigG * userPod.gravSrc.mass * userPod.mass / distOffset)) * 0.31;

                var vectorPerp = [((userPod.gravSrc.pos[1] - userPod.pos[1])/distOffset), -((userPod.gravSrc.pos[0] - userPod.pos[0]) / distOffset)];
                var correctedVel = [vectorPerp[0] * velocity, vectorPerp[1] * velocity];
                userPod.vel = [correctedVel[0], correctedVel[1]];
            }
            if (screenFocus && landingStage == "atmosphere") {
                drawTrail(userPod);
            }

            userPod.vel[0] *= 0.9996;
            userPod.vel[1] *= 0.9996;

            // userPod.vectorMagnitude = Math.sqrt(Math.pow(userPod.vel[0], 2) + Math.pow(userPod.vel[1], 2));

            // if (userPod.vectorMagnitude > terminalVelocity) {
            //     userPod.vel[0] *= 0.7;
            //     userPod.vel[1] *= 0.7;
            // }
            var brightness = getRandomInt(50, 80)/100;
            for (var i = 0; i < uiReflections.length; i++) {

                uiReflections[i].style.opacity = brightness;
            }

            if (gravOffset < userPod.gravSrc.radius + 10) {

                if(!landPlayed) {
                    if (!thingMuted) {
                        podLand__sound.play();
                    }
                    landPlayed = true;
                    shipLandFailSafe = false;
                    setTimeout(function() {
                        hitground = true;
                        shipLandFailSafe = false;

                    },
                    3700);
                }

                if (landingStage == "atmosphere" && hitground) {

                    landPlayed = false;
                    hitground = false;

                    for (var i = 0; i < uiReflections.length; i++) {
                        uiReflections[i].style.cssText = "";
                    }

                    // var distOffset = [userPod.gravSrc.pos[0] - userPod.pos[0], userPod.gravSrc.pos[1] - userPod.pos[1]];
                    // var distOffsetMag = Math.sqrt(Math.pow(distOffset[0], 2) + Math.pow(distOffset[1], 2));
                    // var distOffsetNorm = [distOffset[0]/distOffsetMag, distOffset[1]/distOffsetMag];
                    // var vectorPerp = [((userPod.gravSrc.pos[1] - userPod.pos[1])/distOffsetMag), -((userPod.gravSrc.pos[0] - userPod.pos[0]) / distOffsetMag)];

                    var vectorPerp = [userPod.vel[1], -userPod.vel[0]];

                    for (var par = 0; par < 30; par++) {

                        var perpBias = getRandomInt(20, 80)/100;
                        var velBias = 1 - perpBias;

                        var vectorDir = [(vectorPerp[0]*perpBias) + (userPod.vel[0]*velBias), (vectorPerp[1]*perpBias) + (userPod.vel[1]*velBias)];

                        var velx = getRandomInt(800, 1000)/1000;
                        var vely = getRandomInt(800, 1000)/1000;

                        var newPar = new PhysicsBody("particle", userPod.pos[0], userPod.pos[1], 1, vectorDir[0] * velx, vectorDir[1] * vely, 10, planetOne.colour,    planetOne);
                        landingParticles.push(newPar);
                    }

                    if(!thingMuted) {
                        podLand__sound.play();
                    }
                    landingStage = "landed";
                    shipLanded = true;
                    status__gravSrc.innerHTML = "Orbiting mass: <span>Sol</span>";
                    queueLog(66, "Pod's still intact after that nasty impact...");
                    queueLog(132, "Oh! The whole 'Earth' thing - yeah, looks like this is it. Let's get our radar improved using... I don't know... our massive spudnik network? Whatever. Just to confirm the 'Earth' theory.");
                    queueLog(132, "Also, think I've got enough data<br/>to understand how the humans all<br/>killed themselves. No point explaining<br/>to you - it's pretty complicated stuff. I may have a world-saving plan though... Get us that System Peeker, for sure.");
                    createResearch("systView");
                    if (itemTaterTower != undefined) {
                        itemTaterTower.conditions = true;
                        itemTaterTower.costLineSpan.innerHTML = "<span id='cost'>" + numberWithCommas(itemTaterTower.currentCost) + "</span> power";
                        itemTaterTower.costSpan = itemTaterTower.el.querySelector("#cost");
                    }
                    ga('set', {
                                'userId': USER_ID,
                                'dimension1': shipName,
                                'dimension2': USER_ID,
                                'metric11': 1
                              });
                    ga('send', 'pageview');
                    ga('set', {
                                'metric11': 0
                              });

                    for (var x = 0; x < physicsBodies.length; x++) {
                        if (physicsBodies[x] == userPod) {
                            physicsBodies.splice(x, 1);
                        }
                    }
                }
            }
        }
    } else if (landingStage != "landed"){
        //AGAIN

        var gravOffset = Math.sqrt(Math.pow(userBody.gravSrc.pos[0] - userBody.pos[0], 2) + Math.pow(userBody.gravSrc.pos[1] - userBody.pos[1], 2))

        if (gravOffset < userBody.gravSrc.radius + 15) {
            if (landingStage == "space") {
                pushLog("Entering atmosphere...");
                landingStage = "atmosphere";

                var distOffset = Math.sqrt(Math.pow(userBody.gravSrc.pos[0] - userBody.pos[0], 2) + Math.pow(userBody.gravSrc.pos[1] - userBody.pos[1], 2));
                var velocity = Math.sqrt((bigG * userBody.gravSrc.mass * userBody.mass / distOffset)) * 0.31;

                var vectorPerp = [((userBody.gravSrc.pos[1] - userBody.pos[1])/distOffset), -((userBody.gravSrc.pos[0] - userBody.pos[0]) / distOffset)];
                var correctedVel = [vectorPerp[0] * velocity, vectorPerp[1] * velocity];
                userBody.vel = [correctedVel[0], correctedVel[1]];
            }
            if (screenFocus && landingStage == "atmosphere") {
                drawTrail(userBody);
            }

            userBody.vel[0] *= 0.9996;
            userBody.vel[1] *= 0.9996;


            var brightness = getRandomInt(50, 80)/100;
            for (var i = 0; i < uiReflections.length; i++) {

                uiReflections[i].style.opacity = brightness;
            }
            scratchTexture.style.opacity = brightness/2;

            if (gravOffset < userBody.gravSrc.radius) {

                if(!landPlayed) {
                    if (!thingMuted) {
                        podLand__sound.play();
                    }
                    landPlayed = true;
                    setTimeout(function() {
                        hitground = true;
                    },
                    3700);
                }

                if (landingStage == "atmosphere" && hitground) {

                    for (var i = 0; i < uiReflections.length; i++) {
                        uiReflections[i].style.cssText = "";
                    }

                    var vectorPerp = [userBody.vel[1], -userBody.vel[0]];

                    for (var par = 0; par < 30; par++) {

                        var perpBias = getRandomInt(20, 80)/100;
                        var velBias = 1 - perpBias;

                        var vectorDir = [(vectorPerp[0]*perpBias) + (userBody.vel[0]*velBias), (vectorPerp[1]*perpBias) + (userBody.vel[1]*velBias)];

                        var velx = getRandomInt(800, 1000)/1000;
                        var vely = getRandomInt(800, 1000)/1000;

                        var newPar = new PhysicsBody("particle", userBody.pos[0], userBody.pos[1], 1, vectorDir[0] * velx, vectorDir[1] * vely, 10, planetOne.colour,    planetOne);
                        landingParticles.push(newPar);
                    }

                    landingStage = "landed";
                    shipLanded = true;
                    status__gravSrc.innerHTML = "Orbiting mass: <span>Sol</span>";
                    pushLog("Landed ship successfully.");

                    scratchTexture.style.opacity = 0.8;
                    endingAudio.style.opacity = 0.4;
                    setTimeout(
                        function() {
                            wrapperEnding.appendChild(endingVid);
                            // endingVid.width = 100 + '%';
                            endingVid.videoHeight = 100 + '%';
                            endingVid.videoWidth = 100 + '%';
                            endingVid.className = "ending__vid";
                            setTimeout(function() {
                                endingVid.play();
                                endingVid.addEventListener('ended',endingTitle,false);
                                endingVid.volume = globalVolume;
                            }, 800);

                            wrapperMain.style.top = 100 + '%';
                            document.body.style.overflow = "hidden";
                            wrapperEnding.style.top = 0;
                        },
                        2000
                    );

                    ga('set', {
                                'userId': USER_ID,
                                'dimension1': shipName,
                                'dimension2': USER_ID,
                                'metric13': 1
                              });
                    ga('send', 'pageview');
                    ga('set', {
                                'metric13': 0
                              });

                }
            }
        }
    }

    // calculateGravity(userBody, userBody.gravSrc);
    // userBody.updatePosition();
    // userBody.drawSelf();
    //
    // var gravOffset = Math.sqrt(Math.pow(userBody.gravSrc.pos[0] - userBody.pos[0], 2) + Math.pow(userBody.gravSrc.pos[1] - userBody.pos[1], 2))
    //
    // if (gravOffset < userBody.gravSrc.radius + 15) {
    //     if (landingStage == "space") {
    //         pushLog("Entering atmosphere...");
    //         landingStage = "atmosphere";
    //     }
    //     if (screenFocus && landingStage == "atmosphere") {
    //         drawTrail(userBody);
    //     }
    //
    //     userBody.vectorMagnitude = Math.sqrt(Math.pow(userBody.vel[0], 2) + Math.pow(userBody.vel[1], 2));
    //
    //     if (userBody.vectorMagnitude > terminalVelocity) {
    //         userBody.vel[0] *= 0.7;
    //         userBody.vel[1] *= 0.7;
    //     }
    //
    //     if (gravOffset < (userBody.gravSrc.radius - userBody.landingZone) + 4) {
    //
    //         // if (gotLandshipAgain) {
    //         //
    //         //     groundView = true;
    //         //     landingStage = "landed";
    //         //     status__gravSrc.innerHTML = "Orbiting mass: <span>Sol</span>";
    //         //     endCanvas.style.display = "block";
    //         //     oCanvas.style.display = "none";
    //         //     sCanvas.style.display = "none";
    //         //
    //         //
    //         // } else {
    //             if (userBody.vectorMagnitude > parachuteVelocity) {
    //                 userBody.vel[0] *= 0.7;
    //                 userBody.vel[1] *= 0.7;
    //             }
    //
    //             if (landingStage == "atmosphere") {
    //                 pushLog("Landing...");
    //                 landingStage = "landing";
    //             }
    //
    //             if (gravOffset < userBody.gravSrc.radius - userBody.landingZone) {
    //
    //                 if (landingStage == "landing") {
    //                     pushLog("Landed ship successfully.");
    //                     landingStage = "landed";
    //                     status__gravSrc.innerHTML = "Orbiting mass: <span>Sol</span>";
    //                 }
    //             }
    //         // }
    //     }
    // }
}

var drawLandingParticles = function() {
    for (var p = 0; p < landingParticles.length; p++) {
        calculateGravity(landingParticles[p], landingParticles[p].gravSrc);
        landingParticles[p].updatePosition();
        if (screenFocus) {
            landingParticles[p].drawSelf();
        }
        landingParticles[p].vel[0] *= 0.999;
        landingParticles[p].vel[1] *= 0.999;

        var gravOffset = Math.sqrt(Math.pow(landingParticles[p].gravSrc.pos[0] - landingParticles[p].pos[0], 2) + Math.pow(landingParticles[p].gravSrc.pos[1] - landingParticles[p].pos[1], 2));
        if (gravOffset < landingParticles[p].gravSrc.radius - 10) {
            landingParticles.splice(p, 1);
        }

    }
}

var drawLandedPod = function() {
    if (!re__earth) {
        userPod.updatePosition();
        userPod.drawSelf();
    }
}
var drawLandedShip = function() {
    userBody.updatePosition();
    userBody.drawSelf();
}




var sSpuds = [];

var firedSpudsTracker = 0;
var firedTatersTracker = 0;

var spudFireVel = 0.2;
var taterFireVel = 0.1;

var spudParVel = 0.2;
var taterParVel = 0.1;

var solStartRad = 270;

var blackHoleMass = 30000000;
var sunCollapseRadius = 100;

var blackHoleMade = false;
var blackHoleShrunk = false;

var solShrinkT = 0;
var solShrinkB = 150;
var solShrinkC = -140;
var solShrinkD = 1;

var spudVisArray = [];

var fireSpuds = function() {

    if (firedSpudsTracker !== firedSpuds.toFixed(0)) {

        var spudsToFire = firedSpuds.toFixed(0) - firedSpudsTracker;

        for (var y = 0; y < spudsToFire; y++) {

            var vectorMag = Math.sqrt(Math.pow(sPlanetOne.gravSrc.pos[0] - sPlanetOne.pos[0], 2) + Math.pow(sPlanetOne.gravSrc.pos[1] - sPlanetOne.pos[1], 2));
            var vectorOffset = [sPlanetOne.gravSrc.pos[0] - sPlanetOne.pos[0], sPlanetOne.gravSrc.pos[1] - sPlanetOne.pos[1]];
            var vectorNorm = [vectorOffset[0] / vectorMag, vectorOffset[1] / vectorMag];
            var accumulatedVector = [(sPlanetOne.vel[0] * spudParVel) + (vectorNorm[0] * spudFireVel), (sPlanetOne.vel[1] * spudParVel) + (vectorNorm[1] * spudFireVel)]

            var newSpud = new PhysicsBody("spud", sPlanetOne.pos[0], sPlanetOne.pos[1], 1, accumulatedVector[0], accumulatedVector[1], 1, "#fff", sol);
            sSpuds.push(newSpud);

            var distOffset = [sPlanetOne.gravSrc.pos[0] - sPlanetOne.pos[0], sPlanetOne.gravSrc.pos[1] - sPlanetOne.pos[1]];
            var distOffsetMag = Math.sqrt(Math.pow(distOffset[0], 2) + Math.pow(distOffset[1], 2));
            var distOffsetNorm = [distOffset[0]/distOffsetMag, distOffset[1]/distOffsetMag];

            if (screenFocus) {
                var spudVis = new ShotLine([spudguns[nextSpud].relPos[0], spudguns[nextSpud].relPos[1]], [spudguns[nextSpud].relPos[0] + (distOffsetNorm[0] * 1000), spudguns[nextSpud].relPos[1] + (distOffsetNorm[1] * 1000)], spudguns[nextSpud].radius/2);
                spudVisArray.push(spudVis);
                nextSpud++;
            }
            if (nextSpud >= spudguns.length) {
                nextSpud = 0;
            }
        }
    }
    firedSpudsTracker = firedSpuds.toFixed(0);

    if (firedTatersTracker !== firedTaters.toFixed(0)) {

        var tatersToFire = firedTaters.toFixed(0) - firedTatersTracker;

        for (var y = 0; y < tatersToFire; y++) {

            var vectorMag = Math.sqrt(Math.pow(sPlanetOne.gravSrc.pos[0] - sPlanetOne.pos[0], 2) + Math.pow(sPlanetOne.gravSrc.pos[1] - sPlanetOne.pos[1], 2));
            var vectorOffset = [sPlanetOne.gravSrc.pos[0] - sPlanetOne.pos[0], sPlanetOne.gravSrc.pos[1] - sPlanetOne.pos[1]];
            var vectorNorm = [vectorOffset[0] / vectorMag, vectorOffset[1] / vectorMag];
            var accumulatedVector = [(sPlanetOne.vel[0] * taterParVel) + (vectorNorm[0] * taterFireVel), (sPlanetOne.vel[1] * taterParVel) + (vectorNorm[1] * taterFireVel)]

            var newSpud = new PhysicsBody("tater", sPlanetOne.pos[0], sPlanetOne.pos[1], 2, accumulatedVector[0], accumulatedVector[1], 2, "#fff", sol);
            sSpuds.push(newSpud);

            var distOffset = [sPlanetOne.gravSrc.pos[0] - sPlanetOne.pos[0], sPlanetOne.gravSrc.pos[1] - sPlanetOne.pos[1]];
            var distOffsetMag = Math.sqrt(Math.pow(distOffset[0], 2) + Math.pow(distOffset[1], 2));
            var distOffsetNorm = [distOffset[0]/distOffsetMag, distOffset[1]/distOffsetMag];

            if (screenFocus) {
                var spudVis = new ShotLine([launchers[nextLauncher].relPos[0], launchers[nextLauncher].relPos[1]], [launchers[nextLauncher].relPos[0] + (distOffsetNorm[0] * 1000), launchers[nextLauncher].relPos[1] + (distOffsetNorm[1] * 1000)], launchers[nextLauncher].radius/2);
                spudVisArray.push(spudVis);
                nextLauncher++;
            }

            if (nextLauncher >= launchers.length) {
                nextLauncher = 0;
            }

        }
    }
    firedTatersTracker = firedTaters.toFixed(0);
}

var ShotLine = function(p1, p2, weight) {
    this.p1 = p1;
    this.p2 = p2;
    this.weight = weight;

    this.life = 5;

    this.drawSelf = function() {
        octx.beginPath();
        octx.moveTo(this.p1[0], this.p1[1]);
        octx.lineTo(this.p2[0], this.p2[1]);
        octx.lineWidth = this.weight;
        octx.strokeStyle = "#00ffc2";
        octx.stroke();
        octx.closePath();

        this.life --;
    }
}

var fireSpudVis = function(type) {

    for (var i = 0; i < spudVisArray.length; i++) {
        spudVisArray[i].drawSelf();
        if (spudVisArray[i].life < 0) {
            spudVisArray.splice(i, 1);
        }
    }
}


var updateSpuds = function() {

    for (var s = 0; s < sSpuds.length; s++) {
        calculateGravity(sSpuds[s], sSpuds[s].gravSrc);

        sSpuds[s].sUpdatePosition();

        var distOffset = Math.sqrt(Math.pow(sSpuds[s].gravSrc.pos[0] - sSpuds[s].pos[0], 2) + Math.pow(sSpuds[s].gravSrc.pos[1] - sSpuds[s].pos[1], 2));

        if (distOffset < sSpuds[s].gravSrc.radius) {
            if (sSpuds[s].type == "spud") {
                sol.mass += spudMass * spudMassMultiplier;
            }
            if (sSpuds[s].type == "tater") {
                sol.mass += taterMass * taterMassMultiplier;
            }
            sSpuds.splice(s, 1);
        }
    }

    if (screenFocus) {
        for (var s = 0; s < sSpuds.length; s++) {

            sSpuds[s].sDrawSelf();
        }
    }
}

var nextSpud = 0;

var nextLauncher = 0;


var correctPlanetVelocity = function() {
    var distOffset = Math.sqrt(Math.pow(sPlanetOne.gravSrc.pos[0] - sPlanetOne.pos[0], 2) + Math.pow(sPlanetOne.gravSrc.pos[1] - sPlanetOne.pos[1], 2));
    var velocity = Math.sqrt((bigG * sPlanetOne.gravSrc.mass * sPlanetOne.mass / distOffset)) * 0.15;

    var vectorPerp = [((sPlanetOne.gravSrc.pos[1] - sPlanetOne.pos[1])/distOffset), -((sPlanetOne.gravSrc.pos[0] - sPlanetOne.pos[0]) / distOffset)];
    var correctedVel = [vectorPerp[0] * velocity, vectorPerp[1] * velocity];

    return correctedVel;
}





var horizonReached = false;

var holeGrowTimer = 0;
var holeAnimateStage = 0;
var holeInitRad;

var allElements;
var elementsCounter = 0;
var the__newWrapper;
var the__newBg;

var the__body;

var futureDate;
var futureDateT = 0;

var yearMultiplier = 1.01;

var re__earth = false;

var endingText = [];

var endingVid;
var scratchTexture;

var intohole__sound = new Audio('audio/events/intohole.mp3');
var decay__sound = new Audio('audio/events/decay.mp3');
var forward__sound = new Audio('audio/events/forward.mp3');
var reverse1__sound = new Audio('audio/events/reverse1.mp3');
var reverse2__sound = new Audio('audio/events/reverse2.mp3');

var endingAudio = document.getElementById('ending-audio');

soundArray.push(intohole__sound);
soundArray.push(decay__sound);
soundArray.push(forward__sound);
soundArray.push(reverse1__sound);
soundArray.push(reverse2__sound);

var vidFailedInt = 0;

var intoTheHole = function() {
    if (horizonReached == true) {
        switch(holeAnimateStage){
            case 0:

                endingVid = document.createElement('video');
                // endingVid.onerror = videoFailed;
                endingVid.addEventListener('error', videoFailed);
                endingVid.src = "img/ending.mp4";
                endingVid.autoplay = 'false';
                endingVid.preload = 'auto';
                endingVid.pause();
                endingVid.addEventListener('timeupdate', function() {
                    if (endingVid.currentTime > 24) {
                        endingAudio.style.opacity = 0;
                    };
                });

                endingAudio.style.display = "block";
                if (thingMuted) {
                    endingAudioSlider.value = 0;
                    endingVid.volume = 0;
                    globalVolume = 0;
                } else {
                    endingAudioSlider.value = globalVolume;
                }

                endingAudioSlider.addEventListener('input', endingAudioVolume);

                scratchTexture = document.createElement('img');

                scratchTexture.src = "http://www.pixhoster.info/f/2016-08/e5de1bfcbad5efb980e58397148dadfa.png";
                // scratchTexture.src = "img/endscratch.png";
                scratchTexture.classList.add('scratchTexture');
                wrapperMain.insertBefore(scratchTexture, wrapperMain.childNodes[0]);


                holeInitRad = sol.radius;
                holeAnimateStage = 1;
                ga('set', {
                            'userId': USER_ID,
                            'dimension1': shipName,
                            'dimension2': USER_ID,
                            'metric12': 1
                          });
                ga('send', 'pageview');
                ga('set', {
                            'metric12': 0
                          });
                break;
            case 1:
                var newHoleSize = easeOutExpo(holeGrowTimer, holeInitRad, sCanvas.width, 100);
                sol.radius = newHoleSize;
                holeGrowTimer++;

                if (holeGrowTimer > 100) {
                    holeAnimateStage = 2;

                    // allElements = document.getElementsByTagName("*");
                    the__newWrappersWrapper = document.createElement('div');
                    document.body.style.margin = 0;
                    the__newWrappersWrapper.className = 'the__new-wrapper';
                    the__newWrappersWrapper.style.position = "fixed";
                    the__newWrappersWrapper.style.width = "100%";
                    the__newWrappersWrapper.style.height = "100%";
                    the__newWrappersWrapper.style.background = "#fff";
                    the__newWrappersWrapper.style.zIndex = 9999;
                    document.body.appendChild(the__newWrappersWrapper);

                    the__newBg = document.createElement('div');
                    the__newBg.style.width = "100%";
                    the__newBg.style.height = "100%";
                    the__newBg.style.background = '#161419';
                    the__newWrappersWrapper.appendChild(the__newBg);

                    the__newWrapper = wrapperMain.cloneNode(true);
                    the__newBg.appendChild(the__newWrapper);

                    allElements = the__newWrapper.getElementsByTagName("*");
                    if (!thingMuted) {
                        decay__sound.play();
                    }
                }
                break;
            case 2:

                kinetigenHiFiBars = [];

                var kHiFiBar = {

                    "maxHeight": walkerCanal * 0.9,
                    "height": 0,
                    "strokeHeight": 0,
                    "dir": 1,
                    "width": 4,
                    "maxSpeed": 6,
                    "speed": 0,
                    "speedRamp": 0.25,
                    "color": "#ff3e3e",
                    "xpos": kinetigenScreen.width / 2 - 2,
                    "ypos": walkerCanal,
                }
                kinetigenHiFiBars.push(kHiFiBar);
                kinetigenGain = 1;

                //create reEarth.
                logContainer.innerHTML = "";
                status__gravSrc.innerHTML = "Orbiting mass: <span class='status__container__span'>Re-Earth</span>";
                sunMassProgressSpan.innerHTML = "Sun status: <span class='status__container__span'>doin' fine</span>";

                physicsBodies2 = [];
                //                               type,  X,    Y,rad,     vlX,vlY,    mass,    colour, gravSrc
                sol        = new PhysicsBody("sun", 0,    0, 50,       0,  0,    3000, "#ffdf5a", null     , "", "sol");
                sPlanetOne = new PhysicsBody("planetOne", 200,   0, 2,      0,  0.1,    100, "#fc4646", sol, "", "earth");
                physicsBodies2.push(sPlanetOne);

                mercury = new PhysicsBody("planet", 0,   85, 1,      -0.15, 0,    200000, "#ffcc00", sol, mercuryBlurb, "mercury");
                physicsBodies2.push(mercury);
                venus = new PhysicsBody("planet", 170,   0, 2,      0,  0.105,    2000000, "#86ffca", sol, venusBlurb, "venus");
                physicsBodies2.push(venus);
                mars = new PhysicsBody("planet", 300,   0, 1,      0,  0.075,    200000, "#ff7443", sol, marsBlurb, "mars");
                physicsBodies2.push(mars);
                jupiter = new PhysicsBody("planet", 0,  -350, 15,      0.06,  0,    200000000, "#ffa043", sol, jupiterBlurb, "jupiter");
                physicsBodies2.push(jupiter);
                saturn = new PhysicsBody("planet", 380,   0, 12,      0,  0.06,    200000000, "#f9d293", sol, saturnBlurb, "saturn");
                physicsBodies2.push(saturn);
                uranus = new PhysicsBody("planet", -450,   0, 7,      0,  -0.045,    20000000, "#18E6FF", sol, uranusBlurb, "uranus");
                physicsBodies2.push(uranus);
                neptune = new PhysicsBody("planet", 500,   0, 7,      0,  0.06,    20000000, "#45B9FF", sol, neptuneBlurb, "neptune");
                physicsBodies2.push(neptune);
                pluto = new PhysicsBody("planet", 520,   0, 1,      0,  0.045,    200000, "#D9F5FF", sol, plutoBlurb, "pluto");
                physicsBodies2.push(pluto);

                physicsBodies2.push(sol);

                sol.sUpdatePosition();

                physicsBodies = [];
                probes = [];
                landedProbes = [];
                spudniks = [];
                potatoPlants = [];
                landedPotatoPlants = [];
                taterTowers = [];
                landedTaterTowers = [];
                spudguns = [];
                launchers = [];

                userPod = "";
                userBody = "";
                planetOne = "";

                planetOne = new PhysicsBody("planet", 0,    0, 25,       0,  0,    32000, "#3060cf", null     );
                physicsBodies.push(planetOne);
                userBody =  new PhysicsBody("ship"  , 0, -90,  2,    0.5,  0,    10  , "#fff",    planetOne);
                physicsBodies.push(userBody);
                moon =  new PhysicsBody("planet"  , 0, 300,  10,    -0.28,  0,    3000  , "#ccc",    planetOne);
                physicsBodies.push(moon);

                initDate = new Date("January 01, 2072 11:13:00");
                realDate = new Date("January 01, 2072 11:13:00");

                re__earth = true;

                shipStatusSpan.innerHTML = "<span>Ship Status:</span> anxious";

                for (var i = 0; i < availableItems.length; i++) {
                    availableItems[i].el.parentNode.removeChild(availableItems[i].el);
                }
                availableItems = [];
                for (var i = 0; i < lockedItems.length; i++) {
                    lockedItems[i].el.parentNode.removeChild(lockedItems[i].el);
                }
                lockedItems = [];
                power = 0;

                for (var i = 0; i < availableResearch.length; i++) {
                    availableResearch[i].el.parentNode.removeChild(availableResearch[i].el);
                }
                availableResearch = [];

                createResearch("landshipAgain");


                for (var od = 0; od < 3; od++) {
                    if (elementsCounter < allElements.length) {

                        if (allElements[elementsCounter].className == "wrapper") {
                            // allElements[elementsCounter].className = "";
                            allElements[elementsCounter].classList.add("keep");
                        } else if (allElements[elementsCounter].className == "wrapper--left") {
                            allElements[elementsCounter].classList.add("keep");
                        } else if (allElements[elementsCounter].className == "wrapper__column--top") {
                            allElements[elementsCounter].classList.add("keep");
                        } else if (allElements[elementsCounter].className == "container--high") {
                            allElements[elementsCounter].classList.add("keep");
                        } else {
                            // allElements[elementsCounter].className = "";
                        }

                        if (allElements[elementsCounter].className == "status__gradient") {
                            allElements[elementsCounter].style.display = "none";
                        }

                        allElements[elementsCounter].removeAttribute('style');

                        allElements[elementsCounter].style.color = "#222";
                        allElements[elementsCounter].style.backgroundColor = "transparent";
                        allElements[elementsCounter].style.fontFamily = "serif";

                        if (allElements[elementsCounter].tagName == "IMG") {
                            allElements[elementsCounter].style.display = "none";
                        }
                        if (allElements[elementsCounter].tagName == "CANVAS") {
                            allElements[elementsCounter].style.display = "none";
                        }
                        if (allElements[elementsCounter].tagName == "BODY") {
                            the__body = allElements[elementsCounter];
                            allElements[elementsCounter].style.color = "#222";
                            allElements[elementsCounter].style.background = "transparent";
                            allElements[elementsCounter].style.fontFamily = "serif";
                        }

                        elementsCounter++;
                    }
                }

                the__newBg.style.background = '#fff';


                if (elementsCounter >= allElements.length) {
                    holeAnimateStage = 3;
                    elementsCounter = 0;
                    var dateCont = document.createElement('div');
                    // dateCont.style.display = "flex";
                    // dateCont.style.justifyContent = "left";
                    // dateCont.style.alignItems = "center";
                    // dateCont.style.maxWidth = "50%";
                    // dateCont.style.height = "100%";
                    // dateCont.style.zIndex = 99999;
                    // dateCont.style.position = "inline";
                    // dateCont.style.wordWrap = "break-word";
                    dateCont.classList.add("ending__dateContainer")
                    the__newBg.appendChild(dateCont);

                    var dateHold = document.createElement('div');
                    dateCont.appendChild(dateHold);

                    the__futureDate = document.createElement('p');
                    dateHold.appendChild(the__futureDate);
                    dateHold.classList.add("ending__dateHolder");
                    dateHold.style.float = "left";
                    // dateHold.style.color = "#000";
                    // dateHold.style.backgroundColor = "#fff";
                    // dateHold.style.fontFamily = "serif";
                    // dateHold.style.wordWrap = "break-word";

                    the__futureDate.style.fontSize = 14 + 'px';
                    the__futureDate.style.marginLeft = 100 + 'px';
                    the__futureDate.style.height = 400 + 'px';

                    futureDate = realDate.getFullYear();

                    var dateHold = document.createElement('div');
                    dateCont.appendChild(dateHold);

                    the__futureText = document.createElement('p');
                    dateHold.appendChild(the__futureText);
                    dateHold.classList.add("ending__dateHolder");
                    dateHold.style.float = "right";

                    the__futureText.style.fontSize = 14 + 'px';
                    the__futureText.style.marginRight = 100 + 'px';
                    the__futureText.style.height = 400 + 'px';

                    if (!thingMuted) {
                        forward__sound.play();
                    }


                    // the__futureDate.innerHTML = "YEAR ~ " + numberWithCommas(futureDate.toFixed(0));
                    the__futureDate.innerHTML = "YEAR ~ <br/>" + veryBigNumber() + "AD";
                }
                break;
            case 3:
                for (var od = 0; od < 3; od++) {
                    if (elementsCounter < allElements.length) {
                        if (elementsCounter < allElements.length && allElements[elementsCounter].className != "keep" && allElements[elementsCounter].className != "the__date" && allElements[elementsCounter].tagName != "BODY" && allElements[elementsCounter].tagName != "HTML") {
                            allElements[elementsCounter].style.display = "none";
                        }
                        elementsCounter++;
                    }
                }

                // futureDate *= yearMultiplier;
                // yearMultiplier -= 0.000005;
                // // yearMultiplier -= 0.1;

                // futureDate = easeInOutExpo(futureDateT, 0, 14178030219547025762160390, 5000);
                // futureDateT++;

                // the__futureDate.innerHTML = "YEAR ~ " + numberWithCommas(bigNumber(futureDate));//.toFixed(0));
                the__futureDate.innerHTML = "YEAR ~ <br/>" + veryBigNumber() + "AD";

                if (elementsCounter == allElements.length) {
                    holeAnimateStage = 5;
                    elementsCounter = 0;
                }
                break;
            case 5:
                if (numberLength < 32) {

                    the__futureDate.innerHTML = "YEAR ~ <br/>" + veryBigNumber() + "AD";

                } else if (firstDigits < 12) {

                    the__futureDate.innerHTML = "YEAR ~ <br/>" + veryBigNumber() + "AD";

                } else {
                    setTimeout(function() {
                        var newText = document.createElement('p');
                        endingText.push(newText);
                        newText.classList.add('endingText--invis');
                        newText.innerHTML = "The universe stops expanding.";
                        if (!thingMuted) {
                            messageBegin__sound.play();
                        }
                        the__futureText.appendChild(newText);
                    }, 2000);
                    setTimeout(function() {
                        endingText[0].classList.add('endingText');
                    }, 2010);
                    setTimeout(function() {
                        var newText = document.createElement('p');
                        endingText.push(newText);
                        newText.classList.add('endingText--invis');
                        newText.innerHTML = "The Arrow of Time reverses.";
                        if (!thingMuted) {
                            messageProcede__sound[2].play();
                        }
                        the__futureText.appendChild(newText);
                        time = "backward";
                        increaseSpeed = -1;
                        increaseAcc = 0.01;
                        if (!thingMuted) {
                            reverse1__sound.play();
                        }
                    }, 4000);
                    setTimeout(function() {
                        endingText[1].className = 'endingText';
                    }, 4010);
                    setTimeout(function() {
                        var newText = document.createElement('p');
                        endingText.push(newText);
                        newText.classList.add('endingText--invis');
                        newText.innerHTML = "Don't go telling your mate Gus<br/>down the pub that this is how<br/>time works<br/>&mdash; it probably isn't.";
                        if (!thingMuted) {
                            messageConclude__sound.play();
                        }
                        the__futureText.appendChild(newText);
                    }, 8000);
                    setTimeout(function() {
                        endingText[2].className = 'endingText';
                    }, 8010);
                    setTimeout(function() {
                        var newText = document.createElement('p');
                        endingText.push(newText);
                        newText.classList.add('endingText--invis');
                        newText.id = "keep";
                        newText.innerHTML = "Anyways,";
                        if (!thingMuted) {
                            messageBegin__sound.play();
                        }
                        the__futureText.appendChild(newText);
                    }, 14000);
                    setTimeout(function() {
                        endingText[3].className = 'endingText';
                    }, 14010);

                    holeAnimateStage = 5.1;
                }


                break;
            case 5.1:
                if (time === "backward") {
                    the__futureDate.innerHTML = "YEAR ~ <br/>" + veryBigNumber() + "AD";
                } else if (time === "BC") {
                    the__futureDate.innerHTML = "YEAR ~ <br/>" + veryBigNumber() + "BC";
                }
                if (numberLength <= 0 && time === "backward") {
                    time = "BC";
                }
                if (numberLength >= 3 && time === "BC") {
                    time = "bigBang";
                    the__futureDate.innerHTML = "YEAR ~ <br/>" + "13,712,747,368" + "BC"
                    for (var i = 0; i < endingText.length; i++) {
                        if (endingText.id != "keep") {
                            endingText[i].className = 'endingText--invis';
                        }
                    }
                    setTimeout(function() {
                        the__futureText.innerHTML = "";
                        endingText = [];
                        var newText = document.createElement('p');
                        endingText.push(newText);
                        newText.classList.add('endingText--invis');
                        newText.innerHTML = "The Big Bang.";
                        if (!thingMuted) {
                            messageProcede__sound[1].play();
                        }
                        the__futureText.appendChild(newText);
                    }, 5000);
                    setTimeout(function() {
                        endingText[0].className = 'endingText';
                    }, 5010);
                    setTimeout(function() {
                        var newText = document.createElement('p');
                        endingText.push(newText);
                        newText.classList.add('endingText--invis');
                        newText.innerHTML = "The Arrow of Time reverses.";
                        if (!thingMuted) {
                            messageProcede__sound[3].play();
                        }
                        the__futureText.appendChild(newText);
                        time = "AD";
                        futureDateT = 0;
                        if (!thingMuted) {
                            reverse2__sound.play();
                        }
                    }, 7000);
                    setTimeout(function() {
                        endingText[1].className = 'endingText';
                    }, 7010);
                    holeAnimateStage = 5.2;
                }
                break;
            case 5.2:
                if (time === "AD") {
                    futureDate = easeInOutExpo(futureDateT, 13712747368, -13712749440, 100);
                    var exten = ""
                    if (parseFloat(futureDate) < 0) {
                        exten = "AD";
                    } else {
                        exten = "BC";
                    }
                    the__futureDate.innerHTML = "YEAR ~ <br/>" + numberWithCommas(Math.abs(futureDate.toFixed(0))) + exten;
                    futureDateT++;
                    if (futureDateT == 150) {
                        for (var i = 0; i < endingText.length; i++) {
                            endingText[i].className = 'endingText--invis';
                        }
                    }
                    if (futureDateT >= 280) {
                        the__futureText.innerHTML = "";
                        endingText = [];
                        var newText = document.createElement('p');
                        endingText.push(newText);
                        newText.classList.add('endingText--invis');
                        newText.innerHTML = "Present day.";
                        if (!thingMuted) {
                            messageBegin__sound.play();
                        }
                        the__futureText.appendChild(newText);
                        setTimeout(function() {
                            endingText[0].className = 'endingText';
                        }, 10);
                        setTimeout(function() {
                            var newText = document.createElement('p');
                            endingText.push(newText);
                            newText.classList.add('endingText--invis');
                            newText.innerHTML = "Well, sort of the past...";
                            if (!thingMuted) {
                                messageProcede__sound[3].play();
                            }
                            the__futureText.appendChild(newText);
                        }, 2000);
                        setTimeout(function() {
                            endingText[1].className = 'endingText';
                        }, 2010);
                        setTimeout(function() {
                            var newText = document.createElement('p');
                            endingText.push(newText);
                            newText.classList.add('endingText--invis');
                            newText.innerHTML = "but also kind of the future?";
                            if (!thingMuted) {
                                messageProcede__sound[1].play();
                            }
                            the__futureText.appendChild(newText);
                        }, 4000);
                        setTimeout(function() {
                            endingText[2].className = 'endingText';
                        }, 4010);
                        setTimeout(function() {
                            var newText = document.createElement('p');
                            endingText.push(newText);
                            newText.classList.add('endingText');
                            newText.innerHTML = "Whatever.";
                            if (!thingMuted) {
                                messageConclude__sound.play();
                            }
                            the__futureText.appendChild(newText);
                        }, 6000);
                        setTimeout(function() {
                            time = "presentDay"
                        }, 8000);
                        holeAnimateStage = 5.3;
                    }
                }
                break;
            case 5.3:
                if (time == "presentDay") {
                    oCanvas.style.display = 'block';
                    sCanvas.style.display = 'none';
                    planViewButton.className = "center__header--plan";
                    systViewButton.className = "center__header--syst";
                    systViewButton.style.display = 'inline';
                    planViewButton.style.cursor = 'auto';
                    systViewButton.style.cursor = 'pointer';
                    systemPeekerType.className = "center__header--systSmall";
                    planetLookerType.className = "center__header--systLarge";
                    panelPos = [];
                    kinetigenSolarStrengthChange();
                    holeAnimateStage = 5.4;
                    the__newWrappersWrapper.style.opacity = 0;
                    setTimeout(function(){
                      the__newWrappersWrapper.parentNode.removeChild(the__newWrappersWrapper);
                      holeAnimateStage = 6;
                      queueLog(33, "Starting...");
                      queueLog(66, "Loading 'Hopper Rad-Type' systems...");
                      queueLog(33, "Done.");
                      queueLog(66, "Loading idiolect...");
                      queueLog(33, "Sorted.");
                      queueLog(66, "Right, hero time.");
                    }, 200);
                }
                break;
            case 5.4:
                break;
            case 6:
                break;
        }
    }

}

var firstDigits = 2;
var increaseSpeed = 1;
var increaseAcc = 0.01;
var increaseAccAgain = 0.01;
var numberLength = 1;
var time = "forward";

var veryBigNumber = function() {
    if (time === "forward") {
        firstDigits += increaseSpeed;
        increaseSpeed += increaseAcc;
        increaseAcc += increaseAccAgain;
        if (firstDigits >= 999) {
            firstDigits = 1;
            numberLength += 1;
        }

        var followingNumbers = '';
        for (var bn = 0; bn < numberLength; bn++) {
            followingNumbers += ','
            if (bn == 4) {
                followingNumbers += "<br/>";
            }
            if (bn == 9) {
                followingNumbers += "<br/>";
            }
            if (bn == 14) {
                followingNumbers += "<br/>";
            }
            if (bn == 19) {
                followingNumbers += "<br/>";
            }
            if (bn == 24) {
                followingNumbers += "<br/>";
            }
            if (bn == 29) {
                followingNumbers += "<br/>";
            }
            for (var mn = 0; mn < 3; mn++) {
                var newDigit = getRandomInt(0, 9);
                followingNumbers += newDigit.toString();
            }

        }

        var bigNumber = firstDigits.toFixed(0).toString() + followingNumbers;
        return bigNumber;
    } else if (time === "backward") {
        firstDigits -= increaseSpeed;
        increaseSpeed += increaseAcc;
        increaseAcc += increaseAccAgain;
        if (firstDigits <= 0) {
            firstDigits = 999;
            numberLength -= 1;
        }

        var followingNumbers = '';
        for (var bn = 0; bn < numberLength; bn++) {

            for (var mn = 0; mn < 3; mn++) {
                var newDigit = getRandomInt(0, 9);
                followingNumbers += newDigit.toString();
            }
            followingNumbers += ','
            if (bn == 4) {
                followingNumbers += "<br/>";
            }
            if (bn == 9) {
                followingNumbers += "<br/>";
            }
            if (bn == 14) {
                followingNumbers += "<br/>";
            }
            if (bn == 19) {
                followingNumbers += "<br/>";
            }
            if (bn == 24) {
                followingNumbers += "<br/>";
            }
            if (bn == 29) {
                followingNumbers += "<br/>";
            }

        }

        var bigNumber = followingNumbers + firstDigits.toFixed(0).toString();
        return bigNumber;
    } else if (time === "BC") {
        firstDigits += increaseSpeed;
        increaseSpeed += increaseAcc;
        increaseAcc += increaseAccAgain;
        if (firstDigits >= 999) {
            firstDigits = 1;
            numberLength += 1;
        }

        var followingNumbers = '';
        for (var bn = 0; bn < numberLength; bn++) {
            followingNumbers += ','
            if (bn == 4) {
                followingNumbers += "<br/>";
            }
            if (bn == 9) {
                followingNumbers += "<br/>";
            }
            if (bn == 14) {
                followingNumbers += "<br/>";
            }
            if (bn == 19) {
                followingNumbers += "<br/>";
            }
            if (bn == 24) {
                followingNumbers += "<br/>";
            }
            if (bn == 29) {
                followingNumbers += "<br/>";
            }
            for (var mn = 0; mn < 3; mn++) {
                var newDigit = getRandomInt(0, 9);
                followingNumbers += newDigit.toString();
            }

        }

        var bigNumber = firstDigits.toFixed(0).toString() + followingNumbers;
        return bigNumber;
    }
}

var endTitleSeq = [];
endTitleSeq[0] = [];
endTitleSeq[1] = [];
endTitleSeq[2] = [];
endTitleSeq[3] = [];

var endingTitle = function() {
    var endingTitleWrapper = document.createElement('div');
    endingTitleWrapper.className = "endingTitleWrapper";
    wrapperEnding.insertBefore(endingTitleWrapper, wrapperEnding.childNodes[0]);
    endingTitleWrapper.style.opacity = 0;
    endingTitleWrapper.style.transition = "all 2s";
    endTitleSeq[0].push(endingTitleWrapper);

    var endwrapper = document.createElement('div');
    endwrapper.classList.add('about__wrapper');
    endingTitleWrapper.appendChild(endwrapper);

    var logowrapper = document.createElement('div');
    logowrapper.classList.add('logo__wrapper--spaceplan');
    endwrapper.appendChild(logowrapper);

    var endlogo = document.createElement('img');
    endlogo.classList.add('logo__spaceplan');
    logowrapper.appendChild(endlogo);
    endlogo.src = "img/spaceplan.svg";
    endlogo.style.opacity = 0;
    endlogo.style.transition = "all 2s";
    endTitleSeq[0].push(endlogo);

    var jakeCred = document.createElement('p');
    jakeCred.innerHTML = 'Created by Jake Hollands<br/><a href="https://twitter.com/jhollands_" target="_blank">twitter</a> | <a href="http://jhollands.co.uk" target="_blank">jhollands.co.uk</a> | <a href="mailto:jake@jhollands.co.uk" target="_blank">email</a>';
    endwrapper.appendChild(jakeCred);
    jakeCred.style.opacity = 0;
    jakeCred.style.transition = "all 2s";
    endTitleSeq[1].push(jakeCred);

    var loganCred = document.createElement('p');
    loganCred.innerHTML = 'Audio by Logan Gabriel<br/><a href="https://twitter.com/logeyG" target="_blank">twitter</a> | <a href="https://soundcloud.com/logangabriel" target="_blank">soundcloud</a>';
    endwrapper.appendChild(loganCred);
    loganCred.style.opacity = 0;
    loganCred.style.transition = "all 2s";
    endTitleSeq[2].push(loganCred);

    var prototypeText = document.createElement('div');
    prototypeText.innerHTML = "<b>THIS WAS A PROTOTYPE</b><br/><br/>It ain't over yet.<br/><br/>SPACEPLAN has been redesigned with more content,<br/>an extended story & is available in 11 languages<br/>on mobile, tablets & PC.<br/><br/>OUT NOW<br/><div class=\"teaser_badge--hold\"><a href=\"https://itunes.apple.com/us/app/spaceplan/id1200864554?ls=1&mt=8\" target=\"_blank\"><img src=\"img/applebadge.png\" class=\"teaser_badge-small\"/></a><a href=\"https://play.google.com/store/apps/details?id=com.devolver.spaceplan\" target=\"_blank\"><img src=\"img/googlebadge.png\" class=\"teaser_badge-small\"/></a><a href=\"http://store.steampowered.com/app/616110\" target=\"_blank\"><img src=\"img/steambadge.png\" class=\"teaser_badge-small\"/></a></div>For more about that stuff, go here:<br/><a href=\"http://spaceplan.click\" target=\"_blank\">SPACEPLAN.CLICK</a><br/><br/>";
    endwrapper.appendChild(prototypeText);
    prototypeText.style.opacity = 0;
    prototypeText.style.transition = "all 2s";
    endTitleSeq[3].push(prototypeText);

    // var giverTitle = document.createElement('span');
    // giverTitle.innerHTML = "Disposable Income Leaderboard:";
    // endwrapper.appendChild(giverTitle);
    // giverTitle.style.opacity = 0;
    // giverTitle.style.transition = "all 2s";
    // endTitleSeq[3].push(giverTitle);

    // var tempList = document.createElement('div');
    // tempList.classList.add('cont__list');
    // tempList.id = 'contributor-list-ending';
    // endwrapper.appendChild(tempList);
    // tempList.style.opacity = 0;
    // tempList.style.transition = "all 2s";
    // endTitleSeq[3].push(tempList);

    // for (var i = 0; i < 3; i++) {
    //     var contRow = document.createElement('div');
    //     contRow.classList.add('cont__row');
    //     tempList.appendChild(contRow);
    //     var cont__name = document.createElement('div');
    //     cont__name.classList.add('cont__name');
    //     cont__name.innerHTML = "Loading...";
    //     contRow.appendChild(cont__name);
    //     var cont__don = document.createElement('div');
    //     cont__don.classList.add('cont__don');
    //     contRow.appendChild(cont__don);
    // }

    // var donLink = document.createElement('a');
    // donLink.href = 'https://imraising.tv/u/jhollands';
    // donLink.target = "_blank";
    // endwrapper.appendChild(donLink);
    // donLink.style.opacity = 0;
    // donLink.style.transition = "all 2s";
    // endTitleSeq[3].push(donLink);

    // var donButton = document.createElement('div');
    // donButton.classList.add('about__cont');
    // donButton.innerHTML = "Tip with Paypal";
    // donLink.appendChild(donButton);
    // donButton.style.opacity = 0;
    // donButton.style.transition = "all 2s";
    // endTitleSeq[3].push(donButton);

    // var jakeLinks = document.createElement('p');
    // jakeLinks.innerHTML = '<a href="http://jhollands.co.uk">w: jhollands.co.uk</a> | <a href="https://twitter.com/jhollands_">t: @jhollands_</a> | e: jake@jhollands.co.uk';
    // endwrapper.appendChild(jakeLinks);
    // jakeLinks.style.opacity = 0;
    // jakeLinks.style.transition = "all 2s";
    // endTitleSeq[3].push(jakeLinks);
    //
    // var loganLinks = document.createElement('p');
    // loganLinks.innerHTML = 'Logan\'s <a href="https://soundcloud.com/logangabriel">soundcloud</a> & <a href="http://logey.io/">website</a>.'
    // endwrapper.appendChild(loganLinks);
    // loganLinks.style.opacity = 0;
    // loganLinks.style.transition = "all 2s";
    // endTitleSeq[3].push(loganLinks);

    var betaCred = document.createElement('p');
    betaCred.innerHTML = "Thanks for help & advice<br/>Guy<span class='no-break'>&nbsp;</span>Cockroft, Joe<span class='no-break'>&nbsp;</span>Hollands, Berna<span class='no-break'>&nbsp;</span>Gonen & Rich<span class='no-break'>&nbsp;</span>B<br/><br/>Thanks for playing & testing to<br/>CJ<span class='no-break'>&nbsp;</span>Harries, Shadow<span class='no-break'>&nbsp;</span>Phillips, Konng_, Ed<span class='no-break'>&nbsp;</span>Gallagher,<br/>Alex<span class='no-break'>&nbsp;</span>Woodhouse, JPTiger, Kimbrian<span class='no-break'>&nbsp;</span>Marshall,<br/>Joe<span class='no-break'>&nbsp;</span>Hollands, Ben<span class='no-break'>&nbsp;</span>Hollands, James<span class='no-break'>&nbsp;</span>Neal,<br/>Marc<span class='no-break'>&nbsp;</span>Gunthorpe, Grant<span class='no-break'>&nbsp;</span>Chidzey, Kieran<span class='no-break'>&nbsp;</span>Delbaere,<br/>deeprot, Adric<span class='no-break'>&nbsp;</span>Burks, Frederick<span class='no-break'>&nbsp;</span>Lebel & spacetimewanderer";
    endwrapper.appendChild(betaCred);
    betaCred.style.opacity = 0;
    betaCred.style.transition = "all 2s";
    endTitleSeq[3].push(betaCred);

    // contList = document.getElementById("contributor-list-ending");
    // getGivers();


    setTimeout(function() {
        for (var i = 0; i < endTitleSeq[0].length; i++) {
            endTitleSeq[0][i].style.opacity = 1;
        }
        endingAudio.style.display = "none";

    },
    10);



    setTimeout(function() {
        for (var i = 0; i < endTitleSeq[1].length; i++) {
            endTitleSeq[1][i].style.opacity = 1;
        }
    },
    2000);

    setTimeout(function() {
        for (var i = 0; i < endTitleSeq[2].length; i++) {
            endTitleSeq[2][i].style.opacity = 1;
        }
    },
    4000);

    setTimeout(function() {

        for (var i = 0; i < endTitleSeq[3].length; i++) {
            endTitleSeq[3][i].style.opacity = 1;
        }
    },
    6000);
}


var videoFailed = function(e) {
    if (vidFailedInt == 0) {
        endingVid.src = "img/ending.webm";
        endingVid.autoplay = 'false';
        endingVid.preload = 'auto';
        endingVid.pause();
        endingVid.addEventListener('timeupdate', function() {
            if (endingVid.currentTime > 24) {
                endingAudio.style.opacity = 0;
            };
        });
        vidFailedInt++;
    } else if (vidFailedInt == 1) {
        endingVid.src = "img/ending.ogv";
        endingVid.autoplay = 'false';
        endingVid.preload = 'auto';
        endingVid.pause();
        endingVid.addEventListener('timeupdate', function() {
            if (endingVid.currentTime > 24) {
                endingAudio.style.opacity = 0;
            };
        });
        vidFailedInt++;
    } else {
        holeAnimateStage = 1.5;

        var vidDisc = document.createElement('div');
        vidDisc.classList.add('mobile-disclaimer');
        document.body.appendChild(vidDisc);
        vidDisc.style.display = 'flex';

        var vidDiscInner = document.createElement('div');
        vidDiscInner.classList.add('mobile-disclaimer__inner');
        vidDisc.appendChild(vidDiscInner);

        var vidDiscP = document.createElement('div');

        vidDiscP.innerHTML = "ERROR: " + e.target.error.code + "<br/><br/>This is embarrassing. For some reason the black hole isn't working.<br/>Here's a guide to try and solve this issue quickly:<br/><a href='error/guide.txt'>Click me</a>";
        vidDiscInner.appendChild(vidDiscP);
    }

}


var endingAudioSlider = document.getElementById('endingAudioSlider');

var endingAudioVolume = function() {
    globalVolume = endingAudioSlider.value;
    endingVid.volume = globalVolume;
    thingMuted = false;
}





var manufactureHeader = document.getElementById("manufacture__header");
var developHeader = document.getElementById("develop__header");
var infoHeader = document.getElementById("info__header");

var thingMaker__container = document.getElementById("thingmaker__container");
var information__container = document.getElementById("information__container");
var develop__container = document.getElementById("develop__wrapper");

var thingMakerCanvas = document.getElementById("thingmaker__canvas");
var centerPowerCanvas = document.getElementById("centerPower__canvas");
var informationCanvas = document.getElementById("information__canvas");
var developCanvas = document.getElementById("develop__canvas");

var tmctx = thingMakerCanvas.getContext("2d");
var cpctx = centerPowerCanvas.getContext("2d");
var inctx = informationCanvas.getContext("2d");
var dectx = developCanvas.getContext("2d");

var headerHr = document.getElementById("header__hr");

planetLookerType.style.opacity = 0;
systemPeekerType.style.opacity = 0;

manufactureContainer.style.opacity = 0;
manufactureHeader.style.opacity = 0;
infoHeader.style.opacity = 0;
developHeader.style.opacity = 0;
developContainer.style.opacity = 0;
oCanvas.style.opacity = 0;
planViewButton.style.opacity = 0;


//INTRO SOUNDS
var thingMakerInit__sound = new Audio('audio/init/thingmaker.mp3');
var developInit__sound = new Audio('audio/init/idealister.mp3');
var informationInit__sound = new Audio('audio/init/factholder.mp3');
var centerPowerInit__sound = new Audio('audio/init/title.mp3');
var allInit__sound = new Audio('audio/init/titleresume.mp3');


soundArray.push(thingMakerInit__sound);
soundArray.push(developInit__sound);
soundArray.push(informationInit__sound);
soundArray.push(centerPowerInit__sound);
soundArray.push(allInit__sound);
//


var intro = true;
var tmIntro = true;
var deIntro = true;
var inIntro = true;
var cpIntro = true;

var tmBootLog = false;
var deBootLog = false;
var inBootLog = false;
var cpBootLog = false;


var UiSquare = function(x, y, w, h, targetX, targetY, targetW, targetH, col, duration, ease, uiscreen) {
    this.x = x;
    this.y = y;
    this.initX = x;
    this.initY = y;

    this.w = w;
    this.h = h;
    this.initW = w;
    this.initH = h;

    this.targetX = targetX;
    this.targetY = targetY;
    this.targetW = targetW;
    this.targetH = targetH;

    this.col = col;
    this.duration = duration;

    this.time = 0;

    this.ease = ease;

    this.screen = uiscreen;

    this.extraX = 0;
    this.extraY = 0;

    this.drawSelf = function() {

        switch(this.screen) {
            case "thingMaker":
                tmctx.beginPath();
                tmctx.rect(tmAnchor[0] + this.x, tmAnchor[1] + this.y, this.w, this.h);
                tmctx.fillStyle = this.col;
                tmctx.fill();
                tmctx.closePath();
                break;
            case "develop":
                dectx.beginPath();
                dectx.rect(deAnchor[0] + this.x, deAnchor[1] + this.y, this.w, this.h);
                dectx.fillStyle = this.col;
                dectx.fill();
                dectx.closePath();
                break;
            case "information":
                inctx.beginPath();
                inctx.rect(inAnchor[0] + this.x, inAnchor[1] + this.y, this.w, this.h);
                inctx.fillStyle = this.col;
                inctx.fill();
                inctx.closePath();
                break;
            case "center":
                cpctx.beginPath();
                cpctx.rect(cpAnchor[0] + this.x, cpAnchor[1] + this.y, this.w, this.h);
                cpctx.fillStyle = this.col;
                cpctx.fill();
                cpctx.closePath();
                break;
        }

    }

    this.transform = function() {

        var newW;
        var newH;
        var newX;
        var newY;

        if (this.ease == "out") {

            newW = easeOutExpo(this.time, this.initW, this.targetW, this.duration);
            newH = easeOutExpo(this.time, this.initH, this.targetH, this.duration);

            newX = easeOutExpo(this.time, this.initX, this.targetX, this.duration);
            newY = easeOutExpo(this.time, this.initY, this.targetY, this.duration);

        } else if (this.ease == "inout") {

            newW = easeInOutExpo(this.time, this.initW, this.targetW, this.duration);
            newH = easeInOutExpo(this.time, this.initH, this.targetH, this.duration);

            newX = easeInOutExpo(this.time, this.initX, this.targetX, this.duration);
            newY = easeInOutExpo(this.time, this.initY, this.targetY, this.duration);

        }
        this.w = newW;
        this.h = newH;

        this.x = newX;
        this.y = newY;

        this.time++;

        this.targetX += this.extraX;
        this.targetY += this.extraY;

        if (this.time >= this.duration) {
            this.state = "done";
        }
    }
}

var UiCircle = function(x, y, r, sA, eA, targetX, targetY, targetR, targetSA, targetEA, counterClockWise, col, duration, ease, uiscreen) {
    this.x = x;
    this.y = y;
    this.initX = x;
    this.initY = y;

    this.r = r;
    this.sA = sA;
    this.eA = eA;
    this.initR = r;
    this.initSA = sA;
    this.initEA = eA;

    this.targetX = targetX;
    this.targetY = targetY;
    this.targetR = targetR;
    this.targetSA = targetSA;
    this.targetEA = targetEA;

    this.counterClockWise = counterClockWise;


    this.col = col;
    this.duration = duration;

    this.time = 0;

    this.ease = ease;

    this.screen = uiscreen;

    this.extraX = 0;
    this.extraY = 0;

    this.drawSelf = function() {

        switch(this.screen) {
            case "thingMaker":
                tmctx.beginPath();
                tmctx.arc(tmAnchor[0] + this.x,tmAnchor[1] + this.y,this.r,this.sA,this.eA*Math.PI);
                tmctx.fillStyle = this.col;
                tmctx.fill();
                tmctx.closePath();
                break;
            case "develop":
                dectx.beginPath();
                dectx.arc(deAnchor[0] + this.x,deAnchor[1] + this.y,this.r,this.sA,this.eA*Math.PI);
                dectx.fillStyle = this.col;
                dectx.fill();
                dectx.closePath();
                break;
            case "information":
                inctx.beginPath();
                inctx.arc(inAnchor[0] + this.x,inAnchor[1] + this.y,this.r,this.sA,this.eA*Math.PI);
                inctx.fillStyle = this.col;
                inctx.fill();
                inctx.closePath();
                break;
            case "center":
                cpctx.beginPath();
                cpctx.arc(cpAnchor[0] + this.x,cpAnchor[1] + this.y,this.r,this.sA,this.eA*Math.PI);
                cpctx.fillStyle = this.col;
                cpctx.fill();
                cpctx.closePath();
                break;
        }

    }

    this.transform = function() {

        var newX;
        var newY;
        var newR;
        var newSA;
        var newEA;


        if (this.ease == "out") {

            newX = easeOutExpo(this.time, this.initX, this.targetX, this.duration);
            newY = easeOutExpo(this.time, this.initY, this.targetY, this.duration);

            newR = easeOutExpo(this.time, this.initR, this.targetR, this.duration);

            newSA = easeOutExpo(this.time, this.initSA, this.targetSA, this.duration);
            newEA = easeOutExpo(this.time, this.initEA, this.targetEA, this.duration);

        } else if (this.ease == "inout") {

          newX = easeInOutExpo(this.time, this.initX, this.targetX, this.duration);
          newY = easeInOutExpo(this.time, this.initY, this.targetY, this.duration);

          newR = easeInOutExpo(this.time, this.initR, this.targetR, this.duration);

          newSA = easeInOutExpo(this.time, this.initSA, this.targetSA, this.duration);
          newEA = easeInOutExpo(this.time, this.initEA, this.targetEA, this.duration);

        }

        this.x = newX;
        this.y = newY;

        this.r = newR;

        this.sA = newSA;
        this.eA = newEA;

        this.targetX += this.extraX;
        this.targetY += this.extraY;

        this.time++;

        if (this.time >= this.duration) {
            this.state = "done";
        }
    }
}

var UiSvg = function(x, y, w, targetX, targetY, targetW, duration, ease, uiscreen, svg) {
    this.x = x;
    this.y = y;
    this.initX = x;
    this.initY = y;

    this.w = w;
    this.initW = w;

    this.h = this.w * spacePlan__aRatio;

    this.targetX = targetX;
    this.targetY = targetY;
    this.targetW = targetW;

    this.duration = duration;

    this.time = 0;

    this.ease = ease;

    this.screen = uiscreen;

    this.svg = svg;

    this.extraW = 0;

    this.drawSelf = function() {

        this.h = this.w * spacePlan__aRatio;
        newY = this.y -(this.h/2);
        this.x = -(this.w/2);

        switch(this.screen) {
            case "thingMaker":
                tmctx.drawImage(this.svg, tmAnchor[0] + this.x, tmAnchor[1] + newY, this.w, this.w * spacePlan__aRatio);
                break;
            case "develop":
                dectx.drawImage(this.svg, deAnchor[0] + this.x, deAnchor[1] + newY, this.w, this.w * spacePlan__aRatio);
                break;
            case "information":
                inctx.drawImage(this.svg, inAnchor[0] + this.x, inAnchor[1] + newY, this.w, this.w * spacePlan__aRatio);
                break;
            case "center":
                cpctx.drawImage(this.svg, cpAnchor[0] + this.x, cpAnchor[1] + newY, this.w, this.w * spacePlan__aRatio);
                break;
        }

    }

    this.transform = function() {

        var newW;
        var newX;
        var newY;

        if (this.ease == "out") {

            newW = easeOutExpo(this.time, this.initW, this.targetW, this.duration);

            newX = easeOutExpo(this.time, this.initX, this.targetX, this.duration);
            newY = easeOutExpo(this.time, this.initY, this.targetY, this.duration);

        } else if (this.ease == "inout") {

            newW = easeInOutExpo(this.time, this.initW, this.targetW, this.duration);

            newX = easeInOutExpo(this.time, this.initX, this.targetX, this.duration);
            newY = easeInOutExpo(this.time, this.initY, this.targetY, this.duration);

        }
        this.w = newW + this.extraW;
        this.h = this.w * spacePlan__aRatio; //TEST

        this.x = newX;
        this.y = newY;

        this.time++;

        if (this.time >= this.duration) {
            this.state = "done";
        }
    }
}

var UiLine = function(x1, y1, x2, y2, width, targetX1, targetY1, targetX2, targetY2, targetWidth, col, duration, ease, uiscreen) {
    this.x1 = x1;
    this.y1 = y1;
    this.initX1 = x1;
    this.initY1 = y1;

    this.x2 = x2;
    this.y2 = y2;
    this.initX2 = x2;
    this.initY2 = y2;

    this.w = width;
    this.initW = width;

    this.targetX1 = targetX1;
    this.targetY1 = targetY1;
    this.targetX2 = targetX2;
    this.targetY2 = targetY2;

    this.targetW = targetWidth;


    this.col = col;
    this.duration = duration;

    this.time = 0;

    this.ease = ease;

    this.screen = uiscreen;

    this.extraX1 = 0;
    this.extraY1 = 0;
    this.extraX2 = 0;
    this.extraY2 = 0;

    this.drawSelf = function() {

        switch(this.screen) {
            case "thingMaker":
                tmctx.beginPath();
                tmctx.moveTo(this.x1, this.y1);
                tmctx.lineTo(this.x2, this.y2);
                tmctx.strokeStyle = this.col;
                tmctx.lineWidth = this.w;
                tmctx.stroke();
                tmctx.closePath();
                break;
            case "develop":
                dectx.beginPath();
                dectx.moveTo(this.x1, this.y1);
                dectx.lineTo(this.x2, this.y2);
                dectx.strokeStyle = this.col;
                dectx.lineWidth = this.w;
                dectx.stroke();
                dectx.closePath();
                break;
            case "information":
                inctx.beginPath();
                inctx.moveTo(this.x1, this.y1);
                inctx.lineTo(this.x2, this.y2);
                inctx.strokeStyle = this.col;
                inctx.lineWidth = this.w;
                inctx.stroke();
                inctx.closePath();
                break;
            case "center":
                cpctx.beginPath();
                cpctx.moveTo(this.x1, this.y1);
                cpctx.lineTo(this.x2, this.y2);
                cpctx.strokeStyle = this.col;
                cpctx.lineWidth = this.w;
                cpctx.stroke();
                cpctx.closePath();
                break;
        }

    }

    this.transform = function() {

        var newX1;
        var newY1;
        var newX2;
        var newY2;
        var newW;

        if (this.ease == "out") {

            newX1 = easeOutExpo(this.time, this.initX1, this.targetX1, this.duration);
            newY1 = easeOutExpo(this.time, this.initY1, this.targetY1, this.duration);

            newX2 = easeOutExpo(this.time, this.initX2, this.targetX2, this.duration);
            newY2 = easeOutExpo(this.time, this.initY2, this.targetY2, this.duration);

            newW = easeOutExpo(this.time, this.initW, this.targetW, this.duration);

        } else if (this.ease == "inout") {

          newX1 = easeInOutExpo(this.time, this.initX1, this.targetX1, this.duration);
          newY1 = easeInOutExpo(this.time, this.initY1, this.targetY1, this.duration);

          newX2 = easeInOutExpo(this.time, this.initX2, this.targetX2, this.duration);
          newY2 = easeInOutExpo(this.time, this.initY2, this.targetY2, this.duration);

          newW = easeInOutExpo(this.time, this.initW, this.targetW, this.duration);

        }
        this.x1 = newX1;
        this.y1 = newY1;

        this.x2 = newX2;
        this.y2 = newY2;

        this.w = newW;

        this.time++;

        this.targetX1 += this.extraX1;
        this.targetY1 += this.extraY1;
        this.targetX2 += this.extraX2;
        this.targetY2 += this.extraY2;

        if (this.time >= this.duration) {
            this.state = "done";
        }
    }
}


var spaceplan__logo;
var spaceplan__svg = new Image();
if (!isFirefox & !isEdge) {
    spaceplan__svg.src = "img/spaceplan.svg";
} else {
    spaceplan__svg.src = "img/spaceplan.png";
}
var spaceplan__svgWidth = 759.4;
var spaceplan__svgHeight = 87;
var spacePlan__aRatio = spaceplan__svgHeight / spaceplan__svgWidth;

var tmNeeded = 9;
var deNeeded = 49;
var inNeeded = 81;
var cpNeeded = 144;
var totalNeeded = tmNeeded + deNeeded + inNeeded + cpNeeded;

var tmGridWidth = Math.sqrt(tmNeeded);
var deGridWidth = Math.sqrt(deNeeded);
var inGridWidth = Math.sqrt(inNeeded);
var cpGridWidth = Math.sqrt(cpNeeded);

var tmGridArm = (tmGridWidth - 1)/2;
var deGridArm = (deGridWidth - 1)/2;
var inGridArm = (inGridWidth - 1)/2;
var cpGridArm = (cpGridWidth - 1)/2;

//////////////////
//ANIMATION VARS//
//////////////////
var screentoActivate = "thingMaker";
var spliceThese = [];

var uiWhite = "#fff";
var uiRed = "#fc4646";
var uiBlue = "#00ffc2";
var uiBg = "#161419";

var uiFast = 90/3; //FPS (/3)

var initGutter = 2;
var initSize = 6;
var initGrid = 7;

var initDir = 0;
var initX = 0;
var initY = 0;
var initDist = 100;

var actiSize = 100;
var actiStroke = 6;
var actiMarginTop = 20;

//////////////////

////////////////////
//THING MAKER VARS//
////////////////////
var tmInitiated = false;

var tm3sq = [];
var tm3ty = [];
var tm3 = [tm3sq, tm3ty];

var tm2sq = [];
var tm2ty = [];
var tm2 = [tm2sq, tm2ty];

var tm1sq = [];
var tm1ty = [];
var tm1 = [tm1sq, tm1ty];

var tmStuff = [tm3, tm2, tm1];

var tmClick = 0;
var tmStage = 1;

thingMakerCanvas.width = thingMaker__container.offsetWidth;
thingMakerCanvas.height = thingMaker__container.offsetHeight;
var tmAnchor = [thingMakerCanvas.width/2, thingMakerCanvas.height/3];

var tmGridPoints = [];
var tmGridSpace = (((initGutter + initSize) * tmGridWidth) - initGutter)/tmGridWidth;
////////////////

////////////////
//DEVELOP VARS//
////////////////
var deInitiated = false;

var de3sq = [];
var de3ty = [];
var de3 = [de3sq, de3ty];

var de2sq = [];
var de2ty = [];
var de2 = [de2sq, de2ty];

var de1sq = [];
var de1ty = [];
var de1 = [de1sq, de1ty];

var deStuff = [de3, de2, de1];

var deClick = 0;
var deStage = 1;

developCanvas.width = develop__container.offsetWidth;
developCanvas.height = develop__container.offsetHeight;
var deAnchor = [developCanvas.width/2, developCanvas.height/3];

var deGridPoints = [];
var deGridSpace = (((initGutter + initSize) * deGridWidth) - initGutter)/deGridWidth;
////////////////

/////////////
//INFO VARS//
/////////////
var inInitiated = false;

var in3sq = [];
var in3ty = [];
var in3 = [in3sq, in3ty];

var in2sq = [];
var in2ty = [];
var in2 = [in2sq, in2ty];

var in1sq = [];
var in1ty = [];
var in1 = [in1sq, in1ty];

var inStuff = [in3, in2, in1];

var inClick = 0;
var inStage = 1;

informationCanvas.width = information__container.offsetWidth;
informationCanvas.height = information__container.offsetHeight;
var inAnchor = [informationCanvas.width/2, informationCanvas.height/2];

var inGridPoints = [];
var inGridSpace = (((initGutter + initSize) * inGridWidth) - initGutter)/inGridWidth;
///////////////

///////////////
//CENTER VARS//
///////////////
var cpInitiated = false;

var cp3sq = [];
var cp3ty = [];
var cp3 = [cp3sq, cp3ty];

var cp2sq = [];
var cp2ty = [];
var cp2 = [cp2sq, cp2ty];

var cp1sq = [];
var cp1ty = [];
var cp1 = [cp1sq, cp1ty];

var cpStuff = [cp3, cp2, cp1];

var cpClick = 0;
var cpStage = 1;

centerPowerCanvas.width = canvasWrap.offsetWidth;
centerPowerCanvas.height = canvasWrap.offsetHeight;
var cpAnchor = [centerPowerCanvas.width/2, centerPowerCanvas.height/2];

var cpGridPoints = [];
var cpGridSpace = (((initGutter + initSize) * cpGridWidth) - initGutter)/cpGridWidth;
////////////////

var kinetigenLED = document.getElementById("kinetigen__button--LED");
var kinetigenPulse = 0;
var hintDone = false;

animateIntros = function() {
    if (intro) {

        if (
          !tmIntro &&
          !deIntro &&
          !inIntro &&
          !cpIntro
        ) {
          intro = false;
        }

        if (power < 1 && eventLog.length > 6 && !hintDone) {
            if (kinetigenPulse <= 0) {
                kinetigenScreen.style.transition = "all 0s";
                kinetigenScreen.style.backgroundColor = "#7e2a5d";
                kinetigenLED.style.transition = "all 0s";
                kinetigenLED.style.backgroundColor = "#ff5573";
                kinetigenPulse = 50;
                setTimeout(function() {
                    kinetigenScreen.style.transition = "all 0.5s";
                    kinetigenScreen.style.backgroundColor = "#1a1a1a";

                    kinetigenLED.style.cssText = ""
                    kinetigenLED.style.transition = "all 0.5s";
                },
                10);
            }
            kinetigenPulse--;
        } else if (power > 0 && !hintDone) {
            hintDone = true;
            kinetigenScreen.style.cssText = ""
            kinetigenLED.style.cssText = ""
        }

        tmctx.clearRect(0, 0, thingMakerCanvas.width, thingMakerCanvas.height);
        dectx.clearRect(0, 0, developCanvas.width, developCanvas.height);
        inctx.clearRect(0, 0, informationCanvas.width, informationCanvas.height);
        cpctx.clearRect(0, 0, centerPowerCanvas.width, centerPowerCanvas.height);

        if (screentoActivate != "thingMaker") {
            tmAddStuff();
        }
        if (screentoActivate != "thingMaker" && screentoActivate != "develop") {
            deAddStuff();
        }
        if (screentoActivate != "thingMaker" && screentoActivate != "develop" && screentoActivate != "information") {
            inAddStuff();
        }
        if (screentoActivate != "thingMaker" && screentoActivate != "develop" && screentoActivate != "information" && screentoActivate != "center") {
            cpAddStuff();
        }

        animateTm();
        animateDe();
        animateIn();
        animateCp();

        animateGrids();
    }
}

animateGrids = function() {
    if (tmInitiated == false) {

        for (var i = 0; i < tmGridPoints.length; i++) {
            tmGridPoints[i].drawSelf();
        }
    }
    if (deInitiated == false) {

        for (var i = 0; i < deGridPoints.length; i++) {
            deGridPoints[i].drawSelf();
        }
    }
    if (inInitiated == false) {

        for (var i = 0; i < inGridPoints.length; i++) {
            inGridPoints[i].drawSelf();
        }
    }
    if (cpInitiated == false) {

        for (var i = 0; i < cpGridPoints.length; i++) {
            cpGridPoints[i].drawSelf();
        }
    }

}

animateTm = function() {

    for (var i = 0; i < tmStuff[0][0].length; i++) {
        //layer 3 - squares
        tmStuff[0][0][i].drawSelf();

        if (tmStuff[0][0][i].state == "animate") {

            tmStuff[0][0][i].transform();
        }
    }
    for (var i = 0; i < tmStuff[0][1].length; i++) {
        //layer 3 - type
        tmStuff[0][1][i].drawSelf();

        if (tmStuff[0][1][i].state == "animate") {

            tmStuff[0][1][i].transform();
        }
    }
    for (var i = 0; i < tmStuff[1][0].length; i++) {
        //layer 2 - squares
        tmStuff[1][0][i].drawSelf();

        if (tmStuff[1][0][i].state == "animate") {

            tmStuff[1][0][i].transform();
        }
    }
    for (var i = 0; i < tmStuff[1][1].length; i++) {
        //layer 2 - type
        tmStuff[1][1][i].drawSelf();

        if (tmStuff[1][1][i].state == "animate") {

            tmStuff[1][1][i].transform();
        }
    }
    for (var i = 0; i < tmStuff[2][0].length; i++) {
        //layer 1 - squares
        tmStuff[2][0][i].drawSelf();

        if (tmStuff[2][0][i].state == "animate") {

            tmStuff[2][0][i].transform();
        }
    }
    for (var i = 0; i < tmStuff[2][1].length; i++) {
        //layer 1 - type
        tmStuff[2][1][i].drawSelf();

        if (tmStuff[2][1][i].state == "animate") {

            tmStuff[2][1][i].transform();
        }
    }
}


animateDe = function() {

    for (var i = 0; i < deStuff[0][0].length; i++) {
        //layer 3 - squares
        deStuff[0][0][i].drawSelf();

        if (deStuff[0][0][i].state == "animate") {

            deStuff[0][0][i].transform();
        }
    }
    for (var i = 0; i < deStuff[0][1].length; i++) {
        //layer 3 - type
        deStuff[0][1][i].drawSelf();

        if (deStuff[0][1][i].state == "animate") {

            deStuff[0][1][i].transform();
        }
    }
    for (var i = 0; i < deStuff[1][0].length; i++) {
        //layer 2 - squares
        deStuff[1][0][i].drawSelf();

        if (deStuff[1][0][i].state == "animate") {

            deStuff[1][0][i].transform();
        }
    }
    for (var i = 0; i < deStuff[1][1].length; i++) {
        //layer 2 - type
        deStuff[1][1][i].drawSelf();

        if (deStuff[1][1][i].state == "animate") {

            deStuff[1][1][i].transform();
        }
    }
    for (var i = 0; i < deStuff[2][0].length; i++) {
        //layer 1 - squares
        deStuff[2][0][i].drawSelf();

        if (deStuff[2][0][i].state == "animate") {

            deStuff[2][0][i].transform();
        }
    }
    for (var i = 0; i < deStuff[2][1].length; i++) {
        //layer 1 - type
        deStuff[2][1][i].drawSelf();

        if (deStuff[2][1][i].state == "animate") {

            deStuff[2][1][i].transform();
        }
    }
}

animateIn = function() {

    for (var i = 0; i < inStuff[0][0].length; i++) {
        //layer 3 - squares
        inStuff[0][0][i].drawSelf();

        if (inStuff[0][0][i].state == "animate") {

            inStuff[0][0][i].transform();
        }
    }
    for (var i = 0; i < inStuff[0][1].length; i++) {
        //layer 3 - type
        inStuff[0][1][i].drawSelf();

        if (inStuff[0][1][i].state == "animate") {

            inStuff[0][1][i].transform();
        }
    }
    for (var i = 0; i < inStuff[1][0].length; i++) {
        //layer 2 - squares
        inStuff[1][0][i].drawSelf();

        if (inStuff[1][0][i].state == "animate") {

            inStuff[1][0][i].transform();
        }
    }
    for (var i = 0; i < inStuff[1][1].length; i++) {
        //layer 2 - type
        inStuff[1][1][i].drawSelf();

        if (inStuff[1][1][i].state == "animate") {

            inStuff[1][1][i].transform();
        }
    }
    for (var i = 0; i < inStuff[2][0].length; i++) {
        //layer 1 - squares
        inStuff[2][0][i].drawSelf();

        if (inStuff[2][0][i].state == "animate") {

            inStuff[2][0][i].transform();
        }
    }
    for (var i = 0; i < inStuff[2][1].length; i++) {
        //layer 1 - type
        inStuff[2][1][i].drawSelf();

        if (inStuff[2][1][i].state == "animate") {

            inStuff[2][1][i].transform();
        }
    }
}

animateCp = function() {

    for (var i = 0; i < cpStuff[0][0].length; i++) {
        //layer 3 - squares
        cpStuff[0][0][i].drawSelf();

        if (cpStuff[0][0][i].state == "animate") {

            cpStuff[0][0][i].transform();
        }
    }
    for (var i = 0; i < cpStuff[0][1].length; i++) {
        //layer 3 - type
        cpStuff[0][1][i].drawSelf();

        if (cpStuff[0][1][i].state == "animate") {

            cpStuff[0][1][i].transform();
        }
    }
    for (var i = 0; i < cpStuff[1][0].length; i++) {
        //layer 2 - squares
        cpStuff[1][0][i].drawSelf();

        if (cpStuff[1][0][i].state == "animate") {

            cpStuff[1][0][i].transform();
        }
    }
    for (var i = 0; i < cpStuff[1][1].length; i++) {
        //layer 2 - type
        cpStuff[1][1][i].drawSelf();

        if (cpStuff[1][1][i].state == "animate") {

            cpStuff[1][1][i].transform();
        }
    }
    for (var i = 0; i < cpStuff[2][0].length; i++) {
        //layer 1 - squares
        cpStuff[2][0][i].drawSelf();

        if (cpStuff[2][0][i].state == "animate") {

            cpStuff[2][0][i].transform();
        }
    }
    for (var i = 0; i < cpStuff[2][1].length; i++) {
        //layer 1 - type
        cpStuff[2][1][i].drawSelf();

        if (cpStuff[2][1][i].state == "animate") {

            cpStuff[2][1][i].transform();
        }
    }
}


var tmAddStuff = function() {

    if (tmInitiated == false) {

        if (screentoActivate == "thingMaker") {
            var xSpawn;
            var ySpawn;
            var xTrav;
            var yTrav;

            switch (initDir) {
                case 0:
                    xSpawn = (tmGridSpace * initX) - initDist;
                    ySpawn = tmGridSpace * initY;
                    xTrav = initDist;
                    yTrav = 0;
                    break;
                case 1:
                    xSpawn = (tmGridSpace * initX);
                    ySpawn = (tmGridSpace * initY) - initDist;
                    xTrav = 0;
                    yTrav = initDist;
                    break;
                case 2:
                    xSpawn = (tmGridSpace * initX) + initDist;
                    ySpawn = tmGridSpace * initY;
                    xTrav = -initDist;
                    yTrav = 0;
                    break;
                case 3:
                    xSpawn = (tmGridSpace * initX);
                    ySpawn = (tmGridSpace * initY) + initDist;
                    xTrav = 0;
                    yTrav = -initDist;
                    break;
            }

            var newSq = new UiSquare (
                xSpawn - initSize/2,
                ySpawn - initSize/2,
                initSize,
                initSize,
                xTrav,
                yTrav,
                0,
                0,
                uiWhite,
                uiFast,
                "inout",
                "thingMaker"
              );
            newSq.state = "animate";
            newSq.id = "initGrid";
            tm2sq.push(newSq);
            if (tmClick == 0 && eventLog.length == 7) {
                pushLog("Lovely stuff &mdash; keep going.");
            }
            tmClick++;

            initDir++
            if (initDir > 3) {
                initDir = 0;
            }

            initX++
            if (initX > tmGridArm) {
                initX = -tmGridArm;
                initY++;
            }
        }

        if (tmClick >= tmNeeded) {
            if (screenFocusReal) {

              tmInitiated = true;

                setTimeout(function() {

                    if (!thingMuted && !deBootLog) {
                        thingMakerInit__sound.play();
                    }
                }, 1000);
            }
            if (screentoActivate == "thingMaker") {
                screentoActivate = "develop";
                initX = -deGridArm;
                initY = -deGridArm;
                initDir = 0;
            }
        }
    }

    //INITIATION ANIMATION BELOW

    if (tmInitiated == true && tmStage == 1) {

        var doneAnimating = true;

        for (var i = 0; i < tm2sq.length; i++) {

            if (tm2sq[i].id == "initGrid" && tm2sq[i].state != "done") {

                doneAnimating = false;
            }
        }

        if (doneAnimating == true) {
            tmStage = 2;

        }
    }

    switch (tmStage) {
        case 2:

            var newSq = new UiSquare (
                0,
                0,
                0,
                0,
                -actiSize/2,
                -actiSize/2,
                actiSize,
                actiSize,
                uiWhite,
                uiFast,
                "inout",
                "thingMaker"
              );
            newSq.state = "animate";
            newSq.id = "actiOuter";
            tm1sq.push(newSq);

            var newSq = new UiSquare (
                0,
                0,
                0,
                0,
                -(actiSize/2) + actiStroke,
                -(actiSize/2) + actiStroke,
                actiSize - (actiStroke*2),
                actiSize - (actiStroke*2),
                uiRed,
                uiFast + 3,
                "inout",
                "thingMaker"
              );
            newSq.state = "animate";
            newSq.id = "actiMid";
            tm1sq.push(newSq);

            var newSq = new UiSquare (
                0,
                0,
                0,
                0,
                -(actiSize/2) + actiStroke,
                -(actiSize/2) + actiStroke,
                actiSize - (actiStroke*2),
                actiSize - (actiStroke*2),
                uiBg,
                uiFast + 7,
                "inout",
                "thingMaker"
              );
            newSq.state = "animate";
            newSq.id = "actiInner";
            tm1sq.push(newSq);



            if(!cpBootLog) {
                //FLASH
                tmctx.beginPath();
                tmctx.rect(0, 0, thingMakerCanvas.width, thingMakerCanvas.height);
                tmctx.globalAlpha = 0.1;
                tmctx.fillStyle = "#ffffff";
                tmctx.fill();
                tmctx.closePath();
                tmctx.globalAlpha = 1;

                setTimeout(function() {
                    //FLASH
                    tmctx.beginPath();
                    tmctx.rect(0, 0, thingMakerCanvas.width, thingMakerCanvas.height);
                    tmctx.globalAlpha = 0.1;
                    tmctx.fillStyle = "#ffffff";
                    tmctx.fill();
                    tmctx.closePath();
                    tmctx.globalAlpha = 1;

                }, 300);
            }

            tmStage = 2.5;
            break;
        case 2.5:

            var doneAnimating = true;
            for (var i = 0; i < tm1sq.length; i++) {
                if ((tm1sq[i].id == "actiOuter" || tm1sq[i].id == "actiInner" || tm1sq[i].id == "actiMid") && tm1sq[i].state != "done") {
                    doneAnimating = false;
                }
            }

            if (doneAnimating == true) {
                tmStage = 3;
                var toSplice = [];
                for (var i = 0; i < tm2sq.length; i++) {
                    if (tm2sq[i].id == "initGrid") {
                        toSplice.push(i);
                    }
                }
                spliceArray(tm2sq, toSplice);

            }
            break;
        case 3:

            if(!cpBootLog) {
                //FLASH
                tmctx.beginPath();
                tmctx.rect(0, 0, thingMakerCanvas.width, thingMakerCanvas.height);
                tmctx.globalAlpha = 0.1;
                tmctx.fillStyle = "#ffffff";
                tmctx.fill();
                tmctx.closePath();
                tmctx.globalAlpha = 1;

                for (var i = 0; i < tm1sq.length; i++) {
                    if(tm1sq[i].id == "actiOuter") {

                        tm1sq[i].col = uiBlue;
                    }
                }
            }

            var outerX;
            var outerY;
            var outerW;
            var outerH;
            for (var i = 0; i < tm1sq.length; i++) {
                if (tm1sq[i].id == "actiOuter") {
                    tm1sq[i].initX = tm1sq[i].x;
                    tm1sq[i].initY = tm1sq[i].y;
                    tm1sq[i].initW = tm1sq[i].w;
                    tm1sq[i].initH = tm1sq[i].h;
                    tm1sq[i].time = 0;
                    tm1sq[i].duration = uiFast;

                    var margTop;
                    if(window.innerHeight < 721) {
                        margTop = 12;
                    } else {
                        margTop = 28;
                    }

                    var distToLeft = -(tmAnchor[0] + tm1sq[i].x) + 35;
                    tm1sq[i].targetX = distToLeft;
                    var distToTop = -(tmAnchor[1] + tm1sq[i].y) + margTop;
                    tm1sq[i].targetY = distToTop;
                    var distToWidth = (thingMakerCanvas.width - (35*2)) - tm1sq[i].w;
                    tm1sq[i].targetW = distToWidth;
                    tm1sq[i].targetH = (-73) + ((availableItems.length + lockedItems.length) * 56);

                    tm1sq[i].state = "animate";

                    outerX = tm1sq[i].x + tm1sq[i].targetX;
                    outerY = tm1sq[i].y + tm1sq[i].targetY;
                    outerW = tm1sq[i].w + tm1sq[i].targetW;
                    outerH = tm1sq[i].h + tm1sq[i].targetH;
                }
                if (tm1sq[i].id == "actiInner") {
                    tm1sq[i].initX = tm1sq[i].x;
                    tm1sq[i].initY = tm1sq[i].y;
                    tm1sq[i].initW = tm1sq[i].w;
                    tm1sq[i].initH = tm1sq[i].h;
                    tm1sq[i].time = 0;
                    tm1sq[i].duration = uiFast;

                    var distToLeft = outerX - tm1sq[i].x;
                    tm1sq[i].targetX = distToLeft + actiStroke;
                    var distToTop = outerY - tm1sq[i].y;
                    tm1sq[i].targetY = distToTop + actiStroke;
                    var distToWidth = outerW - tm1sq[i].w;
                    tm1sq[i].targetW = distToWidth - (actiStroke*2);
                    var distToHeight = outerH - tm1sq[i].h;
                    tm1sq[i].targetH = distToHeight - (actiStroke*2);

                    tm1sq[i].state = "animate";
                }
            }
            for (var i = 0; i < tm1sq.length; i++) {
                if(tm1sq[i].id == "actiMid") {

                    tm1sq.splice(i, 1);
                }
            }
            tmStage = 3.5;
            break;
        case 3.5:
            var doneAnimating = true;
            for (var i = 0; i < tm1sq.length; i++) {
                if ((tm1sq[i].id == "actiOuter" || tm1sq[i].id == "actiInner") && tm1sq[i].state != "done") {
                    doneAnimating = false;
                }
            }

            if (doneAnimating == true) {
                tmStage = 4;
                if(!cpBootLog) {
                    //FLASH
                    tmctx.beginPath();
                    tmctx.rect(0, 0, thingMakerCanvas.width, thingMakerCanvas.height);
                    tmctx.globalAlpha = 0.1;
                    tmctx.fillStyle = "#ffffff";
                    tmctx.fill();
                    tmctx.closePath();
                    tmctx.globalAlpha = 1;

                    for (var i = 0; i < tm1sq.length; i++) {
                        if(tm1sq[i].id == "actiOuter") {

                            tm1sq[i].col = uiWhite;
                        }
                    }
                }
            }
            break;
        case 4:
            for (var i = 0; i < tm1sq.length; i++) {
                if (tm1sq[i].id == "actiInner") {
                    tm1sq[i].initX = tm1sq[i].x;
                    tm1sq[i].initY = tm1sq[i].y;
                    tm1sq[i].initW = tm1sq[i].w;
                    tm1sq[i].initH = tm1sq[i].h;
                    tm1sq[i].time = 0;
                    tm1sq[i].duration = uiFast;

                    tm1sq[i].targetX = tm1sq[i].w;
                    tm1sq[i].targetY = 0;
                    tm1sq[i].targetW = -tm1sq[i].w;
                    tm1sq[i].targetH = 0;

                    tm1sq[i].state = "animate";

                    manufactureContainer.style.opacity = 1;
                    manufactureHeader.style.opacity = 1;
                }
            }
            tmStage = 4.5;
            break;
        case 4.5:
            var doneAnimating = true;
            for (var i = 0; i < tm1sq.length; i++) {
                if (tm1sq[i].id == "actiInner" && tm1sq[i].state != "done") {
                    doneAnimating = false;
                }
            }

            if (doneAnimating == true) {
                tmStage = 5;
            }
            break;
        case 5:
            for (var i = 0; i < tm1sq.length; i++) {
                if (tm1sq[i].id == "actiInner") {
                    tm1sq.splice(i, 1);
                }
            }
            for (var i = 0; i < tm1sq.length; i++) {
                if (tm1sq[i].id == "actiOuter") {
                    tm1sq[i].initX = tm1sq[i].x;
                    tm1sq[i].initY = tm1sq[i].y;
                    tm1sq[i].initW = tm1sq[i].w;
                    tm1sq[i].initH = tm1sq[i].h;
                    tm1sq[i].time = 0;
                    tm1sq[i].duration = uiFast;

                    tm1sq[i].targetX = tm1sq[i].w;
                    tm1sq[i].targetY = 0;
                    tm1sq[i].targetW = -tm1sq[i].w;
                    tm1sq[i].targetH = 0;

                    tm1sq[i].state = "animate";
                }
            }
            tmStage = 5.5;
            break;
        case 5.5:
            var doneAnimating = true;
            for (var i = 0; i < tm1sq.length; i++) {
                if (tm1sq[i].id == "actiOuter" && tm1sq[i].state != "done") {
                    doneAnimating = false;
                }
            }

            if (doneAnimating == true) {
                tmStage = 6;
            }
            break;
        case 6:
            for (var i = 0; i < tm1sq.length; i++) {
                if (tm1sq[i].id == "actiOuter") {
                    tm1sq.splice(i, 1);
                }
            }
            tmStage = 6.5;
            tmIntro = false;

            if (!tmBootLog) {
								ga('set', {
														'userId': USER_ID,
														'dimension1': shipName,
                            'dimension2': USER_ID,
														'metric2': 1
													});
								ga('send', 'pageview');
                ga('set', {
                            'metric2': 0
                          });

                queueLog(66, "Thing Maker has power. Nice.<br/>Use it to build ANYTHING in our libraries.");
                queueLog(66, "Searching Thing Maker libraries...");
                queueLog(66, "Loading 'Advanced Robotics' library...");
                queueLog(66, "Failed.");
                queueLog(66, "Loading 'Distress Call' library...");
                queueLog(66, "Failed. Bugger.");
                queueLog(66, "Loading 'Cookie' library...");
                queueLog(66, "Failed. This is just silly.");
                queueLog(66, "Loading 'Potato' library...");
                queueLog(66, "Success! Uhh it'll do?<br/>Other libraries are pretty corrupt.");
                queueLog(66, "Get us some more power please.");

                // pushLog("Thing Maker has power. Nice.");
                // window.setTimeout(function() {pushLog("Searching Thing Maker libraries...")}, 1000);
                // window.setTimeout(function() {pushLog("Loading 'Advanced Robotics' library...")}, 3000);
                // window.setTimeout(function() {pushLog("Nope.")}, 5000);
                // window.setTimeout(function() {pushLog("Loading 'Distress Call' library...")}, 6000);
                // window.setTimeout(function() {pushLog("Fuck.")}, 8000);
                // window.setTimeout(function() {pushLog("Loading 'Cookie' library...")}, 9000);
                // window.setTimeout(function() {pushLog("This is just silly.")}, 11000);
                // window.setTimeout(function() {pushLog("Loading 'Potato' library...")}, 12000);
                // window.setTimeout(function() {pushLog("Done - it'll do.")}, 14000);
                // window.setTimeout(function() {pushLog("Other libraries are corrupt.")}, 15000);
                // window.setTimeout(function() {pushLog("Get us some more power please.")}, 16000);
            }

            tmBootLog = true;

            break;

    }
}

//x, y, w, h, targetX, targetY, targetW, targetH, col, duration, ease
var deAddStuff = function() {

    if (deInitiated == false) {

        if (screentoActivate == "develop") {

            var xSpawn;
            var ySpawn;
            var xTrav;
            var yTrav;

            switch (initDir) {
                case 0:
                    xSpawn = (deGridSpace * initX) - initDist;
                    ySpawn = deGridSpace * initY;
                    xTrav = initDist;
                    yTrav = 0;
                    break;
                case 1:
                    xSpawn = (deGridSpace * initX);
                    ySpawn = (deGridSpace * initY) - initDist;
                    xTrav = 0;
                    yTrav = initDist;
                    break;
                case 2:
                    xSpawn = (deGridSpace * initX) + initDist;
                    ySpawn = deGridSpace * initY;
                    xTrav = -initDist;
                    yTrav = 0;
                    break;
                case 3:
                    xSpawn = (deGridSpace * initX);
                    ySpawn = (deGridSpace * initY) + initDist;
                    xTrav = 0;
                    yTrav = -initDist;
                    break;
            }

            var newSq = new UiSquare (
                xSpawn - initSize/2,
                ySpawn - initSize/2,
                initSize,
                initSize,
                xTrav,
                yTrav,
                0,
                0,
                uiWhite,
                uiFast,
                "inout",
                "develop"
              );
            newSq.state = "animate";
            newSq.id = "initGrid";
            de2sq.push(newSq);
            deClick++;

            initDir++
            if (initDir > 3) {
                initDir = 0;
            }

            initX++
            if (initX > 3) {
                initX = -3;
                initY++;
            }
        }

        if (deClick >= deNeeded) {
            if (screenFocusReal) {
                deInitiated = true;

                  setTimeout(function() {

                      if (!thingMuted && !inBootLog) {
                          developInit__sound.play();
                      }
                  }, 1000);
            }
            if (screentoActivate == "develop") {
                screentoActivate = "information";
                initX = -inGridArm;
                initY = -inGridArm;
                initDir = 0;
            }
        }
    }

    //INITIATION ANIMATION BELOW

    if (deInitiated == true && deStage == 1) {

        var doneAnimating = true;

        for (var i = 0; i < de2sq.length; i++) {

            if (de2sq[i].id == "initGrid" && de2sq[i].state != "done") {

                doneAnimating = false;
            }
        }

        if (doneAnimating == true) {
            deStage = 2;
        }
    }

    switch (deStage) {
        case 2:


            var newSq = new UiSquare (
                0,
                0,
                0,
                0,
                -actiSize/2,
                -actiSize/2,
                actiSize,
                actiSize,
                uiWhite,
                uiFast,
                "inout",
                "develop"
              );
            newSq.state = "animate";
            newSq.id = "actiOuter";
            de1sq.push(newSq);

            var newSq = new UiSquare (
                0,
                0,
                0,
                0,
                -(actiSize/2) + actiStroke,
                -(actiSize/2) + actiStroke,
                actiSize - (actiStroke*2),
                actiSize - (actiStroke*2),
                uiRed,
                uiFast + 3,
                "inout",
                "develop"
              );
            newSq.state = "animate";
            newSq.id = "actiMid";
            de1sq.push(newSq);

            var newSq = new UiSquare (
                0,
                0,
                0,
                0,
                -(actiSize/2) + actiStroke,
                -(actiSize/2) + actiStroke,
                actiSize - (actiStroke*2),
                actiSize - (actiStroke*2),
                uiBg,
                uiFast + 7,
                "inout",
                "develop"
              );
            newSq.state = "animate";
            newSq.id = "actiInner";
            de1sq.push(newSq);

            if(!cpBootLog) {
                //FLASH
                dectx.beginPath();
                dectx.rect(0, 0, developCanvas.width, developCanvas.height);
                dectx.globalAlpha = 0.1;
                dectx.fillStyle = "#ffffff";
                dectx.fill();
                dectx.closePath();
                dectx.globalAlpha = 1;

                setTimeout(function() {
                  //FLASH
                  dectx.beginPath();
                  dectx.rect(0, 0, developCanvas.width, developCanvas.height);
                  dectx.globalAlpha = 0.1;
                  dectx.fillStyle = "#ffffff";
                  dectx.fill();
                  dectx.closePath();
                  dectx.globalAlpha = 1;
                }, 300);
            }

            deStage = 2.5;
            break;
        case 2.5:

            var doneAnimating = true;
            for (var i = 0; i < de1sq.length; i++) {
                if ((de1sq[i].id == "actiOuter" || de1sq[i].id == "actiInner") && de1sq[i].state != "done") {
                    doneAnimating = false;
                }
            }

            if (doneAnimating == true) {
                deStage = 3;
                var toSplice = [];
                for (var i = 0; i < de2sq.length; i++) {
                    if (de2sq[i].id == "initGrid") {
                        toSplice.push(i);
                    }
                }
                spliceArray(de2sq, toSplice);
            }
            break;
        case 3:

            if(!cpBootLog) {
                //FLASH
                dectx.beginPath();
                dectx.rect(0, 0, developCanvas.width, developCanvas.height);
                dectx.globalAlpha = 0.1;
                dectx.fillStyle = "#ffffff";
                dectx.fill();
                dectx.closePath();
                dectx.globalAlpha = 1;

                for (var i = 0; i < de1sq.length; i++) {
                    if(de1sq[i].id == "actiOuter") {

                        de1sq[i].col = uiBlue;
                    }
                }
            }

            var outerX;
            var outerY;
            var outerW;
            var outerH;
            for (var i = 0; i < de1sq.length; i++) {
                if (de1sq[i].id == "actiOuter") {
                    de1sq[i].initX = de1sq[i].x;
                    de1sq[i].initY = de1sq[i].y;
                    de1sq[i].initW = de1sq[i].w;
                    de1sq[i].initH = de1sq[i].h;
                    de1sq[i].time = 0;
                    de1sq[i].duration = uiFast;

                    var margTop;
                    if(window.innerHeight < 721) {
                        margTop = 12;
                    } else {
                        margTop = 28;
                    }

                    var distToLeft = -(deAnchor[0] + de1sq[i].x) + 35;
                    de1sq[i].targetX = distToLeft;
                    var distToTop = -(deAnchor[1] + de1sq[i].y) + margTop;
                    de1sq[i].targetY = distToTop;
                    var distToWidth = (developCanvas.width - (35*2)) - de1sq[i].w;
                    de1sq[i].targetW = distToWidth;
                    if (availableResearch.length < 2) {
                        de1sq[i].targetH = -17;
                    } else {
                        de1sq[i].targetH = (-73) + (availableResearch.length * 56);
                    }

                    de1sq[i].state = "animate";

                    outerX = de1sq[i].x + de1sq[i].targetX;
                    outerY = de1sq[i].y + de1sq[i].targetY;
                    outerW = de1sq[i].w + de1sq[i].targetW;
                    outerH = de1sq[i].h + de1sq[i].targetH;
                }
                if (de1sq[i].id == "actiInner") {
                    de1sq[i].initX = de1sq[i].x;
                    de1sq[i].initY = de1sq[i].y;
                    de1sq[i].initW = de1sq[i].w;
                    de1sq[i].initH = de1sq[i].h;
                    de1sq[i].time = 0;
                    de1sq[i].duration = uiFast;

                    var distToLeft = outerX - de1sq[i].x;
                    de1sq[i].targetX = distToLeft + actiStroke;
                    var distToTop = outerY - de1sq[i].y;
                    de1sq[i].targetY = distToTop + actiStroke;
                    var distToWidth = outerW - de1sq[i].w;
                    de1sq[i].targetW = distToWidth - (actiStroke*2);
                    var distToHeight = outerH - de1sq[i].h;
                    de1sq[i].targetH = distToHeight - (actiStroke*2);

                    de1sq[i].state = "animate";
                }
            }
            for (var i = 0; i < de1sq.length; i++) {
                if(de1sq[i].id == "actiMid") {

                    de1sq.splice(i, 1);
                }
            }
            deStage = 3.5;
            break;
        case 3.5:
            var doneAnimating = true;
            for (var i = 0; i < de1sq.length; i++) {
                if ((de1sq[i].id == "actiOuter" || de1sq[i].id == "actiInner") && de1sq[i].state != "done") {
                    doneAnimating = false;
                }
            }

            if (doneAnimating == true) {
                deStage = 4;
                if(!cpBootLog) {
                    //FLASH
                    dectx.beginPath();
                    dectx.rect(0, 0, developCanvas.width, developCanvas.height);
                    dectx.globalAlpha = 0.1;
                    dectx.fillStyle = "#ffffff";
                    dectx.fill();
                    dectx.closePath();
                    dectx.globalAlpha = 1;

                    for (var i = 0; i < de1sq.length; i++) {
                        if(de1sq[i].id == "actiOuter") {

                            de1sq[i].col = uiWhite;
                        }
                    }
                }
            }
            break;
        case 4:
            for (var i = 0; i < de1sq.length; i++) {
                if (de1sq[i].id == "actiInner") {
                    de1sq[i].initX = de1sq[i].x;
                    de1sq[i].initY = de1sq[i].y;
                    de1sq[i].initW = de1sq[i].w;
                    de1sq[i].initH = de1sq[i].h;
                    de1sq[i].time = 0;
                    de1sq[i].duration = uiFast;

                    de1sq[i].targetX = de1sq[i].w;
                    de1sq[i].targetY = 0;
                    de1sq[i].targetW = -de1sq[i].w;
                    de1sq[i].targetH = 0;

                    de1sq[i].state = "animate";

                    developContainer.style.opacity = 1;
                    developHeader.style.opacity = 1;
                }
            }
            deStage = 4.5;
            break;
        case 4.5:
            var doneAnimating = true;
            for (var i = 0; i < de1sq.length; i++) {
                if (de1sq[i].id == "actiInner" && de1sq[i].state != "done") {
                    doneAnimating = false;
                }
            }

            if (doneAnimating == true) {
                deStage = 5;
            }
            break;
        case 5:
            for (var i = 0; i < de1sq.length; i++) {
                if (de1sq[i].id == "actiInner") {
                    de1sq.splice(i, 1);
                }
            }
            for (var i = 0; i < de1sq.length; i++) {
                if (de1sq[i].id == "actiOuter") {
                    de1sq[i].initX = de1sq[i].x;
                    de1sq[i].initY = de1sq[i].y;
                    de1sq[i].initW = de1sq[i].w;
                    de1sq[i].initH = de1sq[i].h;
                    de1sq[i].time = 0;
                    de1sq[i].duration = uiFast;

                    de1sq[i].targetX = de1sq[i].w;
                    de1sq[i].targetY = 0;
                    de1sq[i].targetW = -de1sq[i].w;
                    de1sq[i].targetH = 0;

                    de1sq[i].state = "animate";
                }
            }
            deStage = 5.5;
            break;
        case 5.5:
            var doneAnimating = true;
            for (var i = 0; i < de1sq.length; i++) {
                if (de1sq[i].id == "actiOuter" && de1sq[i].state != "done") {
                    doneAnimating = false;
                }
            }

            if (doneAnimating == true) {
                deStage = 6;
            }
            break;
        case 6:
            for (var i = 0; i < de1sq.length; i++) {
                if (de1sq[i].id == "actiOuter") {
                    de1sq.splice(i, 1);
                }
            }
            deStage = 6.5;
            deIntro = false;

            if (!deBootLog) {

                queueLog(66, "Idea Lister is up & running.<br/>Use it to improve your things<br/>with my lovely ideas.");
                shipStatusSpan.innerHTML = "<span>Ship Status:</span> waking...";

                // pushLog("Research & development's functioning.");
            }

            deBootLog = true;

            break;

    }
}

var inAddStuff = function() {

    if (inInitiated == false) {

        if (screentoActivate == "information") {

            var xSpawn;
            var ySpawn;
            var xTrav;
            var yTrav;

            switch (initDir) {
                case 0:
                    xSpawn = (inGridSpace * initX) - initDist;
                    ySpawn = inGridSpace * initY;
                    xTrav = initDist;
                    yTrav = 0;
                    break;
                case 1:
                    xSpawn = (inGridSpace * initX);
                    ySpawn = (inGridSpace * initY) - initDist;
                    xTrav = 0;
                    yTrav = initDist;
                    break;
                case 2:
                    xSpawn = (inGridSpace * initX) + initDist;
                    ySpawn = inGridSpace * initY;
                    xTrav = -initDist;
                    yTrav = 0;
                    break;
                case 3:
                    xSpawn = (inGridSpace * initX);
                    ySpawn = (inGridSpace * initY) + initDist;
                    xTrav = 0;
                    yTrav = -initDist;
                    break;
            }

            var newSq = new UiSquare (
                xSpawn - initSize/2,
                ySpawn - initSize/2,
                initSize,
                initSize,
                xTrav,
                yTrav,
                0,
                0,
                uiWhite,
                uiFast,
                "inout",
                "information"
              );
            newSq.state = "animate";
            newSq.id = "initGrid";
            in2sq.push(newSq);
            inClick++;

            initDir++
            if (initDir > 3) {
                initDir = 0;
            }

            initX++
            if (initX > inGridArm) {
                initX = -inGridArm;
                initY++;
            }
        }

        if (inClick >= inNeeded) {
            if (screenFocusReal) {
                inInitiated = true;

                setTimeout(function() {

                    if (!thingMuted && !cpBootLog) {
                        informationInit__sound.play();
                    }
                }, 1000);
            }
            if (screentoActivate == "information") {
                screentoActivate = "center";
                initX = -cpGridArm;
                initY = -cpGridArm;
                initDir = 0;
            }
        }
    }

    //INITIATION ANIMATION BELOW

    if (inInitiated == true && inStage == 1) {

        var doneAnimating = true;

        for (var i = 0; i < in2sq.length; i++) {

            if (in2sq[i].id == "initGrid" && in2sq[i].state != "done") {

                doneAnimating = false;
            }
        }

        if (doneAnimating == true) {
            inStage = 2;
        }
    }

    switch (inStage) {
        case 2:


            var newSq = new UiSquare (
                0,
                0,
                0,
                0,
                -actiSize/2,
                -actiSize/2,
                actiSize,
                actiSize,
                uiWhite,
                uiFast,
                "inout",
                "information"
              );
            newSq.state = "animate";
            newSq.id = "actiOuter";
            in1sq.push(newSq);

            var newSq = new UiSquare (
                0,
                0,
                0,
                0,
                -(actiSize/2) + actiStroke,
                -(actiSize/2) + actiStroke,
                actiSize - (actiStroke*2),
                actiSize - (actiStroke*2),
                uiRed,
                uiFast + 3,
                "inout",
                "information"
              );
            newSq.state = "animate";
            newSq.id = "actiMid";
            in1sq.push(newSq);

            var newSq = new UiSquare (
                0,
                0,
                0,
                0,
                -(actiSize/2) + actiStroke,
                -(actiSize/2) + actiStroke,
                actiSize - (actiStroke*2),
                actiSize - (actiStroke*2),
                uiBg,
                uiFast + 7,
                "inout",
                "information"
              );
            newSq.state = "animate";
            newSq.id = "actiInner";
            in1sq.push(newSq);

            if(!cpBootLog) {
                //FLASH
                inctx.beginPath();
                inctx.rect(0, 0, informationCanvas.width, informationCanvas.height);
                inctx.globalAlpha = 0.1;
                inctx.fillStyle = "#ffffff";
                inctx.fill();
                inctx.closePath();
                inctx.globalAlpha = 1;

                setTimeout(function() {
                    //FLASH
                    inctx.beginPath();
                    inctx.rect(0, 0, informationCanvas.width, informationCanvas.height);
                    inctx.globalAlpha = 0.1;
                    inctx.fillStyle = "#ffffff";
                    inctx.fill();
                    inctx.closePath();
                    inctx.globalAlpha = 1;
                }, 300);
            }
            inStage = 2.5;
            break;
        case 2.5:

            var doneAnimating = true;
            for (var i = 0; i < in1sq.length; i++) {
                if ((in1sq[i].id == "actiOuter" || in1sq[i].id == "actiInner") && in1sq[i].state != "done") {
                    doneAnimating = false;
                }
            }

            if (doneAnimating == true) {
                inStage = 3;
                var toSplice = [];
                for (var i = 0; i < in2sq.length; i++) {
                    if (in2sq[i].id == "initGrid") {
                        toSplice.push(i);
                    }
                }
                spliceArray(in2sq, toSplice);

            }
            break;
        case 3:

            if(!cpBootLog) {
                //FLASH
                inctx.beginPath();
                inctx.rect(0, 0, informationCanvas.width, informationCanvas.height);
                inctx.globalAlpha = 0.1;
                inctx.fillStyle = "#ffffff";
                inctx.fill();
                inctx.closePath();
                inctx.globalAlpha = 1;

                for (var i = 0; i < in1sq.length; i++) {
                    if(in1sq[i].id == "actiOuter") {

                        in1sq[i].col = uiBlue;
                    }
                }
            }

            var outerX;
            var outerY;
            var outerW;
            var outerH;
            for (var i = 0; i < in1sq.length; i++) {
                if (in1sq[i].id == "actiOuter") {
                    in1sq[i].initX = in1sq[i].x;
                    in1sq[i].initY = in1sq[i].y;
                    in1sq[i].initW = in1sq[i].w;
                    in1sq[i].initH = in1sq[i].h;
                    in1sq[i].time = 0;
                    in1sq[i].duration = uiFast;

                    var margTop;
                    if(window.innerHeight < 721) {
                        margTop = 12;
                    } else {
                        margTop = 28;
                    }

                    var distToLeft = -(inAnchor[0] + in1sq[i].x) + 35;
                    in1sq[i].targetX = distToLeft;
                    var distToTop = -(inAnchor[1] + in1sq[i].y) + margTop;
                    in1sq[i].targetY = distToTop;
                    var distToWidth = (informationCanvas.width - (35*2)) - in1sq[i].w;
                    in1sq[i].targetW = distToWidth;
                    in1sq[i].targetH = -70 + statusLogContainer.offsetHeight;

                    in1sq[i].state = "animate";

                    outerX = in1sq[i].x + in1sq[i].targetX;
                    outerY = in1sq[i].y + in1sq[i].targetY;
                    outerW = in1sq[i].w + in1sq[i].targetW;
                    outerH = in1sq[i].h + in1sq[i].targetH;
                }
                if (in1sq[i].id == "actiInner") {
                    in1sq[i].initX = in1sq[i].x;
                    in1sq[i].initY = in1sq[i].y;
                    in1sq[i].initW = in1sq[i].w;
                    in1sq[i].initH = in1sq[i].h;
                    in1sq[i].time = 0;
                    in1sq[i].duration = uiFast;

                    var distToLeft = outerX - in1sq[i].x;
                    in1sq[i].targetX = distToLeft + actiStroke;
                    var distToTop = outerY - in1sq[i].y;
                    in1sq[i].targetY = distToTop + actiStroke;
                    var distToWidth = outerW - in1sq[i].w;
                    in1sq[i].targetW = distToWidth - (actiStroke*2);
                    var distToHeight = outerH - in1sq[i].h;
                    in1sq[i].targetH = distToHeight - (actiStroke*2);

                    in1sq[i].state = "animate";
                }
            }
            for (var i = 0; i < in1sq.length; i++) {
                if(in1sq[i].id == "actiMid") {

                    in1sq.splice(i, 1);
                }
            }
            inStage = 3.5;
            break;
        case 3.5:
            var doneAnimating = true;
            for (var i = 0; i < in1sq.length; i++) {
                if ((in1sq[i].id == "actiOuter" || in1sq[i].id == "actiInner") && in1sq[i].state != "done") {
                    doneAnimating = false;
                }
            }

            if (doneAnimating == true) {
                inStage = 4;
                if(!cpBootLog) {
                    //FLASH
                    inctx.beginPath();
                    inctx.rect(0, 0, informationCanvas.width, informationCanvas.height);
                    inctx.globalAlpha = 0.1;
                    inctx.fillStyle = "#ffffff";
                    inctx.fill();
                    inctx.closePath();
                    inctx.globalAlpha = 1;

                    for (var i = 0; i < in1sq.length; i++) {
                        if(in1sq[i].id == "actiOuter") {

                            in1sq[i].col = uiWhite;
                        }
                    }
                }
            }
            break;
        case 4:
            for (var i = 0; i < in1sq.length; i++) {
                if (in1sq[i].id == "actiInner") {
                    in1sq[i].initX = in1sq[i].x;
                    in1sq[i].initY = in1sq[i].y;
                    in1sq[i].initW = in1sq[i].w;
                    in1sq[i].initH = in1sq[i].h;
                    in1sq[i].time = 0;
                    in1sq[i].duration = uiFast;

                    in1sq[i].targetX = in1sq[i].w;
                    in1sq[i].targetY = 0;
                    in1sq[i].targetW = -in1sq[i].w;
                    in1sq[i].targetH = 0;

                    in1sq[i].state = "animate";

                    infoHeader.style.opacity = 1;
                }
            }
            inStage = 4.5;
            break;
        case 4.5:
            var doneAnimating = true;
            for (var i = 0; i < in1sq.length; i++) {
                if (in1sq[i].id == "actiInner" && in1sq[i].state != "done") {
                    doneAnimating = false;
                }
            }

            if (doneAnimating == true) {
                inStage = 5;
            }
            break;
        case 5:
            for (var i = 0; i < in1sq.length; i++) {
                if (in1sq[i].id == "actiInner") {
                    in1sq.splice(i, 1);
                }
            }
            for (var i = 0; i < in1sq.length; i++) {
                if (in1sq[i].id == "actiOuter") {
                    in1sq[i].initX = in1sq[i].x;
                    in1sq[i].initY = in1sq[i].y;
                    in1sq[i].initW = in1sq[i].w;
                    in1sq[i].initH = in1sq[i].h;
                    in1sq[i].time = 0;
                    in1sq[i].duration = uiFast;

                    in1sq[i].targetX = in1sq[i].w;
                    in1sq[i].targetY = 0;
                    in1sq[i].targetW = -in1sq[i].w;
                    in1sq[i].targetH = 0;

                    in1sq[i].state = "animate";
                }
            }
            inStage = 5.5;
            break;
        case 5.5:
            var doneAnimating = true;
            for (var i = 0; i < in1sq.length; i++) {
                if (in1sq[i].id == "actiOuter" && in1sq[i].state != "done") {
                    doneAnimating = false;
                }
            }

            if (doneAnimating == true) {
                inStage = 6;
            }
            break;
        case 6:
            for (var i = 0; i < in1sq.length; i++) {
                if (in1sq[i].id == "actiOuter") {
                    in1sq.splice(i, 1);
                }
            }
            inStage = 6.5;
            inIntro = false;

            if (!inBootLog) {
                queueLog(66, "Fact Holder is powered & informing us.<br/>It'll keep track of what we know,<br/>which currently isn't a lot.");
                // pushLog("We have info on the information screen!");
            }

            inBootLog = true;

            break;

    }
}

var cpAddStuff = function() {

    if (cpInitiated == false) {

        if (screentoActivate == "center") {

            var xSpawn;
            var ySpawn;
            var xTrav;
            var yTrav;

            switch (initDir) {
                case 0:
                    xSpawn = (cpGridSpace * initX) - initDist;
                    ySpawn = cpGridSpace * initY;
                    xTrav = initDist;
                    yTrav = 0;
                    break;
                case 1:
                    xSpawn = (cpGridSpace * initX);
                    ySpawn = (cpGridSpace * initY) - initDist;
                    xTrav = 0;
                    yTrav = initDist;
                    break;
                case 2:
                    xSpawn = (cpGridSpace * initX) + initDist;
                    ySpawn = cpGridSpace * initY;
                    xTrav = -initDist;
                    yTrav = 0;
                    break;
                case 3:
                    xSpawn = (cpGridSpace * initX);
                    ySpawn = (cpGridSpace * initY) + initDist;
                    xTrav = 0;
                    yTrav = -initDist;
                    break;
            }

            var newSq = new UiSquare (
                xSpawn - initSize/2,
                ySpawn - initSize/2,
                initSize,
                initSize,
                xTrav,
                yTrav,
                0,
                0,
                uiWhite,
                uiFast,
                "inout",
                "center"
              );
            newSq.state = "animate";
            newSq.id = "initGrid";
            cp2sq.push(newSq);
            cpClick++;

            initDir++
            if (initDir > 3) {
                initDir = 0;
            }

            initX++
            if (initX > cpGridArm) {
                initX = -cpGridArm;
                initY++;
            }
        }

        if (cpClick >= cpNeeded) {
            if (screenFocusReal) {

                if (!cpBootLog) {
                    if (!thingMuted) {
                        centerPowerInit__sound.play();
                    }

                    setTimeout(function() {
                        cpInitiated = true;

                    }, 1100);
                } else {
                    if (!thingMuted) {
                        setTimeout(function() {
                            allInit__sound.play();


                        }, 1150);
                    }
                    setTimeout(function() {
                        cpInitiated = true;

                    }, 4000);
                }







            }
            if (screentoActivate == "center") {
                screentoActivate = "";
            }

            // initX = -deGridArm;
            // initY = -deGridArm;
            // initDir = 0;

            // oCanvas.style.opacity = 1;
            // planViewButton.style.opacity = 1;
            // centerPowerCanvas.parentNode.removeChild(centerPowerCanvas);
            // intro = false;
        }
    }

    //INITIATION ANIMATION BELOW

    if (cpInitiated == true && cpStage == 1) {

        var doneAnimating = true;

        for (var i = 0; i < cp2sq.length; i++) {

            if (cp2sq[i].id == "initGrid" && cp2sq[i].state != "done") {

                doneAnimating = false;
            }
        }

        if (doneAnimating == true) {
            cpStage = 2;
        }
    }

    switch (cpStage) {
        case 2:


            for (var i = 0; i < cp2sq.length; i++) {
                if (cp2sq[i].id == "initGrid") {

                    cp2sq[i].initX = cp2sq[i].x;
                    cp2sq[i].initY = cp2sq[i].y;
                    cp2sq[i].initW = cp2sq[i].w;
                    cp2sq[i].initH = cp2sq[i].h;
                    cp2sq[i].time = 0;
                    cp2sq[i].duration = uiFast;

                    cp2sq[i].targetX = cp2sq[i].x * getRandomInt(10, 15);
                    cp2sq[i].targetY = cp2sq[i].y * getRandomInt(10, 15);

                    var newSize = (getRandomInt(1, 9)/10);

                    cp2sq[i].targetW = -cp2sq[i].w * newSize;
                    cp2sq[i].targetH = -cp2sq[i].w * newSize;

                    cp2sq[i].state = "animate";

                }
            }
            // x, y, w, targetX, targetY, targetW, duration, ease, uiscreen, svg
            spaceplan__logo = new UiSvg(0, 0, 0, 0, 0, oCanvas.width * 0.7, uiFast, "inout", "center", spaceplan__svg);
            spaceplan__logo.id = "logo";
            spaceplan__logo.state = "animate";
            cp1sq.push(spaceplan__logo);

            var margTop;
            if(window.innerHeight < 721) {
                margTop = 36;
            } else {
                margTop = 54;
            }

            var distToTop = -(cpAnchor[1]) + margTop;

            var newSq = new UiSquare (
                0,
                0,
                1,
                1,
                0,
                distToTop,
                0,
                0,
                uiWhite,
                uiFast,
                "inout",
                "center"
              );
            newSq.state = "animate";
            newSq.id = "headerHr";
            cp2sq.push(newSq);

            cpStage = 2.5;
            break;
        case 2.5:
            var doneAnimating = true;
            for (var i = 0; i < cp2sq.length; i++) {

                if (cp2sq[i].id == "initGrid" && cp2sq[i].state != "done") {

                    doneAnimating = false;
                }
            }

            if (doneAnimating == true) {
                cpStage = 3;

                for (var i = 0; i < cp2sq.length; i++) {
                    if (cp2sq[i].id == "initGrid") {

                        cp2sq[i].x = cp2sq[i].x * (getRandomInt(11, 12)/10);
                        cp2sq[i].y = cp2sq[i].y * (getRandomInt(11, 12)/10);

                        //FLASH
                        // cpctx.beginPath();
                        // cpctx.globalAlpha = 0.1;
                        // cpctx.rect(0, 0, centerPowerCanvas.width, centerPowerCanvas.height);
                        // cpctx.fillStyle = "rgba(255, 255, 255, 0.1)";
                        // cpctx.fill();
                        // cpctx.closePath();
                        // cpctx.globalAlpha = 1;
                    }
                }
            }
            spaceplan__logo.extraW += 0.5;
            break;
        case 3:
            cpStage = 3.5;
            spaceplan__logo.extraW += 0.5;
            break;
        case 3.5:
            cpStage = 4;
            spaceplan__logo.extraW += 0.5;
            break;
        case 4:

            //x, y, w, targetX, targetY, targetW, duration, ease, uiscreen, svg
            setTimeout(function() {
                cpStage = 5;
            }, 1000);
            cpStage = 4.5;
            spaceplan__logo.extraW += 0.5;
            break;
        case 4.5:
            spaceplan__logo.w += 0.5;
            break;
        case 5:

            //x, y, w, targetX, targetY, targetW, duration, ease, uiscreen, svg
            for (var i = 0; i < cp1sq.length; i++) {

                if (cp1sq[i].id == "logo") {

                    cp1sq.splice(i, 1);
                    spaceplan__logo = '';
                    // setTimeout(function() {
                        cpStage = 6;
                    // }, 500);
                    // cpStage = 5.5;
                    break;
                }
            }
            break;
        case 6:
            for (var i = 0; i < cp2sq.length; i++) {
                if (cp2sq[i].id == "initGrid") {

                    cp2sq[i].initX = cp2sq[i].x;
                    cp2sq[i].initY = cp2sq[i].y;
                    cp2sq[i].initW = cp2sq[i].w;
                    cp2sq[i].initH = cp2sq[i].h;
                    cp2sq[i].time = 0;
                    cp2sq[i].duration = uiFast;

                    cp2sq[i].targetX = cp2sq[i].x * getRandomInt(50, 60);
                    cp2sq[i].targetY = cp2sq[i].y * getRandomInt(50, 60);

                    var newSize = (getRandomInt(1, 9)/10);

                    cp2sq[i].targetW = -cp2sq[i].w * newSize;
                    cp2sq[i].targetH = -cp2sq[i].w * newSize;

                    cp2sq[i].state = "animate";

                }
                if (cp2sq[i].id == "headerHr") {

                    cp2sq[i].initX = cp2sq[i].x;
                    cp2sq[i].initY = cp2sq[i].y;
                    cp2sq[i].initW = cp2sq[i].w;
                    cp2sq[i].initH = cp2sq[i].h;
                    cp2sq[i].time = 0;
                    cp2sq[i].duration = uiFast;

                    cp2sq[i].targetX = -(230/2);
                    cp2sq[i].targetY = 0;

                    var newSize = (getRandomInt(1, 9)/10);

                    cp2sq[i].targetW = 229;
                    cp2sq[i].targetH = 0;

                    cp2sq[i].state = "animate";

                }
            }
            if(!blackHoleShrunk) {
                //x1, y1, x2, y2, width, targetX1, targetY1, targetX2, targetY2, targetWidth, col, duration, ease, uiscreen
                var planetShad = new UiLine(cpAnchor[0], cpAnchor[1], cpAnchor[0], cpAnchor[1], 0, planetOne.shadPos[0][0] - cpAnchor[0], planetOne.shadPos[0][1] - cpAnchor[1], planetOne.shadPos[1][0] - cpAnchor[0], planetOne.shadPos[1][1] - cpAnchor[1], planetOne.radius*2, "#070c12", uiFast, "inout", "center");
                planetShad.state = "animate";
                planetShad.id = "planetShad";
                cp3sq.push(planetShad);

                var userBodyShad = new UiLine(cpAnchor[0], cpAnchor[1], cpAnchor[0], cpAnchor[1], 0, userBody.shadPos[0][0] - cpAnchor[0], userBody.shadPos[0][1] - cpAnchor[1], userBody.shadPos[1][0] - cpAnchor[0], userBody.shadPos[1][1] - cpAnchor[1], userBody.radius*2, "#070c12", uiFast, "inout", "center");
                userBodyShad.state = "animate";
                userBodyShad.id = "userBodyShad";
                cp3sq.push(userBodyShad);

                if (gotLandship && !shipLanded) {
                    var userPodShad = new UiLine(cpAnchor[0], cpAnchor[1], cpAnchor[0], cpAnchor[1], 0, userPod.shadPos[0][0] - cpAnchor[0], userPod.shadPos[0][1] - cpAnchor[1], userPod.shadPos[1][0] - cpAnchor[0], userPod.shadPos[1][1] - cpAnchor[1], userPod.radius*2, "#070c12", uiFast, "inout", "center");
                    userPodShad.state = "animate";
                    userPodShad.id = "userPodShad";
                    cp3sq.push(userPodShad);
                }
            }

            //x, y, r, sA, eA, targetX, targetY, targetR, targetSA, targetEA, counterClockWise, col, duration, ease, uiscreen
            var newPlanet = new UiCircle(0, 0, 0, 0, 2, 0, 0, planetOne.radius, 0, 0, false, "#fc4646", uiFast, "inout", "center");
            newPlanet.state = "animate";
            newPlanet.id = "planet";
            cp2sq.push(newPlanet);

            //x, y, w, h, targetX, targetY, targetW, targetH, col, duration, ease, uiscreen
            var newShip = new UiSquare(0, 0, 0, 0, userBody.relPos[0] - cpAnchor[0], userBody.relPos[1] - cpAnchor[1], userBody.radius, userBody.radius, userBody.colour, uiFast, "inout", "center");
            newShip.state = "animate";
            newShip.id = "ship";
            cp2sq.push(newShip);

            if (gotLandship) {
                //x, y, w, h, targetX, targetY, targetW, targetH, col, duration, ease, uiscreen
                var newPod = new UiSquare(0, 0, 0, 0, userPod.relPos[0] - cpAnchor[0], userPod.relPos[1] - cpAnchor[1], userPod.radius, userPod.radius, userPod.colour, uiFast, "inout", "center");
                newPod.state = "animate";
                newPod.id = "pod";
                cp2sq.push(newPod);
            }

            for (var i = 0; i < probes.length; i++) {
                var newProbe = new UiCircle(0, 0, 0, 0, 2, probes[i].relPos[0] - cpAnchor[0], probes[i].relPos[1] - cpAnchor[1], probes[i].radius, 0, 0, false, probes[i].colour, uiFast, "inout", "center");
                newProbe.state = "animate";
                newProbe.id = "probe";
                newProbe.targetBody = probes[i];
                cp2sq.push(newProbe);
            }
            for (var i = 0; i < landedProbes.length; i++) {
                var newProbe = new UiCircle(0, 0, 0, 0, 2, landedProbes[i].relPos[0] - cpAnchor[0], landedProbes[i].relPos[1] - cpAnchor[1], landedProbes[i].radius, 0, 0, false, landedProbes[i].colour, uiFast, "inout", "center");
                newProbe.state = "animate";
                newProbe.id = "landedprobe";
                cp2sq.push(newProbe);
            }
            for (var i = 0; i < spudniks.length; i++) {
                var newProbe = new UiCircle(0, 0, 0, 0, 2, spudniks[i].relPos[0] - cpAnchor[0], spudniks[i].relPos[1] - cpAnchor[1], spudniks[i].radius, 0, 0, false, spudniks[i].colour, uiFast, "inout", "center");
                newProbe.state = "animate";
                newProbe.id = "probe";
                newProbe.targetBody = spudniks[i];
                cp2sq.push(newProbe);
            }
            for (var i = 0; i < potatoPlants.length; i++) {
                var newProbe = new UiSquare(0, 0, 0, 0, potatoPlants[i].relPos[0] - cpAnchor[0], potatoPlants[i].relPos[1] - cpAnchor[1], potatoPlants[i].radius, potatoPlants[i].radius, potatoPlants[i].colour, uiFast, "inout", "center");
                newProbe.state = "animate";
                newProbe.id = "probe";
                newProbe.targetBody = potatoPlants[i];
                cp2sq.push(newProbe);
            }
            for (var i = 0; i < landedPotatoPlants.length; i++) {
                var newProbe = new UiSquare(0, 0, 0, 0, landedPotatoPlants[i].relPos[0] - cpAnchor[0], landedPotatoPlants[i].relPos[1] - cpAnchor[1], landedPotatoPlants[i].radius, landedPotatoPlants[i].radius, landedPotatoPlants[i].colour, uiFast, "inout", "center");
                newProbe.state = "animate";
                newProbe.id = "landedprobe";
                cp2sq.push(newProbe);
            }
            for (var i = 0; i < taterTowers.length; i++) {
                var newProbe = new UiLine(cpAnchor[0], cpAnchor[1], cpAnchor[0], cpAnchor[1], 0, taterTowers[i].relPos[0] - cpAnchor[0], taterTowers[i].relPos[1] - cpAnchor[1], taterTowers[i].relPos[0] - cpAnchor[0] - (taterTowers[i].vel[0]*50), taterTowers[i].relPos[1] - cpAnchor[1] - (taterTowers[i].vel[1]*50), taterTowers[i].radius, taterTowers[i].colour, uiFast, "inout", "center");
                newProbe.state = "animate";
                newProbe.id = "tower";
                newProbe.targetBody = taterTowers[i];
                cp2sq.push(newProbe);
            }
            for (var i = 0; i < landedTaterTowers.length; i++) {
                var newProbe = new UiLine(cpAnchor[0], cpAnchor[1], cpAnchor[0], cpAnchor[1], 0, landedTaterTowers[i].relPos[0] - cpAnchor[0], landedTaterTowers[i].relPos[1] - cpAnchor[1], landedTaterTowers[i].relPos[0] - cpAnchor[0] - (landedTaterTowers[i].vel[0]*50), landedTaterTowers[i].relPos[1] - cpAnchor[1] - (landedTaterTowers[i].vel[1]*50), landedTaterTowers[i].radius, landedTaterTowers[i].colour, uiFast, "inout", "center");
                newProbe.state = "animate";
                newProbe.id = "landedTower";
                cp2sq.push(newProbe);
            }
            for (var i = 0; i < spudguns.length; i++) {
                var newProbe = new UiCircle(0, 0, 0, 0, 2, spudguns[i].relPos[0] - cpAnchor[0], spudguns[i].relPos[1] - cpAnchor[1], spudguns[i].radius, 0, 0, false, spudguns[i].colour, uiFast, "inout", "center");
                newProbe.state = "animate";
                newProbe.id = "probe";
                newProbe.targetBody = spudguns[i];
                cp2sq.push(newProbe);
            }
            for (var i = 0; i < launchers.length; i++) {
                var newProbe = new UiCircle(0, 0, 0, 0, 2, launchers[i].relPos[0] - cpAnchor[0], launchers[i].relPos[1] - cpAnchor[1], launchers[i].radius, 0, 0, false, launchers[i].colour, uiFast, "inout", "center");
                newProbe.state = "animate";
                newProbe.id = "probe";
                newProbe.targetBody = launchers[i];
                cp2sq.push(newProbe);
            }


            cpStage = 6.5;
            break;
        case 6.5:

        for (var i = 0; i < cp2sq.length; i++) {

            if (cp2sq[i].id == "ship") {

                cp2sq[i].extraX = (userBody.relPos[0] - (cp2sq[i].targetX + cpAnchor[0]));
                cp2sq[i].extraY = (userBody.relPos[1] - (cp2sq[i].targetY + cpAnchor[1]));
            }
            if (cp2sq[i].id == "pod") {

                cp2sq[i].extraX = (userPod.relPos[0] - (cp2sq[i].targetX + cpAnchor[0]));
                cp2sq[i].extraY = (userPod.relPos[1] - (cp2sq[i].targetY + cpAnchor[1]));
            }
            if (cp2sq[i].id == "probe") {

                cp2sq[i].extraX = (cp2sq[i].targetBody.relPos[0] - (cp2sq[i].targetX + cpAnchor[0]));
                cp2sq[i].extraY = (cp2sq[i].targetBody.relPos[1] - (cp2sq[i].targetY + cpAnchor[1]));
            }
            if (cp2sq[i].id == "tower") {

                cp2sq[i].extraX1 = (cp2sq[i].targetBody.relPos[0] - (cp2sq[i].targetX1 + cpAnchor[0]));
                cp2sq[i].extraY1 = (cp2sq[i].targetBody.relPos[1] - (cp2sq[i].targetY1 + cpAnchor[1]));
                // var diffX = (cp2sq[i].targetBody.vel[0]*50) - Math.abs(cp2sq[i].targetX1 - cp2sq[i].targetX2);
                // var diffY = (cp2sq[i].targetBody.vel[1]*50) - Math.abs(cp2sq[i].targetY1 - cp2sq[i].targetY2);
                cp2sq[i].extraX2 = (cp2sq[i].targetBody.relPos[0] - (cp2sq[i].targetX1 + cpAnchor[0]));// + diffX;
                cp2sq[i].extraY2 = (cp2sq[i].targetBody.relPos[1] - (cp2sq[i].targetY1 + cpAnchor[1]));// + diffY;
            }
        }
        if(!blackHoleShrunk) {
            for (var i = 0; i < cp3sq.length; i++) {

                if (cp3sq[i].id == "planetShad") {

                    cp3sq[i].extraX1 = (planetOne.shadPos[0][0] - (cp3sq[i].targetX1 + cpAnchor[0]));
                    cp3sq[i].extraY1 = (planetOne.shadPos[0][1] - (cp3sq[i].targetY1 + cpAnchor[1]));
                    cp3sq[i].extraX2 = (planetOne.shadPos[1][0] - (cp3sq[i].targetX2 + cpAnchor[0]));
                    cp3sq[i].extraY2 = (planetOne.shadPos[1][1] - (cp3sq[i].targetY2 + cpAnchor[1]));
                }
                if (cp3sq[i].id == "userBodyShad") {

                    cp3sq[i].extraX1 = (userBody.shadPos[0][0] - (cp3sq[i].targetX1 + cpAnchor[0]));
                    cp3sq[i].extraY1 = (userBody.shadPos[0][1] - (cp3sq[i].targetY1 + cpAnchor[1]));
                    cp3sq[i].extraX2 = (userBody.shadPos[1][0] - (cp3sq[i].targetX2 + cpAnchor[0]));
                    cp3sq[i].extraY2 = (userBody.shadPos[1][1] - (cp3sq[i].targetY2 + cpAnchor[1]));
                }
                if (cp3sq[i].id == "userPodShad") {

                    cp3sq[i].extraX1 = (userPod.shadPos[0][0] - (cp3sq[i].targetX1 + cpAnchor[0]));
                    cp3sq[i].extraY1 = (userPod.shadPos[0][1] - (cp3sq[i].targetY1 + cpAnchor[1]));
                    cp3sq[i].extraX2 = (userPod.shadPos[1][0] - (cp3sq[i].targetX2 + cpAnchor[0]));
                    cp3sq[i].extraY2 = (userPod.shadPos[1][1] - (cp3sq[i].targetY2 + cpAnchor[1]));
                }
            }
        }

            var doneAnimating = true;

            for (var i = 0; i < cp2sq.length; i++) {

                if (cp2sq[i].id == "initGrid" && cp2sq[i].state != "done") {

                    doneAnimating = false;
                }
            }

            if (doneAnimating == true) {
                cpStage = 7;
            }
            break;
        case 7:
            headerHr.style.opacity = 1;
            planetLookerType.style.opacity = 1;
            systemPeekerType.style.opacity = 1;
            oCanvas.style.opacity = 1;
            planViewButton.style.opacity = 1;
            centerPowerCanvas.parentNode.removeChild(centerPowerCanvas);
            cpIntro = false;
            cpStage = 8;

            if (!cpBootLog) {
								ga('set', {
														'userId': USER_ID,
														'dimension1': shipName,
                            'dimension2': USER_ID,
														'metric3': 1
													});
								ga('send', 'pageview');
                ga('set', {
                            'metric3': 0
                          });

                queueLog(99, "Bloody hell that obnoxious boot up.<br/>Embarrassing &mdash; software devs aye?");
                queueLog(66, "Well there we go, all up & running.<br/>Build more things so we can work out<br/>where exactly we are...");
                shipStatusSpan.innerHTML = "<span>Ship Status:</span> breezy";
                // pushLog("Oh dear, sorry about that obnoxious boot up. Well there we go - all up and running.");
            }

            cpBootLog = true;

            break;
    }
}

//////////////////////
//DRAW INITIAL GRIDS//
//////////////////////

//THING MAKER
initDir = 0;
initX = -tmGridArm;
initY = -tmGridArm;
for (var i = 0; i < tmNeeded; i++) {

    var xSpawn = tmGridSpace * initX;
    var ySpawn = tmGridSpace * initY;

    var newSq = new UiSquare (
        xSpawn - 1,
        ySpawn - 1,
        2,
        2,
        0,
        0,
        0,
        0,
        uiWhite,
        uiFast,
        "inout",
        "thingMaker"
      );
    newSq.state = "done";
    tmGridPoints.push(newSq);

    initDir++
    if (initDir > 3) {
        initDir = 0;
    }

    initX++
    if (initX > tmGridArm) {
        initX = -tmGridArm;
        initY++;
    }
}
//DEVELOP
initDir = 0;
initX = -deGridArm;
initY = -deGridArm;
for (var i = 0; i < deNeeded; i++) {

    var xSpawn = deGridSpace * initX;
    var ySpawn = deGridSpace * initY;

    var newSq = new UiSquare (
        xSpawn - 1,
        ySpawn - 1,
        2,
        2,
        0,
        0,
        0,
        0,
        uiWhite,
        uiFast,
        "inout",
        "develop"
      );
    newSq.state = "done";
    deGridPoints.push(newSq);

    initDir++
    if (initDir > 3) {
        initDir = 0;
    }

    initX++
    if (initX > deGridArm) {
        initX = -deGridArm;
        initY++;
    }
}
//INFORMATION
initDir = 0;
initX = -inGridArm;
initY = -inGridArm;
for (var i = 0; i < inNeeded; i++) {

    var xSpawn = inGridSpace * initX;
    var ySpawn = inGridSpace * initY;

    var newSq = new UiSquare (
        xSpawn - 1,
        ySpawn - 1,
        2,
        2,
        0,
        0,
        0,
        0,
        uiWhite,
        uiFast,
        "inout",
        "information"
      );
    newSq.state = "done";
    inGridPoints.push(newSq);

    initDir++
    if (initDir > 3) {
        initDir = 0;
    }

    initX++
    if (initX > inGridArm) {
        initX = -inGridArm;
        initY++;
    }
}
//CENTER
initDir = 0;
initX = -cpGridArm;
initY = -cpGridArm;
for (var i = 0; i < cpNeeded; i++) {

    var xSpawn = cpGridSpace * initX;
    var ySpawn = cpGridSpace * initY;

    var newSq = new UiSquare (
        xSpawn - 1,
        ySpawn - 1,
        2,
        2,
        0,
        0,
        0,
        0,
        uiWhite,
        uiFast,
        "inout",
        "center"
      );
    newSq.state = "done";
    cpGridPoints.push(newSq);

    initDir++
    if (initDir > 3) {
        initDir = 0;
    }

    initX++
    if (initX > cpGridArm) {
        initX = -cpGridArm;
        initY++;
    }
}


initX = -tmGridArm;
initY = -tmGridArm;
initDir = 0;

var spliceArray = function(arr, ind) {
    if (ind != undefined) {
        for (var i = ind.length - 1; i > -1; i--) {

            arr.splice(ind[i], 1);
        }
    }
}





var options__button = document.getElementById("options__button");
var about__button = document.getElementById("about__button");
var options = document.getElementById("options");
var about = document.getElementById("about");

var options__save = document.getElementById("options__save");
var options__autosaveY = document.getElementById("options__autosave--y");
var options__autosaveN = document.getElementById("options__autosave--n");
var options__savefreq30s = document.getElementById("options__savefreq--30s");
var options__savefreq60s = document.getElementById("options__savefreq--60s");
var options__savefreq5m = document.getElementById("options__savefreq--5m");
var options__savefreq30m = document.getElementById("options__savefreq--30m");
var options__soundY = document.getElementById("options__sound--y");
var options__soundN = document.getElementById("options__sound--n");
var options__drawvisY = document.getElementById("options__drawvis--y");
var options__drawvisN = document.getElementById("options__drawvis--n");

options.style.display = "none";

var thingMuted = false;
var thingAutoSave = true;
var thingSaveFreq = "60s";
var thingdrawVis = false;
var saveInter;


var options__sound = [];
var about__sound = [];

var options__soundInt = 0;
var about__soundInt = 0;

for (var ks = 0; ks < 5; ks++) {
    options__sound[ks] = new Audio('audio/menu/options.mp3');
    about__sound[ks] = new Audio('audio/menu/about.mp3');
    soundArray.push(options__sound[ks]);
    soundArray.push(about__sound[ks]);
}


var optctx = options__button.getContext('2d');

var optionsCog__svg = new Image();
if (!isFirefox & !isEdge) {
    optionsCog__svg.src = "img/options.svg";
} else {
    optionsCog__svg.src = "img/options.png";
}

var optionsClose__svg = new Image();
if (!isFirefox & !isEdge) {
    optionsClose__svg.src = "img/close.svg";
} else {
    optionsClose__svg.src = "img/close.png";
}

optionsImg = {
    "cog": optionsCog__svg,
    "close": optionsClose__svg,
    "cogPos": 0,
    "cogSize": 20,
    "cogMaxSize": 20
};

var optionsInterval;
var optionsTime = 0;
var optionsTimer = 7;

optionsImg.close.onload = function () {
    optctx.drawImage(optionsImg.close, 0, 0, optionsImg.cogSize, optionsImg.cogSize);
    optctx.drawImage(optionsImg.cog, 0, 0, optionsImg.cogSize, optionsImg.cogSize);
}




function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

// contList = document.getElementById("contributor-list");
about.style.display = "none";
function toggleAbout() {

    if (!thingMuted) {
        about__sound[about__soundInt].play();
        about__soundInt++;
        if (about__soundInt >= about__sound.length) {
            about__soundInt = 0;
        }
    }

    clearInterval(optionsInterval);
    // clearInterval(optionsInterval);
    if (options.style.display == 'none') {
        optionsInterval = setInterval(optionsCog, 30);
    }
    options.style.display = "none";
    if (about.style.display == "none") {
        about__button.style.opacity = 0;
        about__button.style.right = 30 + 'px';


        about.style.display = "flex";
        // optionsInterval = setInterval(optionsCog, 10);
        ga('set', {
                    'userId': USER_ID,
                    'dimension1': shipName,
                    'dimension2': USER_ID,
                    'metric14': 1
                  });
        ga('send', 'pageview');
        ga('set', {
                    'metric14': 0
                  });

        // getGivers();

    } else {
        about__button.style.cssText = '';
        about.style.display = "none";
        about__button.style.opacity = 1;
        // optionsInterval = setInterval(optionsCog, 10);
    }
}

function toggleOptions() {

    clearInterval(optionsInterval);
    if (about.style.display != 'none') {
        if (!thingMuted) {
            if (oCanvas.style.display == 'block') {
                planetView__sound[planetView__soundInt].play();
                planetView__soundInt++;
                if (planetView__soundInt >= planetView__sound.length) {
                    planetView__soundInt = 0;
                }
            } else {
                systemView__sound[systemView__soundInt].play();
                systemView__soundInt++;
                if (systemView__soundInt >= systemView__sound.length) {
                    systemView__soundInt = 0;
                }
            }
        }
        about__button.style.cssText = '';
        about.style.display = "none";
        optionsInterval = setInterval(optionsCog, 30);
        about__button.style.opacity = 1;
    } else if (options.style.display == "none") {
        if (!thingMuted) {
            options__sound[options__soundInt].play();
            options__soundInt++;
            if (options__soundInt >= options__sound.length) {
                options__soundInt = 0;
            }
        }
        options.style.display = "flex";
        optionsInterval = setInterval(optionsCog, 30);
        ga('set', {
                    'userId': USER_ID,
                    'dimension1': shipName,
                    'dimension2': USER_ID,
                    'metric15': 1
                  });
        ga('send', 'pageview');
        ga('set', {
                    'metric15': 0
                  });
    } else {
        options.style.display = "none";
        optionsInterval = setInterval(optionsCog, 30);
        if (!thingMuted) {
            if (oCanvas.style.display == 'block') {
                planetView__sound[planetView__soundInt].play();
                planetView__soundInt++;
                if (planetView__soundInt >= planetView__sound.length) {
                    planetView__soundInt = 0;
                }
            } else {
                systemView__sound[systemView__soundInt].play();
                systemView__soundInt++;
                if (systemView__soundInt >= systemView__sound.length) {
                    systemView__soundInt = 0;
                }
            }
        }
    }
}

function optionsCog() {
    optctx.clearRect(0, 0, options__button.width, options__button.height);

    var newSize;
    var newPos;

    if (options.style.display == "flex" || about.style.display == "flex") {
        //to X
        newSize = easeInOutExpo(optionsTime, optionsImg.cogMaxSize, -optionsImg.cogMaxSize, optionsTimer);
        newPos = easeInOutExpo(optionsTime, 0, options__button.width/2, optionsTimer);
    } else  {
        //to cog
        newSize = easeInOutExpo(optionsTime, 0, optionsImg.cogMaxSize, optionsTimer);
        newPos = easeInOutExpo(optionsTime, options__button.width/2, -options__button.width/2, optionsTimer);
    }
    optionsImg.cogPos = newPos;
    optionsImg.cogSize = newSize;
    optctx.drawImage(optionsImg.close, 0, 0, 20, 20);
    optctx.drawImage(optionsImg.cog, optionsImg.cogPos, optionsImg.cogPos, optionsImg.cogSize, optionsImg.cogSize);

    optionsTime++;
    if (optionsTime >= optionsTimer) {
        clearInterval(optionsInterval);
        optionsTime = 0;
    }

}

function autoSave(el) {
    if (!gotApproachEventHorizon) {
        if (el.id == "options__autosave--y") {
            thingAutoSave = true;
            switch (thingSaveFreq) {
                case "30s":
                    clearInterval(saveInter);
                    saveInter = setInterval(saveState, 30000);
                    break;
                case "60s":
                    clearInterval(saveInter);
                    saveInter = setInterval(saveState, 60000);
                    break;
                case "5m":
                    clearInterval(saveInter);
                    saveInter = setInterval(saveState, 300000);
                    break;
                case "30m":
                    clearInterval(saveInter);
                    saveInter = setInterval(saveState, 1800000);
                    break;
            }
            console.log("autosave on");
        } else if (el.id == "options__autosave--n") {
            thingAutoSave = false;
            clearInterval(saveInter);
            console.log("autosave off");
        }
        options__autosaveY.classList.remove("options__toggle--selected");
        options__autosaveN.classList.remove("options__toggle--selected");
        el.classList.add("options__toggle--selected");
    }
}

function saveFreq(el) {
    if (!gotApproachEventHorizon) {
        switch (el.id) {
            case "options__savefreq--30s":
                thingSaveFreq = "30s";
                clearInterval(saveInter);
                saveInter = setInterval(saveState, 30000);
                console.log("save frequency 30s");
                break;
            case "options__savefreq--60s":
                thingSaveFreq = "60s";
                clearInterval(saveInter);
                saveInter = setInterval(saveState, 60000);
                console.log("save frequency 60s");
                break;
            case "options__savefreq--5m":
                thingSaveFreq = "5m";
                clearInterval(saveInter);
                saveInter = setInterval(saveState, 300000);
                console.log("save frequency 5m");
                break;
            case "options__savefreq--30m":
                thingSaveFreq = "30m";
                clearInterval(saveInter);
                saveInter = setInterval(saveState, 1800000);
                console.log("save frequency 30m");
                break;
        }
        options__savefreq30s.classList.remove("options__toggle--selected");
        options__savefreq60s.classList.remove("options__toggle--selected");
        options__savefreq5m.classList.remove("options__toggle--selected");
        options__savefreq30m.classList.remove("options__toggle--selected");
        el.classList.add("options__toggle--selected");
    }
}

function muteSound(el) {
    if (el.id == "options__sound--y") {
        thingMuted = false;
        console.log("sound on");
        if (globalVolume == 0) {
            globalVolume = 0.2;
            optionsSlider.value = globalVolume;
            adjustVolume();
        }
        for (var i = 0; i < soundArray.length; i++) {
            soundArray[i].volume = globalVolume;
        }
    } else if (el.id == "options__sound--n") {
        thingMuted = true;
        console.log("sound off");
        for (var i = 0; i < soundArray.length; i++) {
            soundArray[i].volume = 0;
        }
    }
    options__soundY.classList.remove("options__toggle--selected");
    options__soundN.classList.remove("options__toggle--selected");
    el.classList.add("options__toggle--selected");
}

function drawVis(el) {
    if (el.id == "options__drawvis--y") {
        thingdrawVis = true;
        console.log("draw vis");
    } else if (el.id == "options__drawvis--n") {
        thingdrawVis = false;
        console.log("don't draw vis");
    }
    options__drawvisY.classList.remove("options__toggle--selected");
    options__drawvisN.classList.remove("options__toggle--selected");
    el.classList.add("options__toggle--selected");
}

var optionsSlider = document.getElementById("options__volume");

optionsSlider.addEventListener('input', adjustVolume);

function adjustVolume() {
    globalVolume = optionsSlider.value;
    for (var i = 0; i < soundArray.length; i++) {
        soundArray[i].volume = globalVolume;
    }
    if (globalVolume > 0 && thingMuted) {
        thingMuted = false;
        console.log("sound on");
        options__soundY.classList.remove("options__toggle--selected");
        options__soundN.classList.remove("options__toggle--selected");
        options__soundY.classList.add("options__toggle--selected");
    } else if (globalVolume == 0) {
        thingMuted = true;
        console.log("sound off");
        options__soundY.classList.remove("options__toggle--selected");
        options__soundN.classList.remove("options__toggle--selected");
        options__soundN.classList.add("options__toggle--selected");
    }
}

for (var i = 0; i < soundArray.length; i++) {
    soundArray[i].volume = globalVolume;
}
optionsSlider.value = globalVolume;


var getGivers = function() {
    var xhr = createCORSRequest('GET', 'https://imraising.tv/api/v1/topDonors?apikey=px9TJFsizPkaRo87BIw1Bw')
    if (!xhr) {
        throw new Error('CORS not supported');
    }
    xhr.onload = function() {
        contList.innerHTML = "";
        var responseText = xhr.responseText;
        var data=xhr.responseText;
        var d = JSON.parse(data);
        // process the response.
        var n = 0;
        for (var i = 0; i < 3; i++) {

            var cont = document.createElement('div');
            cont.classList.add('cont__row');
            contList.appendChild(cont);
            var contName = document.createElement('div');
            contName.classList.add('cont__name');
            cont.appendChild(contName);
            var contDon = document.createElement('div');
            contDon.classList.add('cont__don');
            cont.appendChild(contDon);

            if (d[i] != undefined) {
                if (d[i].nickname == "Anonymous") {
                    n += 1;
                    contName.innerHTML = d[i+n].nickname;
                    contDon.innerHTML = "&#163;" + d[i+n].amount.total.toFixed(2);
                } else {
                    contName.innerHTML = d[i+n].nickname;
                    contDon.innerHTML = "&#163;" + d[i+n].amount.total.toFixed(2);
                }

            } else {
                contName.innerHTML = "*********";
                contDon.innerHTML = "&#163;0.00";
            }
        }
    };

    xhr.onerror = function() {
        console.log('There was an error!');
    };
    // xhr.setRequestHeader("Authorization", "Basic " + btoa("username:password"));
    xhr.send();
}





//http://www.w3schools.com/html/html5_webstorage.asp
var lastSavedSpan = document.getElementById("options__lastsaved");
var lastSavedDate;

var saveExists;

function saveState() {

    if (!gotApproachEventHorizon) {
        //save
        saveExists = true;
        localStorage.setItem("saveExists", saveExists);
        localStorage.setItem("shipName", shipName);

        //save date
        localStorage.setItem("prevAngle", prevAngle);

        var initY = initDate.getFullYear();
        var initM = initDate.getMonth();
        var initD = initDate.getDate();

        var n = initY;
        var z = z || '0';
        n = n + '';
        var initY = n.length >= 4 ? n : new Array(4 - n.length + 1).join(z) + n;
        var n = initM + 1;
        var z = z || '0';
        n = n + '';
        var initM = n.length >= 2 ? n : new Array(2 - n.length + 1).join(z) + n;
        var n = initD;
        var z = z || '0';
        n = n + '';
        var initD = n.length >= 2 ? n : new Array(2 - n.length + 1).join(z) + n;

        var tempInitDate= initY + "-" + initM + "-" + initD;

        localStorage.setItem("initDate", tempInitDate);
        var initY = realDate.getFullYear();
        var initM = realDate.getMonth();
        var initD = realDate.getDate();

        var n = initY;
        var z = z || '0';
        n = n + '';
        var initY = n.length >= 4 ? n : new Array(4 - n.length + 1).join(z) + n;
        var n = initM + 1;
        var z = z || '0';
        n = n + '';
        var initM = n.length >= 2 ? n : new Array(2 - n.length + 1).join(z) + n;
        var n = initD;
        var z = z || '0';
        n = n + '';
        var initD = n.length >= 2 ? n : new Array(2 - n.length + 1).join(z) + n;

        var tempRealDate= initY + "-" + initM + "-" + initD;
        localStorage.setItem("realDate", tempRealDate);

        localStorage.setItem("totalItemsBought", totalItemsBought);
        

        //save planet in planetary screen
        Object.keys(planetOne).forEach(function(key, index) {
            localStorage.setItem('planetOne_' + key, planetOne[key]);
        });
        //save user body
        Object.keys(userBody).forEach(function(key, index) {
            localStorage.setItem('userBody_' + key, userBody[key]);
        });
        var userBodyinArray = false;
        var userPodinArray = false;
        for (var pla = 0; pla < physicsBodies.length; pla++) {
            if (physicsBodies[pla].type == "ship") {
                userBodyinArray = true;
            }
            if (physicsBodies[pla].type == "pod") {
                userPodinArray = true;
            }
        }
        localStorage.setItem("userBodyinArray", userBodyinArray);
        //save user pod
        localStorage.setItem("userPodinArray", userPodinArray);
        if (gotLandship) {
            Object.keys(userPod).forEach(function(key, index) {
                localStorage.setItem('userPod_' + key, userPod[key]);
            });
        }

        //save other planets
        var sunCanvasPhysBods = [];
        var earthInArray = false;
        for (var pla = 0; pla < physicsBodies2.length; pla++) {
            sunCanvasPhysBods.push(physicsBodies2[pla].planetActualName);
            switch(physicsBodies2[pla].planetActualName) {
                case "sol":
                    Object.keys(physicsBodies2[pla]).forEach(function(key, index) {
                        localStorage.setItem('sol_' + key, physicsBodies2[pla][key]);
                    });
                    break;
                case "earth":
                    Object.keys(physicsBodies2[pla]).forEach(function(key, index) {
                        localStorage.setItem('earth_' + key, physicsBodies2[pla][key]);
                    });
                    earthInArray = true;
                    break;
                case "mercury":
                    Object.keys(physicsBodies2[pla]).forEach(function(key, index) {
                        localStorage.setItem('mercury_' + key, physicsBodies2[pla][key]);
                    });
                    break;
                case "venus":
                    Object.keys(physicsBodies2[pla]).forEach(function(key, index) {
                        localStorage.setItem('venus_' + key, physicsBodies2[pla][key]);
                    });
                    break;
                case "mars":
                    Object.keys(physicsBodies2[pla]).forEach(function(key, index) {
                        localStorage.setItem('mars_' + key, physicsBodies2[pla][key]);
                    });
                    break;
                case "jupiter":
                    Object.keys(physicsBodies2[pla]).forEach(function(key, index) {
                        localStorage.setItem('jupiter_' + key, physicsBodies2[pla][key]);
                    });
                    break;
                case "saturn":
                    Object.keys(physicsBodies2[pla]).forEach(function(key, index) {
                        localStorage.setItem('saturn_' + key, physicsBodies2[pla][key]);
                    });
                    break;
                case "uranus":
                    Object.keys(physicsBodies2[pla]).forEach(function(key, index) {
                        localStorage.setItem('uranus_' + key, physicsBodies2[pla][key]);
                    });
                    break;
                case "neptune":
                    Object.keys(physicsBodies2[pla]).forEach(function(key, index) {
                        localStorage.setItem('neptune_' + key, physicsBodies2[pla][key]);
                    });
                    break;
                case "pluto":
                    Object.keys(physicsBodies2[pla]).forEach(function(key, index) {
                        localStorage.setItem('pluto_' + key, physicsBodies2[pla][key]);
                    });
                    break;
            }
        }
        localStorage.setItem("sunCanvasPhysBods", sunCanvasPhysBods);
        if (!earthInArray) {
            Object.keys(sPlanetOne).forEach(function(key, index) {
                localStorage.setItem('sEarth_' + key, sPlanetOne[key]);
            });
        }

        //save power
        localStorage.setItem("power", power);
        localStorage.setItem("totalPowerProduced", totalPowerProduced);
        localStorage.setItem("powerLastTurn", powerLastTurn);


        //save kinetigen panels
        localStorage.setItem("panelCount", itemSolar.currentCount);


        //save available research
        var availableResearchSave = [];
        for (var i = 0; i < availableResearch.length; i++) {
            availableResearchSave.push(availableResearch[i].el.id);
        }
        localStorage.setItem("availableResearch", availableResearchSave);

        //save researched stuff
        var researchedStuffSave = [];
        for (var i = 0; i < researchedStuff.length; i++) {
            researchedStuffSave.push(researchedStuff[i].el.id);
        }
        localStorage.setItem("researchedStuff", researchedStuffSave);


        //save probes
        var probesSave = [];
        for (var pr = 0; pr < probes.length; pr++) {
            Object.keys(probes[pr]).forEach(function(key, index) {
                localStorage.setItem("probe" + pr + "_" + key, probes[pr][key]);
            });
            probesSave.push("probe" + pr);

        }
        localStorage.setItem("probesSave", probesSave);

        //save landed probes
        var landedProbesSave = [];
        for (var pr = 0; pr < landedProbes.length; pr++) {
            Object.keys(landedProbes[pr]).forEach(function(key, index) {
                localStorage.setItem("landedProbe" + pr + "_" + key, landedProbes[pr][key]);
            });
            landedProbesSave.push("landedProbe" + pr);

        }
        localStorage.setItem("landedProbesSave", landedProbesSave);


        //save spudniks
        var spudniksSave = [];
        for (var pr = 0; pr < spudniks.length; pr++) {
            Object.keys(spudniks[pr]).forEach(function(key, index) {
                localStorage.setItem("spudnik" + pr + "_" + key, spudniks[pr][key]);
            });
            spudniksSave.push("spudnik" + pr);

        }
        localStorage.setItem("spudniksSave", spudniksSave);

        //save potatoPlants
        var potatoPlantsSave = [];
        for (var pr = 0; pr < potatoPlants.length; pr++) {
            Object.keys(potatoPlants[pr]).forEach(function(key, index) {
                localStorage.setItem("potatoPlant" + pr + "_" + key, potatoPlants[pr][key]);
            });
            potatoPlantsSave.push("potatoPlant" + pr);

        }
        localStorage.setItem("potatoPlantsSave", potatoPlantsSave);

        //save landed potatoPlants
        var landedPotatoPlantsSave = [];
        for (var pr = 0; pr < landedPotatoPlants.length; pr++) {
            Object.keys(landedPotatoPlants[pr]).forEach(function(key, index) {
                localStorage.setItem("landedPotatoPlant" + pr + "_" + key, landedPotatoPlants[pr][key]);
            });
            landedPotatoPlantsSave.push("landedPotatoPlant" + pr);

        }
        localStorage.setItem("landedPotatoPlantsSave", landedPotatoPlantsSave);

        //save taterTowers
        var taterTowersSave = [];
        for (var pr = 0; pr < taterTowers.length; pr++) {
            Object.keys(taterTowers[pr]).forEach(function(key, index) {
                localStorage.setItem("taterTower" + pr + "_" + key, taterTowers[pr][key]);
            });
            taterTowersSave.push("taterTower" + pr);

        }
        localStorage.setItem("taterTowersSave", taterTowersSave);

        //save landed taterTowers
        var landedTaterTowersSave = [];
        for (var pr = 0; pr < landedTaterTowers.length; pr++) {
            Object.keys(landedTaterTowers[pr]).forEach(function(key, index) {
                localStorage.setItem("landedTaterTower" + pr + "_" + key, landedTaterTowers[pr][key]);
            });
            landedTaterTowersSave.push("landedTaterTower" + pr);

        }
        localStorage.setItem("landedTaterTowersSave", landedTaterTowersSave);

        //save spudguns
        var spudgunsSave = [];
        for (var pr = 0; pr < spudguns.length; pr++) {
            Object.keys(spudguns[pr]).forEach(function(key, index) {
                localStorage.setItem("spudgun" + pr + "_" + key, spudguns[pr][key]);
            });
            spudgunsSave.push("spudgun" + pr);

        }
        localStorage.setItem("spudgunsSave", spudgunsSave);

        //save launchers
        var launchersSave = [];
        for (var pr = 0; pr < launchers.length; pr++) {
            Object.keys(launchers[pr]).forEach(function(key, index) {
                localStorage.setItem("launcher" + pr + "_" + key, launchers[pr][key]);
            });
            launchersSave.push("launcher" + pr);

        }
        localStorage.setItem("launchersSave", launchersSave);


        //save locked items
        var lockedItemsSave = [];
        for (var i = 0; i < lockedItems.length; i++) {
            lockedItemsSave.push(lockedItems[i].el.id);
        }
        localStorage.setItem("lockedItems", lockedItemsSave);

        //save available items
        var availableItemsSave = [];
        var availableItemsCost = [];
        var availableItemsCount = [];
        for (var i = 0; i < availableItems.length; i++) {
            availableItemsSave.push(availableItems[i].el.id);
            availableItemsCost.push(availableItems[i].currentCost);
            availableItemsCount.push(availableItems[i].currentCount);
        }
        localStorage.setItem("availableItems", availableItemsSave);
        localStorage.setItem("availableItemsCost", availableItemsCost);
        localStorage.setItem("availableItemsCount", availableItemsCount);


        //save eventLog
        for (var el = 0; el < eventLogMessages.length; el++) {
            localStorage.setItem("eventLogMessages_" + el, eventLogMessages[el]);
        }

        //save queued logs
        localStorage.setItem("queuedLogs", queuedLogs.length);
        for (var q = 0; q < queuedLogs.length; q++) {
            localStorage.setItem("queuedLog_" + q, queuedLogs[q][0]);
            localStorage.setItem("queuedLogT_" + q, queuedLogs[q][1]);
        }

        //save information screen
        //<p> styles
        localStorage.setItem("status__gravSrc--disp", document.getElementById("status__gravSrc").style.display);
        localStorage.setItem("status__atmosphere--disp", document.getElementById("status__atmosphere").style.display);
        // localStorage.setItem("status__surface--disp", document.getElementById("status__surface").style.display);
        localStorage.setItem("status__inhabitantsBar--disp", document.getElementById("status__inhabitantsBar").style.display);
        localStorage.setItem("status__inhabitants--disp", document.getElementById("status__inhabitants").style.display);
        localStorage.setItem("status__sunMassBar--disp", document.getElementById("status__sunMassBar").style.display);
        localStorage.setItem("status__sunMass--disp", document.getElementById("status__sunMass").style.display);
        //<p> content
        localStorage.setItem("status__gravSrc--cont", document.getElementById("status__gravSrc").innerHTML);
        localStorage.setItem("status__atmosphere--cont", document.getElementById("status__atmosphere").innerHTML);
        // localStorage.setItem("status__surface--cont", document.getElementById("status__surface").innerHTML);
        localStorage.setItem("status__inhabitantsBar--cont", document.getElementById("status__inhabitantsBar").innerHTML);
        localStorage.setItem("status__inhabitants--cont", document.getElementById("status__inhabitants").innerHTML);
        localStorage.setItem("status__sunMassBar--cont", document.getElementById("status__sunMassBar").innerHTML);
        localStorage.setItem("status__sunMass--cont", document.getElementById("status__sunMass").innerHTML);
        //data
        localStorage.setItem("atmosphere__data", atmosphere__data);
        // localStorage.setItem("ground__data", ground__data);
        localStorage.setItem("inhabitants__data", inhabitants__data);
        localStorage.setItem("inhabitants__started", inhabitants__started);
        localStorage.setItem("inhabitants__discovered", inhabitants__discovered);

        //save sunMass/blackhole vars
        localStorage.setItem("blackHoleShrunk", blackHoleShrunk);
        localStorage.setItem("blackHoleMade", blackHoleMade);
        localStorage.setItem("solShrinkT", solShrinkT);
        localStorage.setItem("solShrinkB", solShrinkB);
        localStorage.setItem("solShrinkC", solShrinkC);
        localStorage.setItem("solShrinkD", solShrinkD);

        //save intro boot logs
        localStorage.setItem("tmBootLog", tmBootLog);
        localStorage.setItem("deBootLog", deBootLog);
        localStorage.setItem("inBootLog", inBootLog);
        localStorage.setItem("cpBootLog", cpBootLog);

        localStorage.setItem("hintDone", hintDone);

        //save random variables
        localStorage.setItem("planetOneRad", planetOneRad);
        localStorage.setItem("solStartRad", solStartRad);
        localStorage.setItem("totalSolarProduced", totalSolarProduced);
        localStorage.setItem("walkerSolarTracker", walkerSolarTracker);
        localStorage.setItem("landingStage", landingStage);
        localStorage.setItem("boughtSpudGuns", boughtSpudGuns);
        localStorage.setItem("boughtPotatoLaunchers", boughtPotatoLaunchers);
        localStorage.setItem("shipLanded", shipLanded);
        localStorage.setItem("storySaid", storySaid);
        localStorage.setItem("shipStatusSpan", shipStatusSpan.innerHTML);
        localStorage.setItem("planetBoostersNeedCreate", planetBoostersNeedCreate);
        localStorage.setItem("potatoPlantUnlock", potatoPlantUnlock);
        localStorage.setItem("taterTowerUnlock", taterTowerUnlock);
        localStorage.setItem("spudGunUnlock", spudGunUnlock);
        localStorage.setItem("potatoLauncherUnlock", potatoLauncherUnlock);
        localStorage.setItem("shipReleaseFailSafe", shipReleaseFailSafe);
        localStorage.setItem("shipLandFailSafe", shipLandFailSafe);

        //save person options
        localStorage.setItem("thingMuted", thingMuted);
        localStorage.setItem("thingAutoSave", thingAutoSave);
        localStorage.setItem("thingSaveFreq", thingSaveFreq);
        localStorage.setItem("thingdrawVis", thingdrawVis);
        localStorage.setItem("globalVolume", globalVolume);

        //save user id
        localStorage.setItem("user_id", usersID);

        lastSavedDate = new Date();
        lastSavedSpan.innerHTML = " on " + lastSavedDate.getFullYear() + "-" + lastSavedDate.getMonth() + "-" + lastSavedDate.getDate() + " at " + lastSavedDate.getHours() + ":" + lastSavedDate.getMinutes() + ":" + lastSavedDate.getSeconds();
        localStorage.setItem("lastSavedDate", lastSavedDate);
        console.log('saved at ' + lastSavedSpan.innerHTML);
    }
}
function deleteSave() {
    //delete
    saveExists = false;
    localStorage.clear();
    lastSavedSpan.innerHTML = " never";
    console.log("deleted");
}


//if a save exists, load it...
if (localStorage.getItem("saveExists") !== null) {
    if (localStorage.getItem("saveExists") == 'true') {
        if (localStorage.getItem("saveExists") == 'true') {
            console.log("Loading save...");
        }
        saveExists = localStorage.getItem("saveExists");

        //load ship name
        shipName = localStorage.getItem("shipName");
        shipNameSpan.value = shipName;
        // console.log("Ship name: " + shipName);

        //load date
        prevAngle = localStorage.getItem("prevAngle");
        initDate = new Date(localStorage.getItem("initDate"));
        realDate = new Date(localStorage.getItem("realDate"));

        totalItemsBought = localStorage.getItem("totalItemsBought");

        //prep then load physicsBodies
        physicsBodies = [];
        // load planetOne:
        var str = localStorage.getItem("planetOne_pos");
        var pos = str.split(',');
        pos[0] = parseFloat(pos[0]);
        pos[1] = parseFloat(pos[1]);
        var str = localStorage.getItem("planetOne_vel");
        var vel = str.split(',');
        vel[0] = parseFloat(vel[0]);
        vel[1] = parseFloat(vel[1]);
        planetOne = new PhysicsBody (
            localStorage.getItem("planetOne_type"),
            pos[0],
            pos[1],
            parseInt(localStorage.getItem("planetOne_radius")),
            vel[0],
            vel[1],
            parseInt(localStorage.getItem("planetOne_mass")),
            localStorage.getItem("planetOne_colour"),
            null
        );
        physicsBodies.push(planetOne);
        // load userBody:
        var str = localStorage.getItem("userBody_pos");
        var pos = str.split(',');
        pos[0] = parseFloat(pos[0]);
        pos[1] = parseFloat(pos[1]);
        var str = localStorage.getItem("userBody_vel");
        var vel = str.split(',');
        vel[0] = parseFloat(vel[0]);
        vel[1] = parseFloat(vel[1]);
        userBody = new PhysicsBody (
            localStorage.getItem("userBody_type"),
            pos[0],
            pos[1],
            parseInt(localStorage.getItem("userBody_radius")),
            vel[0],
            vel[1],
            parseInt(localStorage.getItem("userBody_mass")),
            localStorage.getItem("userBody_colour"),
            planetOne
        );
        if (localStorage.getItem("userBodyinArray") == "true") {
            physicsBodies.push(userBody);
        }

        //load other planets
        physicsBodies2 = [];
        var str = localStorage.getItem("sunCanvasPhysBods");
        var sunCanvasPhysBods = str.split(',');
        for (var pla = 0; pla < sunCanvasPhysBods.length; pla++) {
            switch (sunCanvasPhysBods[pla]) {
                case "sol":
                    var str = localStorage.getItem("sol_pos");
                    var pos = str.split(',');
                    pos[0] = parseFloat(pos[0]);
                    pos[1] = parseFloat(pos[1]);
                    var str = localStorage.getItem("sol_vel");
                    var vel = str.split(',');
                    vel[0] = parseFloat(vel[0]);
                    vel[1] = parseFloat(vel[1]);
                    sol = new PhysicsBody (
                        localStorage.getItem("sol_type"),
                        pos[0],
                        pos[1],
                        parseInt(localStorage.getItem("sol_radius")),
                        vel[0],
                        vel[1],
                        parseInt(localStorage.getItem("sol_mass")),
                        localStorage.getItem("sol_colour"),
                        null,
                        ",",
                        "sol"
                    );
                    break;
            }
        }
        var earthInArray = false;
        for (var pla = 0; pla < sunCanvasPhysBods.length; pla++) {
            switch (sunCanvasPhysBods[pla]) {
                case "sol":
                    physicsBodies2.push(sol);
                    break;
                case "earth":
                    var str = localStorage.getItem("earth_pos");
                    var pos = str.split(',');
                    pos[0] = parseFloat(pos[0]);
                    pos[1] = parseFloat(pos[1]);
                    var str = localStorage.getItem("earth_vel");
                    var vel = str.split(',');
                    vel[0] = parseFloat(vel[0]);
                    vel[1] = parseFloat(vel[1]);
                    sPlanetOne = new PhysicsBody (
                        localStorage.getItem("earth_type"),
                        pos[0],
                        pos[1],
                        parseInt(localStorage.getItem("earth_radius")),
                        vel[0],
                        vel[1],
                        parseInt(localStorage.getItem("earth_mass")),
                        localStorage.getItem("earth_colour"),
                        sol,
                        ",",
                        "earth"
                    );
                    physicsBodies2.push(sPlanetOne);
                    earthInArray = true;
                    break;
                case "mercury":
                    var str = localStorage.getItem("mercury_pos");
                    var pos = str.split(',');
                    pos[0] = parseFloat(pos[0]);
                    pos[1] = parseFloat(pos[1]);
                    var str = localStorage.getItem("mercury_vel");
                    var vel = str.split(',');
                    vel[0] = parseFloat(vel[0]);
                    vel[1] = parseFloat(vel[1]);
                    mercury = new PhysicsBody (
                        localStorage.getItem("mercury_type"),
                        pos[0],
                        pos[1],
                        parseInt(localStorage.getItem("mercury_radius")),
                        vel[0],
                        vel[1],
                        parseInt(localStorage.getItem("mercury_mass")),
                        localStorage.getItem("mercury_colour"),
                        sol,
                        mercuryBlurb,
                        "mercury"
                    );
                    physicsBodies2.push(mercury);
                    break;
                case "venus":
                    var str = localStorage.getItem("venus_pos");
                    var pos = str.split(',');
                    pos[0] = parseFloat(pos[0]);
                    pos[1] = parseFloat(pos[1]);
                    var str = localStorage.getItem("venus_vel");
                    var vel = str.split(',');
                    vel[0] = parseFloat(vel[0]);
                    vel[1] = parseFloat(vel[1]);
                    venus = new PhysicsBody (
                        localStorage.getItem("venus_type"),
                        pos[0],
                        pos[1],
                        parseInt(localStorage.getItem("venus_radius")),
                        vel[0],
                        vel[1],
                        parseInt(localStorage.getItem("venus_mass")),
                        localStorage.getItem("venus_colour"),
                        sol,
                        venusBlurb,
                        "venus"
                    );
                    physicsBodies2.push(venus);
                    break;
                case "mars":
                    var str = localStorage.getItem("mars_pos");
                    var pos = str.split(',');
                    pos[0] = parseFloat(pos[0]);
                    pos[1] = parseFloat(pos[1]);
                    var str = localStorage.getItem("mars_vel");
                    var vel = str.split(',');
                    vel[0] = parseFloat(vel[0]);
                    vel[1] = parseFloat(vel[1]);
                    mars = new PhysicsBody (
                        localStorage.getItem("mars_type"),
                        pos[0],
                        pos[1],
                        parseInt(localStorage.getItem("mars_radius")),
                        vel[0],
                        vel[1],
                        parseInt(localStorage.getItem("mars_mass")),
                        localStorage.getItem("mars_colour"),
                        sol,
                        marsBlurb,
                        "mars"
                    );
                    physicsBodies2.push(mars);
                    break;
                case "jupiter":
                    var str = localStorage.getItem("jupiter_pos");
                    var pos = str.split(',');
                    pos[0] = parseFloat(pos[0]);
                    pos[1] = parseFloat(pos[1]);
                    var str = localStorage.getItem("jupiter_vel");
                    var vel = str.split(',');
                    vel[0] = parseFloat(vel[0]);
                    vel[1] = parseFloat(vel[1]);
                    jupiter = new PhysicsBody (
                        localStorage.getItem("jupiter_type"),
                        pos[0],
                        pos[1],
                        parseInt(localStorage.getItem("jupiter_radius")),
                        vel[0],
                        vel[1],
                        parseInt(localStorage.getItem("jupiter_mass")),
                        localStorage.getItem("jupiter_colour"),
                        sol,
                        jupiterBlurb,
                        "jupiter"
                    );
                    physicsBodies2.push(jupiter);
                    break;
                case "saturn":
                    var str = localStorage.getItem("saturn_pos");
                    var pos = str.split(',');
                    pos[0] = parseFloat(pos[0]);
                    pos[1] = parseFloat(pos[1]);
                    var str = localStorage.getItem("saturn_vel");
                    var vel = str.split(',');
                    vel[0] = parseFloat(vel[0]);
                    vel[1] = parseFloat(vel[1]);
                    saturn = new PhysicsBody (
                        localStorage.getItem("saturn_type"),
                        pos[0],
                        pos[1],
                        parseInt(localStorage.getItem("saturn_radius")),
                        vel[0],
                        vel[1],
                        parseInt(localStorage.getItem("saturn_mass")),
                        localStorage.getItem("saturn_colour"),
                        sol,
                        saturnBlurb,
                        "saturn"
                    );
                    physicsBodies2.push(saturn);
                    break;
                case "uranus":
                    var str = localStorage.getItem("uranus_pos");
                    var pos = str.split(',');
                    pos[0] = parseFloat(pos[0]);
                    pos[1] = parseFloat(pos[1]);
                    var str = localStorage.getItem("uranus_vel");
                    var vel = str.split(',');
                    vel[0] = parseFloat(vel[0]);
                    vel[1] = parseFloat(vel[1]);
                    uranus = new PhysicsBody (
                        localStorage.getItem("uranus_type"),
                        pos[0],
                        pos[1],
                        parseInt(localStorage.getItem("uranus_radius")),
                        vel[0],
                        vel[1],
                        parseInt(localStorage.getItem("uranus_mass")),
                        localStorage.getItem("uranus_colour"),
                        sol,
                        uranusBlurb,
                        "uranus"
                    );
                    physicsBodies2.push(uranus);
                    break;
                case "neptune":
                    var str = localStorage.getItem("neptune_pos");
                    var pos = str.split(',');
                    pos[0] = parseFloat(pos[0]);
                    pos[1] = parseFloat(pos[1]);
                    var str = localStorage.getItem("neptune_vel");
                    var vel = str.split(',');
                    vel[0] = parseFloat(vel[0]);
                    vel[1] = parseFloat(vel[1]);
                    neptune = new PhysicsBody (
                        localStorage.getItem("neptune_type"),
                        pos[0],
                        pos[1],
                        parseInt(localStorage.getItem("neptune_radius")),
                        vel[0],
                        vel[1],
                        parseInt(localStorage.getItem("neptune_mass")),
                        localStorage.getItem("neptune_colour"),
                        sol,
                        neptuneBlurb,
                        "neptune"
                    );
                    physicsBodies2.push(neptune);
                    break;
                case "pluto":
                    var str = localStorage.getItem("pluto_pos");
                    var pos = str.split(',');
                    pos[0] = parseFloat(pos[0]);
                    pos[1] = parseFloat(pos[1]);
                    var str = localStorage.getItem("pluto_vel");
                    var vel = str.split(',');
                    vel[0] = parseFloat(vel[0]);
                    vel[1] = parseFloat(vel[1]);
                    pluto = new PhysicsBody (
                        localStorage.getItem("pluto_type"),
                        pos[0],
                        pos[1],
                        parseInt(localStorage.getItem("pluto_radius")),
                        vel[0],
                        vel[1],
                        parseInt(localStorage.getItem("pluto_mass")),
                        localStorage.getItem("pluto_colour"),
                        sol,
                        plutoBlurb,
                        "pluto"
                    );
                    physicsBodies2.push(pluto);
                    break;
            }
        }

        if (!earthInArray) {
            var str = localStorage.getItem("sEarth_pos");
            var pos = str.split(',');
            pos[0] = parseFloat(pos[0]);
            pos[1] = parseFloat(pos[1]);
            var str = localStorage.getItem("sEarth_vel");
            var vel = str.split(',');
            vel[0] = parseFloat(vel[0]);
            vel[1] = parseFloat(vel[1]);
            sPlanetOne = new PhysicsBody (
                localStorage.getItem("sEarth_type"),
                pos[0],
                pos[1],
                parseInt(localStorage.getItem("sEarth_radius")),
                vel[0],
                vel[1],
                parseInt(localStorage.getItem("sEarth_mass")),
                localStorage.getItem("sEarth_colour"),
                sol,
                ",",
                "sEarth"
            );
        }

        //load power
        power = parseFloat(localStorage.getItem("power"));
        totalPowerProduced = parseFloat(localStorage.getItem("totalPowerProduced"));
        powerLastTurn = parseFloat(localStorage.getItem("powerLastTurn"));


        //load random variables
        planetOneRad = parseFloat(localStorage.getItem("planetOneRad"));
        solStartRad = parseFloat(localStorage.getItem("solStartRad"));
        totalSolarProduced = parseFloat(localStorage.getItem("totalSolarProduced"));
        walkerSolarTracker = parseFloat(localStorage.getItem("walkerSolarTracker"));
        landingStage = localStorage.getItem("landingStage");
        boughtSpudGuns = localStorage.getItem("boughtSpudGuns") == "true";
        boughtPotatoLaunchers = localStorage.getItem("boughtPotatoLaunchers") == "true";
        shipLanded = localStorage.getItem("shipLanded") == "true";
        storySaid = localStorage.getItem("storySaid") == "true";
        shipStatusSpan.innerHTML = localStorage.getItem("shipStatusSpan");
        planetBoostersNeedCreate = localStorage.getItem("planetBoostersNeedCreate") == "true";
        if (planetBoostersNeedCreate == true) {
            createResearch("planetBoosters");
            planetBoostersNeedCreate = false;
        }
        potatoPlantUnlock = localStorage.getItem("potatoPlantUnlock") == "true";
        taterTowerUnlock = localStorage.getItem("taterTowerUnlock") == "true";
        spudGunUnlock = localStorage.getItem("spudGunUnlock") == "true";
        potatoLauncherUnlock = localStorage.getItem("potatoLauncherUnlock") == "true";
        shipReleaseFailSafe = localStorage.getItem("shipReleaseFailSafe") == "true";
        shipLandFailSafe = localStorage.getItem("shipLandFailSafe") == "true";

        //prep available items for load
        var str = localStorage.getItem("availableItems");
        var availableItemsSave = [];
        availableItemsSave = str.split(',');

        var str = localStorage.getItem("availableItemsCost");
        var availableItemsCost = str.split(',');
        for (var li = 0; li < availableItemsCost.length; li++) {
            availableItemsCost[li] = parseInt(availableItemsCost[li]);
        }
        var str = localStorage.getItem("availableItemsCount");
        var availableItemsCount = str.split(',');
        for (var li = 0; li < availableItemsCount.length; li++) {
            availableItemsCount[li] = parseInt(availableItemsCount[li]);
        }

        //load available items
        for (var li = 0; li < availableItemsSave.length; li++) {
            switch(availableItemsSave[li]) {
              case "item__solar":
                  itemSolar = new ItemConstruct("item__solar", availableItemsCost[li], "Repair Solar Cell", "****** ***** ****", "power", solarPower, solarBlurb, true, availableItemsCount[li], solarSound, icon__solar);
                  itemSolar.reveal();
                  break;
              case "item__potato":
                  itemPotato = new ItemConstruct("item__potato", availableItemsCost[li], "Potato", "******", "power", potatoPower, potatoBlurb, true, availableItemsCount[li], potatoSound, icon__potato);
                  itemPotato.reveal();
                  break;
              case "item__probe":
                  itemProbe = new ItemConstruct("item__probe", availableItemsCost[li], "Probetato", "*********", "power", probePower, probeBlurb, true, availableItemsCount[li], probeSound, icon__probe);
                  itemProbe.reveal();
                  break;
              case "item__spudnik":
                  itemSpudnik = new ItemConstruct("item__spudnik", availableItemsCost[li], "Spudnik", "*******", "power", spudnikPower, spudnikBlurb, true, availableItemsCount[li], spudnikSound, icon__spudnik);
                  itemSpudnik.reveal();
                  break;
              case "item__potatoPlant":
                  var thisCondition = landedProbes.length > 0;
                  itemPotatoPlant = new ItemConstruct("item__potatoPlant", availableItemsCost[li], "Potato Plant", "****** *****", "power", potatoPlantPower, potatoPlantBlurb, thisCondition, availableItemsCount[li], potatoPlantSound, icon__potatoplant);
                  itemPotatoPlant.reveal();
                  if (!thisCondition) {
                      itemPotatoPlant.costLineSpan.innerHTML = "<span id='cost' style='display:none;'></span>" + "Requires landed probetato";
                  }
                  break;
              case "item__taterTower":
                  var thisCondition = false;
                  if (shipLanded == true) {
                      thisCondition = true;
                  }
                  itemTaterTower = new ItemConstruct("item__taterTower", availableItemsCost[li], "Tater Tower", "***** *****", "power", taterTowerPower, taterTowerBlurb, thisCondition, availableItemsCount[li], taterTowerSound, icon__tatertower);
                  itemTaterTower.reveal();
                  if (!thisCondition) {
                      itemTaterTower.costLineSpan.innerHTML = "<span id='cost' style='display:none;'></span>" + "Requires landed pod";
                  }
                  break;
              case "item__spudGun":
                  var thisCondition = false;
                  if (gotPlanetBoosters == true) {
                      thisCondition = true;
                  }
                  itemSpudGun = new ItemConstruct("item__spudGun", availableItemsCost[li], "Spud Gun", "**** ***", "power", spudGunPower, spudGunBlurb, thisCondition, availableItemsCount[li], spudGunSound, icon__spudgun);
                  itemSpudGun.reveal();
                  if (!thisCondition) {
                      itemSpudGun.costLineSpan.innerHTML = "<span id='cost' style='display:none;'></span>" + "Requires planet boosters";
                  }
                  break;
              case "item__potatoLauncher":
                  var thisCondition = false;
                  if (gotPlanetBoosters == true) {
                      thisCondition = true;
                  }
                  itemPotatoLauncher = new ItemConstruct("item__potatoLauncher", availableItemsCost[li], "Potato Launcher", "****** ********", "power", potatoLauncherPower, potatoLauncherBlurb, thisCondition, availableItemsCount[li], potatoLauncherSound, icon__potatolauncher);
                  itemPotatoLauncher.reveal();
                  if (!thisCondition) {
                      itemPotatoLauncher.costLineSpan.innerHTML = "<span id='cost' style='display:none;'></span>" + "Requires planet boosters";
                  }
                  break;
            }
        }

        //load locked items
        var str = localStorage.getItem("lockedItems");
        var lockedItemsSave = str.split(',');
        for (var li = 0; li < lockedItemsSave.length; li++) {
            switch(lockedItemsSave[li]) {
              case "item__solar":
                  itemSolar = new ItemConstruct("item__solar", solarCost, "Repair Solar Cell", "****** ***** ****", "power", solarPower, solarBlurb, true, 0, solarSound, icon__solar);
                  lockedItems.push(itemSolar);
                  break;
              case "item__potato":
                  itemPotato = new ItemConstruct("item__potato", potatoCost, "Potato", "******", "power", potatoPower, potatoBlurb, true, 0, potatoSound, icon__potato);
                  lockedItems.push(itemPotato);
                  break;
              case "item__probe":
                  itemProbe = new ItemConstruct("item__probe", probeCost, "Probetato", "*********", "power", probePower, probeBlurb, true, 0, probeSound, icon__probe);
                  lockedItems.push(itemProbe);
                  break;
              case "item__spudnik":
                  itemSpudnik = new ItemConstruct("item__spudnik", spudnikCost, "Spudnik", "*******", "power", spudnikPower, spudnikBlurb, true, 0, spudnikSound, icon__spudnik);
                  lockedItems.push(itemSpudnik);
                  break;
              case "item__potatoPlant":
                  var thisCondition = landedProbes.length > 0;
                  itemPotatoPlant = new ItemConstruct("item__potatoPlant", potatoPlantCost, "Potato Plant", "****** *****", "power", potatoPlantPower, potatoPlantBlurb, thisCondition, 0, potatoPlantSound, icon__potatoplant);
                  if (!thisCondition) {
                      itemPotatoPlant.costLineSpan.innerHTML = "<span id='cost' style='display:none;'></span>" + "Requires landed probetato";
                  }
                  lockedItems.push(itemPotatoPlant);
                  break;
              case "item__taterTower":
                  var thisCondition = false;
                  if (shipLanded == true) {
                      thisCondition = true;
                  }
                  itemTaterTower = new ItemConstruct("item__taterTower", taterTowerCost, "Tater Tower", "***** *****", "power", taterTowerPower, taterTowerBlurb, thisCondition, 0, taterTowerSound, icon__tatertower);
                  if (!thisCondition) {
                      itemTaterTower.costLineSpan.innerHTML = "<span id='cost' style='display:none;'></span>" + "Requires landed pod";
                  }
                  lockedItems.push(itemTaterTower);
                  break;
              case "item__spudGun":
                  var thisCondition = false;
                  if (gotPlanetBoosters == true) {
                      thisCondition = true;
                  }
                  itemSpudGun = new ItemConstruct("item__spudGun", spudGunCost, "Spud Gun", "**** ***", "power", spudGunPower, spudGunBlurb, thisCondition, 0, spudGunSound, icon__spudgun);
                  if (!thisCondition) {
                      itemSpudGun.costLineSpan.innerHTML = "<span id='cost' style='display:none;'></span>" + "Requires planet boosters";
                  }
                  lockedItems.push(itemSpudGun);
                  break;
              case "item__potatoLauncher":
                  var thisCondition = false;
                  if (gotPlanetBoosters == true) {
                      thisCondition = true;
                  }
                  itemPotatoLauncher = new ItemConstruct("item__potatoLauncher", potatoLauncherCost, "Potato Launcher", "****** ********", "power", potatoLauncherPower, potatoLauncherBlurb, thisCondition, 0, potatoLauncherSound, icon__potatolauncher);
                  if (!thisCondition) {
                      itemPotatoLauncher.costLineSpan.innerHTML = "<span id='cost' style='display:none;'></span>" + "Requires planet boosters";
                  }
                  lockedItems.push(itemPotatoLauncher);
                  break;
            }
        }


        //load solar panels
        for (var sola = 0; sola < localStorage.getItem("panelCount"); sola++) {
            kinetigenAddPanel();
        }

        //load available research
        var str = localStorage.getItem("availableResearch");
        var availableResearchSave = [];
        availableResearchSave = str.split(',');
        for (var re = 0; re < availableResearchSave.length; re++) {
            switch(availableResearchSave[re]) {
                case "cleanPanels":
                    createResearch("cleanPanels");
                    break;
                case "polishedPanels":
                    createResearch("polishedPanels");
                    break;
                case "goldenPanels":
                    createResearch("goldenPanels");
                    break;
                case "heatshields":
                    createResearch("heatshields");
                    break;
                case "parachutes":
                    createResearch("parachutes");
                    break;
                case "solarAmbience":
                    createResearch("solarAmbience");
                    break;
                case "hopperHeatshields":
                    createResearch("hopperHeatshields");
                    break;
                case "hopperLanding":
                    createResearch("hopperLanding");
                    break;
                case "landship":
                    createResearch("landship");
                    break;
                case "systView":
                    createResearch("systView");
                    break;
                case "planetBoosters":
                    createResearch("planetBoosters");
                    break;
                case "approachEventHorizon":
                    createResearch("approachEventHorizon");
                    break;
                case "kinetigen01":
                    createResearch("kinetigen01");
                    break;
                case "kinetigen02":
                    createResearch("kinetigen02");
                    break;
                case "kinetigen03":
                    createResearch("kinetigen03");
                    break;
                case "kinetigen04":
                    createResearch("kinetigen04");
                    break;
                case "potatoUpgrade":
                    createResearch("potatoUpgrade");
                    break;
                case "probetatoUpgrade":
                    createResearch("probetatoUpgrade");
                    break;
                case "spudnikUpgrade":
                    createResearch("spudnikUpgrade");
                    break;
                case "potatoPlantUpgrade":
                    createResearch("potatoPlantUpgrade");
                    break;
                case "taterTowerUpgrade":
                    createResearch("taterTowerUpgrade");
                    break;
                case "spudGunUpgrade":
                    createResearch("spudGunUpgrade");
                    break;
                case "potatoLauncherUpgrade":
                    createResearch("potatoLauncherUpgrade");
                    break;
                case "irishPride":
                    createResearch("irishPride");
                    break;
            }
        }

        //load researched items
        var str = localStorage.getItem("researchedStuff");
        var researchedStuffSave = [];
        researchedStuffSave = str.split(',');
        for (var re = 0; re < researchedStuffSave.length; re++) {
            switch(researchedStuffSave[re]) {
                case "cleanPanels":
                    createResearch("cleanPanels");
                    researchThing("cleanPanels", true);
                    break;
                case "polishedPanels":
                    createResearch("polishedPanels");
                    researchThing("polishedPanels", true);
                    break;
                case "goldenPanels":
                    createResearch("goldenPanels");
                    researchThing("goldenPanels", true);
                    break;
                case "heatshields":
                    createResearch("heatshields");
                    researchThing("heatshields", true);
                    break;
                case "parachutes":
                    createResearch("parachutes");
                    researchThing("parachutes", true);
                    break;
                case "solarAmbience":
                    createResearch("solarAmbience");
                    researchThing("solarAmbience", true);
                    break;
                case "hopperHeatshields":
                    createResearch("hopperHeatshields");
                    researchThing("hopperHeatshields", true);
                    break;
                case "hopperLanding":
                    createResearch("hopperLanding");
                    researchThing("hopperLanding", true);
                    break;
                case "landship":
                    createResearch("landship");
                    researchThing("landship", true);
                    break;
                case "systView":
                    createResearch("systView");
                    researchThing("systView", true);
                    break;
                case "planetBoosters":
                    createResearch("planetBoosters");
                    researchThing("planetBoosters", true);
                    break;
                case "approachEventHorizon":
                    createResearch("approachEventHorizon");
                    researchThing("approachEventHorizon", true);
                    break;
                case "kinetigen01":
                    createResearch("kinetigen01");
                    researchThing("kinetigen01", true);
                    break;
                case "kinetigen02":
                    createResearch("kinetigen02");
                    researchThing("kinetigen02", true);
                    break;
                case "kinetigen03":
                    createResearch("kinetigen03");
                    researchThing("kinetigen03", true);
                    break;
                case "kinetigen04":
                    createResearch("kinetigen04");
                    researchThing("kinetigen04", true);
                    break;
                case "potatoUpgrade":
                    createResearch("potatoUpgrade");
                    researchThing("potatoUpgrade", true);
                    break;
                case "probetatoUpgrade":
                    createResearch("probetatoUpgrade");
                    researchThing("probetatoUpgrade", true);
                    break;
                case "spudnikUpgrade":
                    createResearch("spudnikUpgrade");
                    researchThing("spudnikUpgrade", true);
                    break;
                case "potatoPlantUpgrade":
                    createResearch("potatoPlantUpgrade");
                    researchThing("potatoPlantUpgrade", true);
                    break;
                case "taterTowerUpgrade":
                    createResearch("taterTowerUpgrade");
                    researchThing("taterTowerUpgrade", true);
                    break;
                case "spudGunUpgrade":
                    createResearch("spudGunUpgrade");
                    researchThing("spudGunUpgrade", true);
                    break;
                case "potatoLauncherUpgrade":
                    createResearch("potatoLauncherUpgrade");
                    researchThing("potatoLauncherUpgrade", true);
                    break;
                case "irishPride":
                    createResearch("irishPride");
                    researchThing("irishPride", true);
                    break;
            }
        }

        //load user pod
        if (gotLandship) {
            var str = localStorage.getItem("userPod_pos");
            var pos = str.split(',');
            pos[0] = parseFloat(pos[0]);
            pos[1] = parseFloat(pos[1]);
            var str = localStorage.getItem("userPod_vel");
            var vel = str.split(',');
            vel[0] = parseFloat(vel[0]);
            vel[1] = parseFloat(vel[1]);
            userPod = new PhysicsBody (
                localStorage.getItem("userPod_type"),
                pos[0],
                pos[1],
                parseInt(localStorage.getItem("userPod_radius")),
                vel[0],
                vel[1],
                parseInt(localStorage.getItem("userPod_mass")),
                localStorage.getItem("userPod_colour"),
                planetOne
            );
            if (localStorage.getItem("userPodinArray") == "true") {
                physicsBodies.push(userPod);
            }
        }


        //load probes
        if (localStorage.getItem("probesSave") !== "") {
            var str = localStorage.getItem("probesSave");
            var probesSave = [];
            probesSave = str.split(',');
            for (var pr = 0; pr < probesSave.length; pr++) {
                var str = localStorage.getItem(probesSave[pr] + "_pos");
                var pos = str.split(',');
                pos[0] = parseFloat(pos[0]);
                pos[1] = parseFloat(pos[1]);
                var str = localStorage.getItem(probesSave[pr] + "_vel");
                var vel = str.split(',');
                vel[0] = parseFloat(vel[0]);
                vel[1] = parseFloat(vel[1]);
                var newProbe =  new PhysicsBody(
                    "probe",
                    pos[0],
                    pos[1],
                    1,
                    vel[0],
                    vel[1],
                    4,
                    localStorage.getItem(probesSave[pr] + "_colour"),
                    planetOne
                );
                newProbe.landingZone = localStorage.getItem(probesSave[pr] + "_landingZone");
                newProbe.terminalVelocity__set = localStorage.getItem(probesSave[pr] + "_terminalVelocity__set");
                probes.push(newProbe);
            }
        }
        //load landed probes
        if (localStorage.getItem("landedProbesSave") !== "") {
            var str = localStorage.getItem("landedProbesSave");
            var landedProbesSave = [];
            landedProbesSave = str.split(',');
            for (var pr = 0; pr < landedProbesSave.length; pr++) {
                var str = localStorage.getItem(landedProbesSave[pr] + "_pos");
                var pos = str.split(',');
                pos[0] = parseFloat(pos[0]);
                pos[1] = parseFloat(pos[1]);
                var str = localStorage.getItem(landedProbesSave[pr] + "_vel");
                var vel = str.split(',');
                vel[0] = parseFloat(vel[0]);
                vel[1] = parseFloat(vel[1]);
                var newProbe =  new PhysicsBody(
                    "probe",
                    pos[0],
                    pos[1],
                    1,
                    vel[0],
                    vel[1],
                    4,
                    localStorage.getItem(landedProbesSave[pr] + "_colour"),
                    planetOne
                );
                newProbe.landingZone = localStorage.getItem(landedProbesSave[pr] + "_landingZone");
                newProbe.terminalVelocity__set = localStorage.getItem(landedProbesSave[pr] + "_terminalVelocity__set");
                landedProbes.push(newProbe);
            }
        }

        //load spudniks
        if (localStorage.getItem("spudniksSave") !== "") {
            var str = localStorage.getItem("spudniksSave");
            var spudniksSave = [];
            spudniksSave = str.split(',');
            for (var pr = 0; pr < spudniksSave.length; pr++) {
                var str = localStorage.getItem(spudniksSave[pr] + "_pos");
                var pos = str.split(',');
                pos[0] = parseFloat(pos[0]);
                pos[1] = parseFloat(pos[1]);
                var str = localStorage.getItem(spudniksSave[pr] + "_vel");
                var vel = str.split(',');
                vel[0] = parseFloat(vel[0]);
                vel[1] = parseFloat(vel[1]);
                var newSpudnik =  new PhysicsBody(
                    "spudnik",
                    pos[0],
                    pos[1],
                    1,
                    vel[0],
                    vel[1],
                    4,
                    localStorage.getItem(spudniksSave[pr] + "_colour"),
                    planetOne
                );
                spudniks.push(newSpudnik);
            }
        }

        //load potatoPlants
        if (localStorage.getItem("potatoPlantsSave") !== "") {
            var str = localStorage.getItem("potatoPlantsSave");
            var potatoPlantsSave = [];
            potatoPlantsSave = str.split(',');
            for (var pr = 0; pr < potatoPlantsSave.length; pr++) {
                var str = localStorage.getItem(potatoPlantsSave[pr] + "_pos");
                var pos = str.split(',');
                pos[0] = parseFloat(pos[0]);
                pos[1] = parseFloat(pos[1]);
                var str = localStorage.getItem(potatoPlantsSave[pr] + "_vel");
                var vel = str.split(',');
                vel[0] = parseFloat(vel[0]);
                vel[1] = parseFloat(vel[1]);
                var newPotatoPlant =  new PhysicsBody(
                    "potatoPlant",
                    pos[0],
                    pos[1],
                    localStorage.getItem(potatoPlantsSave[pr] + "_radius"),
                    vel[0],
                    vel[1],
                    4,
                    localStorage.getItem(potatoPlantsSave[pr] + "_colour"),
                    planetOne
                );
                newPotatoPlant.landingZone = localStorage.getItem(potatoPlantsSave[pr] + "_landingZone");
                newPotatoPlant.terminalVelocity__set = localStorage.getItem(potatoPlantsSave[pr] + "_terminalVelocity__set");
                potatoPlants.push(newPotatoPlant);
            }
        }

        //load landed potatoPlants
        if (localStorage.getItem("landedPotatoPlantsSave") !== "") {
            var str = localStorage.getItem("landedPotatoPlantsSave");
            var landedPotatoPlantsSave = [];
            landedPotatoPlantsSave = str.split(',');
            for (var pr = 0; pr < landedPotatoPlantsSave.length; pr++) {
                var str = localStorage.getItem(landedPotatoPlantsSave[pr] + "_pos");
                var pos = str.split(',');
                pos[0] = parseFloat(pos[0]);
                pos[1] = parseFloat(pos[1]);
                var str = localStorage.getItem(landedPotatoPlantsSave[pr] + "_vel");
                var vel = str.split(',');
                vel[0] = parseFloat(vel[0]);
                vel[1] = parseFloat(vel[1]);
                var newPotatoPlant =  new PhysicsBody(
                    "potatoPlant",
                    pos[0],
                    pos[1],
                    localStorage.getItem(landedPotatoPlantsSave[pr] + "_radius"),
                    vel[0],
                    vel[1],
                    4,
                    localStorage.getItem(landedPotatoPlantsSave[pr] + "_colour"),
                    planetOne
                );
                newPotatoPlant.landingZone = localStorage.getItem(landedPotatoPlantsSave[pr] + "_landingZone");
                newPotatoPlant.terminalVelocity__set = localStorage.getItem(landedPotatoPlantsSave[pr] + "_terminalVelocity__set");
                landedPotatoPlants.push(newPotatoPlant);
            }
        }


        //load taterTowers
        if (localStorage.getItem("taterTowersSave") !== "") {
            var str = localStorage.getItem("taterTowersSave");
            var taterTowersSave = [];
            taterTowersSave = str.split(',');
            for (var pr = 0; pr < taterTowersSave.length; pr++) {
                var str = localStorage.getItem(taterTowersSave[pr] + "_pos");
                var pos = str.split(',');
                pos[0] = parseFloat(pos[0]);
                pos[1] = parseFloat(pos[1]);
                var str = localStorage.getItem(taterTowersSave[pr] + "_vel");
                var vel = str.split(',');
                vel[0] = parseFloat(vel[0]);
                vel[1] = parseFloat(vel[1]);
                var newTaterTower =  new PhysicsBody(
                    "tower",
                    pos[0],
                    pos[1],
                    localStorage.getItem(taterTowersSave[pr] + "_radius"),
                    vel[0],
                    vel[1],
                    4,
                    localStorage.getItem(taterTowersSave[pr] + "_colour"),
                    planetOne
                );
                taterTowers.push(newTaterTower);
            }
        }

        //load landed taterTowers
        if (localStorage.getItem("landedTaterTowersSave") !== "") {
            var str = localStorage.getItem("landedTaterTowersSave");
            var landedTaterTowersSave = [];
            landedTaterTowersSave = str.split(',');
            for (var pr = 0; pr < landedTaterTowersSave.length; pr++) {
                var str = localStorage.getItem(landedTaterTowersSave[pr] + "_pos");
                var pos = str.split(',');
                pos[0] = parseFloat(pos[0]);
                pos[1] = parseFloat(pos[1]);
                var str = localStorage.getItem(landedTaterTowersSave[pr] + "_vel");
                var vel = str.split(',');
                vel[0] = parseFloat(vel[0]);
                vel[1] = parseFloat(vel[1]);
                var newTaterTower =  new PhysicsBody(
                    "tower",
                    pos[0],
                    pos[1],
                    localStorage.getItem(landedTaterTowersSave[pr] + "_radius"),
                    vel[0],
                    vel[1],
                    4,
                    localStorage.getItem(landedTaterTowersSave[pr] + "_colour"),
                    planetOne
                );
                landedTaterTowers.push(newTaterTower);
            }
        }

        //load spudguns
        if (localStorage.getItem("spudgunsSave") !== "") {
            var str = localStorage.getItem("spudgunsSave");
            var spudgunsSave = [];
            spudgunsSave = str.split(',');
            for (var pr = 0; pr < spudgunsSave.length; pr++) {
                var str = localStorage.getItem(spudgunsSave[pr] + "_pos");
                var pos = str.split(',');
                pos[0] = parseFloat(pos[0]);
                pos[1] = parseFloat(pos[1]);
                var str = localStorage.getItem(spudgunsSave[pr] + "_vel");
                var vel = str.split(',');
                vel[0] = parseFloat(vel[0]);
                vel[1] = parseFloat(vel[1]);
                var newSpudgun =  new PhysicsBody(
                    "spudgun",
                    pos[0],
                    pos[1],
                    localStorage.getItem(spudgunsSave[pr] + "_radius"),
                    vel[0],
                    vel[1],
                    4,
                    localStorage.getItem(spudgunsSave[pr] + "_colour"),
                    planetOne
                );
                spudguns.push(newSpudgun);
            }
        }

        //load launchers
        if (localStorage.getItem("launchersSave") !== "") {
            var str = localStorage.getItem("launchersSave");
            var launchersSave = [];
            launchersSave = str.split(',');
            for (var pr = 0; pr < launchersSave.length; pr++) {
                var str = localStorage.getItem(launchersSave[pr] + "_pos");
                var pos = str.split(',');
                pos[0] = parseFloat(pos[0]);
                pos[1] = parseFloat(pos[1]);
                var str = localStorage.getItem(launchersSave[pr] + "_vel");
                var vel = str.split(',');
                vel[0] = parseFloat(vel[0]);
                vel[1] = parseFloat(vel[1]);
                var newLauncher =  new PhysicsBody(
                    "spudgun",
                    pos[0],
                    pos[1],
                    localStorage.getItem(launchersSave[pr] + "_radius"),
                    vel[0],
                    vel[1],
                    4,
                    localStorage.getItem(launchersSave[pr] + "_colour"),
                    planetOne
                );
                launchers.push(newLauncher);
            }
        }


        //load eventLog messages
        var elmes = 0;
        // console.log(localStorage.getItem("eventLogMessages_" + elmes));
        while (localStorage.getItem("eventLogMessages_" + elmes) != undefined) {
            pushLog(localStorage.getItem("eventLogMessages_" + elmes), true);
            elmes++;
        }

        //load queued logs
        var logsQueued = localStorage.getItem("queuedLogs");
        for (var q = 0; q < logsQueued; q++) {
            var thisLog = localStorage.getItem("queuedLog_" + q);
            var thisTimer = parseInt(localStorage.getItem("queuedLogT_" + q));
            queueLog(thisTimer, thisLog);
        }

        //load information screen
        //<p> styles
        document.getElementById("status__gravSrc").style.display = localStorage.getItem("status__gravSrc--disp");
        document.getElementById("status__atmosphere").style.display = localStorage.getItem("status__atmosphere--disp");
        // document.getElementById("status__surface").style.display = localStorage.getItem("status__surface--disp");
        document.getElementById("status__inhabitantsBar").style.display = localStorage.getItem("status__inhabitantsBar--disp");
        document.getElementById("status__inhabitants").style.display = localStorage.getItem("status__inhabitants--disp");
        document.getElementById("status__sunMassBar").style.display = localStorage.getItem("status__sunMassBar--disp");
        document.getElementById("status__sunMass").style.display = localStorage.getItem("status__sunMass--disp");
        //<p> cont
        document.getElementById("status__gravSrc").innerHTML = localStorage.getItem("status__gravSrc--cont");
        document.getElementById("status__atmosphere").innerHTML = localStorage.getItem("status__atmosphere--cont");
        // document.getElementById("status__surface").innerHTML = localStorage.getItem("status__surface--cont");
        document.getElementById("status__inhabitantsBar").innerHTML = localStorage.getItem("status__inhabitantsBar--cont");
        document.getElementById("status__inhabitants").innerHTML = localStorage.getItem("status__inhabitants--cont");
        document.getElementById("status__sunMassBar").innerHTML = localStorage.getItem("status__sunMassBar--cont");
        document.getElementById("status__sunMass").innerHTML = localStorage.getItem("status__sunMass--cont");
        //data
        atmosphere__data = parseInt(localStorage.getItem("atmosphere__data"));
        ground__data = parseInt(localStorage.getItem("ground__data"));
        inhabitants__data = parseInt(localStorage.getItem("inhabitants__data"));
        inhabitants__started = localStorage.getItem("inhabitants__started") == "true";
        inhabitants__discovered = localStorage.getItem("inhabitants__discovered") == "true";
        inhabitantsProgress.max = inhabitants__dataNeeded;
        inhabitantsProgress.value = inhabitants__data;

        //load sunMass/blackhole vars
        blackHoleShrunk = localStorage.getItem("blackHoleShrunk") == "true";
        blackHoleMade = localStorage.getItem("blackHoleMade") == "true";
        solShrinkT = parseInt(localStorage.getItem("solShrinkT"));
        solShrinkB = parseInt(localStorage.getItem("solShrinkB"));
        solShrinkC = parseInt(localStorage.getItem("solShrinkC"));
        solShrinkD = parseInt(localStorage.getItem("solShrinkD"));

        //load intro boot logs
        tmBootLog = localStorage.getItem("tmBootLog") == "true";
        deBootLog = localStorage.getItem("deBootLog") == "true";
        inBootLog = localStorage.getItem("inBootLog") == "true";
        cpBootLog = localStorage.getItem("cpBootLog") == "true";

        hintDone = localStorage.getItem("hintDone") == "true";

        if (shipReleaseFailSafe) {
            userPod = new PhysicsBody("pod", userBody.pos[0], userBody.pos[1], 3, userBody.vel[0]*0.6, userBody.vel[1]*0.6, 10, "#3060cf",    planetOne);
            physicsBodies.push(userPod);

            for (var i = 0; i < probeParticleCount; i++) {
                var probeParticleLife = getRandomInt(probeParticleLifeMin, probeParticleLifeMax);
                var particleVelX = getRandomInt(2, 4);
                var particleVelY = getRandomInt(2, 4);
                var newParticle = new PhysicsBody('particle', userBody.pos[0] + (userBody.radius/2), userBody.pos[1] + (userBody.radius/2), 1, userBody.vel[0]/particleVelX, userBody.vel[1]/particleVelY, 4, "rgba(255, 255, 255, 0.5)", planetOne);
                newParticle.life = probeParticleLife;
                orbitParticles.push(newParticle);

            }
            shipReleaseFailSafe = false;
        }

        if (shipLandFailSafe) {
            hitground = true;
            shipLandFailSafe = false;
        }


        //check item unlock conditions
        if (gotPlanetBoosters) {
            if (itemSpudGun != undefined) {
                itemSpudGun.conditions = true;
                itemSpudGun.costLineSpan.innerHTML = "<span id='cost'>" + numberWithCommas(itemSpudGun.currentCost) + "</span> power";
                itemSpudGun.costSpan = itemSpudGun.el.querySelector("#cost");
                itemSpudGun.el.addEventListener("click", buildItem);
            }
            if (itemPotatoLauncher != undefined) {
                itemPotatoLauncher.conditions = true;
                itemPotatoLauncher.costLineSpan.innerHTML = "<span id='cost'>" + numberWithCommas(itemPotatoLauncher.currentCost) + "</span> power";
                itemPotatoLauncher.costSpan = itemPotatoLauncher.el.querySelector("#cost");
                itemPotatoLauncher.el.addEventListener("click", buildItem);
            }
        }
        if (landedProbes.length > 0) {
            if (itemPotatoPlant != undefined) {
                itemPotatoPlant.conditions = true;
                itemPotatoPlant.costLineSpan.innerHTML = "<span id='cost'>" + numberWithCommas(itemPotatoPlant.currentCost) + "</span> power";
                itemPotatoPlant.costSpan = itemPotatoPlant.el.querySelector("#cost");
                itemPotatoPlant.el.addEventListener("click", buildItem);
            }
        }
        if (shipLanded) {
            if (itemTaterTower != undefined) {
                itemTaterTower.conditions = true;
                itemTaterTower.costLineSpan.innerHTML = "<span id='cost'>" + numberWithCommas(itemTaterTower.currentCost) + "</span> power";
                itemTaterTower.costSpan = itemTaterTower.el.querySelector("#cost");
                itemTaterTower.el.addEventListener("click", buildItem);
            }
        }



        //load person options
        thingdrawVis = localStorage.getItem("thingdrawVis");
        if (thingdrawVis == "true") {
            thingdrawVis = true;
            options__drawvisY.classList.add("options__toggle--selected");
        } else if (thingdrawVis == "false") {
            thingdrawVis = false;
            options__drawvisN.classList.add("options__toggle--selected");
        }

        thingSaveFreq = localStorage.getItem("thingSaveFreq");
        switch (thingSaveFreq) {
            case "30s":
                options__savefreq30s.classList.add("options__toggle--selected");
                break;
            case "60s":
                options__savefreq60s.classList.add("options__toggle--selected");
                break;
            case "5m":
                options__savefreq5m.classList.add("options__toggle--selected");
                break;
            case "30m":
                options__savefreq30m.classList.add("options__toggle--selected");
                break;
        }
        thingAutoSave = localStorage.getItem("thingAutoSave");

        if (thingAutoSave == "true") {
            thingAutoSave = true;
            options__autosaveY.classList.add("options__toggle--selected");
        } else if (thingAutoSave == "false") {
            thingAutoSave = false;
            options__autosaveN.classList.add("options__toggle--selected");
        }

        if (thingAutoSave == true) {
            switch (thingSaveFreq) {
                case "30s":
                    clearInterval(saveInter);
                    saveInter = setInterval(saveState, 30000);
                    break;
                case "60s":
                    clearInterval(saveInter);
                    saveInter = setInterval(saveState, 60000);
                    break;
                case "5m":
                    clearInterval(saveInter);
                    saveInter = setInterval(saveState, 300000);
                    break;
                case "30m":
                    clearInterval(saveInter);
                    saveInter = setInterval(saveState, 1800000);
                    break;
            }
        } else {
            clearInterval(saveInter);
        }

        globalVolume = parseFloat(localStorage.getItem("globalVolume"));
        optionsSlider.value = globalVolume;
        adjustVolume();

        thingMuted = localStorage.getItem("thingMuted");
        if (thingMuted == "true") {
            thingMuted = true;
            options__soundN.classList.add("options__toggle--selected");
        } else if (thingMuted == "false") {
            thingMuted = false;
            options__soundY.classList.add("options__toggle--selected");
        }


        USER_ID = localStorage.getItem("user_id");
        usersID = localStorage.getItem("user_id");



        var tempD = localStorage.getItem("lastSavedDate");
        lastSavedDate = new Date(tempD);
        lastSavedSpan.innerHTML =  " on " + lastSavedDate.getFullYear() + "-" + lastSavedDate.getMonth() + "-" + lastSavedDate.getDate() + " at " + lastSavedDate.getHours() + ":" + lastSavedDate.getMinutes() + ":" + lastSavedDate.getSeconds();


        //play intro
        var introPlayInt = totalPowerProduced;
        if (introPlayInt > totalNeeded) {
            introPlayInt = totalNeeded;
        }
        for (var i = 0; i < introPlayInt; i++) {

            switch (screentoActivate) {
                case "thingMaker":
                    tmAddStuff();
                    break;
                case "develop":
                    deAddStuff();
                    break;
                case "information":
                    inAddStuff();
                    break;
                case "center":
                    cpAddStuff();
                    break;
            }

        }

        console.log("save loaded");
    }

} else {

    //create user id
    var todaysDay = new Date();
    var todayY = todaysDay.getFullYear();
    var todayM = todaysDay.getMonth();
    var todayD = todaysDay.getDate();
    var todayH = todaysDay.getHours();
    var todayMi = todaysDay.getMinutes();
    var userStr = getRandomInt(0, 9).toString() +
                  getRandomInt(0, 9).toString() +
                  getRandomInt(0, 9).toString() +
                  getRandomInt(0, 9).toString() +
                  getRandomInt(0, 9).toString() +
                  getRandomInt(0, 9).toString() +
                  getRandomInt(0, 9).toString() +
                  getRandomInt(0, 9).toString() +
                  getRandomInt(0, 9).toString() +
                  getRandomInt(0, 9).toString();

    USER_ID = todayY.toString() +
              todayM.toString() +
              todayD.toString() +
              todayH.toString() +
              todayMi.toString() +
              "_" + userStr;

    usersID = todayY.toString() +
              todayM.toString() +
              todayD.toString() +
              todayH.toString() +
              todayMi.toString() +
              "_" + userStr;

    // console.log(USER_ID);

    ga('set', {
								'userId': USER_ID,
								'dimension1': shipName,
                'dimension2': USER_ID,
								'metric1': 1
							});
    ga('send', 'pageview');
    ga('set', {
                'metric1': 0
              });

    itemSolar = new ItemConstruct("item__solar", solarCost, "Repair Solar Cell", "****** ***** ****", "power", solarPower, solarBlurb, true, 0, solarSound, icon__solar);
    lockedItems.push(itemSolar);

    itemPotato = new ItemConstruct("item__potato", potatoCost, "Potato", "******", "power", potatoPower, potatoBlurb, true, 0, potatoSound, icon__potato);
    lockedItems.push(itemPotato);



    //load person options
    if (thingMuted == true) {
        options__soundN.classList.add("options__toggle--selected");
    } else if (thingMuted == false) {
        options__soundY.classList.add("options__toggle--selected");
    }

    if (thingdrawVis == true) {
        options__drawvisY.classList.add("options__toggle--selected");
    } else if (thingdrawVis == false) {
        options__drawvisN.classList.add("options__toggle--selected");
    }

    switch (thingSaveFreq) {
        case "30s":
            options__savefreq30s.classList.add("options__toggle--selected");
            break;
        case "60s":
            options__savefreq60s.classList.add("options__toggle--selected");
            break;
        case "5m":
            options__savefreq5m.classList.add("options__toggle--selected");
            break;
        case "30m":
            options__savefreq30m.classList.add("options__toggle--selected");
            break;
    }

    if (thingAutoSave == true) {
        options__autosaveY.classList.add("options__toggle--selected");
    } else if (thingAutoSave == "false") {
        options__autosaveN.classList.add("options__toggle--selected");
    }

    if (thingAutoSave == true) {
        switch (thingSaveFreq) {
            case "30s":
                clearInterval(saveInter);
                saveInter = setInterval(saveState, 30000);
                break;
            case "60s":
                clearInterval(saveInter);
                saveInter = setInterval(saveState, 60000);
                break;
            case "5m":
                clearInterval(saveInter);
                saveInter = setInterval(saveState, 300000);
                break;
            case "30m":
                clearInterval(saveInter);
                saveInter = setInterval(saveState, 1800000);
                break;
        }
    } else {
        clearInterval(saveInter);
    }

    //BOOT UP
    setTimeout(function(){
        queueLog(33, "Starting...");
        queueLog(66, "Loading 'Hopper Rad-Type' systems...");
        queueLog(33, "Done.");
        queueLog(66, "Loading idiolect...");
        queueLog(33, "Sorted.");
        queueLog(133, "Hello! Wakey wakey, let's get to work.<br/>Where are we? No idea.<br/>Systems are being difficult...")
        queueLog(133, "Power's all messed up too &mdash; sort it out?<br/>Use your kinetic generator button<br>&Leftarrow; over there &Leftarrow; ");
    }, 2000);

    // pushLog("Starting...");
    // window.setTimeout(function() {pushLog("Loading 'Hopper Rad-Type' systems...")}, 1000);
    // window.setTimeout(function() {pushLog("Done.")}, 3000);
    // window.setTimeout(function() {pushLog("Loading idiolect...")}, 4000);
    // window.setTimeout(function() {pushLog("Sorted.")}, 6000);
    // window.setTimeout(function() {pushLog("Power's all messed up. Sort it out.<br/>Use your kinetic generator button<br>&Leftarrow; over there &Leftarrow; ")}, 7000);

    createResearch("kinetigen01");


    //FOR TESTING
    // createResearch("systView");
    // createResearch("planetBoosters");
    // createResearch("approachEventHorizon");
    // createResearch("kinetigen01");
    // createResearch("kinetigen02");
    // createResearch("hopperHeatshields");

}




//ADDED:
// saveExists
// shipName
// prevAngle
// initDate
// realDate
// planetOne
// userBody (seperated from physicsBodies at some point?)
// physicsBodies
// userBody when not in physicsBodies
// physicsBodies2
// planetOne when not in physicsBodies2
// power = 0;
// available items
// locked items
// solar panel count & create
// available research
// researched research
// probes
// landed probes
// spudniks
// potatoPlants
// landed potatoPlants
// eventLog
// information screen
// probedrop breakthrough
// inhabitants breakthrough
// blackhole / sun grow state
// blackHoleMade
// blackHoleShrunk
// planetOneRad
// solStartRad
// total solar produced
// walker solar tracker
// landingStage;
// options




//TO ADD:

//userPod

// DO I NEED THESE?
// fired spuds & taters
// spuds & taters physBods
