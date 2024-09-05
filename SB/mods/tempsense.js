// Inside the tick function of your temperature_detector element
tick: function(pixel) {
    if (pixel.temp > 50) {
        // If the temperature of the pixel is greater than 50
        // Output electricity by changing its color to blue
        pixel.color = "#0000ff"; // Blue color for electricity
        
        // Iterate through neighboring pixels
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                // Check if the neighboring pixel is within bounds
                if (pixel.x + i >= 0 && pixel.x + i < width && pixel.y + j >= 0 && pixel.y + j < height) {
                    // Apply electricity to the neighboring pixel by changing its color
                    pixelMap[pixel.x + i][pixel.y + j].color = "#0000ff";
                    // You can add additional logic here to trigger any specific action for neighboring pixels
                }
            }
        }
        
        // You can add additional logic here to trigger any specific action for electricity output
    } else {
        // Reset the color if the temperature is not greater than 50
        pixel.color = "#ffff00"; // Reset back to yellow
    }
},
