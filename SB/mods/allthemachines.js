var modsToAdd = [
    "mods/clone_liquid.js",
    "mods/combustion.js",
    "mods/conveyance.js",
    "mods/ExtraMachines.js",
    "mods/fine_tuned_cloner.js",
    "mods/flipflop.js",
    "mods/gameOfLife.js",
    "mods/logicgates.js",
    "mods/note_block.js",
    "mods/nousersthings.js",
    "mods/portal.js",
    "mods/pushers.js",
    "mods/spouts.js",
    "mods/state_voids.js",
    "mods/switches.js",
    "mods/ticking_temp_stuff.js",
    "mods/video.js",
    "mods/waterspout.js",
    "mods/Whispering Theory.js",
    "mods/MixerMachine.js"
];


var modsAdded = 0;

modsToAdd.forEach(function(modNameToAdd) {
    if (!enabledMods.includes(modNameToAdd)) {
        enabledMods.push(modNameToAdd);
        modsAdded++;
    }
});

if (modsAdded > 0) {
    localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
    alert(`${modsAdded} mod(s) have been automatically added (reload for this to take effect).`);
}


elements.conductive_wall = {
  color: "#aaaaaa",
  category: "machines",
  state: "solid",
  density: 1000,
  tempHigh: 1538,
  stateHigh: "molten_iron",
  tempLow: -200,
  stateLow: "ice",
  conduct: 1,
  
elements.electric_filter = {
  color: ["#000000", "#333333", "#666666", "#999999"],
  behavior: behaviors.WALL,
  category: "solids",
  state: "solid",
  tempHigh: 1538,
  stateHigh: "molten_iron",
  density: 2710,
  conduct: 0.99,
  reactions: {
    "electricity": {
      "elem1": "pass",
      "elem2": "none"
    }
  }
}