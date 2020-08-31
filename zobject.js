class GameObject {

    noEffect1 = " doesn't seem to work.";
    noEffect2 = " has no effect.";
    noEffect3 = " isn't notably helpful.";
    
    constructor(name, loc)
    {
        this.name = name;
        this.location = loc;
        this.startLocation = loc;
        this.articleName = (this.vowelStart() ? "an " : "a ") + this.name;
        this.capArticleName = (this.vowelStart() ? "An " : "A ") + this.name;
        this.objectType = "";
        this.isWeapon = false;
        this.intangible = false;
        this.inventoryID = Location.NULL_INVENTORY;
        this.movedFromStart = false;

        this.inventory = new Set();
        this.altLocations = new Set();
        this.altNames = new Set();

        this.initialPresenceString = "";
        this.presenceString = "There is " + this.articleName + " here.";

        this.setStrings();
    }

    setStrings()
    {
        this.answerString = "It is hardly likely that the " + this.name + " is interested.";
        this.blowString = "You can't blow that out.";
        this.boardString = "You have a theory on how to board " + this.articleName + ", perhaps?";
        this.brushString = "If you wish, but heaven only knows why.";
        this.climbString = "You can't do that!";
        this.closeString = "You must tell me how to do that to " + this.articleName + ".";
        this.countString = "You have lost your mind.";
        this.crossString = "You can't cross that!";
        this.deflateString = "Come on, now!";
        this.drinkString = "I don't think that the " + this.name + " would agree with you.";
        this.eatString = "I don't think that the " + this.name + " would agree with you.";
        this.enterString = "You hit your head against the " + this.name + " as you attempt this feat.";
        this.examineString = "There's nothing special about the " + this.name + ".";
        this.extinguishString = "You can't turn that off.";
        this.followString = "You're nuts!";
        this.helloString = "It's a well known fact that only schizophrenics say \"Hello\" to " + this.articleName + ".";
        this.inflateString = "How can you inflate that?";
        this.knockString = "Why knock on " + this.articleName + "?";
        this.launchString = "How exactly do you imagine trying a launch " + this.articleName + "?";
        this.lightString = "You can't turn that on.";
        this.listenString = "The " + this.name + " makes no sound.";
        this.lookInString = "You can't look inside " + this.articleName + ".";
        this.lookOutString = "You can't look out of " + this.articleName + ".";
        this.lookUnderString = "There is nothing but dust there.";
        this.moveString = "Moving the " + this.name + " reveals nothing.";
        this.openString = "You must tell me how to do that to " + this.articleName + ".";
        this.pourString = "How were you planning to pour something which is not a liquid?";
        this.pullString = "";    // game treats this as "move"
        this.readString = "You can't read that!";
        this.removeString = "You can't read that!";
        this.repairString = "This has no effect.";
        this.ringString = "How, exactly, can you ring that?";
        this.searchString = "You find nothing unusual.";
        this.shakeString = "Shaken.";
        this.smellString = "It smells like " + this.articleName + ".";    
        this.takeString = "";
        this.talkString = "You can't talk to the " + this.name + "!";
        this.touchString = "";
        this.untieString = "The " + this.name + " cannot be tied, so it cannot be untied!";
        this.wakeString = "The " + this.name + " isn't sleeping.";
        this.wearString = "You can't wear the " + this.name + ".";
        this.windString = "You cannot wind up " + this.articleName + ".";

        // These strings are used for items in the player's inventory.
        this.enterItemString = "That would involve quite a contortion!";
        this.moveItemString = "You aren't an accomplished enough juggler.";

        // These strings have one of three endings randomly added.
        this.kickString = "Kicking the " + this.name;
        this.lowerString = "Playing in this way with the " + this.name;
        this.raiseString = "Playing in this way with the " + this.name;
        this.pushString = "Pushing the " + this.name;
        this.touchString = "Fiddling with the " + this.name;
        this.waveString = "Waving the " + this.name;

        // indirect action objects
        this.attackString = "I've known strange people, but fighting " + this.articleName + "?";
        this.breakString = "";
        this.burnString = "";
        this.cutString = "Strange concept, cutting the " + this.name + "...";
        this.digString = "";
        this.digStringInd = "Digging with " + this.articleName + " is silly.";
        this.fillString = "You may know how to do that, but I don't.";
        this.giveString = "";
        this.lockString = "";
        this.putString = "There's no good surface on the " + this.name + ".";
        this.throwString = "";
        this.tieString = "";
        this.turnString = "";
        this.unlockString = "It doesn't seem to work.";


        // Modifications

        switch (this.name)
        {
            case "small mailbox":
            case "house":
            {
                this.readString = "How does one read " + this.articleName + "?";
            } break;

            default:
            {

            } break;
        }
    }

    

    answer() { output(this.answerString); }
    attack() { output(this.attackString); }
    blow() { output(this.blowString); }
    board() { output(this.boardString); }
    brush() { output(this.brushString); }
    burn() { output(this.burnString); }
    breakObject()
    {
        if (state.indirectObject.isWeapon)
        {
            output("Nice try.");
        }

        else
        {
            output("Trying to destroy " + this.articleName + " with "
            + state.indirectObject.articleName + " is futile.");
        }
    }
    climb() { output(this.climbString); }
    close() { output(this.closeString); }
    count() { output(this.countString); }
    cross() { output(this.crossString); }    
    cut()
    {
        let word = "";
        let weapon = state.indirectObject.name;
        if (weapon == ("elvish sword")) word = "swordsmanship";
        else if (weapon == ("bloody axe")) word = "axesmanship";
        else if (weapon == ("stiletto")) word = "stilettosmanship";
        else word = "knifesmanship";

        switch(state.indirectObject.name)
        {
            case "elvish sword":
            case "nasty knife":
            case "rusty knife":
            case "stiletto":
            case "bloody axe":
            {

                switch (this.name)
                {
                    case "ancient map":
                    case "guidebook":
                    case "leaflet":
                    case "matchbook":
                    case "rope":
                    case "tan label":
                    case "ZORK owner's manual":
                    {
                        output("Your skillful " + word + " slices the " + this.name
                            + " into innumerable slivers which blow away.");

                        this.location = Location.NULL_LOCATION;
                    } break;

                    case "black book":
                    {
                        output(ObjectStrings.BLACK_BOOK_CUT);
                        state.playerDies();
                    } break;

                    case "brown sack":
                    {
                        if (!(inventory.length === 0))
                        {
                            output("The sack is cut open and its contents spill onto the floor.");
                            for (let g in this.inventory)
                                g.location = state.playerLocation;
                        }

                        else
                        {
                            output("The sack has been cut open and now rendered useless.");
                        }

                        this.location = Location.NULL_LOCATION;

                    } break;

                    case "magic boat":
                    {

                    } break;

                    case "painting":
                    {

                    } break;

                    default:
                    {
                        output("Strange concept, cutting the " + this.name + "...");
                    }
                }

            } break;

            default:
            {
                output("The \"cutting edge\" of " + state.indirectObject.articleName + " is hardly adequate.");
            } break;
        }
    }
    deflate() { output(this.deflateString); }
    dig()
    {
        if (state.indirectObject.name === "shovel")
        {
            output("You can't dig in that!");
        }
        else
        {
            output("Digging with " + state.indirectObject.articleName + " is silly.");
        }
    }
    drink() { output(this.drinkString); }
    drop() { output("You can't drop that."); }
    eat() { output(this.eatString); }
    enter()
    {
        if (state.directObject.name == ("magic boat"))
            this.board();
        else
        {
            if (this.isItem())
                output(this.enterItemString);
            else 
                output(this.enterString);
        }
    }
    examine() { output(this.examineString); }
    extinguish() { output(this.extinguishString); }   
    fill() { output(this.fillString); }
    follow() { output(this.followString); }  
    give()
    {
        output("You can't give " + state.indirectObject.articleName + " to "
            + state.directObject.articleName + "!");
    }
    greet() { output(this.helloString); }  
    inflate() { output(this.inflateString); }
    kick() { output(this.kickString + this.randPhrase()); }
    knock() { output(this.knockString); }
    launch() { output(this.launchString); }
    light() { output(this.lightString); }
    listen() { output(this.listenString); }
    lock() { output("You can't lock that."); }
    lookIn() { output(this.lookInString); }
    lookOut() { output(this.lookOutString); }
    lookUnder() { output(this.lookUnderString); }
    lower() { output(this.lowerString + this.randPhrase()); }
    move() { output(this.moveString); }
    moveItem() { output(this.moveItemString); }
    open() { output(this.openString); }
    pour() { output(this.pourString); }
    pull() { output(this.pullString); }
    push() { output(this.pushString + this.randPhrase()); }    
    put() { output(this.putString); }
    raise() { output(this.raiseString + this.randPhrase()); }
    read() { output(this.readString); }
    remove() { output(this.removeString); }
    repair() { output(this.repairString); }
    ring() { output(this.ringString); }
    search() { output(this.searchString); }
    shake() { output(this.shakeString); }
    smell() { output(this.smellString); }   
    take()
    {
        if (this.takeString === "")
            output(GameStrings.getSarcasticResponse());
        else
            output(this.takeString);
    }
    talk() { output(this.talkString); }   
    throwObject() { output(this.throwString); }
    tie() { output("You can't tie the " + state.indirectObject.name + " to that."); }
    touch() { output(this.touchString + this.randPhrase()); }
    turn() { output(this.turnString); }
    untie() { output(this.untieString); }
    wake() { output(this.wakeString); }
    wave() { output(this.waveString + this.randPhrase()); }
    wear() { output(this.wearString); }
    wind() { output(this.windString); }
    unlock() { output(this.unlockString); }


    getDescription()
    {
        if (this.initialPresenceString === "" || this.movedFromStart)
            output(this.presenceString);
        else
            output(this.initialPresenceString);

    }
    isActor() { return this.objectType === "ACTOR"; }
    isAlive() { return false; }
    isContainer() { return false; }
    isItem() { return this.objectType === "ITEM"; }
    isFeature() { return this.objectType === "FEATURE"; }
    isOpen() { return false; }
    isSurface() { return this.objectType === "SURFACE"; }

    outputInventory() {}

    playerHasObject() { return this.location === Location.PLAYER_INVENTORY; }
    randPhrase()
    {
        let i = Math.floor(Math.random() * 3);

        return this.noEffect[i];


    }
    tick() {}
    toString() { return this.name; }

    vowelStart()
    {
        let c = this.name.toLowerCase().charAt(0);

        switch (c)
        {
            case 'a':
            case 'e':
            case 'i':
            case 'o':
            case 'u':
            {
                return true;
                break;
            }

            default:
            {
                return false;
            }
        }
    }
}