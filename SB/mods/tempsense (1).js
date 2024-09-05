elements.temperature_detector = {
    color: "#ffff00", // Yellow color for the detector
    tick: function(pixel) {
        if (pixel.temp > 50) {
            // If the temperature of the pixel is greater than 50
            // Output electricity by changing its color to blue
            pixel.color = "#0000ff"; // Blue color for electricity
            // You can add additional logic here to trigger any specific action for electricity output
        } else {
            // Reset the color if the temperature is not greater than 50
            pixel.color = "#ffff00"; // Reset back to yellow
        }
    },
    category: "machines", // Category for organization
    insulate: false, // Set to false to indicate it does not insulate
    state: "solid", // State of the element
};
