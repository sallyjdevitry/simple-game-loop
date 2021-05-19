let events = []
let elapsedTime = 0;
let lastTimestamp = 0;

function addEvent() {
    let eventName = document.getElementById('eventName').value;
    let eventInterval = document.getElementById('eventInterval').value;
    let eventTimes = document.getElementById('eventTimes').value;
    //clear the text inputs
    document.getElementById('eventName').value = '';
    document.getElementById('eventInterval').value = '';
    document.getElementById('eventTimes').value = '';
    events.push(
        {
            name: eventName,
            interval: eventInterval,
            times: eventTimes,
            timesComplete: 0,
            timeSinceLastUpdate: 0,
        }
    )
    let ogTime = performance.now()
    lastTimestamp = performance.now();
    gameLoop(ogTime)
}

function gameLoop(timestamp) {
    //update the elapsed time since the last time this function was called
    let elapsedTime = timestamp - lastTimestamp;
    eventsToRender = update(elapsedTime);
    render(eventsToRender);
    lastTimestamp = timestamp;
    requestAnimationFrame(gameLoop);
}

function update(elapsedTime) {
    // Update by collecting objects to be rendered.
    let eventsToRender = [];
    events.forEach((event) => {
        if (event.timesComplete < event.times) {
            if (event.timeSinceLastUpdate > event.interval) {
                event.timeSinceLastUpdate -= event.interval;
                event.timesComplete++;
                eventsToRender.push(event);
            }
            else {
                event.timeSinceLastUpdate += elapsedTime;
            }
        }
    })
    return eventsToRender;
}

function render(eventsToRender) {
    // any events that need reporting are displayed
    var eventsDiv = document.getElementById('liveEvents');
    eventsToRender.forEach((event) => {
        eventsDiv.innerHTML += "Event: " + event.name + " ( " + (event.times - event.timesComplete) + ' remaining).' + '<br></br>';
    })
    eventsDiv.scrollTop = eventsDiv.scrollHeight;
}