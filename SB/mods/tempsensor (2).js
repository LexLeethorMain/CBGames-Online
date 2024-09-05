elements.TempSensor = {
    color: "#ffff00",
    behavior: behaviors.POWDER,
    tick: function(pixel) {
        if (pixel.temp > 50) {
            pixel.color = "#0000ff";
            pixel.charge = 5;
        } else {
            pixel.color = "#ffff00";
        }
    },
    conduct: 1,
    movable: false,
    category: "machines",
    insulate: false,
    state: "solid",
};
runAfterLoad(function() {
    console.log("Temperature Detector mod loaded!");
});
