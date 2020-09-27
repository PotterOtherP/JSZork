function deleteSaveFromLocalStorage(filename)
{
    let strName = filename + "_strings";
    let randName = filename + "_randoms";

    localStorage.removeItem(strName);
    localStorage.removeItem(randName);

}


function restart()
{
    console.log("Restarting");

    state = Object.assign(state, startingState);
    state.playerLocation = Location.WEST_OF_HOUSE;


    for (let targetObj of objectList.values())
    {
        let sourceObj = startingObjectList.get(targetObj.name);
        targetObj = Object.assign(targetObj, sourceObj);
    }


    gameArea.innerText = "";

    state.resetInput();
    updateEvents();
    refreshInventories();
    fillCurrentObjectList();

    
    outputLocation(westOfHouse.name);
    outputTurns(state.turns);
    westOfHouse.lookAround();

}


function restoreInterface()
{
    console.log("Restore interface function");
    gameArea.innerText = "";

    let filename = document.getElementById("inputTextArea").value;

    if (usingLocalStorage)
        restoreFromLocalStorage(filename);

    else
        restoreFromGameMemory(filename);


    inputTextArea.value = "";

    inputTextArea.removeEventListener("change", restoreInterface);
    inputTextArea.addEventListener("change", getPlayerInput);

}


function restoreFromGameMemory(filename)
{
    if (!savedGames.has(filename))
    {
        output("Save file not found.");
        return;
    }

    console.log("Loading...");

    restart();
    gameArea.innerText = "";

    restoringGame = true;

    inputLog = savedGames.get(filename).strings.split("|");
    inputLog.pop();
    stringLog = "";
    randomLog = [];
    randomLog = Object.assign(randomLog, savedGames.get(filename).randoms);

    for (let statement of inputLog)
    {
        state.resetInput();
        state.completePlayerInput = statement;
        parsePlayerInput();
    }

    randomLog = Object.assign(randomLog, savedGames.get(filename).randoms);

    restoringGame = false;
    console.clear();

    output("Game restored.\n");

    state.resetInput();
    updateEvents();
    refreshInventories();
    fillCurrentObjectList();

    let curRoom = worldMap.get(state.playerLocation);
    outputLocation(curRoom.name);
    outputTurns(state.turns);
    curRoom.lookAround();

}


function restoreFromLocalStorage(filename)
{
    let strName = filename + "_strings";
    let randName = filename + "_randoms";


    if (localStorage.getItem(strName) == null || localStorage.getItem(randName) == null)
    {
        output("Save file not found.");
        return;
    }

    inputLog = localStorage.getItem(strName).split("|");
    let tempRandomLog = localStorage.getItem(randName).split(",");


    restart();
    gameArea.innerText = "";

    restoringGame = true;

    for (let i = 0; i < tempRandomLog.length; ++i)
    {
        tempRandomLog[i] = parseInt(tempRandomLog[i], 10);
    }

    inputLog.pop();
    stringLog = "";
    randomLog = [];
    randomLog = Object.assign(randomLog, tempRandomLog);

    for (let statement of inputLog)
    {
        state.resetInput();
        state.completePlayerInput = statement;
        parsePlayerInput();
    }

    randomLog = Object.assign(randomLog, tempRandomLog);

    restoringGame = false;
    //console.clear();

    output("Game restored.\n");

    state.resetInput();
    updateEvents();
    refreshInventories();
    fillCurrentObjectList();

    let curRoom = worldMap.get(state.playerLocation);
    outputLocation(curRoom.name);
    outputTurns(state.turns);
    curRoom.lookAround();

}


function saveInterface()
{
    console.log("Save interface function");
    gameArea.innerText = "";

    let filename = document.getElementById("inputTextArea").value;

    if (filename === "undoSave" ||
        filename === "autoSave" ||
        filename === "autoSave1" ||
        filename === "autoSave2" ||
        filename === "autoSave3" ||
        filename === "startSave")
    {
        output("Filename reserved by system, choose something else.");
    }

    else
    {
        if (usingLocalStorage)
            saveToLocalStorage(filename);
        else
            saveToGameMemory(filename);

        output("Game saved as \"" + filename + "\".");
    }
    

    inputTextArea.value = "";

    inputTextArea.removeEventListener("change", saveInterface);
    inputTextArea.addEventListener("change", getPlayerInput);

}


function saveToGameMemory(filename)
{
    console.log("Saving...");

    if (savedGames.has(filename))
    {
        savedGames.delete(filename);
    }

    let savedGame = {strings: stringLog, randoms: randomLog };
    savedGames.set(filename, savedGame);

    return true;

}


function saveToLocalStorage(filename)
{
    let strName = filename + "_strings";
    let randName = filename + "_randoms";

    if (localStorage.getItem(strName) != null || localStorage.getItem(randName) != null)
    {
        deleteSaveFromLocalStorage(filename);
    }

    localStorage.setItem(strName, stringLog);
    localStorage.setItem(randName, randomLog);

}