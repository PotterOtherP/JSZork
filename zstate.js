class GameState {
    
    constructor()
    {
        // gameplay information
        this.turns = 0;
        this.darknessTurns = 0;
        this.playerInDarkness = false;
        this.lightActivated = false;
        this.matchCount = 5;
        this.playerInBoat = false;

        // player attributes
        this.playerCarryWeight = 0;
        this.playerDead = false;
        this.playerDeaths = 0;
        this.playerHitPoints = MAX_HIT_POINTS;
        this.playerLocation = Location.NULL_LOCATION;
        this.playerPreviousLocation = Location.NULL_LOCATION;
        this.playerScore = 0;
        this.playerScoreRank = "";
        this.playerStaggered = false;

        // player action
        this.playerAction = Action.NULL_ACTION;
        this.playerActionType = "";
        this.completePlayerInput = "";
        this.playerPreviousInput = "";
        this.actionPhrase = "";
        this.directObjectPhrase = "";
        this.indirectObjectPhrase = "";
        this.speakPhrase = "";
        this.directObject = null;
        this.previousDirectObject = null;
        this.indirectObject = null;
        this.multipleObjectList = new Map();
        this.ambiguousPhrase = "";

        // game events
        this.blueButtonPushed = false;
        this.bottleFilled = true;
        this.houseWindowOpened = false;
        this.carpetMoved = false;
        this.cyclopsGone = false;
        this.cyclopsShutsTrapDoor = true;
        this.damGatesOpen = false;
        this.damWaterHigh = true;
        this.damWaterLow = false;
        this.waterFalling = false;
        this.waterRising = false;
        this.damWaterStage = RESERVOIR_DRAIN_TURNS;
        this.floodStage = 0;
        this.gameWon = false;
        this.gratingOpened = false;
        this.gratingUnlocked = false;
        this.leafPileMoved = false;
        this.loudRoomSolved = false;
        this.mirrorBroken = false;
        this.potOfGoldAppeared = false;
        this.rainbowSolid = false;
        this.redButtonPushed = false;
        this.ropeRailTied = false;
        this.sandStage = 0;
        this.scarabFound = false;
        this.shaftBasketLowered = false;
        this.shaftBasketUsed = false;
        this.spiritCeremonyCount = 0;
        this.spiritsBellRung = false;
        this.spiritsCandlesLlit = false;
        this.spiritsBanished = false;
        this.thiefEggTurns = 0;
        this.thiefOpenedEgg = false;
        this.trapDoorOpen = false;
        this.winMessageDisplayed = false;
        this.yellowButtonPushed = false;


    }

    resetInput()
    {
        if (this.completePlayerInput !== "again" && this.completePlayerInput !== "g")
            this.playerPreviousInput = this.completePlayerInput;

        this.completePlayerInput = "";
        this.actionPhrase = "";
        this.directObjectPhrase = "";
        this.indirectObjectPhrase = "";
        this.speakPhrase = "";

        this.playerAction = Action.NULL_ACTION;
        this.playerActionType = ActionType.NULL_TYPE;

        if (this.directObject !== dummyObject)
        {
            this.previousDirectObject = this.directObject;
        }
        
        this.directObject = dummyObject;
        this.indirectObject = dummyObject;
        this.multipleObjectList.clear();
        this.ambiguousPhrase = "";
    }


    
}