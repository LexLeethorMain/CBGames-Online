// This is how to add a new mod to the game.

// Create a new Javascript file like this one.
// Add the file to the mods folder on GitHub, or host it somewhere else.
// https://github.com/R74nCom/sandboxels/tree/main/mods

// To add it in the Mod Loader:
// If it is in the mods folder, you can just use the name of the file.
// If it is hosted somewhere else, you can use the full URL, including the HTTPS://.

// Adding elements:
elements.TempSensor = {
    color: "#ffff00", // Yellow color for the detector
    behavior: behaviors.POWDER,
    tick: function(pixel) {
        if (pixel.temp > 50) {
        
            pixel.color = "#0000ff"; // Blue color for electricity
              pixel.charge = 5;
        } else {
        
            pixel.color = "#ffff00"; // Reset back to yellow
        }
    },
       conduct: 1,
       movable: false,
    category: "machines", // Category for organization
    insulate: false, // Set to false to indicate it does not insulate
    state: "solid", // State of the element
};

// Run after all mods are loaded, for cross-mod compatibility
runAfterLoad(function() {
    // Your code here
    console.log("Temperature Detector mod loaded!");
});
