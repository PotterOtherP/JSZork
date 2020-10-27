class Actor extends GameObject {

    constructor(name, loc)
    {
        super(name, loc);
        this.objectType = "ACTOR";

        this.alive = true;
        this.cyclopsAggro = false;
        this.cyclopsCycle = 0;
        this.cyclopsFirstTurn = true;
        this.cyclopsThirsty = false;
        this.disarmed = false;
        this.firstCombatTurn = true;
        this.hitPoints = MAX_ENEMY_HIT_POINTS;
        this.riverTurns = 0
        this.staggered = false;
        this.swordGlowLevel = 0;
        this.thiefAggro = false;
        this.thiefFirstTurn = true;
        this.thiefItemsHidden = false;
        this.unconscious = false;

        this.presenceString = "";

    }

    attack()
    {
        let weapon = state.indirectObject;

        switch (this.name)
        {
            case "cyclops":
            case "thief":
            case "troll":
            {
                if (weapon.name === "dummy_object")
                {
                    output("Trying to attack the " + this.name + " with your bare hands is suicidal.");
                    return;
                }

                if (!weapon.isWeapon || weapon.name === "sceptre")
                {
                    output("Attacking the " + this.name + " with " + weapon.articleName + " is suicide.");
                    return;
                }

                 // Should this just be when delivering a killing blow? No...
                if (weapon.name === "rusty knife")
                {
                    output(ObjectStrings.RUSTY_KNIFE_CURSE);
                    rustyKnife.location = Location.MAZE_5;
                    rustyKnife.movedFromStart = false;
                    playerDies();
                    return;
                }

                if (state.playerStaggered)
                {
                    output(GameStrings.COMBAT_STAGGERED);
                    state.playerStaggered = false;
                    return;
                }

                if (this.unconscious)
                {
                    output(GameStrings.COMBAT_FINISH_UNCONSCIOUS);
                    this.alive = false;
                }

                else if (this.disarmed)
                {
                    output(GameStrings.COMBAT_FINISH_DISARMED);
                    this.alive = false;
                }

                else
                {
                    if (this.name === "troll") this.trollCombat();
                    if (this.name === "thief") this.thiefCombat();
                    if (this.name === "cyclops") this.cyclopsCombat();
                }


            } break;

            default:
            {
                super.attack();
            } break;
        }

        if (this.hitPoints <= 0) this.alive = false;

        if (!this.alive)
        {
            if (this.name === "thief") this.thiefDies();
            if (this.name === "troll") this.trollDies();
        }
    }

    give()
    {
        switch (this.name)
        {
            case "cyclops":
            {
                switch (state.indirectObject.name)
                {
                    case "lunch":
                    {
                        output(ObjectStrings.CYCLOPS_LUNCH_1);
                        state.indirectObject.location = Location.NULL_LOCATION;
                        this.cyclopsThirsty = true;

                    } break;

                    case "glass bottle":
                    {
                        if (state.bottleFilled && this.cyclopsThirsty)
                        {
                            output(ObjectStrings.CYCLOPS_DRINK_2);
                            this.unconscious = true;
                            this.cyclopsThirsty = false;
                            state.bottleFilled = false;
                            state.indirectObject.location = state.playerLocation;
                            updateEvents();
                        }

                        else if (!this.cyclopsThirsty)
                            output(ObjectStrings.CYCLOPS_DRINK_1);

                        else
                            output(ObjectStrings.CYCLOPS_GIVE_REJECT_1);

                    } break;

                    default:
                    {
                        output(ObjectStrings.CYCLOPS_GIVE_REJECT_2);
                    } break;
                }
            } break;

            case "thief":
            {
                let it = state.indirectObject;
                it.location = Location.THIEF_INVENTORY;

                if (it.trophyCaseValue > 0)
                {
                    output(ObjectStrings.THIEF_GIVE_TREASURE);
                    this.staggered = true;
                }
                else
                    output(ObjectStrings.THIEF_GIVE_ITEM);


            } break;

            case "troll":
            {
                this.trollGive();
            } break;

            default:
            {
                super.give();
            } break;
        }
    }

    kick()
    {
        switch (this.name)
        {
            case "vampire bat":
            {
                output(ObjectStrings.BAT_CEILING);
            } break;

            default:
            {
                super.kick();
            } break;
        }
    }

    cyclopsCombat()
    {
        if (this.unconscious)
        {
            output(ObjectStrings.CYCLOPS_WAKE);
            this.unconscious = false;
            cyclops_treasure.setClosed();
            return;
        }

        this.cyclopsAggro = true;
        output(ObjectStrings.CYCLOPS_SHRUG);
    }

    cyclopsTurn()
    {
        if (!this.alive) return;

        if (state.playerLocation === Location.CELLAR &&
            state.playerPreviousLocation === Location.LIVING_ROOM &&
            state.cyclopsShutsTrapDoor)
        {
            cellar_livingroom.setClosed();
            state.trapDoorOpen = false;
        }

        if (state.playerLocation !== Location.CYCLOPS_ROOM)
        {
            this.cyclopsFirstTurn = true;
            this.presenceString = "";
            return;
        }

        if (this.cyclopsFirstTurn)
        {
            output(ObjectStrings.CYCLOPS_1);
            this.presenceString = ObjectStrings.CYCLOPS_2;
            this.cyclopsFirstTurn = false;
            this.cyclopsCycle = 0;
        }

        if (this.cyclopsThirsty)
        {
            output(ObjectStrings.CYCLOPS_LUNCH_2);
            ++this.cyclopsCycle;
            if (this.cyclopsCycle === CYCLOPS_CYCLE_MAX - 1)
            {
                output(ObjectStrings.CYCLOPS_WAIT_7);
                playerDies();
            }

        }

        else if (this.unconscious)
        {
            this.presenceString = ObjectStrings.CYCLOPS_SLEEP_1;

            cyclops_treasure.setOpen();

            let option = getRandom(5);
            if (option === 0 || option === 1) output(ObjectStrings.CYCLOPS_SLEEP_1);
            if (option === 2 || option === 3) output(ObjectStrings.CYCLOPS_SLEEP_2);
            if (option === 4)
            {
                output(ObjectStrings.CYCLOPS_WAKE);
                this.unconscious = false;
                cyclops_treasure.setClosed();
            }
        }

        else if (this.cyclopsAggro)
        {
            // Game.output("The cyclops smashes your stupid face.");

            let dieRoll = getRandom(100);

            if (0 <= dieRoll && dieRoll < 10)
            {
                let option = getRandom(2);
                if (option === 0) output(ObjectStrings.CYCLOPS_FIGHT_MISS_1);
                if (option === 1) output(ObjectStrings.CYCLOPS_FIGHT_MISS_2);
            }

            else if (10 <= dieRoll && dieRoll < 20)
            {
                let option = getRandom(2);
                if (option === 0) output(ObjectStrings.CYCLOPS_FIGHT_LIGHT_1);
                if (option === 1) output(ObjectStrings.CYCLOPS_FIGHT_LIGHT_2);
                state.playerHitPoints -= 3;
            }

            else if (20 <= dieRoll && dieRoll < 45)
            {
                let option = getRandom(2);
                if (option === 0) output(ObjectStrings.CYCLOPS_FIGHT_SEVERE_1);
                if (option === 1) output(ObjectStrings.CYCLOPS_FIGHT_SEVERE_2);
                state.playerHitPoints -= 9;
                state.playerStaggered = true;
            }

            else if (45 <= dieRoll && dieRoll < 65)
            {
                let option = getRandom(2);
                if (option === 0) output(ObjectStrings.CYCLOPS_FIGHT_STAGGER_1);
                if (option === 1) output(ObjectStrings.CYCLOPS_FIGHT_STAGGER_2);
                state.playerHitPoints -= 7;
                state.playerStaggered = true;
            }

            else if (65 <= dieRoll && dieRoll < 75)
            {
                let option = getRandom(2);
                if (option === 0) output(ObjectStrings.CYCLOPS_FIGHT_DISARM_1);
                if (option === 1)
                {
                    output(ObjectStrings.CYCLOPS_FIGHT_DISARM_2);
                    state.playerHitPoints -= 2;
                }

                state.indirectObject.location = state.playerLocation;
            }

            else if (75 <= dieRoll && dieRoll < 85)
            {
                output(ObjectStrings.CYCLOPS_FIGHT_KNOCKOUT);
                output(ObjectStrings.CYCLOPS_FIGHT_HESITATE);
                output(ObjectStrings.CYCLOPS_FIGHT_FINISH);
                playerDies();
            }

            else if (85 <= dieRoll && dieRoll < 100)
            {
                output(ObjectStrings.CYCLOPS_FIGHT_FATAL);
                playerDies();
            }
        }

        else
        {
            let saltAndPepper = [ "", ObjectStrings.CYCLOPS_WAIT_1, ObjectStrings.CYCLOPS_WAIT_2,
                ObjectStrings.CYCLOPS_WAIT_3, ObjectStrings.CYCLOPS_WAIT_4, ObjectStrings.CYCLOPS_WAIT_5, 
                ObjectStrings.CYCLOPS_WAIT_6, ObjectStrings.CYCLOPS_WAIT_7 ];

            if (this.cyclopsCycle > 0)
            {
                output(saltAndPepper[this.cyclopsCycle]);
            }

            if (this.cyclopsCycle == 7)
                playerDies();

            ++this.cyclopsCycle;
            this.cyclopsCycle %= CYCLOPS_CYCLE_MAX;
        }
    }

    damFlowTurn()
    {
        // Water is falling
        if (state.damGatesOpen && state.damWaterHigh && state.damWaterStage > 0)
        {
            --state.damWaterStage;
            state.waterFalling = true;
            state.waterRising = false;
            reservoirNorth.description = MapStrings.DESC_RESERVOIR_NORTH_FALLING;
            reservoirSouth.description = MapStrings.DESC_RESERVOIR_SOUTH_FALLING;

            // console.log("Dam water stage is " + state.damWaterStage);

            // Water finishes falling
            if (state.damWaterStage === 0)
            {
                if (state.playerLocation === Location.RESERVOIR_SOUTH ||
                    state.playerLocation === Location.RESERVOIR_NORTH)
                {
                    output(MapStrings.RESERVOIR_EMPTIES);
                }

                if (state.playerLocation === Location.RESERVOIR)
                {
                    output(MapStrings.RESERVOIR_EMPTIES_BOAT);
                    output("\n");
                    relocatePlayerNoClear(Location.RESERVOIR_EMPTY);
                }

                if (state.playerLocation === Location.DEEP_CANYON)
                    output("The roar of rushing water is quieter now.");
            }

        }

        // Water is rising
        if (!state.damGatesOpen && state.damWaterLow && state.damWaterStage < RESERVOIR_DRAIN_TURNS)
        {
            ++state.damWaterStage;
            state.waterRising = true;
            state.waterFalling = false;
            reservoirNorth.description = MapStrings.DESC_RESERVOIR_NORTH_RISING;
            reservoirSouth.description = MapStrings.DESC_RESERVOIR_SOUTH_RISING;
            reservoirEmpty.description = MapStrings.RESERVOIR_RISING;
            let boat = objectList.get("magic boat");
            // Game.output("Dam water stage is " + state.damWaterStage);

            if (state.playerLocation === Location.RESERVOIR_EMPTY)
            {
                if (state.damWaterStage === 3 || state.damWaterStage === 6)
                    output(MapStrings.RESERVOIR_RISING);

                if (state.damWaterStage === 4 && state.playerInBoat)
                    output(MapStrings.RESERVOIR_RISING_BOAT);
            }

            // Water finishes rising and goes over the dam
            if (state.damWaterStage === RESERVOIR_DRAIN_TURNS)
            {
                if (state.playerLocation === Location.RESERVOIR_SOUTH ||
                    state.playerLocation === Location.RESERVOIR_NORTH)
                {
                    output(MapStrings.RESERVOIR_FILLS);
                }

                if (state.playerLocation === Location.RESERVOIR_EMPTY)
                {
                    if (state.playerInBoat)
                    {
                        output(MapStrings.RESERVOIR_FILLS_BOAT);
                        state.playerInBoat = false;
                        boat.location = Location.RESERVOIR_SOUTH;
                    }
                    else
                        output(MapStrings.RESERVOIR_FILLS_SWIM);

                    playerDies();

                }

                if (state.playerLocation === Location.LOUD_ROOM)
                {
                    let choice = getRandom(3);

                    output(MapStrings.LOUD_ROOM_RUSH);
                    output("\n");

                    if (choice === 0) relocatePlayerNoClear(Location.DAMP_CAVE);
                    if (choice === 1) relocatePlayerNoClear(Location.ROUND_ROOM);
                    if (choice === 2) relocatePlayerNoClear(Location.DEEP_CANYON);
                }

                if (state.playerLocation === Location.DEEP_CANYON)
                    output("A sound, like that of flowing water, starts to come from below.");

                if (boat.location === Location.RESERVOIR_EMPTY && !state.playerInBoat)
                    boat.location = Location.DAM;
            }
        }

        // Reservoir is empty
        if (state.damWaterStage === 0)
        {
            state.damWaterHigh = false;
            state.damWaterLow = true;
            state.waterFalling = false;
            state.waterRising = false;
            reservoirNorth.description = MapStrings.DESC_RESERVOIR_NORTH_EMPTY;
            reservoirSouth.description = MapStrings.DESC_RESERVOIR_SOUTH_EMPTY;
            reservoirEmpty.description = MapStrings.DESC_RESERVOIR_EMPTY;

            stream.exits.delete(Action.EAST);
            stream.addExit(Action.EAST, stream_res_empty);

            reservoirNorth.exits.delete(Action.LAUNCH);
            reservoirNorth.addExit(Action.SOUTH, res_north_res_empty);

            reservoirSouth.exits.delete(Action.LAUNCH);
            reservoirSouth.addExit(Action.NORTH, res_south_res_empty);
        }

        // Reservoir is full
        if (state.damWaterStage == GameState.RESERVOIR_DRAIN_TURNS)
        {
            state.damWaterLow = false;
            state.damWaterHigh = true;
            state.waterFalling = false;
            state.waterRising = false;
            reservoirNorth.description = MapStrings.DESC_RESERVOIR_NORTH;
            reservoirSouth.description = MapStrings.DESC_RESERVOIR_SOUTH;
            reservoir.description = MapStrings.DESC_RESERVOIR;

            stream.exits.delete(Action.EAST);
            stream.addExit(Action.EAST, reservoir_stream);

            reservoirNorth.exits.delete(Action.SOUTH);
            reservoirNorth.addExit(Action.LAUNCH, res_north_res);

            reservoirSouth.exits.delete(Action.NORTH);
            reservoirSouth.addExit(Action.LAUNCH, res_south_res);
        }
    }

    floodTurn()
    {
        if (!state.blueButtonPushed) return;

        let maxFloodStage = 15;

        if (state.floodStage < maxFloodStage)
        {
            let step = getRandom(2);
            state.floodStage += step;
        }

        if (state.floodStage >= maxFloodStage)
        {
            dam_lobby_maintenance.setClosed();
            dam_lobby_maintenance.closedFail = "The room is full of water and cannot be entered.";

        }

        if (state.playerLocation !== Location.MAINTENANCE_ROOM) return;

        let check = state.floodStage / 2;
        let floodString = "The water level here is now up to your ";

        // ankles, shin, knees, hips, waist, chest, neck
        switch(check)
        {
            case 1: { output(floodString += "ankles."); } break;
            case 2: { output(floodString += "shin."); } break;
            case 3: { output(floodString += "knees."); } break;
            case 4: { output(floodString += "hips."); } break;
            case 5: { output(floodString += "waist."); } break;
            case 6: { output(floodString += "chest."); } break;
            case 7: { output(floodString += "neck."); } break;

            default: {} break;
        }

        if (state.floodStage >= maxFloodStage)
        {
            output("I'm afraid you have done drowned yourself.");
            playerDies();
        }
    }

    gustOfWindTurn()
    {
        let chance = getRandom(2);

        if (chance === 0) return;

        if (state.playerLocation === Location.CAVE_SOUTH)
        {
            if (candles.activated && candles.location === Location.PLAYER_INVENTORY
                && matchbook.activated && matchbook.location === Location.PLAYER_INVENTORY)
            {
                output("A gust of wind blows out your candles AND your match!");
                candles.activated = false;
                matchbook.activated = false;
            }

            else if (candles.activated && candles.location === Location.PLAYER_INVENTORY)
            {
                output("A gust of wind blows out your candles!");
                candles.activated = false;
            }

            else if (matchbook.activated && matchbook.location === Location.PLAYER_INVENTORY)
            {
                output("A gust of wind blows out your match!");
                matchbook.activated = false;
            }

            darknessCheck();

        }

        if (state.playerLocation === Location.DRAFTY_ROOM)
        {
            if (candles.activated && candles.location === Location.PLAYER_INVENTORY)
            {
                output("A gust of wind blows out your candles!");
                candles.activated = false;
            }
        }
    }

    riverCurrentTurn()
    {
        let room = worldMap.get(state.playerLocation);

        if (room.bodyOfWater)
        {
            ++this.riverTurns;
        }

        if (this.riverTurns === 2)
        {
            switch (state.playerLocation)
            {
                case "FRIGID_RIVER_1":
                {
                    output("\nThe flow of the river carries you downstream.\n");
                    relocatePlayerNoClear(Location.FRIGID_RIVER_2);
                } break;

                case "FRIGID_RIVER_2":
                {
                    output("\nThe flow of the river carries you downstream.\n");
                    relocatePlayerNoClear(Location.FRIGID_RIVER_3);
                } break;

                case "FRIGID_RIVER_3":
                {
                    output("\nThe flow of the river carries you downstream.\n");
                    relocatePlayerNoClear(Location.FRIGID_RIVER_4);
                } break;

                case "FRIGID_RIVER_4":
                {
                    output("\nThe flow of the river carries you downstream.\n");
                    relocatePlayerNoClear(Location.FRIGID_RIVER_5);
                } break;

                case "FRIGID_RIVER_5":
                {
                    output(GameStrings.WATERFALL_DEATH_BOAT);
                    output("\n");
                    state.playerInBoat = false;
                    playerDies();
                    let boat = objectList.get("magic boat");
                    boat.location = Location.SHORE;
                } break;

                default: {} break;
            }

            this.riverTurns = 0;
        }
    }

    songbirdTurn()
    {
        // The songbird shouldn't chirp on the same turn it drops the bauble.
        if (state.baubleFell)
        {
            state.baubleFell = false;
            return;
        }

        if (this.altLocations.has(state.playerLocation))
        {
            let rand = getRandom(100);
            if (rand < SONGBIRD_CHIRP_PERCENT)
                output(ObjectStrings.SONGBIRD);
        }
    }

    spiritsTurn()
    {
        if (state.spiritsBanished) return;

        if (state.playerLocation !== Location.ENTRANCE_TO_HADES)
        {
            state.spiritCeremonyCount = 0;
            return;
        }

        if (state.spiritCeremonyCount > 0)
        {
            --state.spiritCeremonyCount;
            if (state.spiritCeremonyCount == 0)
            {
                output(ObjectStrings.SPIRITS_REVERT);
                state.spiritsBellRung = false;
                state.spiritsCandlesLit = false;
            }
        }

        if (candles.location === Location.PLAYER_INVENTORY &&
            candles.activated &&
            state.spiritsBellRung &&
            !state.spiritsCandlesLit)
        {
            state.spiritsCandlesLit = true;
            output(ObjectStrings.CANDLES_LIT_SPIRITS);
        }
    }

    swordGlowTurn()
    {
        if (sword.location !== Location.PLAYER_INVENTORY)
        {
            this.swordGlowLevel = 0;
            return;
        }

        let newGlowLevel = 0;

        let enemies = [ vampireBat, cyclops, spirits, thief, troll ];

        for (let i = 0; i < enemies.length; ++i)
        {
            if (!enemies[i].alive) continue;
            if (enemies[i].location === Location.NULL_LOCATION) continue;

            // Game.output("Checking sword glow for (Actor): " + enemies[i].name);
            // Game.output("Checking sword glow for (Location): " + enemies[i].location);

            if (state.playerLocation === enemies[i].location)
                newGlowLevel = 2;

            else 
            {
                let enemyRoom = worldMap.get(enemies[i].location);
                for (let psg of enemyRoom.exits.values())
                {
                    if (psg.isOpen())
                    {
                        if (psg.locationA === enemies[i].location && psg.locationB === state.playerLocation)
                            newGlowLevel = 1;
                        if (psg.locationB === enemies[i].location && psg.locationA === state.playerLocation)
                            newGlowLevel = 1;

                    }
                }
            }

            if (!enemies[i].alive)
                newGlowLevel = 0;
        }

        let check = (newGlowLevel !== this.swordGlowLevel);

        switch (newGlowLevel)
        {
            case 0:
            {
                if (check)
                    output("Your sword is no longer glowing.");
                sword.examineString = "There's nothing special about the elvish sword.";

            } break;

            case 1:
            {
                if (check)
                    output("Your sword is glowing with a faint blue glow.");
                sword.examineString = "Your sword is glowing with a faint blue glow.";

            } break;

            case 2:
            {
                if (check)
                    output("Your sword has begun to glow very brightly.");
                sword.examineString = "Your sword is glowing very brightly.";

            } break;

            default: {} break;    
        }
        
        this.swordGlowLevel = newGlowLevel;
    }

    thiefAttacks()
    {
        // console.log("The thief attacks you, sucka!");

        let misses = [ ObjectStrings.THIEF_FIGHT_MISS_1, ObjectStrings.THIEF_FIGHT_MISS_2, ObjectStrings.THIEF_FIGHT_MISS_3,
                ObjectStrings.THIEF_FIGHT_MISS_4 ];
        let lightBlows = [ ObjectStrings.THIEF_FIGHT_LIGHT_1, ObjectStrings.THIEF_FIGHT_LIGHT_2, ObjectStrings.THIEF_FIGHT_LIGHT_3,
                ObjectStrings.THIEF_FIGHT_LIGHT_4 ];
        let severeBlows = [ ObjectStrings.THIEF_FIGHT_SEVERE_1, ObjectStrings.THIEF_FIGHT_SEVERE_2, ObjectStrings.THIEF_FIGHT_SEVERE_3,
            ObjectStrings.THIEF_FIGHT_SEVERE_4 ];
        let staggerBlows = [ ObjectStrings.THIEF_FIGHT_STAGGER_1, ObjectStrings.THIEF_FIGHT_STAGGER_2, ObjectStrings.THIEF_FIGHT_STAGGER_3 ];
        let disarmingBlows = [ ObjectStrings.THIEF_FIGHT_DISARM_1, ObjectStrings.THIEF_FIGHT_DISARM_2, ObjectStrings.THIEF_FIGHT_DISARM_3 ];
        let knockoutBlows = [ ObjectStrings.THIEF_FIGHT_KNOCKOUT_1, ObjectStrings.THIEF_FIGHT_KNOCKOUT_2 ];
        let fatalBlows = [ ObjectStrings.THIEF_FIGHT_FATAL_1, ObjectStrings.THIEF_FIGHT_FATAL_2, ObjectStrings.THIEF_FIGHT_FATAL_3 ];
        let hesitations = [ ObjectStrings.THIEF_FIGHT_HESITATE_1, ObjectStrings.THIEF_FIGHT_HESITATE_2, ObjectStrings.THIEF_FIGHT_HESITATE_3];
        let finishes = [ ObjectStrings.THIEF_FIGHT_FINISH_1, ObjectStrings.THIEF_FIGHT_FINISH_2 ];

        let missCutoff = 15;
        let lightCutoff = 35;
        let severeCutoff = 50;
        let staggerCutoff = 60;
        let disarmCutoff = 75;
        let knockoutCutoff = 90;

        if (this.disarmed && !this.unconscious)
        {
            output(ObjectStrings.THIEF_RECOVER_STILETTO);
            stiletto.location = Location.THIEF_INVENTORY;
            this.disarmed = false;
            return;
        }

        if (this.staggered)
        {
            this.staggered = false;
            return;
        }

        if (this.unconscious)
        {
            // 50% chance to recover
            let check = getRandom(2);

            if (check === 0)
            {
                output(ObjectStrings.THIEF_WAKES);
                this.unconscious = false;
                this.presenceString = ObjectStrings.THIEF_PRESENT_2;
            }

            return;
        }

        let dieRoll = getRandom(100);
        // console.log("Thief die roll = " + dieRoll);

        if (0 <= dieRoll && dieRoll < missCutoff)
        {
            let phrase = getRandom(misses.length);
                output(misses[phrase]);
        }

        else if (missCutoff <= dieRoll && dieRoll < lightCutoff)
        {
            let phrase = getRandom(lightBlows.length);
            output(lightBlows[phrase]);
            state.playerHitPoints -= 1;
        }

        else if (lightCutoff <= dieRoll && dieRoll < severeCutoff)
        {
            let phrase = getRandom(severeBlows.length);
            output(severeBlows[phrase]);
            state.playerHitPoints -= 5;
        }

        else if (severeCutoff <= dieRoll && dieRoll < staggerCutoff)
        {
            let phrase = getRandom(staggerBlows.length);
            output(staggerBlows[phrase]);
            state.playerStaggered = true;
        }

        else if (staggerCutoff <= dieRoll && dieRoll < disarmCutoff)
        {
            // If the player hasn't attacked with a weapon, stagger instead.

            if (!state.indirectObject.isWeapon)
            {
                let phrase = getRandom(staggerBlows.length);
                output(staggerBlows[phrase]);
                state.playerStaggered = true;
                return;
            }

            let phrase = getRandom(disarmingBlows.length);
            output(disarmingBlows[phrase]);
            state.indirectObject.location = state.playerLocation;
            for (let g of currentObjects.values())
            {
                if (g.isWeapon && !g.name === "sceptre" && g.location === Location.PLAYER_INVENTORY)
                {
                    output("Fortunately, you still have " + g.articleName + ".");
                    break;
                }
            }
        }

        else if (disarmCutoff <= dieRoll && dieRoll < knockoutCutoff)
        {
            let phrase = getRandom(knockoutBlows.length);
            output(knockoutBlows[phrase]);

            phrase = getRandom(hesitations.length);
            output(hesitations[phrase]);

            phrase = getRandom(finishes.length);
            output(finishes[phrase]);

            playerDies();
        }

        else if (knockoutCutoff <= dieRoll && dieRoll < 100)
        {
            let phrase = getRandom(fatalBlows.length);
            output(fatalBlows[phrase]);
            output(GameStrings.COMBAT_HP_ZERO);
            playerDies();
        }

        if (state.playerHitPoints <= 0)
        {
            output(GameStrings.COMBAT_HP_ZERO);
            playerDies();

        }
    }

    thiefCombat()
    {
        this.firstCombatTurn = false;
        this.thiefAggro = true;

        let misses = [ GameStrings.COMBAT_MISS_1, GameStrings.COMBAT_MISS_2, GameStrings.COMBAT_MISS_3,
            GameStrings.COMBAT_PARRY_1, GameStrings.COMBAT_PARRY_2, GameStrings.COMBAT_PARRY_3 ];
        let lightBlows = [ GameStrings.COMBAT_LIGHT_1, GameStrings.COMBAT_LIGHT_2, GameStrings.COMBAT_LIGHT_3,
            GameStrings.COMBAT_LIGHT_4 ];
        let severeBlows = [ GameStrings.COMBAT_SEVERE_1, GameStrings.COMBAT_SEVERE_2, GameStrings.COMBAT_SEVERE_3,
            GameStrings.COMBAT_SEVERE_4 ];
        let staggerBlows = [ GameStrings.COMBAT_STAGGER_1, GameStrings.COMBAT_STAGGER_2, GameStrings.COMBAT_STAGGER_3,
            GameStrings.COMBAT_STAGGER_4 ];
        let disarmingBlows = [ GameStrings.COMBAT_DISARM_1, GameStrings.COMBAT_DISARM_2 ];
        let knockoutBlows = [ GameStrings.COMBAT_KNOCKOUT_1, GameStrings.COMBAT_KNOCKOUT_2, GameStrings.COMBAT_KNOCKOUT_3,
            GameStrings.COMBAT_KNOCKOUT_4 ];
        let fatalBlows = [ GameStrings.COMBAT_FATAL_1, GameStrings.COMBAT_FATAL_2, GameStrings.COMBAT_FATAL_3 ];

        // values for the sword - not very useful against the thief
        let missCutoff = 40;
        let lightCutoff = 80;
        let severeCutoff = 85;
        let staggerCutoff = 90;
        let disarmCutoff = 93;
        let knockoutCutoff = 97;

        // Fighting the thief with the knife is a lot more effective.
        if (state.indirectObject.name === "nasty knife")
        {
            // remove the decapitation string. These arrays have strange rules...
            let fatals = [ GameStrings.COMBAT_FATAL_2, GameStrings.COMBAT_FATAL_3 ];
            fatalBlows = fatals;

            missCutoff = 20;
            lightCutoff = 50;
            severeCutoff = 60;
            staggerCutoff = 70;
            disarmCutoff = 80;
            knockoutCutoff = 90;

        }

        // Fighting the thief with the axe is almost completely ineffective.
        if (state.indirectObject.name === "bloody axe")
        {
            missCutoff = 60;
            lightCutoff = 90;
            severeCutoff = 92;
            staggerCutoff = 94;
            disarmCutoff = 96;
            knockoutCutoff = 99;
        }

        let dieRoll = getRandom(100);

        // Score modification
        let mod = Math.floor((100 * state.playerScore) / WINNING_SCORE);
        dieRoll += mod;
        if (dieRoll > 99) dieRoll = 99;

        if (0 <= dieRoll && dieRoll < missCutoff)
        {
            let phrase = getRandom(misses.length);
            output(misses[phrase]);
        }

        else if (missCutoff <= dieRoll && dieRoll < lightCutoff)
        {
            this.hitPoints -= 1;

            if (this.hitPoints <= 0)
            {
                let phrase = getRandom(fatalBlows.length);
                output(fatalBlows[phrase]);
            }

            else
            {
                let phrase = getRandom(lightBlows.length);
                output(lightBlows[phrase]);
            }
        }

        else if (lightCutoff <= dieRoll && dieRoll < severeCutoff)
        {
            this.hitPoints -= 5;

            if (this.hitPoints <= 0)
            {
                let phrase = getRandom(fatalBlows.length);
                output(fatalBlows[phrase]);
            }

            else
            {
                let phrase = getRandom(severeBlows.length);
                output(severeBlows[phrase]);
            }         
        }

        else if (severeCutoff <= dieRoll && dieRoll < staggerCutoff)
        {
            let phrase = getRandom(staggerBlows.length);
            output(staggerBlows[phrase]);
            this.staggered = true;
        }

        else if (staggerCutoff <= dieRoll && dieRoll < disarmCutoff)
        {
            let phrase = getRandom(disarmingBlows.length);
            output(disarmingBlows[phrase]);
            stiletto.location = state.playerLocation;
            this.disarmed = true;
        }

        else if (disarmCutoff <= dieRoll && dieRoll < knockoutCutoff)
        {
            let phrase = getRandom(knockoutBlows.length);
            output(knockoutBlows[phrase]);
            this.presenceString = ObjectStrings.THIEF_PRESENT_UNCONSCIOUS;
            this.unconscious = true;
        }

        else if (knockoutCutoff <= dieRoll && dieRoll < 100)
        {
            let phrase = getRandom(fatalBlows.length);
            output(fatalBlows[phrase]);
            this.alive = false;
        }
    }

    thiefDies()
    {
        for (let it of this.inventory)
        {
            it.location = this.location;
        }

        this.alive = false;
        this.location = Location.NULL_LOCATION;

        if (state.playerLocation === Location.TREASURE_ROOM)
            output(ObjectStrings.THIEF_MAGIC_2);

        for (let g of objectList.values())
        {
            if (g.location === Location.TREASURE_ROOM_INVISIBLE)
            {
                g.location = Location.TREASURE_ROOM;
                if (state.playerLocation === Location.TREASURE_ROOM)
                    output("The " + g.name + " is now safe to take.");
            }
        }
    }

    thiefLootsRoom()
    {
        for (let g of objectList.values())
        {
            if (g.isItem() && g.location === this.location)
            {
                if (g.trophyCaseValue > 0)
                    g.location = Location.THIEF_INVENTORY;
            }
        }
    }

    thiefMoves()
    {
        let nextThiefLocation = getRandom(THIEF_LOCATIONS.length);
        // console.log("Thief location random number: " + nextThiefLocation);
        this.location = THIEF_LOCATIONS[nextThiefLocation];
        this.thiefFirstTurn = true;
    }

    thiefRobsPlayer()
    {
        for (let g of objectList.values())
        {
            if (g.isItem() && g.location === Location.PLAYER_INVENTORY)
            {
                if (g.trophyCaseValue > 0)
                    g.location = Location.THIEF_INVENTORY;
            }
        }
    }

    thiefTurn()
    {
        if (!this.alive) return;

        let playerHasTreasure = false;
        let roomHasTreasure = false;

        for (let g of objectList.values())
        {
            if (g.isItem())
            {
                if (g.trophyCaseValue > 0 && g.location === this.location)
                    roomHasTreasure = true;

                if (g.trophyCaseValue > 0 && g.location === Location.PLAYER_INVENTORY)
                    playerHasTreasure = true;
            }
        }

        // Has the player found my secret hideout?
        if (state.playerLocation === Location.TREASURE_ROOM)
        {
            // Did the player just get here?
            if (this.thiefFirstTurn)
            {
                output(ObjectStrings.THIEF_HIDEOUT);
                this.location = Location.TREASURE_ROOM;
                this.thiefFirstTurn = false;
            }

            // Have I already hidden the treasures?
            if (!this.thiefItemsHidden)
            {
                output(ObjectStrings.THIEF_MAGIC_1);

                for (let g of objectList.values())
                {
                    if (g.isItem())
                    {
                        if (g.location === Location.TREASURE_ROOM && g.trophyCaseValue > 0)
                            g.location = Location.TREASURE_ROOM_INVISIBLE;
                    }

                }

                this.thiefItemsHidden = true;
            }

            treasureRoom.lookAround();

            // Attack without pity!
            this.thiefAttacks();

            // If the player is still here, check sword glow.
            if (state.playerLocation === Location.TREASURE_ROOM)
                this.swordGlowTurn();

            return;
        }

        // Am I in the same room as the player?
        if (this.location === state.playerLocation)
        {
            // Is the player attacking me?
            if (this.thiefAggro)
            {
                // Retreat, dropping my bag
                if (this.itPoints == 1)
                {
                    output(ObjectStrings.THIEF_FIGHT_RETREAT_2);
                    for (let it of this.inventory)
                        it.location = this.location;
                    this.thiefMoves();
                }

                // Retreat, holding my bag
                else if (2 <= this.hitPoints && this.hitPoints <= 4)
                {
                    output(ObjectStrings.THIEF_FIGHT_RETREAT_1);
                    this.thiefMoves();
                }

                // Attack the player...
                else
                {
                    this.thiefAttacks();
                }

                return;
            }

            // Did the player just get here?
            if (this.thiefFirstTurn)
            {
                this.thiefFirstTurn = false;
                return;
            }

            // The player has been here at least one turn and we're not fighting.
            {
                let option = getRandom(5);

                // Wait...
                if (option === 0) return;

                // Rob the player and leave...
                else if (option > 2 && playerHasTreasure)
                {
                    output(ObjectStrings.THIEF_LEAVES_ROBS);
                    this.thiefRobsPlayer();
                    this.thiefMoves();
                }

                // Loot the room and leave...
                else if (option <= 2 && roomHasTreasure)
                {
                    output(ObjectStrings.THIEF_LEAVES_LOOTS);
                    this.thiefLootsRoom();
                    this.thiefMoves();
                }

                // Leave without taking anything.
                else
                {
                    if (option > 2) output(ObjectStrings.THIEF_LEAVES_1);
                    if (option <= 2) output(ObjectStrings.THIEF_LEAVES_2);
                    this.thiefMoves();
                }

                return;
            }
        }

        // I'm not in the same room as the player. Let's move!
        if (this.location !== state.playerLocation)
        {
            this.thiefMoves();

            // Check if the player is in a possible thief location
            let playerInThiefArea = false;
            for (let i = 0; i < THIEF_LOCATIONS.length; ++i)
            {
                if (THIEF_LOCATIONS[i] === state.playerLocation)
                    playerInThiefArea = true;
            }

            // Move the thief to the player if we roll an encounter.
            let encounterCheck = getRandom(100);
            // console.log("Thief encounter check number: " + encounterCheck);
            if (encounterCheck < THIEF_ENCOUNTER_PERCENT && playerInThiefArea)
            {
                this.location = state.playerLocation;
                let option = getRandom(3);
                if (option === 0)
                {
                    output(ObjectStrings.THIEF_ARRIVES_GRIN);
                }

                if (option === 1)
                {
                    output(ObjectStrings.THIEF_COMES_AND_ROBS);
                    while (this.location === state.playerLocation)
                    {
                        this.thiefRobsPlayer();
                        this.thiefLootsRoom();
                        this.thiefMoves();
                    }
                }

                if (option === 2)
                {
                    output(ObjectStrings.THIEF_COMES_AND_GOES);
                    while (this.location === state.playerLocation)
                    {
                        this.thiefMoves();
                    }
                }

            }
        }

        // Update egg
        if (egg.location === Location.THIEF_INVENTORY &&
            !this.thiefAggro && state.thiefEggTurns < THIEF_OPENS_EGG)
        {
            ++state.thiefEggTurns;

            if (state.thiefEggTurns === THIEF_OPENS_EGG)
            {
                canary.location = Location.INSIDE_EGG;
                egg.itemOpen = true;
                state.thiefOpenedEgg = true;
            }
        }
    }

    trollCombat()
    {
        let misses = [ GameStrings.COMBAT_MISS_1, GameStrings.COMBAT_MISS_2, GameStrings.COMBAT_MISS_3,
            GameStrings.COMBAT_PARRY_1, GameStrings.COMBAT_PARRY_2, GameStrings.COMBAT_PARRY_3 ];
        let lightBlows = [ GameStrings.COMBAT_LIGHT_1, GameStrings.COMBAT_LIGHT_2, GameStrings.COMBAT_LIGHT_3,
            GameStrings.COMBAT_LIGHT_4 ];
        let severeBlows = [ GameStrings.COMBAT_SEVERE_1, GameStrings.COMBAT_SEVERE_2, GameStrings.COMBAT_SEVERE_3,
            GameStrings.COMBAT_SEVERE_4 ];
        let staggerBlows = [ GameStrings.COMBAT_STAGGER_1, GameStrings.COMBAT_STAGGER_2, GameStrings.COMBAT_STAGGER_3,
            GameStrings.COMBAT_STAGGER_4 ];
        let disarmingBlows = [ GameStrings.COMBAT_DISARM_1, GameStrings.COMBAT_DISARM_2 ];
        let knockoutBlows = [ GameStrings.COMBAT_KNOCKOUT_1, GameStrings.COMBAT_KNOCKOUT_2, GameStrings.COMBAT_KNOCKOUT_3,
            GameStrings.COMBAT_KNOCKOUT_4 ];
        let fatalBlows = [ GameStrings.COMBAT_FATAL_1, GameStrings.COMBAT_FATAL_2, GameStrings.COMBAT_FATAL_3 ];

        // values for the sword
        let missCutoff = 10;
        let lightCutoff = 25;
        let severeCutoff = 40;
        let staggerCutoff = 55;
        let disarmCutoff = 70;
        let knockoutCutoff = 85;

        // Fighting the troll with the knife is a little harder.
        if (state.indirectObject.name === "nasty knife")
        {
            // remove the decapitation string. These arrays have strange rules...
            let fatals = [ GameStrings.COMBAT_FATAL_2, GameStrings.COMBAT_FATAL_3 ];
            fatalBlows = fatals;

            missCutoff = 20;
            lightCutoff = 50;
            severeCutoff = 60;
            staggerCutoff = 70;
            disarmCutoff = 80;
            knockoutCutoff = 90;

        }

        let dieRoll = getRandom(100);

        // Score modification
        let mod = ( (100 * state.playerScore) / WINNING_SCORE);
        dieRoll += mod;
        if (dieRoll > 99) dieRoll = 99;

        if (0 <= dieRoll && dieRoll < missCutoff)
        {
            let phrase = getRandom(misses.length);
            output(misses[phrase]);
        }

        else if (missCutoff <= dieRoll && dieRoll < lightCutoff)
        {
            this.hitPoints -= 1;

            if (this.hitPoints <= 0)
            {
                let phrase = getRandom(fatalBlows.length);
                output(fatalBlows[phrase]);
            }

            else
            {
                let phrase = getRandom(lightBlows.length);
                output(lightBlows[phrase]);
            }
        }

        else if (lightCutoff <= dieRoll && dieRoll < severeCutoff)
        {
            this.hitPoints -= 5;

            if (this.hitPoints <= 0)
            {
                let phrase = getRandom(fatalBlows.length);
                output(fatalBlows[phrase]);
            }

            else
            {
                let phrase = getRandom(severeBlows.length);
                output(severeBlows[phrase]);
            }         
        }

        else if (severeCutoff <= dieRoll && dieRoll < staggerCutoff)
        {
            let phrase = getRandom(staggerBlows.length);
            output(staggerBlows[phrase]);
            this.staggered = true;
        }

        else if (staggerCutoff <= dieRoll && dieRoll < disarmCutoff)
        {
            let phrase = getRandom(disarmingBlows.length);
            output(disarmingBlows[phrase]);
            axe.location = state.playerLocation;
            this.disarmed = true;
        }

        else if (disarmCutoff <= dieRoll && dieRoll < knockoutCutoff)
        {
            let phrase = getRandom(knockoutBlows.length);
            output(knockoutBlows[phrase]);
            this.unconscious = true;
            axe.location = state.playerLocation;
            this.disarmed = true;
        }

        else if (knockoutCutoff <= dieRoll && dieRoll < 100)
        {
            let phrase = getRandom(fatalBlows.length);
            output(fatalBlows[phrase]);
            this.alive = false;
        }
    }

    trollDies()
    {
        // console.log("trollDies() called");
        this.alive = false;

        for (let it of this.inventory)
        {
            it.location = this.location;
        }

        this.location = Location.NULL_LOCATION;
        troll_eastwest.setOpen();
        troll_maze.setOpen();

        if (state.playerLocation === Location.TROLL_ROOM && state.directObject.name === "troll")
            output(GameStrings.COMBAT_ENEMY_DIES);
    }

    trollGive()
    {
        let item = state.indirectObject.name;
        switch (item)
        {
            case "axe":
            {
                output(ObjectStrings.TROLL_GIVE_AXE);
                state.indirectObject.location = Location.TROLL_INVENTORY;
            } break;

            default:
            {
                output("The troll, who is remarkably coordinated, catches the " + item + ".");
                state.indirectObject.location = Location.TROLL_INVENTORY;
            } break;
        }
    }

    trollTurn()
    {
        if (!this.alive) return;

        if (axe.location !== Location.TROLL_INVENTORY)
            this.disarmed = true;

        troll_eastwest.setClosed();
        troll_maze.setClosed();
        troll_eastwest.closedFail = ObjectStrings.TROLL_FEND;
        troll_maze.closedFail = ObjectStrings.TROLL_FEND;

        if (this.location === state.playerLocation)
        {
            outputFirst(this.presenceString);

            let misses = [ ObjectStrings.TROLL_FIGHT_MISS_1, ObjectStrings.TROLL_FIGHT_MISS_2, ObjectStrings.TROLL_FIGHT_MISS_3,
                ObjectStrings.TROLL_FIGHT_MISS_4, ObjectStrings.TROLL_FIGHT_MISS_5 ];
            let lightBlows = [ ObjectStrings.TROLL_FIGHT_LIGHT_1, ObjectStrings.TROLL_FIGHT_LIGHT_2, ObjectStrings.TROLL_FIGHT_LIGHT_3,
                ObjectStrings.TROLL_FIGHT_LIGHT_4, ObjectStrings.TROLL_FIGHT_LIGHT_5 ];
            let severeBlows = [ ObjectStrings.TROLL_FIGHT_SEVERE_1, ObjectStrings.TROLL_FIGHT_SEVERE_2, ObjectStrings.TROLL_FIGHT_SEVERE_3 ];
            let staggerBlows = [ ObjectStrings.TROLL_FIGHT_STAGGER_1, ObjectStrings.TROLL_FIGHT_STAGGER_2, ObjectStrings.TROLL_FIGHT_STAGGER_3 ];
            let disarmingBlows = [ ObjectStrings.TROLL_FIGHT_DISARM_1, ObjectStrings.TROLL_FIGHT_DISARM_2, ObjectStrings.TROLL_FIGHT_DISARM_3 ];
            let fatalBlows = [ ObjectStrings.TROLL_FIGHT_FATAL_1, ObjectStrings.TROLL_FIGHT_FATAL_2, ObjectStrings.TROLL_FIGHT_FATAL_3 ];

            /** COMBAT WITH THE TROLL **

            In order to attack you, the troll must be alive,
            conscious, not staggered, and armed with his axe.
            He can't fight with any other weapons.

            When the troll attacks with the axe, the possible results are:

             - Miss: 40%
             - Light blow: 25%
             - Severe blow: 10% 
             - Stagger: 10%
             - Disarm: 5%
             - Knockout: 5%
             - Death: 5%

            If he's staggered, he has a 1 in 2 chance to recover.
            If he's unconscious, he has a 1 in 3 chance to wake up.
            If he's disarmed and can't recover his weapon, he'll pathetically babble and plead for his life.
            If you leave the axe on the ground, he has a 2 in 3 chance to pick it up.

            */
            // Game.output("The troll attacks you.");

            let missCutoff = 40;
            let lightCutoff = 65;
            let severeCutoff = 75;
            let staggerCutoff = 85;
            let disarmCutoff = 90;
            let knockoutCutoff = 95;

            if (this.disarmed && !this.unconscious)
            {
                if (axe.location === Location.TROLL_ROOM)
                {
                    let check = getRandom(3);

                    if (check > 0)
                    {
                        output(ObjectStrings.TROLL_RECOVER_AXE);
                        axe.location = Location.TROLL_INVENTORY;
                        this.disarmed = false;
                        this.presenceString = ObjectStrings.TROLL_PRESENCE;
                    }
                    return;
                }
                else
                {
                    output(ObjectStrings.TROLL_DISARMED);
                    return;
                }
            }

            if (this.staggered)
            {
                let check = getRandom(2);

                if (check === 1)
                {
                    output(ObjectStrings.TROLL_RECOVERS_STAGGER);
                    this.staggered = false;
                }
                
                return;
            }

            // The troll will only regain consciousness if the player is there.
            if (this.unconscious && state.playerLocation === Location.TROLL_ROOM)
            {
                let check = getRandom(3);

                if (check === 0)
                {
                    output(ObjectStrings.TROLL_RECOVERS_STAGGER);
                    this.unconscious = false;
                    if (axe.location === Location.TROLL_ROOM)
                    {
                        axe.location = Location.TROLL_INVENTORY;
                        this.disarmed = false;
                    }
                    this.presenceString = ObjectStrings.TROLL_PRESENCE;
                }

                return;
            }

            let dieRoll = getRandom(100);

            // The player won't die without a chance to attack.
            if (this.firstCombatTurn)
            {
                this.firstCombatTurn = false;
                if (dieRoll >= 90) dieRoll = getRandom(90);
            }

            if (0 <= dieRoll && dieRoll < missCutoff)
            {
                let phrase = getRandom(misses.length);
                    output(misses[phrase]);
            }

            else if (missCutoff <= dieRoll && dieRoll < lightCutoff)
            {
                let phrase = getRandom(lightBlows.length);
                    output(lightBlows[phrase]);
                state.playerHitPoints -= 1;
            }

            else if (lightCutoff <= dieRoll && dieRoll < severeCutoff)
            {
                let phrase = getRandom(severeBlows.length);
                    output(severeBlows[phrase]);
                state.playerHitPoints -= 5;
            }

            else if (severeCutoff <= dieRoll && dieRoll < staggerCutoff)
            {
                let phrase = getRandom(staggerBlows.length);
                    output(staggerBlows[phrase]);
                state.playerStaggered = true;
            }

            else if (staggerCutoff <= dieRoll && dieRoll < disarmCutoff)
            {
                // If the player hasn't attacked with a weapon, stagger instead.

                if (!state.indirectObject.isWeapon)
                {
                    let phrase = getRandom(staggerBlows.length);
                    output(staggerBlows[phrase]);
                    state.playerStaggered = true;
                    return;
                }

                let phrase = getRandom(disarmingBlows.length);
                output(disarmingBlows[phrase]);
                state.indirectObject.location = state.playerLocation;
                
                for (let g of currentObjects.values())
                {
                    if (g.isWeapon && !g.name === "sceptre" && g.location === Location.PLAYER_INVENTORY)
                    {
                        output("Fortunately, you still have " + g.articleName + ".");
                        break;
                    }
                }
            }

            else if (disarmCutoff <= dieRoll && dieRoll < knockoutCutoff)
            {
                output(ObjectStrings.TROLL_FIGHT_KNOCKOUT);

                let phrase = getRandom(2);

                if (phrase === 0)
                    output(ObjectStrings.TROLL_FIGHT_HESITATE_1);
                else
                    output(ObjectStrings.TROLL_FIGHT_HESITATE_2);

                output(ObjectStrings.TROLL_FIGHT_FINISH);
                playerDies();

            }

            else if (knockoutCutoff <= dieRoll && dieRoll < 100)
            {
                let phrase = getRandom(fatalBlows.length);
                output(fatalBlows[phrase]);
                output(GameStrings.COMBAT_HP_ZERO);
                playerDies();

            }

            if (state.playerHitPoints <= 0)
            {
                output(GameStrings.COMBAT_HP_ZERO);
                playerDies();

            }

        }
    }

    vampireBatTurn()
    {
        if (garlic.location === Location.PLAYER_INVENTORY || garlic.location === Location.BAT_ROOM)
        {
            this.presenceString = ObjectStrings.BAT_GARLIC;
        }

        else if (state.playerDead)
        {
            this.presenceString = "A large vampire bat is cowering on the ceiling, making whimpered squeaking noises.";
        }

        else
        {
            this.presenceString = ObjectStrings.BAT_ATTACKS;

            if (state.playerLocation == Location.BAT_ROOM)
            {
                output(this.presenceString);

                // Let's give the player a 1 in 10 chance of making it back to the squeaky room.
                let chance = getRandom(10);

                if (chance === 0)
                {
                    relocatePlayerNoClear(Location.SQUEAKY_ROOM);
                }

                else
                {
                    let dieRoll = getRandom(COAL_MINE.length);
                    relocatePlayerNoClear(COAL_MINE[dieRoll]);
                }
            }
            
        }
    }

    isAlive() { return this.alive; }
}