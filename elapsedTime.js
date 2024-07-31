function calculateStageAccountActivationElapsedTime(stageAccActivationStartTime, stageAccActivationEndTime) {
    // Parse the stageAccActivationStartTime and stageAccActivationEndTime into Date objects
    var startTime = new Date(stageAccActivationStartTime);
    var endTime = new Date(stageAccActivationEndTime);

    // Calculate the difference in milliseconds
    var diffInMilliseconds = endTime - startTime;

    // Ensure the difference is not negative
    if (diffInMilliseconds < 0) {
        throw new Error("stageAccActivationEndTime is before stageAccActivationStartTime. Cannot calculate the difference.");
    }

    // Convert the difference into hours, minutes, and seconds
    var diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    var diffInMinutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    var diffInSeconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

    // Format the output in hh:mm:ss format
    var formattedTime =
        (diffInHours < 10 ? '0' : '') + diffInHours + ':' +
        (diffInMinutes < 10 ? '0' : '') + diffInMinutes + ':' +
        (diffInSeconds < 10 ? '0' : '') + diffInSeconds;

    return formattedTime;
}

// Example usage: Replace these variables with your actual stageAccActivationStartTime and stageAccActivationEndTime
var stageAccActivationStartTime = execution.getVariable('stageAccActivationStartTime');
var stageAccActivationEndTime = execution.getVariable('stageAccActivationEndTime');

try {
    var stageAccActivationElapsedTime = calculateStageAccountActivationElapsedTime(stageAccActivationStartTime, stageAccActivationEndTime);
    execution.setVariable('stageAccActivationElapsedTime', stageAccActivationElapsedTime);
} catch (error) {
    // Set a process variable to indicate the error
    execution.setVariable('stageAccActivationElapsedTimeError', error.message);
    // Optionally, set a default value for the elapsed time
    execution.setVariable('stageAccActivationElapsedTime', '00:00:00');
}