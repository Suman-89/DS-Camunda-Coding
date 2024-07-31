function calculateStageAccountActivationSlaPerformance(stageAccActivationElapsedTime, stageAccActivationSla) {
    // Convert the stageAccActivationElapsedTime from hh:mm:ss to seconds
    var timeParts = stageAccActivationElapsedTime.split(':');
    var elapsedTimeInSeconds = parseInt(timeParts[0]) * 3600 + parseInt(timeParts[1]) * 60 + parseInt(timeParts[2]);
  
    // Convert the stageAccActivationSla from minutes to seconds
    var slaInSeconds = stageAccActivationSla * 60;
  
    // Calculate the percentage of elapsed time with respect to the SLA
    var elapsedTimePercentage = (elapsedTimeInSeconds / slaInSeconds) * 100;
  
    // Determine the SLA performance based on the elapsed time percentage
    var stageAccActivationSlaPerformance;
    if (elapsedTimePercentage <= 50) {
      stageAccActivationSlaPerformance = 'Outstanding';
    } else if (elapsedTimePercentage <= 80) {
      stageAccActivationSlaPerformance = 'Excellent';
    } else if (elapsedTimePercentage <= 100) {
      stageAccActivationSlaPerformance = 'As Expected';
    } else {
      stageAccActivationSlaPerformance = 'Breached';
    }
  
    return stageAccActivationSlaPerformance;
  }
  
  // Example usage: Replace these variables with your actual stageAccActivationElapsedTime and stageAccActivationSla
  var stageAccActivationElapsedTime = execution.getVariable('stageAccActivationElapsedTime'); // e.g., '00:04:30'
  var stageAccActivationSla = 5; // e.g., 5 minutes
  
  try {
    var stageAccActivationSlaPerformance = calculateStageAccountActivationSlaPerformance(stageAccActivationElapsedTime, stageAccActivationSla);
    execution.setVariable('stageAccActivationSlaPerformance', stageAccActivationSlaPerformance);
  } catch (error) {
    // Set a process variable to indicate the error
    execution.setVariable('stageAccActivationSlaPerformanceError', error.message);
    // Optionally, set a default value for the SLA performance
    execution.setVariable('stageAccActivationSlaPerformance', 'Error');
  }