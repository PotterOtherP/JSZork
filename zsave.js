function deleteInterface()
{
    let filename = document.getElementById("inputTextArea").value;

    let strName = filename + "_strings";
    let randName = filename + "_randoms";

    let check1 = localStorage.getItem(strName);
    let check2 = localStorage.getItem(randName);

    if (check1 !== null || check2 !== null)
    {
        deleteSaveFromLocalStorage(filename);
        output("File deleted.");
    }

    else
    {
        output("File \"" + filename + "\" not found.");
    }

    inputTextArea.value = "";

    inputTextArea.removeEventListener("change", deleteInterface);
    inputTextArea.addEventListener("change", getPlayerInput);
}

function deleteSaveFromLocalStorage(filename)
{
    let strName = filename + "_strings";
    let randName = filename + "_randoms";

    let check1 = localStorage.getItem(strName);
    let check2 = localStorage.getItem(randName);

    if (check1 !== null || check2 !== null)
    {
        console.log("File deleted.");

        localStorage.removeItem(strName);
        localStorage.removeItem(randName);
    }

    else
    {
        console.log("File \"" + filename + "\" not found.");
    }

    inputTextArea.value = "";

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

    for (let room of worldMap.values())
    {
        room.firstVisit = true;
    }


    gameArea.innerText = "";
    previousInputArea.innerText = "";

    state.resetInput();
    updateEvents();
    updateScore();
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
    previousInputArea.innerText = "";

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

function saveAuto()
{
    let loc = state.playerLocation;
    let rm = worldMap.get(loc);

    if ( (loc === Location.CELLAR ||
        loc === Location.SQUEAKY_ROOM ||
        loc === Location.MAZE_15)
        && rm.firstVisit )
    {
        output("Autosaving...");
        console.log("Autosaving...");

        if (usingLocalStorage)
            saveToLocalStorage("autoSave");
        else
            saveToGameMemory("autoSave");
    }

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

    if (localStorage.getItem(strName) !== null || localStorage.getItem(randName) !== null)
    {
        // output("Overwriting file.");
        deleteSaveFromLocalStorage(filename);
    }

    localStorage.setItem(strName, stringLog);
    localStorage.setItem(randName, randomLog);

}

function saveUndo()
{
    if (usingLocalStorage)
            saveToLocalStorage("undoSave");
    else
        saveToGameMemory("undoSave");
}