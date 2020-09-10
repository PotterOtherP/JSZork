// Gameplay values
const CARRY_WEIGHT_LIMIT = 100;
const DEATH_POINTS = 10;
const LANTERN_LIFESPAN = 500;
const MAX_PLAYER_DEATHS = 3;
const MAX_DARKNESS_TURNS = 2;
const MAX_HIT_POINTS = 10;
const MATCH_LIFESPAN = 2;
const MATCHES_IN_BOOK = 20;
const RESERVOIR_DRAIN_TURNS = 8;
const SHAFT_BASKET_POINTS = 13;
const SPIRIT_CEREMONY_LENGTH = 5;
const THIEF_OPENS_EGG = 5;
const WINNING_SCORE = 350;

// from Actor object
const CYCLOPS_CYCLE_MAX = 8;
const MAX_ENEMY_HIT_POINTS = 10;
const THIEF_ENCOUNTER_PERCENT = 2;
const SONGBIRD_CHIRP_PERCENT = 15;

// Score values for acquiring a treasure and putting it in the case
const PLATINUM_VALUE = 10;
const PLATINUM_TROPHY_VALUE = 5;
const BAUBLE_VALUE = 1;
const BAUBLE_TROPHY_VALUE = 1;
const CHALICE_VALUE = 10;
const CHALICE_TROPHY_VALUE = 5;
const COFFIN_VALUE = 10;
const COFFIN_TROPHY_VALUE = 15;
const COINS_VALUE = 10;
const COINS_TROPHY_VALUE = 5;
const CANARY_VALUE = 6;
const CANARY_TROPHY_VALUE = 4;
const DIAMOND_VALUE = 10;
const DIAMOND_TROPHY_VALUE = 10;
const EGG_VALUE = 5;
const EGG_TROPHY_VALUE = 5;
const EMERALD_VALUE = 5;
const EMERALD_TROPHY_VALUE = 10;
const JADE_VALUE = 5;
const JADE_TROPHY_VALUE = 5;
const PAINTING_VALUE = 4;
const PAINTING_TROPHY_VALUE = 6;
const POT_OF_GOLD_VALUE = 10;
const POT_OF_GOLD_TROPHY_VALUE = 10;
const SAPPHIRE_VALUE = 5;
const SAPPHIRE_TROPHY_VALUE = 5;
const SCARAB_VALUE = 5;
const SCARAB_TROPHY_VALUE = 5;
const SCEPTRE_VALUE = 4;
const SCEPTRE_TROPHY_VALUE = 6;
const CRYSTAL_SKULL_VALUE = 10;
const CRYSTAL_SKULL_TROPHY_VALUE = 10;
const TORCH_VALUE = 14;
const TORCH_TROPHY_VALUE = 6;
const TRIDENT_VALUE = 4;
const TRIDENT_TROPHY_VALUE = 11;
const TRUNK_OF_JEWELS_VALUE = 15;
const TRUNK_OF_JEWELS_TROPHY_VALUE = 5;

const BROKEN_EGG_TROPHY_VALUE = 2;
const BROKEN_CANARY_TROPHY_VALUE = 1;

// Score values for reaching specific rooms
const KITCHEN_VALUE = 10;
const CELLAR_VALUE = 25;
const EAST_WEST_VALUE = 5;
const TREASURE_VALUE = 25;

// Item weights
const BAR_WEIGHT = 20;
const BAUBLE_WEIGHT = 0;
const CHALICE_WEIGHT = 10;
const COFFIN_WEIGHT = 55;
const COINS_WEIGHT = 15;
const CANARY_WEIGHT = 4;
const DIAMOND_WEIGHT = 6;
const EGG_WEIGHT = 5;
const EMERALD_WEIGHT = 6;
const JADE_WEIGHT = 10;
const PAINTING_WEIGHT = 15;
const POT_OF_GOLD_WEIGHT = 15;
const SAPPHIRE_WEIGHT = 10;
const SCARAB_WEIGHT = 8;
const SCEPTRE_WEIGHT = 3;
const SKULL_WEIGHT = 15;
const TORCH_WEIGHT = 20;
const TRIDENT_WEIGHT = 20;
const TRUNK_WEIGHT = 35;

const ANCIENT_MAP_WEIGHT = 2;
const AXE_WEIGHT = 25;
const BELL_WEIGHT = 10;
const BLACK_BOOK_WEIGHT = 10;
const BOAT_LABEL_WEIGHT = 2;
const BOTTLE_WEIGHT = 5;
const BROKEN_CANARY_WEIGHT = 4;
const BROKEN_EGG_WEIGHT = 5;
const BUOY_WEIGHT = 10;
const CANDLES_WEIGHT = 10;
const COAL_WEIGHT = 20;
const BOAT_WEIGHT = 20;
const GARLIC_WEIGHT = 4;
const GUIDEBOOK_WEIGHT = 2;
const GUNK_WEIGHT = 6;
const KNIFE_WEIGHT = 10;
const LANTERN_WEIGHT = 15;
const LEAVES_WEIGHT = 25;
const LEAFLET_WEIGHT = 2;
const LUNCH_WEIGHT = 5;
const MATCHBOOK_WEIGHT = 2;
const NEST_WEIGHT = 5;
const PUMP_WEIGHT = 8;
const ROPE_WEIGHT = 10;
const RUSTY_KNIFE_WEIGHT = 20;
const SACK_WEIGHT = 9;
const SCREWDRIVER_WEIGHT = 2;
const SHOVEL_WEIGHT = 15;
const SKELETON_KEY_WEIGHT = 10;
const STILETTO_WEIGHT = 10;
const SWORD_WEIGHT = 30;
const TIMBER_WEIGHT = 50;
const TUBE_WEIGHT = 5;
const USELESS_LANTERN_WEIGHT = 20;
const VITREOUS_SLAG_WEIGHT = 10;
const WRENCH_WEIGHT = 10;
const ZORK_MANUAL_WEIGHT = 2;

const Action = {

    NULL_ACTION: "NULL_ACTION",

    NORTH: "NORTH",
    SOUTH: "SOUTH",
    EAST: "EAST",
    WEST: "WEST",
    NORTHEAST: "NORTHEAST",
    NORTHWEST: "NORTHWEST",
    SOUTHEAST: "SOUTHEAST",
    SOUTHWEST: "SOUTHWEST",
    UP: "UP",
    DOWN: "DOWN",
    IN: "IN",
    OUT: "OUT",
    WALK: "WALK",
    GO: "GO",
    SLIDE: "SLIDE",
    SWIM: "SWIM",
    EXIT: "EXIT",
    CROSS: "CROSS",
    LAUNCH: "LAUNCH",
    LAND: "LAND",

    BRIEF: "BRIEF",
    DEFEND: "DEFEND",
    DIAGNOSE: "DIAGNOSE",
    INVENTORY: "INVENTORY",
    JUMP: "JUMP",
    LOOK: "LOOK",
    PRAY: "PRAY",
    QUIT: "QUIT",
    RESTART: "RESTART",
    RESTORE: "RESTORE",
    SAVE: "SAVE",
    SAY: "SAY",
    SCORE: "SCORE",
    SHOUT: "SHOUT",
    STAY: "STAY",
    SUPERBRIEF: "SUPERBRIEF",
    VERBOSE: "VERBOSE",
    WAIT: "WAIT",
  
    ACTIVATE: "ACTIVATE",
    ANSWER: "ANSWER",
    BLOW: "BLOW",
    BOARD: "BOARD",
    BRUSH: "BRUSH",
    CLIMB: "CLIMB",
    CLOSE: "CLOSE",
    COUNT: "COUNT",
    DEBOARD: "DEBOARD",
    DEFLATE: "DEFLATE",
    DRINK: "DRINK",
    DROP: "DROP",
    EAT: "EAT",
    ENTER: "ENTER",
    EXAMINE: "EXAMINE",
    EXTINGUISH: "EXTINGUISH",
    FOLLOW: "FOLLOW",
    GREET: "GREET",
    KICK: "KICK",
    KNOCK: "KNOCK",
    LIGHT: "LIGHT",
    LISTEN: "LISTEN",
    LOOK_IN: "LOOK_IN",
    LOOK_OUT: "LOOK_OUT",
    LOOK_UNDER: "LOOK_UNDER",
    LOWER: "LOWER",
    MOVE_OBJECT: "MOVE_OBJECT",
    OPEN: "OPEN",
    PLAY: "PLAY",
    POUR: "POUR",
    PULL: "PULL",
    PUSH: "PUSH",
    RAISE: "RAISE",
    READ: "READ",
    REMOVE: "REMOVE",
    REPAIR: "REPAIR",
    RING: "RING",
    SEARCH: "SEARCH",
    SHAKE: "SHAKE",
    SMELL: "SMELL",
    STRIKE: "STRIKE",
    TAKE: "TAKE",
    TALK_TO: "TALK_TO",
    TOUCH: "TOUCH",
    UNTIE: "UNTIE",
    WAKE: "WAKE",
    WAVE: "WAVE",
    WEAR: "WEAR",
    WIND: "WIND",

    ATTACK: "ATTACK",
    BREAK: "BREAK",
    BURN: "BURN",
    CUT: "CUT",
    DIG: "DIG",
    FILL: "FILL",
    INFLATE: "INFLATE",
    LOCK: "LOCK",
    TURN: "TURN",
    UNLOCK: "UNLOCK",

    GIVE: "GIVE",
    PUT: "PUT",
    TIE: "TIE",
    THROW: "THROW",

    AGAIN: "AGAIN"

};

const ActionType = {

    NULL_TYPE: "NULL_TYPE",
    DIRECT: "DIRECT",
    EXIT: "EXIT",
    INDIRECT: "INDIRECT",
    INDIRECT_INVERSE: "INDIRECT_INVERSE",
    MULTIPLE: "MULTIPLE",
    REFLEXIVE: "REFLEXIVE",
    SPEAK: "SPEAK",
    SWITCH: "SWITCH"

}

const actions = new Map();

actions.set("north", {action: Action.NORTH, type: ActionType.EXIT});
actions.set("n", {action: Action.NORTH, type: ActionType.EXIT});

actions.set("south", {action: Action.SOUTH, type: ActionType.EXIT});
actions.set("s", {action: Action.SOUTH, type: ActionType.EXIT});

actions.set("east", {action: Action.EAST, type: ActionType.EXIT});
actions.set("e", {action: Action.EAST, type: ActionType.EXIT});

actions.set("west", {action: Action.WEST, type: ActionType.EXIT});
actions.set("w", {action: Action.WEST, type: ActionType.EXIT});

actions.set("northeast", {action: Action.NORTHEAST, type: ActionType.EXIT});
actions.set("ne", {action: Action.NORTHEAST, type: ActionType.EXIT});

actions.set("northwest", {action: Action.NORTHWEST, type: ActionType.EXIT});
actions.set("nw", {action: Action.NORTHWEST, type: ActionType.EXIT});

actions.set("southeast", {action: Action.SOUTHEAST, type: ActionType.EXIT});
actions.set("se", {action: Action.SOUTHEAST, type: ActionType.EXIT});

actions.set("southwest", {action: Action.SOUTHWEST, type: ActionType.EXIT});
actions.set("sw", {action: Action.SOUTHWEST, type: ActionType.EXIT});

actions.set("up", {action: Action.UP, type: ActionType.EXIT});
actions.set("u", {action: Action.UP, type: ActionType.EXIT});

actions.set("down", {action: Action.DOWN, type: ActionType.EXIT});
actions.set("d", {action: Action.DOWN, type: ActionType.EXIT});

actions.set("launch",   {action: Action.LAUNCH, type: ActionType.EXIT});
actions.set("land",     {action: Action.LAND, type: ActionType.EXIT});
actions.set("in",       {action: Action.IN, type: ActionType.EXIT});
actions.set("inside",   {action: Action.IN, type: ActionType.EXIT});
actions.set("go in",    {action: Action.IN, type: ActionType.EXIT});
actions.set("get in",    {action: Action.IN, type: ActionType.EXIT});
actions.set("go inside", {action: Action.IN, type: ActionType.EXIT});
actions.set("out",      {action: Action.OUT, type: ActionType.EXIT});
actions.set("go out",   {action: Action.OUT, type: ActionType.EXIT});
actions.set("get out",   {action: Action.OUT, type: ActionType.EXIT});
actions.set("go outside", {action: Action.OUT, type: ActionType.EXIT});
actions.set("outside",  {action: Action.OUT, type: ActionType.EXIT});
actions.set("exit",     {action: Action.OUT, type: ActionType.EXIT});
actions.set("slide",    {action: Action.SLIDE, type: ActionType.EXIT});
actions.set("swim",     {action: Action.SWIM, type: ActionType.EXIT});

// Reflexive actions: no interaction with game objects
actions.set("brief", {action: Action.BRIEF, type: ActionType.REFLEXIVE});
actions.set("deboard", {action: Action.DEBOARD, type: ActionType.REFLEXIVE});
actions.set("disembark", {action: Action.DEBOARD, type: ActionType.REFLEXIVE});
actions.set("exit boat", {action: Action.DEBOARD, type: ActionType.REFLEXIVE});
actions.set("get out of boat", {action: Action.DEBOARD, type: ActionType.REFLEXIVE});
actions.set("leave boat", {action: Action.DEBOARD, type: ActionType.REFLEXIVE});
actions.set("diagnose", {action: Action.DIAGNOSE, type: ActionType.REFLEXIVE});
actions.set("inventory", {action: Action.INVENTORY, type: ActionType.REFLEXIVE});
actions.set("i",         {action: Action.INVENTORY, type: ActionType.REFLEXIVE});
actions.set("jump",  {action: Action.JUMP, type: ActionType.REFLEXIVE});
actions.set("leap",  {action: Action.JUMP, type: ActionType.REFLEXIVE});
actions.set("look around",  {action: Action.LOOK, type: ActionType.REFLEXIVE});
actions.set("look",  {action: Action.LOOK, type: ActionType.REFLEXIVE});
actions.set("l",     {action: Action.LOOK, type: ActionType.REFLEXIVE});
actions.set("quit",  {action: Action.QUIT, type: ActionType.REFLEXIVE});
actions.set("q",     {action: Action.QUIT, type: ActionType.REFLEXIVE});
actions.set("restart", {action: Action.RESTART, type: ActionType.REFLEXIVE});
actions.set("restore", {action: Action.RESTORE, type: ActionType.REFLEXIVE});
actions.set("save", {action: Action.SAVE, type: ActionType.REFLEXIVE});
actions.set("score", {action: Action.SCORE, type: ActionType.REFLEXIVE});
actions.set("shout", {action: Action.SHOUT, type: ActionType.REFLEXIVE});
actions.set("yell",  {action: Action.SHOUT, type: ActionType.REFLEXIVE});
actions.set("scream",  {action: Action.SHOUT, type: ActionType.REFLEXIVE});
actions.set("superbrief", {action: Action.SUPERBRIEF, type: ActionType.REFLEXIVE});
actions.set("pray", {action: Action.PRAY, type: ActionType.REFLEXIVE});
actions.set("verbose", {action: Action.VERBOSE, type: ActionType.REFLEXIVE});
actions.set("wait", {action: Action.WAIT, type: ActionType.REFLEXIVE});


// Direct object interaction actions

actions.set("answer", {action: Action.ANSWER, type: ActionType.DIRECT});
actions.set("blow", {action: Action.BLOW, type: ActionType.DIRECT});
actions.set("board", {action: Action.BOARD, type: ActionType.DIRECT});
actions.set("get on", {action: Action.BOARD, type: ActionType.DIRECT});
actions.set("get in", {action: Action.BOARD, type: ActionType.DIRECT});
actions.set("sit on", {action: Action.BOARD, type: ActionType.DIRECT});
actions.set("brush", {action: Action.BRUSH, type: ActionType.DIRECT});
actions.set("climb", {action: Action.CLIMB, type: ActionType.DIRECT});
actions.set("close", {action: Action.CLOSE, type: ActionType.DIRECT});
actions.set("count", {action: Action.COUNT, type: ActionType.DIRECT});
actions.set("cross", {action: Action.CROSS, type: ActionType.DIRECT});
actions.set("deflate", {action: Action.DEFLATE, type: ActionType.DIRECT});
actions.set("uninflate", {action: Action.DEFLATE, type: ActionType.DIRECT});
actions.set("drink", {action: Action.DRINK, type: ActionType.DIRECT});
actions.set("drop", {action: Action.DROP, type: ActionType.DIRECT});
actions.set("eat", {action: Action.EAT, type: ActionType.DIRECT});
actions.set("enter", {action: Action.ENTER, type: ActionType.DIRECT});
actions.set("examine", {action: Action.EXAMINE, type: ActionType.DIRECT});
actions.set("look at", {action: Action.EXAMINE, type: ActionType.DIRECT});
actions.set("l at", {action: Action.EXAMINE, type: ActionType.DIRECT});
actions.set("extinguish", {action: Action. EXTINGUISH, type: ActionType.DIRECT});
actions.set("turn off", {action: Action. EXTINGUISH, type: ActionType.DIRECT});
actions.set("follow", {action: Action.FOLLOW, type: ActionType.DIRECT});
actions.set("greet", {action: Action.GREET, type: ActionType.DIRECT});
actions.set("hello", {action: Action.GREET, type: ActionType.DIRECT});
actions.set("say hello", {action: Action.GREET, type: ActionType.DIRECT});
actions.set("kick", {action: Action.KICK, type: ActionType.DIRECT});
actions.set("knock", {action: Action.KNOCK, type: ActionType.DIRECT});
actions.set("light", {action: Action.LIGHT, type: ActionType.DIRECT});
actions.set("turn on", {action: Action.LIGHT, type: ActionType.DIRECT});
actions.set("listen", {action: Action.LISTEN, type: ActionType.DIRECT});
actions.set("look in", {action: Action.LOOK_IN, type: ActionType.DIRECT});
actions.set("l in", {action: Action.LOOK_IN, type: ActionType.DIRECT});
actions.set("look out", {action: Action.LOOK_OUT, type: ActionType.DIRECT});
actions.set("l out", {action: Action.LOOK_OUT, type: ActionType.DIRECT});
actions.set("look under", {action: Action.LOOK_UNDER, type: ActionType.DIRECT});
actions.set("l under", {action: Action.LOOK_UNDER, type: ActionType.DIRECT});
actions.set("lower", {action: Action.LOWER, type: ActionType.DIRECT});
actions.set("move", {action: Action.MOVE_OBJECT, type: ActionType.DIRECT});
actions.set("open", {action: Action.OPEN, type: ActionType.DIRECT});
actions.set("pour", {action: Action.POUR, type: ActionType.DIRECT});
actions.set("pull", {action: Action.PULL, type: ActionType.DIRECT});
actions.set("press", {action: Action.PUSH, type: ActionType.DIRECT});
actions.set("push", {action: Action.PUSH, type: ActionType.DIRECT});
actions.set("raise", {action: Action.RAISE, type: ActionType.DIRECT});
actions.set("read", {action: Action.READ, type: ActionType.DIRECT});
actions.set("remove", {action: Action.REMOVE, type: ActionType.DIRECT});
actions.set("mend", {action: Action.REPAIR, type: ActionType.DIRECT});
actions.set("repair", {action: Action.REPAIR, type: ActionType.DIRECT});
actions.set("fix", {action: Action.REPAIR, type: ActionType.DIRECT});
actions.set("ring", {action: Action.RING, type: ActionType.DIRECT});
actions.set("search", {action: Action.SEARCH, type: ActionType.DIRECT});
actions.set("shake", {action: Action.SHAKE, type: ActionType.DIRECT});
actions.set("smell", {action: Action.SMELL, type: ActionType.DIRECT});
actions.set("stay", {action: Action.STAY, type: ActionType.DIRECT});
actions.set("take", {action: Action.TAKE, type: ActionType.DIRECT});
actions.set("pick up", {action: Action.TAKE, type: ActionType.DIRECT});
actions.set("get", {action: Action.TAKE, type: ActionType.DIRECT});
actions.set("acquire", {action: Action.TAKE, type: ActionType.DIRECT});
actions.set("talk to", {action: Action.TALK_TO, type: ActionType.DIRECT});
actions.set("touch", {action: Action.TOUCH, type: ActionType.DIRECT});
actions.set("detach", {action: Action.UNTIE, type: ActionType.DIRECT});
actions.set("untie", {action: Action.UNTIE, type: ActionType.DIRECT});
actions.set("wake", {action: Action.WAKE, type: ActionType.DIRECT});
actions.set("wave", {action: Action.WAVE, type: ActionType.DIRECT});
actions.set("wear", {action: Action.WEAR, type: ActionType.DIRECT});
actions.set("wind", {action: Action.WIND, type: ActionType.DIRECT});


actions.set("say", {action: Action.SAY, type: ActionType.SPEAK});

// Indirect actions
actions.set("attack", {action: Action.ATTACK, type: ActionType.INDIRECT});
actions.set("kill", {action: Action.ATTACK, type: ActionType.INDIRECT});
actions.set("fight", {action: Action.ATTACK, type: ActionType.INDIRECT});
actions.set("break", {action: Action.BREAK, type: ActionType.INDIRECT});
actions.set("burn", {action: Action.BURN, type: ActionType.INDIRECT});
actions.set("cut", {action: Action.CUT, type: ActionType.INDIRECT});
actions.set("dig", {action: Action.DIG, type: ActionType.INDIRECT});
actions.set("dig in", {action: Action.DIG, type: ActionType.INDIRECT});
actions.set("fill", {action: Action.FILL, type: ActionType.INDIRECT});
actions.set("inflate", {action: Action.INFLATE, type: ActionType.INDIRECT});
actions.set("pump up", {action: Action.INFLATE, type: ActionType.INDIRECT});
actions.set("pump", {action: Action.INFLATE, type: ActionType.INDIRECT});

actions.set("turn", {action: Action.TURN, type: ActionType.INDIRECT});
actions.set("unlock", {action: Action.UNLOCK, type: ActionType.INDIRECT});
actions.set("lock", {action: Action.LOCK, type: ActionType.INDIRECT});
actions.set("strike", {action: Action.STRIKE, type: ActionType.INDIRECT});

actions.set("give", {action: Action.GIVE, type: ActionType.INDIRECT_INVERSE});
actions.set("place", {action: Action.PUT, type: ActionType.INDIRECT_INVERSE});
actions.set("put", {action: Action.PUT, type: ActionType.INDIRECT_INVERSE});
actions.set("throw", {action: Action.THROW, type: ActionType.INDIRECT_INVERSE});
actions.set("tie", {action: Action.TIE, type: ActionType.INDIRECT_INVERSE});

const prepositions = new Map();

prepositions.set("ATTACK", "with");
prepositions.set("BREAK", "with");
prepositions.set("BURN", "with");
prepositions.set("CUT", "with");
prepositions.set("DIG", "with");
prepositions.set("FILL", "with");
prepositions.set("GIVE", "to");
prepositions.set("INFLATE", "with");
prepositions.set("LOCK", "with");
prepositions.set("PUT", "in");
prepositions.set("THROW", "at");
prepositions.set("TIE", "to");
prepositions.set("TURN", "with");
prepositions.set("UNLOCK", "with");


const Location = {

    NULL_LOCATION: "NULL_LOCATION",
    NULL_INVENTORY: "NULL_INVENTORY",
    WEST_OF_HOUSE: "WEST_OF_HOUSE",
    NORTH_OF_HOUSE: "NORTH_OF_HOUSE",
    BEHIND_HOUSE: "BEHIND_HOUSE",
    SOUTH_OF_HOUSE: "SOUTH_OF_HOUSE",
    ATTIC: "ATTIC",
    KITCHEN: "KITCHEN",
    LIVING_ROOM: "LIVING_ROOM",
    FOREST_PATH: "FOREST_PATH",
    FOREST_WEST: "FOREST_WEST",
    FOREST_EAST: "FOREST_EAST",
    FOREST_NORTHEAST: "FOREST_NORTHEAST",
    FOREST_SOUTH: "FOREST_SOUTH",
    CLEARING_NORTH: "CLEARING_NORTH",
    CLEARING_EAST: "CLEARING_EAST",
    UP_TREE: "UP_TREE",
    CANYON_VIEW: "CANYON_VIEW",
    ROCKY_LEDGE: "ROCKY_LEDGE",
    CANYON_BOTTOM: "CANYON_BOTTOM",
    END_OF_RAINBOW: "END_OF_RAINBOW",
    STONE_BARROW: "STONE_BARROW",
    INSIDE_STONE_BARROW: "INSIDE_STONE_BARROW",

    CELLAR: "CELLAR",
    EAST_OF_CHASM: "EAST_OF_CHASM",
    GALLERY: "GALLERY",
    STUDIO: "STUDIO",
    TROLL_ROOM: "TROLL_ROOM",
    EAST_WEST_PASSAGE: "EAST_WEST_PASSAGE",
    ROUND_ROOM: "ROUND_ROOM",
    NARROW_PASSAGE: "NARROW_PASSAGE",
    MIRROR_ROOM_SOUTH: "MIRROR_ROOM_SOUTH",
    WINDING_PASSAGE: "WINDING_PASSAGE",
    CAVE_SOUTH: "CAVE_SOUTH",
    ENTRANCE_TO_HADES: "ENTRANCE_TO_HADES",
    LAND_OF_THE_DEAD: "LAND_OF_THE_DEAD",
    ALTAR: "ALTAR",
    TEMPLE: "TEMPLE",
    EGYPTIAN_ROOM: "EGYPTIAN_ROOM",
    TORCH_ROOM: "TORCH_ROOM",
    DOME_ROOM: "DOME_ROOM",
    ENGRAVINGS_CAVE: "ENGRAVINGS_CAVE",

    LOUD_ROOM: "LOUD_ROOM",
    DAMP_CAVE: "DAMP_CAVE",
    WHITE_CLIFFS_BEACH_NORTH: "WHITE_CLIFFS_BEACH_NORTH",
    WHITE_CLIFFS_BEACH_SOUTH: "WHITE_CLIFFS_BEACH_SOUTH",
    FRIGID_RIVER_1: "FRIGID_RIVER_1",
    FRIGID_RIVER_2: "FRIGID_RIVER_2",
    FRIGID_RIVER_3: "FRIGID_RIVER_3",
    FRIGID_RIVER_4: "FRIGID_RIVER_4",
    FRIGID_RIVER_5: "FRIGID_RIVER_5",
    SANDY_BEACH: "SANDY_BEACH",
    SANDY_CAVE: "SANDY_CAVE",
    SHORE: "SHORE",
    ARAGAIN_FALLS: "ARAGAIN_FALLS",
    ON_THE_RAINBOW: "ON_THE_RAINBOW",
    DAM_BASE: "DAM_BASE",
    DAM: "DAM",
    DAM_LOBBY: "DAM_LOBBY",
    MAINTENANCE_ROOM: "MAINTENANCE_ROOM",

    NORTH_SOUTH_PASSAGE: "NORTH_SOUTH_PASSAGE",
    CHASM: "CHASM",
    DEEP_CANYON: "DEEP_CANYON",
    RESERVOIR_SOUTH: "RESERVOIR_SOUTH",
    STREAM_VIEW: "STREAM_VIEW",
    STREAM: "STREAM",
    RESERVOIR: "RESERVOIR",
    RESERVOIR_EMPTY: "RESERVOIR_EMPTY",
    RESERVOIR_NORTH: "RESERVOIR_NORTH",
    ATLANTIS_ROOM: "ATLANTIS_ROOM",
    CAVE_NORTH: "CAVE_NORTH",
    TWISTING_PASSAGE: "TWISTING_PASSAGE",
    MIRROR_ROOM_NORTH: "MIRROR_ROOM_NORTH",
    COLD_PASSAGE: "COLD_PASSAGE",
    SLIDE_ROOM: "SLIDE_ROOM",
    MINE_ENTRANCE: "MINE_ENTRANCE",
    SQUEAKY_ROOM: "SQUEAKY_ROOM",
    BAT_ROOM: "BAT_ROOM",

    SHAFT_ROOM: "SHAFT_ROOM",
    SMELLY_ROOM: "SMELLY_ROOM",
    GAS_ROOM: "GAS_ROOM",
    COAL_MINE_1: "COAL_MINE_1",
    COAL_MINE_2: "COAL_MINE_2",
    COAL_MINE_3: "COAL_MINE_3",
    COAL_MINE_4: "COAL_MINE_4",
    LADDER_TOP: "LADDER_TOP",
    LADDER_BOTTOM: "LADDER_BOTTOM",
    DEAD_END_COAL_MINE: "DEAD_END_COAL_MINE",
    TIMBER_ROOM: "TIMBER_ROOM",
    DRAFTY_ROOM: "DRAFTY_ROOM",
    MACHINE_ROOM: "MACHINE_ROOM",

    GRATING_ROOM: "GRATING_ROOM",
    CYCLOPS_ROOM: "CYCLOPS_ROOM",
    STRANGE_PASSAGE: "STRANGE_PASSAGE",
    TREASURE_ROOM: "TREASURE_ROOM",
    TREASURE_ROOM_INVISIBLE: "TREASURE_ROOM_INVISIBLE",

    MAZE_1: "MAZE_1",
    MAZE_2: "MAZE_2",
    MAZE_3: "MAZE_3",
    MAZE_4: "MAZE_4",
    MAZE_5: "MAZE_5",
    MAZE_6: "MAZE_6",
    MAZE_7: "MAZE_7",
    MAZE_8: "MAZE_8",
    MAZE_9: "MAZE_9",
    MAZE_10: "MAZE_10",
    MAZE_11: "MAZE_11",
    MAZE_12: "MAZE_12",
    MAZE_13: "MAZE_13",
    MAZE_14: "MAZE_14",
    MAZE_15: "MAZE_15",
    DEAD_END_MAZE_NORTH: "DEAD_END_MAZE_NORTH",
    DEAD_END_MAZE_SOUTHEAST: "DEAD_END_MAZE_SOUTHEAST",
    DEAD_END_MAZE_CENTER: "DEAD_END_MAZE_CENTER",
    DEAD_END_MAZE_SOUTHWEST: "DEAD_END_MAZE_SOUTHWEST",

    INSIDE_BIRDS_NEST: "INSIDE_BIRDS_NEST",
    INSIDE_BROKEN_EGG: "INSIDE_BROKEN_EGG",
    INSIDE_BUOY: "INSIDE_BUOY",
    INSIDE_COFFIN: "INSIDE_COFFIN",
    INSIDE_EGG: "INSIDE_EGG",
    INSIDE_MAILBOX: "INSIDE_MAILBOX",
    INSIDE_TROPHY_CASE: "INSIDE_TROPHY_CASE",
    INSIDE_SACK: "INSIDE_SACK",
    INSIDE_BOAT: "INSIDE_BOAT",
    INSIDE_BASKET: "INSIDE_BASKET",
    INSIDE_TUBE: "INSIDE_TUBE",
    INSIDE_COAL_MACHINE: "INSIDE_COAL_MACHINE",

    ON_ALTAR: "ON_ALTAR",
    ON_ATTIC_TABLE: "ON_ATTIC_TABLE",
    ON_KITCHEN_TABLE: "ON_KITCHEN_TABLE",
    ON_PEDESTAL: "ON_PEDESTAL",
    ON_RAILING: "ON_RAILING",

    PLAYER_INVENTORY: "PLAYER_INVENTORY",
    THIEF_INVENTORY: "THIEF_INVENTORY",
    TROLL_INVENTORY: "TROLL_INVENTORY",
    CYCLOPS_INVENTORY: "CYCLOPS_INVENTORY"
};



Object.freeze(Location);

const GAME_WORDS = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", 
    "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
    "u", "v", "w", "x", "y", "z", "ne", "nw", "se", "sw",
    "again", "an", "around", "at", "attach", "attack", "author",
    "bar", "bell", "bird", "bottle", "box", "bug",
    "carpet", "case", "close",
    "door", "down", "drop",
    "east", "egg", "examine", "exit",
    "five", "fuck",
    "giant", "go",
    "hand", "high", "highfive", "hit", "house",
    "in", "inn", "inside", "inventory",
    "jump", "juniper",
    "key", "kick", "kitchen", "knife",
    "lantern", "leaflet", "light", "lock", "look",
    "mailbox", "move",
    "nest", "next", "north", "northeast", "northwest", "note",
    "odysseus", "off", "on", "open", "out",
    "passage", "piano", "pick", "pile", "place", "put", "play", "please", "pull", "punch",
    "quit",
    "read", "ring", "room", "rope",
    "sack", "say", "scream", "shit", "shout", "slap", "songbird", "south", "southeast", "southwest", "store", "sword",
    "take", "the", "tie", "to", "trap", "trophy", "turn",
    "ulysses", "unlock", "up",
    "wait", "walk", "west", "window", "with", "wizard",
    "yell"
    ];

const THIEF_LOCATIONS = [

    "EAST_OF_CHASM", "GALLERY", "STUDIO", "EAST_WEST_PASSAGE", "ROUND_ROOM",
    "NARROW_PASSAGE", "MIRROR_ROOM_SOUTH", "WINDING_PASSAGE", "CAVE_SOUTH",
    "ALTAR", "TEMPLE", "EGYPTIAN_ROOM", "TORCH_ROOM", "DOME_ROOM",
    "ENGRAVINGS_CAVE", "DAMP_CAVE", "WHITE_CLIFFS_BEACH_NORTH", "WHITE_CLIFFS_BEACH_SOUTH",
    "DAM_BASE", "DAM", "DAM_LOBBY", "MAINTENANCE_ROOM", "NORTH_SOUTH_PASSAGE", "CHASM",
    "DEEP_CANYON", "RESERVOIR_SOUTH", "STREAM_VIEW", "RESERVOIR_EMPTY", "RESERVOIR_NORTH",
    "ATLANTIS_ROOM", "CAVE_NORTH", "TWISTING_PASSAGE", "MIRROR_ROOM_NORTH", "COLD_PASSAGE",
    "SLIDE_ROOM", "MINE_ENTRANCE", "SQUEAKY_ROOM", "SHAFT_ROOM", "SMELLY_ROOM", "GAS_ROOM",
    "COAL_MINE_1", "COAL_MINE_2", "COAL_MINE_3", "COAL_MINE_4", "LADDER_TOP",
    "LADDER_BOTTOM", "DEAD_END_COAL_MINE", "TIMBER_ROOM", "GRATING_ROOM", "TREASURE_ROOM",

    "MAZE_1", "MAZE_2", "MAZE_3", "MAZE_4", "MAZE_5", "MAZE_6", "MAZE_7", "MAZE_8",
    "MAZE_9", "MAZE_10", "MAZE_11", "MAZE_12", "MAZE_13", "MAZE_14", "MAZE_15",
    "DEAD_END_MAZE_NORTH","DEAD_END_MAZE_SOUTHEAST",
    "DEAD_END_MAZE_CENTER", "DEAD_END_MAZE_SOUTHWEST"

    ];

const COAL_MINE = [
    "COAL_MINE_1", "COAL_MINE_2", "COAL_MINE_3", "COAL_MINE_4"

];

const OVERWORLD = [

    "WEST_OF_HOUSE", "NORTH_OF_HOUSE", "BEHIND_HOUSE", "SOUTH_OF_HOUSE", "FOREST_PATH",
    "FOREST_WEST", "FOREST_EAST", "FOREST_NORTHEAST", "FOREST_SOUTH", "CLEARING_NORTH",
    "CLEARING_EAST", "CANYON_VIEW", "ROCKY_LEDGE", "CANYON_BOTTOM"
];

const FOREST = [
    "FOREST_WEST", "FOREST_EAST", "FOREST_SOUTH", "FOREST_NORTHEAST"
];