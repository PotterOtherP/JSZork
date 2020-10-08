// Data structure declarations
const worldMap = new Map();
let objectList = new Map();
const currentObjects = new Map();
const dictionary = new Set();

// used in direct object validation
const gameNouns = new Set();

// for sorting by length
let currentObjectNames = [];
const actionPhrases = [];
const objectNameMap = new Map();

for (let phrase of actions.keys())
    actionPhrases.push(phrase);

actionPhrases.sort(function(a, b) {
    return (a.length > b.length)? -1 : 0;
});

const dummyObject = new GameObject("dummy_object", Location.NULL_LOCATION);

// Overworld passages
const house_west_north = new Passage(Location.WEST_OF_HOUSE, Location.NORTH_OF_HOUSE);
const house_west_south = new Passage(Location.WEST_OF_HOUSE, Location.SOUTH_OF_HOUSE);
const house_west_barrow = new Passage(Location.WEST_OF_HOUSE, Location.STONE_BARROW);
const house_west_forestW = new Passage(Location.WEST_OF_HOUSE, Location.FOREST_WEST);
const house_north_forestpath = new Passage(Location.NORTH_OF_HOUSE, Location.FOREST_PATH);
const house_north_behind = new Passage(Location.NORTH_OF_HOUSE, Location.BEHIND_HOUSE);
const house_behind_clearingE = new Passage(Location.BEHIND_HOUSE, Location.CLEARING_EAST);
const house_behind_south = new Passage(Location.BEHIND_HOUSE, Location.SOUTH_OF_HOUSE);
const house_behind_kitchen = new Passage(Location.BEHIND_HOUSE, Location.KITCHEN);
const house_south_forestS = new Passage(Location.SOUTH_OF_HOUSE, Location.FOREST_SOUTH);
const kitchen_attic = new Passage(Location.KITCHEN, Location.ATTIC);
const kitchen_livingroom = new Passage(Location.KITCHEN, Location.LIVING_ROOM);
const forestpath_clearingN = new Passage(Location.FOREST_PATH, Location.CLEARING_NORTH);
const forestpath_forestE = new Passage(Location.FOREST_PATH, Location.FOREST_EAST);
const forestpath_forestW = new Passage(Location.FOREST_PATH, Location.FOREST_WEST);
const forestpath_uptree = new Passage(Location.FOREST_PATH, Location.UP_TREE);
const clearingN_forestE = new Passage(Location.CLEARING_NORTH, Location.FOREST_EAST);
const clearingN_forestW = new Passage(Location.CLEARING_NORTH, Location.FOREST_WEST);
const forestE_clearingE = new Passage(Location.FOREST_EAST, Location.CLEARING_EAST);
const forestE_forestNE = new Passage(Location.FOREST_EAST, Location.FOREST_NORTHEAST);
const clearingE_forestS = new Passage(Location.CLEARING_EAST, Location.FOREST_SOUTH);
const clearingE_canyon = new Passage(Location.CLEARING_EAST, Location.CANYON_VIEW);
const forestS_canyon = new Passage(Location.FOREST_SOUTH, Location.CANYON_VIEW);
const forestS_forestW = new Passage(Location.FOREST_SOUTH, Location.FOREST_WEST);
const canyon_ledge = new Passage(Location.CANYON_VIEW, Location.ROCKY_LEDGE);
const ledge_bottom = new Passage(Location.ROCKY_LEDGE, Location.CANYON_BOTTOM);
const canyon_bottom_rainbow = new Passage(Location.CANYON_BOTTOM, Location.END_OF_RAINBOW);
const barrowInside = new Passage(Location.STONE_BARROW, Location.INSIDE_STONE_BARROW);

// GUE southern passages
const cellar_livingroom = new Passage(Location.CELLAR, Location.LIVING_ROOM);
const cellar_troll = new Passage(Location.CELLAR, Location.TROLL_ROOM);
const cellar_eastchasm = new Passage(Location.CELLAR, Location.EAST_OF_CHASM);
const eastchasm_gallery = new Passage(Location.EAST_OF_CHASM, Location.GALLERY);
const gallery_studio = new Passage(Location.GALLERY, Location.STUDIO);
const studio_kitchen = new Passage(Location.STUDIO, Location.KITCHEN);
const troll_eastwest = new Passage(Location.TROLL_ROOM, Location.EAST_WEST_PASSAGE);
const eastwest_chasm  = new Passage(Location.EAST_WEST_PASSAGE, Location.CHASM);
const eastwest_round = new Passage(Location.EAST_WEST_PASSAGE, Location.ROUND_ROOM);
const round_northsouth = new Passage(Location.ROUND_ROOM, Location.NORTH_SOUTH_PASSAGE);
const round_narrow = new Passage(Location.ROUND_ROOM, Location.NARROW_PASSAGE);
const round_loud = new Passage(Location.ROUND_ROOM, Location.LOUD_ROOM);
const round_engravings = new Passage(Location.ROUND_ROOM, Location.ENGRAVINGS_CAVE);
const narrow_mirror = new Passage(Location.NARROW_PASSAGE, Location.MIRROR_ROOM_SOUTH);
const mirror_winding = new Passage(Location.MIRROR_ROOM_SOUTH, Location.WINDING_PASSAGE);
const mirrorsouth_cave = new Passage(Location.MIRROR_ROOM_SOUTH, Location.CAVE_SOUTH);
const winding_cave = new Passage(Location.WINDING_PASSAGE, Location.CAVE_SOUTH);
const cave_hades = new Passage(Location.CAVE_SOUTH, Location.ENTRANCE_TO_HADES);
const hades_land_dead = new Passage(Location.ENTRANCE_TO_HADES, Location.LAND_OF_THE_DEAD);
const engravings_dome = new Passage(Location.ENGRAVINGS_CAVE, Location.DOME_ROOM);
const dome_torch = new Passage(Location.DOME_ROOM, Location.TORCH_ROOM);
const torch_temple = new Passage(Location.TORCH_ROOM, Location.TEMPLE);
const temple_egypt = new Passage(Location.TEMPLE, Location.EGYPTIAN_ROOM);
const temple_altar = new Passage(Location.TEMPLE, Location.ALTAR);
const altar_cave = new Passage(Location.ALTAR, Location.CAVE_SOUTH);
const cyclops_strange = new Passage(Location.CYCLOPS_ROOM, Location.STRANGE_PASSAGE);
const cyclops_treasure = new Passage(Location.CYCLOPS_ROOM, Location.TREASURE_ROOM);
const strange_living_room = new Passage(Location.STRANGE_PASSAGE, Location.LIVING_ROOM);
const grating_clearing = new Passage(Location.GRATING_ROOM, Location.CLEARING_NORTH);

// GUE dam area passages
const loud_damp = new Passage(Location.LOUD_ROOM, Location.DAMP_CAVE);
const loud_deep_canyon = new Passage(Location.LOUD_ROOM, Location.DEEP_CANYON);
const damp_white_north = new Passage(Location.DAMP_CAVE, Location.WHITE_CLIFFS_BEACH_NORTH);
const white_cliffs_north_south = new Passage(Location.WHITE_CLIFFS_BEACH_NORTH, Location.WHITE_CLIFFS_BEACH_SOUTH);
const white_north_river = new Passage(Location.WHITE_CLIFFS_BEACH_NORTH, Location.FRIGID_RIVER_3);
const white_south_river = new Passage(Location.WHITE_CLIFFS_BEACH_SOUTH, Location.FRIGID_RIVER_4);
const river_one_two = new Passage(Location.FRIGID_RIVER_1, Location.FRIGID_RIVER_2);
const river_two_three = new Passage(Location.FRIGID_RIVER_2, Location.FRIGID_RIVER_3);
const river_three_four = new Passage(Location.FRIGID_RIVER_3, Location.FRIGID_RIVER_4);
const river_four_five = new Passage(Location.FRIGID_RIVER_4, Location.FRIGID_RIVER_5);
const river_sandy_beach = new Passage(Location.FRIGID_RIVER_4, Location.SANDY_BEACH);
const river_shore = new Passage(Location.FRIGID_RIVER_5, Location.SHORE);
const sandy_beach_cave = new Passage(Location.SANDY_BEACH, Location.SANDY_CAVE);
const sandy_beach_shore = new Passage(Location.SANDY_BEACH, Location.SHORE);
const shore_falls = new Passage(Location.SHORE, Location.ARAGAIN_FALLS);
const falls_rainbow = new Passage(Location.ARAGAIN_FALLS, Location.ON_THE_RAINBOW);
const rainbow_end = new Passage(Location.ON_THE_RAINBOW, Location.END_OF_RAINBOW);
const dam_base_river = new Passage(Location.DAM_BASE, Location.FRIGID_RIVER_1);
const dam_dam_base = new Passage(Location.DAM, Location.DAM_BASE);
const dam_dam_lobby = new Passage(Location.DAM, Location.DAM_LOBBY);
const dam_lobby_maintenance = new Passage(Location.DAM_LOBBY, Location.MAINTENANCE_ROOM);
const dam_deep_canyon = new Passage(Location.DAM, Location.DEEP_CANYON);
const dam_res_south = new Passage(Location.DAM, Location.RESERVOIR_SOUTH);
const northsouth_deep_canyon = new Passage(Location.NORTH_SOUTH_PASSAGE, Location.DEEP_CANYON);
const northsouth_chasm = new Passage(Location.NORTH_SOUTH_PASSAGE, Location.CHASM);
const res_south_chasm = new Passage(Location.RESERVOIR_SOUTH, Location.CHASM);
const res_south_stream_view = new Passage(Location.RESERVOIR_SOUTH, Location.STREAM_VIEW);
const res_south_res = new Passage(Location.RESERVOIR_SOUTH, Location.RESERVOIR);
const res_south_deep = new Passage(Location.RESERVOIR_SOUTH, Location.DEEP_CANYON);
const stream_view_stream = new Passage(Location.STREAM_VIEW, Location.STREAM);
const res_south_res_empty = new Passage(Location.RESERVOIR_SOUTH, Location.RESERVOIR_EMPTY);
const res_north_res_empty = new Passage(Location.RESERVOIR_NORTH, Location.RESERVOIR_EMPTY);
const stream_res_empty = new Passage(Location.STREAM, Location.RESERVOIR_EMPTY);

// GUE northern passages
const reservoir_stream = new Passage(Location.RESERVOIR, Location.STREAM);
const res_north_res = new Passage(Location.RESERVOIR_NORTH, Location.RESERVOIR);
const res_north_atlantis = new Passage(Location.RESERVOIR_NORTH, Location.ATLANTIS_ROOM);
const atlantis_cave = new Passage(Location.ATLANTIS_ROOM, Location.CAVE_NORTH);
const cave_twisting = new Passage(Location.CAVE_NORTH, Location.TWISTING_PASSAGE);
const cave_mirrornorth = new Passage(Location.CAVE_NORTH, Location.MIRROR_ROOM_NORTH);
const twisting_mirror = new Passage(Location.TWISTING_PASSAGE, Location.MIRROR_ROOM_NORTH);
const mirror_cold = new Passage(Location.MIRROR_ROOM_NORTH, Location.COLD_PASSAGE);
const cold_slide = new Passage(Location.COLD_PASSAGE, Location.SLIDE_ROOM);
const slide_cellar = new Passage(Location.SLIDE_ROOM, Location.CELLAR);
const slide_mine_entrance = new Passage(Location.SLIDE_ROOM, Location.MINE_ENTRANCE);
const mine_entrance_squeaky = new Passage(Location.MINE_ENTRANCE, Location.SQUEAKY_ROOM);
const squeaky_bat = new Passage(Location.SQUEAKY_ROOM, Location.BAT_ROOM);
const bat_shaft = new Passage(Location.BAT_ROOM, Location.SHAFT_ROOM);

// Coal mine passages

const shaft_smelly = new Passage(Location.SHAFT_ROOM, Location.SMELLY_ROOM);
const smelly_gas = new Passage(Location.SMELLY_ROOM, Location.GAS_ROOM);
const gas_coal_1 = new Passage(Location.GAS_ROOM, Location.COAL_MINE_1);
const coal_1_self = new Passage(Location.COAL_MINE_1, Location.COAL_MINE_1);
const coal_1_coal_2 = new Passage(Location.COAL_MINE_1, Location.COAL_MINE_2);
const coal_2_self = new Passage(Location.COAL_MINE_2, Location.COAL_MINE_2);
const coal_2_coal_3 = new Passage(Location.COAL_MINE_2, Location.COAL_MINE_3);
const coal_3_self = new Passage(Location.COAL_MINE_3, Location.COAL_MINE_3);
const coal_3_coal_4 = new Passage(Location.COAL_MINE_3, Location.COAL_MINE_4);
const coal_4_self = new Passage(Location.COAL_MINE_4, Location.COAL_MINE_4);
const coal_4_ladder_top = new Passage(Location.COAL_MINE_4, Location.LADDER_TOP);
const ladder_top_bottom = new Passage(Location.LADDER_TOP, Location.LADDER_BOTTOM);
const ladder_bottom_dead_end = new Passage(Location.LADDER_BOTTOM, Location.DEAD_END_COAL_MINE);
const ladder_bottom_timber = new Passage(Location.LADDER_BOTTOM, Location.TIMBER_ROOM);
const timber_drafty = new Passage(Location.TIMBER_ROOM, Location.DRAFTY_ROOM);
const drafty_machine = new Passage(Location.DRAFTY_ROOM, Location.MACHINE_ROOM);

// Maze passages
const troll_maze = new Passage(Location.TROLL_ROOM, Location.MAZE_1);
const maze1_maze2 = new Passage(Location.MAZE_1, Location.MAZE_2);
const maze1_maze4 = new Passage(Location.MAZE_1, Location.MAZE_4);
const maze1_self = new Passage(Location.MAZE_1, Location.MAZE_1);
const maze2_maze3 = new Passage(Location.MAZE_2, Location.MAZE_3);
const maze2_maze4 = new Passage(Location.MAZE_2, Location.MAZE_4);
const maze3_maze4 = new Passage(Location.MAZE_3, Location.MAZE_4);
const maze3_maze5 = new Passage(Location.MAZE_3, Location.MAZE_5);
const maze4_dead_end = new Passage(Location.MAZE_4, Location.DEAD_END_MAZE_NORTH);
const maze5_maze6 = new Passage(Location.MAZE_5, Location.MAZE_6);
const maze5_dead_end = new Passage(Location.MAZE_5, Location.DEAD_END_MAZE_CENTER);
const maze6_maze7 = new Passage(Location.MAZE_6, Location.MAZE_7);
const maze6_maze9 = new Passage(Location.MAZE_6, Location.MAZE_9);
const maze6_self = new Passage(Location.MAZE_6, Location.MAZE_6);
const maze7_dead_end = new Passage(Location.MAZE_7, Location.DEAD_END_MAZE_NORTH);
const maze7_maze8 = new Passage(Location.MAZE_7, Location.MAZE_8);
const maze7_maze14 = new Passage(Location.MAZE_7, Location.MAZE_14);
const maze7_maze15 = new Passage(Location.MAZE_7, Location.MAZE_15);
const maze8_dead_end = new Passage(Location.MAZE_8, Location.DEAD_END_MAZE_SOUTHEAST);
const maze8_self = new Passage(Location.MAZE_8, Location.MAZE_8);
const maze9_maze10 = new Passage(Location.MAZE_9, Location.MAZE_10);
const maze9_maze11 = new Passage(Location.MAZE_9, Location.MAZE_11);
const maze9_maze12 = new Passage(Location.MAZE_9, Location.MAZE_12);
const maze9_maze13 = new Passage(Location.MAZE_9, Location.MAZE_13);
const maze9_self = new Passage(Location.MAZE_9, Location.MAZE_9);
const maze10_maze11 = new Passage(Location.MAZE_10, Location.MAZE_11);
const maze10_maze13 = new Passage(Location.MAZE_10, Location.MAZE_13);
const maze11_maze12 = new Passage(Location.MAZE_11, Location.MAZE_12);
const maze11_maze13 = new Passage(Location.MAZE_11, Location.MAZE_13);
const maze11_grating = new Passage(Location.MAZE_11, Location.GRATING_ROOM);
const maze12_maze13 = new Passage(Location.MAZE_12, Location.MAZE_13);
const maze12_maze5 = new Passage(Location.MAZE_12, Location.MAZE_5);
const maze12_dead_end = new Passage(Location.MAZE_12, Location.DEAD_END_MAZE_SOUTHEAST);
const maze14_maze15 = new Passage(Location.MAZE_14, Location.MAZE_15);
const maze14_self = new Passage(Location.MAZE_14, Location.MAZE_14);
const maze15_cyclops = new Passage(Location.MAZE_15, Location.CYCLOPS_ROOM);


// Rooms
const westOfHouse = new Room("West of House", MapStrings.DESC_WEST_OF_HOUSE, Location.WEST_OF_HOUSE);
westOfHouse.addExit(Action.NORTH, house_west_north);
westOfHouse.addExit(Action.SOUTH, house_west_south);
westOfHouse.addExit(Action.SOUTHEAST, house_west_south);
westOfHouse.addExit(Action.SOUTHWEST, house_west_barrow);
westOfHouse.addExit(Action.WEST, house_west_forestW);
westOfHouse.addFailMessage(Action.EAST, "The door is boarded and you can't remove the boards.");
westOfHouse.addFailMessage(Action.IN, "The door is boarded and you can't remove the boards.");

const northOfHouse = new Room("North of House", MapStrings.DESC_NORTH_OF_HOUSE, Location.NORTH_OF_HOUSE);
northOfHouse.addExit(Action.NORTH, house_north_forestpath);
northOfHouse.addExit(Action.EAST, house_north_behind);
northOfHouse.addExit(Action.SOUTHEAST, house_north_behind);
northOfHouse.addExit(Action.SOUTHWEST, house_west_north);
northOfHouse.addExit(Action.WEST, house_west_north);
northOfHouse.addFailMessage(Action.SOUTH, "The windows are all boarded.");

const behindHouse = new Room("Behind House", MapStrings.DESC_BEHIND_HOUSE, Location.BEHIND_HOUSE);
behindHouse.addExit(Action.NORTH, house_north_behind);
behindHouse.addExit(Action.NORTHWEST, house_north_behind);
behindHouse.addExit(Action.EAST, house_behind_clearingE);
behindHouse.addExit(Action.SOUTH, house_behind_south);
behindHouse.addExit(Action.SOUTHWEST, house_behind_south);
behindHouse.addExit(Action.WEST, house_behind_kitchen);
behindHouse.addExit(Action.IN, house_behind_kitchen);

const southOfHouse = new Room("South of House", MapStrings.DESC_SOUTH_OF_HOUSE, Location.SOUTH_OF_HOUSE);
southOfHouse.addExit(Action.EAST, house_behind_south);
southOfHouse.addExit(Action.NORTHEAST, house_behind_south);
southOfHouse.addExit(Action.WEST, house_west_south);
southOfHouse.addExit(Action.NORTHWEST, house_west_south);
southOfHouse.addExit(Action.SOUTH, house_south_forestS);
southOfHouse.addFailMessage(Action.NORTH, "The windows are all boarded.");

const kitchen = new Room("Kitchen", MapStrings.DESC_KITCHEN_WINDOW_CLOSED, Location.KITCHEN);
kitchen.addExit(Action.EAST, house_behind_kitchen);
kitchen.addExit(Action.OUT, house_behind_kitchen);
kitchen.addExit(Action.WEST, kitchen_livingroom);
kitchen.addExit(Action.UP, kitchen_attic);
kitchen.addFailMessage(Action.DOWN, "Only Santa Claus climbs down chimneys.");
kitchen.discoverValue = KITCHEN_VALUE;

const attic = new Room("Attic", MapStrings.DESC_ATTIC, Location.ATTIC);
attic.addExit(Action.DOWN, kitchen_attic);

const livingRoom = new Room("Living Room", MapStrings.DESC_LIVING_ROOM, Location.LIVING_ROOM);
livingRoom.addExit(Action.EAST, kitchen_livingroom);
livingRoom.addExit(Action.DOWN, cellar_livingroom);
livingRoom.addExit(Action.WEST, strange_living_room);

const forestPath = new Room("Forest Path", MapStrings.DESC_FOREST_PATH, Location.FOREST_PATH);
forestPath.addExit(Action.NORTH, forestpath_clearingN);
forestPath.addExit(Action.EAST, forestpath_forestE);
forestPath.addExit(Action.SOUTH, house_north_forestpath);
forestPath.addExit(Action.WEST, forestpath_forestW);
forestPath.addExit(Action.UP, forestpath_uptree);

const upTree = new Room("Up a Tree", MapStrings.DESC_UP_TREE, Location.UP_TREE);
upTree.addExit(Action.DOWN, forestpath_uptree);
upTree.addFailMessage(Action.UP, "You cannot climb any higher.");
upTree.jumpString = "In a feat of unaccustomed daring, you manage to land on your feet "
    + "without killing yourself.";

const forestWest = new Room("Forest", MapStrings.DESC_FOREST_WEST, Location.FOREST_WEST);
forestWest.addExit(Action.NORTH, clearingN_forestW);
forestWest.addExit(Action.EAST, forestpath_forestW);
forestWest.addExit(Action.SOUTH, forestS_forestW);
forestWest.addFailMessage(Action.WEST, "You would need a machete to go further west.");
forestWest.addFailMessage(Action.UP, "There is no tree here suitable for climbing.");

const forestEast = new Room("Forest", MapStrings.DESC_FOREST_EAST, Location.FOREST_EAST);
forestEast.addExit(Action.EAST, forestE_forestNE);
forestEast.addExit(Action.SOUTH, forestE_clearingE);
forestEast.addExit(Action.WEST, forestpath_forestE);
forestEast.addFailMessage(Action.NORTH, "The forest becomes impenetrable to the north.");
forestEast.addFailMessage(Action.UP, "There is no tree here suitable for climbing.");

const forestNortheast = new Room("Forest", MapStrings.DESC_FOREST_NORTHEAST, Location.FOREST_NORTHEAST);
forestNortheast.addExit(Action.NORTH, forestE_forestNE);
forestNortheast.addExit(Action.SOUTH, forestE_forestNE);
forestNortheast.addExit(Action.WEST, forestE_forestNE);
forestNortheast.addFailMessage(Action.EAST, MapStrings.FOREST_NE_FAIL_1);
forestNortheast.addFailMessage(Action.UP, MapStrings.FOREST_NE_FAIL_1);

const forestSouth = new Room("Forest", MapStrings.DESC_FOREST_SOUTH, Location.FOREST_SOUTH);
forestSouth.addExit(Action.NORTH, clearingE_forestS);
forestSouth.addExit(Action.WEST, forestS_forestW);
forestSouth.addExit(Action.NORTHWEST, house_south_forestS);
forestSouth.addFailMessage(Action.UP, "There is no tree here suitable for climbing.");
forestSouth.addFailMessage(Action.EAST, "The rank undergrowth prevents eastward movement.");
forestSouth.addFailMessage(Action.SOUTH, "Storm-tossed trees block your way.");

const clearingNorth = new Room("Clearing", MapStrings.DESC_CLEARING_NORTH, Location.CLEARING_NORTH);
clearingNorth.addExit(Action.EAST, clearingN_forestE);
clearingNorth.addExit(Action.SOUTH, forestpath_clearingN);
clearingNorth.addExit(Action.WEST, clearingN_forestW);
clearingNorth.addFailMessage(Action.UP, "There is no tree here suitable for climbing.");
clearingNorth.addFailMessage(Action.NORTH, "The forest becomes impenetrable to the north.");

const clearingEast = new Room("Clearing", MapStrings.DESC_CLEARING_EAST, Location.CLEARING_EAST);
clearingEast.addExit(Action.NORTH, forestE_clearingE);
clearingEast.addExit(Action.EAST, clearingE_canyon);
clearingEast.addExit(Action.SOUTH, clearingE_forestS);
clearingEast.addExit(Action.WEST, house_behind_clearingE);
clearingEast.addFailMessage(Action.UP, "There is no tree here suitable for climbing.");

const canyonView = new Room("Canyon View", MapStrings.DESC_CANYON_VIEW, Location.CANYON_VIEW);
canyonView.addExit(Action.NORTHWEST, clearingE_canyon);
canyonView.addExit(Action.WEST, forestS_canyon);
canyonView.addExit(Action.DOWN, canyon_ledge);
canyonView.addExit(Action.EAST, canyon_ledge);
canyonView.addFailMessage(Action.SOUTH, "Storm-tossed trees block your way.");
canyonView.jumpString = "Nice view, lousy place to jump.\n";

const rockyLedge = new Room("Rocky Ledge", MapStrings.DESC_ROCKY_LEDGE, Location.ROCKY_LEDGE);
rockyLedge.addExit(Action.UP, canyon_ledge);
rockyLedge.addExit(Action.DOWN, ledge_bottom);

const canyonBottom = new Room("Canyon Bottom", MapStrings.DESC_CANYON_BOTTOM, Location.CANYON_BOTTOM);
canyonBottom.addExit(Action.UP, ledge_bottom);
canyonBottom.addExit(Action.NORTH, canyon_bottom_rainbow);

const endOfRainbow = new Room("End of Rainbow", MapStrings.DESC_END_OF_RAINBOW, Location.END_OF_RAINBOW);
endOfRainbow.addExit(Action.SOUTHWEST, canyon_bottom_rainbow);
endOfRainbow.addExit(Action.EAST, rainbow_end);

const stoneBarrow = new Room("Stone Barrow", MapStrings.DESC_STONE_BARROW, Location.STONE_BARROW);
stoneBarrow.addExit(Action.NORTHEAST, house_west_barrow);
stoneBarrow.addExit(Action.WEST, barrowInside);

const insideStoneBarrow = new Room("Inside the Barrow", MapStrings.DESC_INSIDE_STONE_BARROW, Location.INSIDE_STONE_BARROW);
insideStoneBarrow.addExit(Action.EAST, barrowInside);

const cellar = new Room("Cellar", MapStrings.DESC_CELLAR, Location.CELLAR);
cellar.addExit(Action.NORTH, cellar_troll);
cellar.addExit(Action.SOUTH, cellar_eastchasm);
cellar.addExit(Action.UP, cellar_livingroom);
cellar.addFailMessage(Action.WEST, "You try to ascend the ramp, but it is impossible, and you slide back down.");
cellar.discoverValue = CELLAR_VALUE;


const eastOfChasm = new Room("East of Chasm", MapStrings.DESC_EAST_OF_CHASM, Location.EAST_OF_CHASM);
eastOfChasm.addExit(Action.NORTH, cellar_eastchasm);
eastOfChasm.addExit(Action.DOWN, cellar_eastchasm);
eastOfChasm.addExit(Action.EAST, eastchasm_gallery);
eastOfChasm.addFailMessage(Action.DOWN, "The chasm probably leads straight to the infernal regions.");
eastOfChasm.jumpString = "This was not a very safe place to try jumping.\nIn the movies, your life "
    + "would be passing before your eyes.";

const gallery = new Room("Gallery", MapStrings.DESC_GALLERY, Location.GALLERY);
gallery.addExit(Action.WEST, eastchasm_gallery);
gallery.addExit(Action.NORTH, gallery_studio);

const studio = new Room("Studio", MapStrings.DESC_STUDIO, Location.STUDIO);
studio.addExit(Action.SOUTH, gallery_studio);
studio.addExit(Action.UP, studio_kitchen);

const trollRoom = new Room("Troll Room", MapStrings.DESC_TROLL_ROOM, Location.TROLL_ROOM);
trollRoom.addExit(Action.SOUTH, cellar_troll);
trollRoom.addExit(Action.WEST, troll_maze);
trollRoom.addExit(Action.EAST, troll_eastwest);

const eastWestPassage = new Room("East-West Passage", MapStrings.DESC_EAST_WEST_PASSAGE , Location.EAST_WEST_PASSAGE);
eastWestPassage.addExit(Action.WEST, troll_eastwest);
eastWestPassage.addExit(Action.NORTH, eastwest_chasm);
eastWestPassage.addExit(Action.DOWN, eastwest_chasm);
eastWestPassage.addExit(Action.EAST, eastwest_round);
eastWestPassage.discoverValue = EAST_WEST_VALUE;

const roundRoom = new Room("Round Room", MapStrings.DESC_ROUND_ROOM, Location.ROUND_ROOM);
roundRoom.addExit(Action.WEST, eastwest_round);
roundRoom.addExit(Action.NORTH, round_northsouth);
roundRoom.addExit(Action.EAST, round_loud);
roundRoom.addExit(Action.SOUTH, round_narrow);
roundRoom.addExit(Action.SOUTHEAST, round_engravings);

const narrowPassage = new Room("Narrow Passage", MapStrings.DESC_NARROW_PASSAGE, Location.NARROW_PASSAGE);
narrowPassage.addExit(Action.NORTH, round_narrow);
narrowPassage.addExit(Action.SOUTH, narrow_mirror);

const mirrorRoomSouth = new Room("Mirror Room", MapStrings.DESC_MIRROR_ROOM_SOUTH, Location.MIRROR_ROOM_SOUTH);
mirrorRoomSouth.addExit(Action.NORTH, narrow_mirror);
mirrorRoomSouth.addExit(Action.WEST, mirror_winding);
mirrorRoomSouth.addExit(Action.EAST, mirrorsouth_cave);

const windingPassage = new Room("Winding Passage", MapStrings.DESC_WINDING_PASSAGE, Location.WINDING_PASSAGE);
windingPassage.addExit(Action.NORTH, mirror_winding);
windingPassage.addExit(Action.EAST, winding_cave);

const caveSouth = new Room("Cave", MapStrings.DESC_CAVE_SOUTH, Location.CAVE_SOUTH);
caveSouth.addExit(Action.NORTH, mirrorsouth_cave);
caveSouth.addExit(Action.WEST, winding_cave);
caveSouth.addExit(Action.DOWN, cave_hades);
caveSouth.addExit(Action.DOWN, cave_hades);

const entranceToHades = new Room("Entrance to Hades", MapStrings.DESC_ENTRANCE_TO_HADES, Location.ENTRANCE_TO_HADES);
entranceToHades.addExit(Action.UP, cave_hades);
entranceToHades.addExit(Action.SOUTH, hades_land_dead);

const landOfTheDead = new Room("Land of the Dead", MapStrings.DESC_LAND_OF_THE_DEAD, Location.LAND_OF_THE_DEAD);
landOfTheDead.addExit(Action.NORTH, hades_land_dead);

const engravingsCave = new Room("Engravings Cave", MapStrings.DESC_ENGRAVINGS_CAVE, Location.ENGRAVINGS_CAVE);
engravingsCave.addExit(Action.NORTHWEST, round_engravings);
engravingsCave.addExit(Action.EAST, engravings_dome);

const domeRoom = new Room("Dome Room", MapStrings.DESC_DOME_ROOM, Location.DOME_ROOM);
domeRoom.addExit(Action.WEST, engravings_dome);
domeRoom.addExit(Action.DOWN, dome_torch);

const torchRoom = new Room("Torch Room", MapStrings.DESC_TORCH_ROOM, Location.TORCH_ROOM);
torchRoom.addExit(Action.SOUTH, torch_temple);
torchRoom.addExit(Action.DOWN, torch_temple);

const temple = new Room("Temple", MapStrings.DESC_TEMPLE, Location.TEMPLE);
temple.addExit(Action.NORTH, torch_temple);
temple.addExit(Action.UP, torch_temple);
temple.addExit(Action.EAST, temple_egypt);
temple.addExit(Action.DOWN, temple_egypt);
temple.addExit(Action.SOUTH, temple_altar);

const egyptianRoom = new Room("Egyptian Room", MapStrings.DESC_EGYPTIAN_ROOM, Location.EGYPTIAN_ROOM);
egyptianRoom.addExit(Action.WEST, temple_egypt);

const altarRoom = new Room("Altar", MapStrings.DESC_ALTAR, Location.ALTAR);
altarRoom.addExit(Action.NORTH, temple_altar);
altarRoom.addExit(Action.DOWN, altar_cave);

const loudRoom = new Room("Loud Room", MapStrings.DESC_LOUD_ROOM, Location.LOUD_ROOM);
loudRoom.addExit(Action.WEST, round_loud);
loudRoom.addExit(Action.UP, loud_deep_canyon);
loudRoom.addExit(Action.EAST, loud_damp);

const dampCave = new Room("Damp Cave", MapStrings.DESC_DAMP_CAVE, Location.DAMP_CAVE);
dampCave.addExit(Action.WEST, loud_damp);
dampCave.addExit(Action.EAST, damp_white_north);
dampCave.addFailMessage(Action.SOUTH, "It is too narrow for most insects.");

const whiteCliffsBeachNorth = new Room("White Cliffs Beach North", MapStrings.DESC_WHITE_CLIFFS_BEACH_NORTH, Location.WHITE_CLIFFS_BEACH_NORTH);
whiteCliffsBeachNorth.addExit(Action.WEST, damp_white_north);
whiteCliffsBeachNorth.addExit(Action.SOUTH, white_cliffs_north_south);
whiteCliffsBeachNorth.addExit(Action.LAUNCH, white_north_river);

const whiteCliffsBeachSouth = new Room("White Cliffs Beach South", MapStrings.DESC_WHITE_CLIFFS_BEACH_SOUTH, Location.WHITE_CLIFFS_BEACH_SOUTH);
whiteCliffsBeachSouth.addExit(Action.NORTH, white_cliffs_north_south);
whiteCliffsBeachSouth.addExit(Action.LAUNCH, white_south_river);

const frigidRiver1 = new Room("Frigid River", MapStrings.DESC_FRIGID_RIVER_1, Location.FRIGID_RIVER_1);
frigidRiver1.addExit(Action.WEST, dam_base_river);
frigidRiver1.addExit(Action.LAND, dam_base_river);

const frigidRiver2 = new Room("Frigid River", MapStrings.DESC_FRIGID_RIVER_2, Location.FRIGID_RIVER_2);

const frigidRiver3 = new Room("Frigid River", MapStrings.DESC_FRIGID_RIVER_3, Location.FRIGID_RIVER_3);
frigidRiver3.addExit(Action.WEST, white_north_river);
frigidRiver3.addExit(Action.LAND, white_north_river);

const frigidRiver4 = new Room("Frigid River", MapStrings.DESC_FRIGID_RIVER_4, Location.FRIGID_RIVER_4);
frigidRiver4.addExit(Action.WEST, white_south_river);
frigidRiver4.addExit(Action.EAST, river_sandy_beach);
frigidRiver4.addExit(Action.LAND, river_sandy_beach);

const frigidRiver5 = new Room("Frigid River", MapStrings.DESC_FRIGID_RIVER_5, Location.FRIGID_RIVER_5);
frigidRiver5.addExit(Action.EAST, river_shore);
frigidRiver5.addExit(Action.LAND, river_shore);

const sandyCave = new Room("Sandy Cave", MapStrings.DESC_SANDY_CAVE, Location.SANDY_CAVE);
sandyCave.addExit(Action.SOUTHWEST, sandy_beach_cave);

const sandyBeach = new Room("Sandy Beach", MapStrings.DESC_SANDY_BEACH, Location.SANDY_BEACH);
sandyBeach.addExit(Action.NORTHEAST, sandy_beach_cave);
sandyBeach.addExit(Action.SOUTH, sandy_beach_shore);
sandyBeach.addExit(Action.LAUNCH, river_sandy_beach);

const shore = new Room("Shore", MapStrings.DESC_SHORE, Location.SHORE);
shore.addExit(Action.NORTH, sandy_beach_shore);
shore.addExit(Action.LAUNCH, river_shore);
shore.addExit(Action.SOUTH, shore_falls);

const aragainFalls = new Room("Aragain Falls", MapStrings.DESC_ARAGAIN_FALLS, Location.ARAGAIN_FALLS);
aragainFalls.addExit(Action.NORTH, shore_falls);
aragainFalls.addExit(Action.WEST, falls_rainbow);

const onTheRainbow = new Room("On the Rainbow", MapStrings.DESC_ON_THE_RAINBOW, Location.ON_THE_RAINBOW);
onTheRainbow.addExit(Action.EAST, falls_rainbow);
onTheRainbow.addExit(Action.WEST, rainbow_end);

const dam = new Room("Dam", MapStrings.DESC_DAM, Location.DAM);
dam.addExit(Action.WEST, dam_res_south);
dam.addExit(Action.NORTH, dam_dam_lobby);
dam.addExit(Action.SOUTH, dam_deep_canyon);
dam.addExit(Action.EAST, dam_dam_base);
dam.addExit(Action.DOWN, dam_dam_base);

const damBase = new Room("Dam Base", MapStrings.DESC_DAM_BASE, Location.DAM_BASE);
damBase.addExit(Action.NORTH, dam_dam_base);
damBase.addExit(Action.LAUNCH, dam_base_river);

const damLobby = new Room("Dam Lobby", MapStrings.DESC_DAM_LOBBY, Location.DAM_LOBBY);
damLobby.addExit(Action.NORTH, dam_lobby_maintenance);
damLobby.addExit(Action.EAST, dam_lobby_maintenance);
damLobby.addExit(Action.SOUTH, dam_dam_lobby);

const maintenanceRoom = new Room("Maintenance Room", MapStrings.DESC_MAINTENANCE_ROOM, Location.MAINTENANCE_ROOM);
maintenanceRoom.addExit(Action.SOUTH, dam_lobby_maintenance);
maintenanceRoom.addExit(Action.WEST, dam_lobby_maintenance);

const northSouthPassage = new Room("North-South Passage", MapStrings.DESC_NORTH_SOUTH_PASSAGE, Location.NORTH_SOUTH_PASSAGE);
northSouthPassage.addExit(Action.NORTH, northsouth_chasm);
northSouthPassage.addExit(Action.NORTHEAST, northsouth_deep_canyon);
northSouthPassage.addExit(Action.SOUTH, round_northsouth);

const deepCanyon = new Room("Deep Canyon", MapStrings.DESC_DEEP_CANYON_WATER, Location.DEEP_CANYON);
deepCanyon.addExit(Action.EAST, dam_deep_canyon);
deepCanyon.addExit(Action.NORTHWEST, res_south_deep);
deepCanyon.addExit(Action.SOUTHWEST, northsouth_deep_canyon);
deepCanyon.addExit(Action.DOWN, loud_deep_canyon);

const chasm = new Room("Chasm", MapStrings.DESC_CHASM, Location.CHASM);
chasm.addExit(Action.NORTHEAST, res_south_chasm);
chasm.addExit(Action.SOUTHWEST, eastwest_chasm);
chasm.addExit(Action.UP, eastwest_chasm);
chasm.addExit(Action.SOUTH, northsouth_chasm);
chasm.addFailMessage(Action.DOWN, "Are you out of your mind?");
chasm.jumpString = "You look before leaping, and realize that you would never survive.";

const streamView = new Room("Stream View", MapStrings.DESC_STREAM_VIEW, Location.STREAM_VIEW);
streamView.addExit(Action.EAST, res_south_stream_view);
streamView.addExit(Action.LAUNCH, stream_view_stream);

const stream = new Room("Stream", MapStrings.DESC_STREAM, Location.STREAM);
stream.addExit(Action.SOUTH, stream_view_stream);
stream.addExit(Action.LAND, stream_view_stream);
stream.addExit(Action.EAST, reservoir_stream);

const reservoirSouth = new Room("Reservoir South", MapStrings.DESC_RESERVOIR_SOUTH, Location.RESERVOIR_SOUTH);
reservoirSouth.addExit(Action.LAUNCH, res_south_res);
reservoirSouth.addExit(Action.WEST, res_south_stream_view);
reservoirSouth.addExit(Action.SOUTHEAST, res_south_deep);
reservoirSouth.addExit(Action.SOUTHWEST, res_south_chasm);
reservoirSouth.addExit(Action.EAST, dam_res_south);
reservoirSouth.addFailMessage(Action.NORTH, "You would drown.");

const reservoir = new Room("Reservoir", MapStrings.DESC_RESERVOIR, Location.RESERVOIR);
reservoir.addExit(Action.NORTH, res_north_res);
reservoir.addExit(Action.SOUTH, res_south_res);
reservoir.addExit(Action.LAND, res_south_res);
reservoir.addExit(Action.WEST, reservoir_stream);
reservoir.addFailMessage(Action.EAST, "The dam blocks your way.");

const reservoirEmpty = new Room("Reservoir", MapStrings.DESC_RESERVOIR_EMPTY, Location.RESERVOIR_EMPTY);
reservoirEmpty.addExit(Action.NORTH, res_north_res_empty);
reservoirEmpty.addExit(Action.SOUTH, res_south_res_empty);
reservoirEmpty.addExit(Action.LAUNCH, stream_res_empty);
reservoirEmpty.addFailMessage(Action.WEST, "You cannot wade into the flowing stream.");

const reservoirNorth = new Room("Reservoir North", MapStrings.DESC_RESERVOIR_NORTH, Location.RESERVOIR_NORTH);
reservoirNorth.addExit(Action.NORTH, res_north_atlantis);
reservoirNorth.addExit(Action.LAUNCH, res_north_res);
reservoirNorth.addFailMessage(Action.SOUTH, "You would drown.");

const atlantisRoom = new Room("Atlantis Room", MapStrings.DESC_ATLANTIS_ROOM, Location.ATLANTIS_ROOM);
atlantisRoom.addExit(Action.UP, atlantis_cave);
atlantisRoom.addExit(Action.SOUTH, res_north_atlantis);

const caveNorth = new Room("Cave", MapStrings.DESC_CAVE_NORTH, Location.CAVE_NORTH);
// Is this exit down or south??? Both.
caveNorth.addExit(Action.SOUTH, atlantis_cave);
caveNorth.addExit(Action.DOWN, atlantis_cave);
caveNorth.addExit(Action.NORTH, cave_mirrornorth);
caveNorth.addExit(Action.WEST, cave_twisting);

const twistingPassage = new Room("Twisting Passage", MapStrings.DESC_TWISTING_PASSAGE, Location.TWISTING_PASSAGE);
twistingPassage.addExit(Action.EAST, cave_twisting);
twistingPassage.addExit(Action.NORTH, twisting_mirror);

const mirrorRoomNorth = new Room("Mirror Room", MapStrings.DESC_MIRROR_ROOM_NORTH, Location.MIRROR_ROOM_NORTH);
mirrorRoomNorth.addExit(Action.EAST, cave_mirrornorth);
mirrorRoomNorth.addExit(Action.WEST, twisting_mirror);
mirrorRoomNorth.addExit(Action.NORTH, mirror_cold);

const coldPassage = new Room("Cold Passage", MapStrings.DESC_COLD_PASSAGE, Location.COLD_PASSAGE);
coldPassage.addExit(Action.SOUTH, mirror_cold);
coldPassage.addExit(Action.WEST, cold_slide);

const slideRoom = new Room("Slide Room", MapStrings.DESC_SLIDE_ROOM, Location.SLIDE_ROOM);
slideRoom.addExit(Action.EAST, cold_slide);
slideRoom.addExit(Action.DOWN, slide_cellar);
slideRoom.addExit(Action.NORTH, slide_mine_entrance);

const mineEntrance = new Room("Mine Entrance", MapStrings.DESC_MINE_ENTRANCE, Location.MINE_ENTRANCE);
mineEntrance.addExit(Action.SOUTH, slide_mine_entrance);
mineEntrance.addExit(Action.WEST, mine_entrance_squeaky);

const squeakyRoom = new Room("Squeaky Room", MapStrings.DESC_SQUEAKY_ROOM, Location.SQUEAKY_ROOM);
squeakyRoom.addExit(Action.EAST, mine_entrance_squeaky);
squeakyRoom.addExit(Action.NORTH, squeaky_bat);

const batRoom = new Room("Bat Room", MapStrings.DESC_BAT_ROOM, Location.BAT_ROOM);
batRoom.addExit(Action.SOUTH, squeaky_bat);
batRoom.addExit(Action.EAST, bat_shaft);

const shaftRoom = new Room("Shaft Room", MapStrings.DESC_SHAFT_ROOM, Location.SHAFT_ROOM);
shaftRoom.addExit(Action.WEST, bat_shaft);
shaftRoom.addExit(Action.NORTH, shaft_smelly);

const smellyRoom = new Room("Smelly Room", MapStrings.DESC_SMELLY_ROOM, Location.SMELLY_ROOM);
smellyRoom.addExit(Action.SOUTH, shaft_smelly);
smellyRoom.addExit(Action.DOWN, smelly_gas);

const gasRoom = new Room("Gas Room", MapStrings.DESC_GAS_ROOM, Location.GAS_ROOM);
gasRoom.addExit(Action.UP, smelly_gas);
gasRoom.addExit(Action.EAST, gas_coal_1);

const coalMine1 = new Room("Coal Mine", MapStrings.DESC_COAL_MINE_1, Location.COAL_MINE_1);
coalMine1.addExit(Action.NORTH, gas_coal_1);
coalMine1.addExit(Action.NORTHEAST, coal_1_coal_2);
coalMine1.addExit(Action.EAST, coal_1_self);

const coalMine2 = new Room("Coal Mine", MapStrings.DESC_COAL_MINE_2, Location.COAL_MINE_2);
coalMine2.addExit(Action.SOUTH, coal_1_coal_2);
coalMine2.addExit(Action.NORTH, coal_2_self);
coalMine2.addExit(Action.SOUTHEAST, coal_2_coal_3);

const coalMine3 = new Room("Coal Mine", MapStrings.DESC_COAL_MINE_3, Location.COAL_MINE_3);
coalMine3.addExit(Action.EAST, coal_2_coal_3);
coalMine3.addExit(Action.SOUTHWEST, coal_3_coal_4);
coalMine3.addExit(Action.SOUTH, coal_3_self);

const coalMine4 = new Room("Coal Mine", MapStrings.DESC_COAL_MINE_4, Location.COAL_MINE_4);
coalMine4.addExit(Action.NORTH, coal_3_coal_4);
coalMine4.addExit(Action.DOWN, coal_4_ladder_top);
coalMine4.addExit(Action.WEST, coal_4_self);

const ladderTop = new Room("Ladder Top", MapStrings.DESC_LADDER_TOP, Location.LADDER_TOP);
ladderTop.addExit(Action.UP, coal_4_ladder_top);
ladderTop.addExit(Action.DOWN, ladder_top_bottom);

const ladderBottom = new Room("Ladder Bottom", MapStrings.DESC_LADDER_BOTTOM, Location.LADDER_BOTTOM);
ladderBottom.addExit(Action.UP, ladder_top_bottom);
ladderBottom.addExit(Action.WEST, ladder_bottom_timber);
ladderBottom.addExit(Action.SOUTH, ladder_bottom_dead_end);

const deadEndCoalMine = new Room("Dead End", MapStrings.DESC_DEAD_END_COAL_MINE, Location.DEAD_END_COAL_MINE);
deadEndCoalMine.addExit(Action.NORTH, ladder_bottom_dead_end);

const timberRoom = new Room("Timber Room", MapStrings.DESC_TIMBER_ROOM, Location.TIMBER_ROOM);
timberRoom.addExit(Action.EAST, ladder_bottom_timber);
timberRoom.addExit(Action.WEST, timber_drafty);

const draftyRoom = new Room("Drafty Room", MapStrings.DESC_DRAFTY_ROOM, Location.DRAFTY_ROOM);
draftyRoom.addExit(Action.EAST, timber_drafty);
draftyRoom.addExit(Action.SOUTH, drafty_machine);

const machineRoom = new Room("Machine Room", MapStrings.DESC_MACHINE_ROOM, Location.MACHINE_ROOM);
machineRoom.addExit(Action.NORTH, drafty_machine);

const gratingRoom = new Room("Grating Room", MapStrings.DESC_GRATING_ROOM, Location.GRATING_ROOM);
gratingRoom.addExit(Action.UP, grating_clearing);
gratingRoom.addExit(Action.SOUTHWEST, maze11_grating);

const cyclopsRoom = new Room("Cyclops Room", MapStrings.DESC_CYCLOPS_ROOM, Location.CYCLOPS_ROOM);
cyclopsRoom.addExit(Action.NORTHWEST, maze15_cyclops);
cyclopsRoom.addExit(Action.EAST, cyclops_strange);
cyclopsRoom.addExit(Action.UP, cyclops_treasure);

const strangePassage = new Room("Strange Passage", MapStrings.DESC_STRANGE_PASSAGE, Location.STRANGE_PASSAGE);
strangePassage.addExit(Action.WEST, cyclops_strange);
strangePassage.addExit(Action.EAST, strange_living_room);

const treasureRoom = new Room("Treasure Room", MapStrings.DESC_TREASURE_ROOM, Location.TREASURE_ROOM);
treasureRoom.addExit(Action.DOWN, cyclops_treasure);
treasureRoom.discoverValue = TREASURE_VALUE;

const maze1 = new Room("Maze", MapStrings.DESC_MAZE_1, Location.MAZE_1);
maze1.addExit(Action.EAST, troll_maze);
maze1.addExit(Action.NORTH, maze1_self);
maze1.addExit(Action.SOUTH, maze1_maze2);
maze1.addExit(Action.WEST, maze1_maze4);

const maze2 = new Room("Maze", MapStrings.DESC_MAZE_2, Location.MAZE_2);
maze2.addExit(Action.SOUTH, maze1_maze2);
maze2.addExit(Action.EAST, maze2_maze3);
maze2.addExit(Action.DOWN, maze2_maze4);

const maze3 = new Room("Maze", MapStrings.DESC_MAZE_3, Location.MAZE_3);
maze3.addExit(Action.WEST, maze2_maze3);
maze3.addExit(Action.NORTH, maze3_maze4);
maze3.addExit(Action.UP, maze3_maze5);

const maze4 = new Room("Maze", MapStrings.DESC_MAZE_4, Location.MAZE_4);
maze4.addExit(Action.WEST, maze3_maze4);
maze4.addExit(Action.NORTH, maze1_maze4);
maze4.addExit(Action.EAST, maze4_dead_end);

const maze5 = new Room("Maze", MapStrings.DESC_MAZE_5, Location.MAZE_5);
maze5.addExit(Action.NORTH, maze3_maze5);
maze5.addExit(Action.EAST, maze5_dead_end);
maze5.addExit(Action.SOUTHWEST, maze5_maze6);

const maze6 = new Room("Maze", MapStrings.DESC_MAZE_6, Location.MAZE_6);
maze6.addExit(Action.DOWN, maze5_maze6);
maze6.addExit(Action.EAST, maze6_maze7);
maze6.addExit(Action.WEST, maze6_self);
maze6.addExit(Action.UP, maze6_maze9);

const maze7 = new Room("Maze", MapStrings.DESC_MAZE_7, Location.MAZE_7);
maze7.addExit(Action.DOWN, maze7_dead_end);
maze7.addExit(Action.WEST, maze6_maze7);
maze7.addExit(Action.EAST, maze7_maze8);
maze7.addExit(Action.SOUTH, maze7_maze15);
maze7.addExit(Action.UP, maze7_maze14);

const maze8 = new Room("Maze", MapStrings.DESC_MAZE_8, Location.MAZE_8);
maze8.addExit(Action.NORTHEAST, maze7_maze8);
maze8.addExit(Action.SOUTHEAST, maze8_dead_end);
maze8.addExit(Action.WEST, maze8_self);

const maze9 = new Room("Maze", MapStrings.DESC_MAZE_9, Location.MAZE_9);
maze9.addExit(Action.NORTH, maze6_maze9);
maze9.addExit(Action.DOWN, maze9_maze11);
maze9.addExit(Action.EAST, maze9_maze10);
maze9.addExit(Action.SOUTH, maze9_maze13);
maze9.addExit(Action.WEST, maze9_maze12);
maze9.addExit(Action.NORTHWEST, maze9_self);

const maze10 = new Room("Maze", MapStrings.DESC_MAZE_10, Location.MAZE_10);
maze10.addExit(Action.EAST, maze9_maze10);
maze10.addExit(Action.UP, maze10_maze11);
maze10.addExit(Action.WEST, maze10_maze13);

const maze11 = new Room("Maze", MapStrings.DESC_MAZE_11, Location.MAZE_11);
maze11.addExit(Action.DOWN, maze10_maze11);
maze11.addExit(Action.SOUTHWEST, maze11_maze12);
maze11.addExit(Action.NORTHWEST, maze11_maze13);
maze11.addExit(Action.NORTHEAST, maze11_grating);

const maze12 = new Room("Maze", MapStrings.DESC_MAZE_12, Location.MAZE_12);
maze12.addExit(Action.EAST, maze12_maze13);
maze12.addExit(Action.UP, maze9_maze12);
maze12.addExit(Action.NORTH, maze12_dead_end);
maze12.addExit(Action.DOWN, maze12_maze5);
maze12.addExit(Action.SOUTHWEST, maze11_maze12);

const maze13 = new Room("Maze", MapStrings.DESC_MAZE_13, Location.MAZE_13);
maze13.addExit(Action.EAST, maze9_maze13);
maze13.addExit(Action.DOWN, maze12_maze13);
maze13.addExit(Action.WEST, maze11_maze13);
maze13.addExit(Action.SOUTH, maze10_maze13);

const maze14 = new Room("Maze", MapStrings.DESC_MAZE_14, Location.MAZE_14);
maze14.addExit(Action.NORTHWEST, maze14_self);
maze14.addExit(Action.WEST, maze14_maze15);
maze14.addExit(Action.NORTHEAST, maze7_maze14);
maze14.addExit(Action.SOUTH, maze7_maze14);

const maze15 = new Room("Maze", MapStrings.DESC_MAZE_15, Location.MAZE_15);
maze15.addExit(Action.WEST, maze14_maze15);
maze15.addExit(Action.SOUTH, maze7_maze15);
maze15.addExit(Action.SOUTHEAST, maze15_cyclops);

const mazeDeadEndNorth = new Room("Dead End", MapStrings.DESC_DEAD_END_MAZE_NORTH, Location.DEAD_END_MAZE_NORTH);
mazeDeadEndNorth.addExit(Action.SOUTH, maze4_dead_end);

const mazeDeadEndCenter = new Room("Dead End", MapStrings.DESC_DEAD_END_MAZE_CENTER, Location.DEAD_END_MAZE_CENTER);
mazeDeadEndCenter.addExit(Action.WEST, maze5_dead_end);

const mazeDeadEndSouthEast = new Room("Dead End", MapStrings.DESC_DEAD_END_MAZE_SOUTHEAST, Location.DEAD_END_MAZE_SOUTHEAST);
mazeDeadEndSouthEast.addExit(Action.NORTH, maze8_dead_end); 

const mazeDeadEndSouthWest = new Room("Dead End", MapStrings.DESC_DEAD_END_MAZE_SOUTHWEST, Location.DEAD_END_MAZE_SOUTHWEST);
mazeDeadEndSouthWest.addExit(Action.SOUTH, maze12_dead_end);

// Dark rooms
attic.setDark(); cellar.setDark(); eastOfChasm.setDark(); gallery.setDark(); studio.setDark(); eastWestPassage.setDark();
roundRoom.setDark(); narrowPassage.setDark(); mirrorRoomSouth.setDark(); windingPassage.setDark(); caveSouth.setDark();
entranceToHades.setDark(); landOfTheDead.setDark(); engravingsCave.setDark(); domeRoom.setDark(); torchRoom.setDark(); 
temple.setDark(); egyptianRoom.setDark(); altarRoom.setDark(); loudRoom.setDark(); dampCave.setDark(); northSouthPassage.setDark();
chasm.setDark(); deepCanyon.setDark(); damLobby.setDark(); maintenanceRoom.setDark(); atlantisRoom.setDark(); caveNorth.setDark();
twistingPassage.setDark(); mirrorRoomNorth.setDark(); coldPassage.setDark(); slideRoom.setDark(); mineEntrance.setDark();
squeakyRoom.setDark(); batRoom.setDark(); shaftRoom.setDark(); gasRoom.setDark(); coalMine1.setDark(); coalMine2.setDark();
coalMine3.setDark(); coalMine4.setDark(); ladderTop.setDark(); ladderBottom.setDark(); deadEndCoalMine.setDark(); timberRoom.setDark();
draftyRoom.setDark(); machineRoom.setDark(); maze1.setDark(); maze2.setDark(); maze3.setDark(); maze4.setDark(); maze5.setDark();
maze6.setDark(); maze7.setDark(); maze8.setDark(); maze8.setDark(); maze10.setDark(); maze11.setDark(); maze12.setDark(); maze13.setDark();
maze14.setDark(); maze15.setDark(); mazeDeadEndCenter.setDark(); mazeDeadEndNorth.setDark(); mazeDeadEndSouthWest.setDark();
mazeDeadEndSouthEast.setDark(); gratingRoom.setDark(); cyclopsRoom.setDark(); strangePassage.setDark(); treasureRoom.setDark();

// Rooms with a dangerous height
eastOfChasm.height = true; canyonView.height = true;

// Rooms that are a body of water

let waterRooms = [ reservoir, stream, frigidRiver1, frigidRiver2, frigidRiver3, frigidRiver4, frigidRiver5 ];

for (let i = 0; i < waterRooms.length; ++i)
{
    waterRooms[i].bodyOfWater = true;
    waterRooms[i].removeFailMessage(Action.LAUNCH);
    waterRooms[i].addFailMessage(Action.LAUNCH, "You are already on the water!");
}

// Closed passages
grating_clearing.setClosed();
house_behind_kitchen.setClosed();
cellar_livingroom.setClosed();
strange_living_room.setClosed();
house_west_barrow.setClosed();
rainbow_end.setClosed();
falls_rainbow.setClosed();
dome_torch.setClosed();
hades_land_dead.setClosed();
cyclops_strange.setClosed();
cyclops_treasure.setClosed();

grating_clearing.closedFail = "The grating is closed!";
rainbow_end.closedFail = "You can't go that way.";
falls_rainbow.closedFail = "You can't go that way.";
house_behind_kitchen.closedFail = MapStrings.KITCHEN_WINDOW_CLOSED;
strange_living_room.closedFail = "The door is nailed shut.";
dome_torch.closedFail = "You cannot do gown without fracturing many bones.";
hades_land_dead.closedFail = "Some invisible force prevents you from passing through the gate.";
cyclops_strange.closedFail = "The east wall is solid rock.";
cyclops_treasure.closedFail = "The cyclops doesn't look like he'll let you past.";
maze2_maze4.message = "You won't be able to get back up to the tunnel you are going through "
    + "when it gets to the next room.";
maze9_maze11.message = "You won't be able to get back up to the tunnel you are going through "
    + "when it gets to the next room.";
cellar_livingroom.message = ObjectStrings.CYCLOPS_TRAP_DOOR;
studio_kitchen.closedFail = "Going up empty-handed is a bad idea.";
house_west_barrow.closedFail = "You can't go that way.";

// Narrow passages
studio_kitchen.weightLimit = 35;
studio_kitchen.weightFail = "You can't get up there with what you're carrying.";
altar_cave.weightLimit = 55;
altar_cave.weightFail = "You can't get down there with what you're carrying.";
timber_drafty.weightLimit = 0;
timber_drafty.weightFail = "You cannot fit through this passage with that load.";

worldMap.set(westOfHouse.roomID, westOfHouse);
worldMap.set(northOfHouse.roomID, northOfHouse);
worldMap.set(behindHouse.roomID, behindHouse);
worldMap.set(southOfHouse.roomID, southOfHouse);
worldMap.set(kitchen.roomID, kitchen);
worldMap.set(attic.roomID, attic);
worldMap.set(livingRoom.roomID, livingRoom);
worldMap.set(forestPath.roomID, forestPath);
worldMap.set(forestWest.roomID, forestWest);
worldMap.set(forestEast.roomID, forestEast);
worldMap.set(forestNortheast.roomID, forestNortheast);
worldMap.set(forestSouth.roomID, forestSouth);
worldMap.set(clearingNorth.roomID, clearingNorth);
worldMap.set(clearingEast.roomID, clearingEast);
worldMap.set(upTree.roomID, upTree);
worldMap.set(canyonView.roomID, canyonView);
worldMap.set(rockyLedge.roomID, rockyLedge);
worldMap.set(canyonBottom.roomID, canyonBottom);
worldMap.set(endOfRainbow.roomID, endOfRainbow);
worldMap.set(stoneBarrow.roomID, stoneBarrow);
worldMap.set(insideStoneBarrow.roomID, insideStoneBarrow);
worldMap.set(cellar.roomID, cellar);
worldMap.set(eastOfChasm.roomID, eastOfChasm);
worldMap.set(gallery.roomID, gallery);
worldMap.set(studio.roomID, studio);
worldMap.set(trollRoom.roomID, trollRoom);
worldMap.set(eastWestPassage.roomID, eastWestPassage);
worldMap.set(roundRoom.roomID, roundRoom);
worldMap.set(narrowPassage.roomID, narrowPassage);
worldMap.set(mirrorRoomSouth.roomID, mirrorRoomSouth);
worldMap.set(windingPassage.roomID, windingPassage);
worldMap.set(caveSouth.roomID, caveSouth);
worldMap.set(entranceToHades.roomID, entranceToHades);
worldMap.set(landOfTheDead.roomID, landOfTheDead);
worldMap.set(engravingsCave.roomID, engravingsCave);
worldMap.set(domeRoom.roomID, domeRoom);
worldMap.set(torchRoom.roomID, torchRoom);
worldMap.set(temple.roomID, temple);
worldMap.set(egyptianRoom.roomID, egyptianRoom);
worldMap.set(altarRoom.roomID, altarRoom);
worldMap.set(loudRoom.roomID, loudRoom);
worldMap.set(dampCave.roomID, dampCave);
worldMap.set(whiteCliffsBeachNorth.roomID, whiteCliffsBeachNorth);
worldMap.set(whiteCliffsBeachSouth.roomID, whiteCliffsBeachSouth);
worldMap.set(frigidRiver1.roomID, frigidRiver1);
worldMap.set(frigidRiver2.roomID, frigidRiver2);
worldMap.set(frigidRiver3.roomID, frigidRiver3);
worldMap.set(frigidRiver4.roomID, frigidRiver4);
worldMap.set(frigidRiver5.roomID, frigidRiver5);
worldMap.set(sandyCave.roomID, sandyCave);
worldMap.set(sandyBeach.roomID, sandyBeach);
worldMap.set(shore.roomID, shore);
worldMap.set(aragainFalls.roomID, aragainFalls);
worldMap.set(onTheRainbow.roomID, onTheRainbow);
worldMap.set(dam.roomID, dam);
worldMap.set(damBase.roomID, damBase);
worldMap.set(damLobby.roomID, damLobby);
worldMap.set(maintenanceRoom.roomID, maintenanceRoom);
worldMap.set(northSouthPassage.roomID, northSouthPassage);
worldMap.set(chasm.roomID, chasm);
worldMap.set(deepCanyon.roomID, deepCanyon);
worldMap.set(reservoirSouth.roomID, reservoirSouth);
worldMap.set(reservoir.roomID, reservoir);
worldMap.set(reservoirEmpty.roomID, reservoirEmpty);
worldMap.set(reservoirNorth.roomID, reservoirNorth);
worldMap.set(streamView.roomID, streamView);
worldMap.set(stream.roomID, stream);
worldMap.set(atlantisRoom.roomID, atlantisRoom);
worldMap.set(caveNorth.roomID, caveNorth);
worldMap.set(twistingPassage.roomID, twistingPassage);
worldMap.set(mirrorRoomNorth.roomID, mirrorRoomNorth);
worldMap.set(coldPassage.roomID, coldPassage);
worldMap.set(slideRoom.roomID, slideRoom);
worldMap.set(mineEntrance.roomID, mineEntrance);
worldMap.set(squeakyRoom.roomID, squeakyRoom);
worldMap.set(batRoom.roomID, batRoom);
worldMap.set(shaftRoom.roomID, shaftRoom);
worldMap.set(smellyRoom.roomID, smellyRoom);
worldMap.set(gasRoom.roomID, gasRoom);
worldMap.set(coalMine1.roomID, coalMine1);
worldMap.set(coalMine2.roomID, coalMine2);
worldMap.set(coalMine3.roomID, coalMine3);
worldMap.set(coalMine4.roomID, coalMine4);
worldMap.set(ladderTop.roomID, ladderTop);
worldMap.set(ladderBottom.roomID, ladderBottom);
worldMap.set(deadEndCoalMine.roomID, deadEndCoalMine);
worldMap.set(timberRoom.roomID, timberRoom);
worldMap.set(draftyRoom.roomID, draftyRoom);
worldMap.set(machineRoom.roomID, machineRoom);
worldMap.set(maze1.roomID, maze1);
worldMap.set(maze2.roomID, maze2);
worldMap.set(maze3.roomID, maze3);
worldMap.set(maze4.roomID, maze4);
worldMap.set(maze5.roomID, maze5);
worldMap.set(maze6.roomID, maze6);
worldMap.set(maze7.roomID, maze7);
worldMap.set(maze8.roomID, maze8);
worldMap.set(maze9.roomID, maze9);
worldMap.set(maze10.roomID, maze10);
worldMap.set(maze11.roomID, maze11);
worldMap.set(maze12.roomID, maze12);
worldMap.set(maze13.roomID, maze13);
worldMap.set(maze14.roomID, maze14);
worldMap.set(maze15.roomID, maze15);
worldMap.set(mazeDeadEndNorth.roomID, mazeDeadEndNorth);
worldMap.set(mazeDeadEndCenter.roomID, mazeDeadEndCenter);
worldMap.set(mazeDeadEndSouthWest.roomID, mazeDeadEndSouthWest);
worldMap.set(mazeDeadEndSouthEast.roomID, mazeDeadEndSouthEast);
worldMap.set(gratingRoom.roomID, gratingRoom);
worldMap.set(cyclopsRoom.roomID, cyclopsRoom);
worldMap.set(treasureRoom.roomID, treasureRoom);
worldMap.set(strangePassage.roomID, strangePassage);

// END WORLD MAP CREATION

// BEGIN OBJECT CREATION

 /* Items */

// There are 19 treasure items with point values.
// Name, location, point value, weight.

let bar = new Item("platinum bar", Location.LOUD_ROOM);
bar.altNames.add("bar");
bar.altNames.add("platinum");
bar.presenceString = ObjectStrings.PLATINUM_BAR;
bar.acquireValue = PLATINUM_VALUE;
bar.trophyCaseValue = PLATINUM_TROPHY_VALUE;
bar.weight = BAR_WEIGHT;

let bauble = new Item("brass bauble", Location.NULL_LOCATION);
bauble.altNames.add("brass");
bauble.altNames.add("bauble");
bauble.acquireValue = BAUBLE_VALUE;
bauble.trophyCaseValue = BAUBLE_TROPHY_VALUE;
bauble.weight = BAUBLE_WEIGHT;

let chalice = new Item("silver chalice", Location.TREASURE_ROOM);
chalice.altNames.add("silver");
chalice.altNames.add("chalice");
chalice.acquireValue = CHALICE_VALUE;
chalice.trophyCaseValue = CHALICE_TROPHY_VALUE;
chalice.weight = CHALICE_WEIGHT;

let coffin = new Item("gold coffin", Location.EGYPTIAN_ROOM);
coffin.altNames.add("coffin");
coffin.presenceString = ObjectStrings.COFFIN;
coffin.inventoryID = Location.INSIDE_COFFIN;
coffin.acquireValue = COFFIN_VALUE;
coffin.trophyCaseValue = COFFIN_TROPHY_VALUE;
coffin.weight = COFFIN_WEIGHT;
coffin.capacity = 35;

let coins = new Item("bag of coins", Location.MAZE_5);
coins.altNames.add("bag");
coins.altNames.add("coins");
coins.presenceString = ObjectStrings.INIT_COINS;
coins.acquireValue = COINS_VALUE;
coins.trophyCaseValue = COINS_TROPHY_VALUE;
coins.weight = COINS_WEIGHT;
coins.plural = true;

let canary = new Item("golden clockwork canary", Location.NULL_LOCATION);
canary.altNames.add("golden canary");
canary.altNames.add("golden clockwork");
canary.altNames.add("clockwork canary");
canary.altNames.add("clockwork");
canary.altNames.add("canary");
canary.initialPresenceString = ObjectStrings.INIT_GOLDEN_CANARY;
canary.examineString = ObjectStrings.EXAMINE_GOLDEN_CANARY;
canary.acquireValue = CANARY_VALUE;
canary.trophyCaseValue = CANARY_TROPHY_VALUE;
canary.weight = CANARY_WEIGHT;

let diamond = new Item("huge diamond", Location.NULL_LOCATION);
diamond.altNames.add("diamond");
diamond.presenceString = ObjectStrings.DIAMOND;
diamond.acquireValue = DIAMOND_VALUE;
diamond.trophyCaseValue = DIAMOND_TROPHY_VALUE;
diamond.weight = DIAMOND_WEIGHT;

let egg = new Item("jewel-encrusted egg", Location.INSIDE_BIRDS_NEST);
egg.altNames.add("egg");
egg.initialPresenceString = ObjectStrings.INIT_EGG;
egg.acquireValue = EGG_VALUE;
egg.trophyCaseValue = EGG_TROPHY_VALUE;
egg.weight = EGG_WEIGHT;
egg.inventoryID = Location.INSIDE_EGG;
egg.capacity = 6;

let emerald = new Item("large emerald", Location.INSIDE_BUOY);
emerald.altNames.add("emerald");
emerald.acquireValue = EMERALD_VALUE;
emerald.trophyCaseValue = EMERALD_TROPHY_VALUE;
emerald.weight = EMERALD_WEIGHT;

let jade = new Item("jade figurine", Location.BAT_ROOM);
jade.altNames.add("jade");
jade.altNames.add("figurine");
jade.presenceString = ObjectStrings.JADE;
jade.acquireValue = JADE_VALUE;
jade.trophyCaseValue = JADE_TROPHY_VALUE;
jade.weight = JADE_WEIGHT;

let painting = new Item("painting", Location.GALLERY);
painting.initialPresenceString = ObjectStrings.INIT_PAINTING;
painting.presenceString = ObjectStrings.PAINTING;
painting.acquireValue = PAINTING_VALUE;
painting.trophyCaseValue = PAINTING_TROPHY_VALUE;
painting.weight = PAINTING_WEIGHT;

let pot = new Item("pot of gold", Location.NULL_LOCATION);
pot.altNames.add("pot");
pot.altNames.add("gold");
pot.initialPresenceString = ObjectStrings.INIT_POT_OF_GOLD;
pot.acquireValue = POT_OF_GOLD_VALUE;
pot.trophyCaseValue = POT_OF_GOLD_TROPHY_VALUE;
pot.weight = POT_OF_GOLD_WEIGHT;

let sapphire = new Item("sapphire-encrusted bracelet", Location.GAS_ROOM);
sapphire.altNames.add("sapphire");
sapphire.altNames.add("bracelet");
sapphire.altNames.add("sapphire bracelet");
sapphire.acquireValue = SAPPHIRE_VALUE;
sapphire.trophyCaseValue = SAPPHIRE_TROPHY_VALUE;
sapphire.weight = SAPPHIRE_WEIGHT;

let scarab = new Item("beautiful jeweled scarab", Location.NULL_LOCATION);
scarab.altNames.add("jeweled scarab");
scarab.altNames.add("scarab");
scarab.acquireValue = SCARAB_VALUE;
scarab.trophyCaseValue = SCARAB_TROPHY_VALUE;
scarab.weight = SCARAB_WEIGHT;

let sceptre = new Item("sceptre", Location.INSIDE_COFFIN);
sceptre.altNames.add("scepter");
sceptre.initialPresenceString = ObjectStrings.INIT_SCEPTRE;
sceptre.presenceString = ObjectStrings.SCEPTRE;
sceptre.waveString = ObjectStrings.SCEPTRE_WAVE;
sceptre.acquireValue = SCEPTRE_VALUE;
sceptre.trophyCaseValue = SCEPTRE_TROPHY_VALUE;
sceptre.weight = SCEPTRE_WEIGHT;

let skull = new Item("crystal skull", Location.LAND_OF_THE_DEAD);
skull.altNames.add("skull");
skull.altNames.add("crystal");
skull.initialPresenceString = ObjectStrings.INIT_SKULL;
skull.acquireValue = CRYSTAL_SKULL_VALUE;
skull.trophyCaseValue = CRYSTAL_SKULL_TROPHY_VALUE;
skull.weight = SKULL_WEIGHT;

let torch = new Item("torch", Location.TORCH_ROOM);
torch.altNames.add("ivory");
torch.altNames.add("ivory torch");
torch.initialPresenceString = ObjectStrings.INIT_TORCH;
torch.activated = true;
torch.acquireValue = TORCH_VALUE;
torch.trophyCaseValue = TORCH_TROPHY_VALUE;
torch.weight = TORCH_WEIGHT;

let trident = new Item("crystal trident", Location.ATLANTIS_ROOM);
trident.altNames.add("trident");
trident.altNames.add("crystal");
trident.initialPresenceString = ObjectStrings.INIT_TRIDENT;
trident.acquireValue = TRIDENT_VALUE;
trident.trophyCaseValue = TRIDENT_TROPHY_VALUE;
trident.weight = TRIDENT_WEIGHT;

let trunk = new Item("trunk of jewels", Location.RESERVOIR_EMPTY);
trunk.altNames.add("trunk");
trunk.altNames.add("jewels");
trunk.acquireValue = TRUNK_OF_JEWELS_VALUE;
trunk.trophyCaseValue = TRUNK_OF_JEWELS_TROPHY_VALUE;
trunk.weight = TRUNK_WEIGHT;



// And another 40 (or so) items that can be taken.

let ancientMap = new Item("ancient map", Location.NULL_LOCATION);
ancientMap.altNames.add("map");
ancientMap.weight = ANCIENT_MAP_WEIGHT;
ancientMap.initialPresenceString = ObjectStrings.INIT_ANCIENT_MAP;
ancientMap.readString = ObjectStrings.ANCIENT_MAP;
ancientMap.examineString = ObjectStrings.ANCIENT_MAP;

let axe = new Item("bloody axe", Location.TROLL_INVENTORY);
axe.altNames.add("axe");
axe.altNames.add("ax");
axe.weight = AXE_WEIGHT;

let bell = new Item("brass bell", Location.TEMPLE);
bell.altNames.add("bell");
bell.ringString = "Ding, dong.";
bell.weight = BELL_WEIGHT;

let blackBook = new Item("black book", Location.ON_ALTAR);
blackBook.altNames.add("book");
blackBook.initialPresenceString = ObjectStrings.INIT_BLACK_BOOK;
blackBook.weight = BLACK_BOOK_WEIGHT;

let boatLabel = new Item("tan label", Location.NULL_LOCATION);
boatLabel.altNames.add("label");
boatLabel.readString = GameStrings.BOAT_LABEL_TEXT;
boatLabel.weight = BOAT_LABEL_WEIGHT;

let bottle = new Item("glass bottle", Location.ON_KITCHEN_TABLE);
bottle.altNames.add("bottle");
bottle.altNames.add("glass");
bottle.initialPresenceString = ObjectStrings.INIT_BOTTLE;
bottle.weight = BOTTLE_WEIGHT;

let brokenCanary = new Item("broken clockwork canary", Location.NULL_LOCATION);
brokenCanary.altNames.add("broken canary");
brokenCanary.altNames.add("canary");
brokenCanary.altNames.add("broken clockwork");
brokenCanary.altNames.add("clockwork");
brokenCanary.initialPresenceString = ObjectStrings.INIT_BROKEN_CANARY;
brokenCanary.examineString = ObjectStrings.EXAMINE_BROKEN_CANARY;
brokenCanary.trophyCaseValue = BROKEN_CANARY_TROPHY_VALUE;
brokenCanary.weight = CANARY_WEIGHT;

let brokenEgg = new Item("broken jewel-encrusted egg", Location.NULL_LOCATION);
brokenEgg.presenceString = "There is a somewhat ruined egg here.";
brokenEgg.altNames.add("broken egg");
brokenEgg.altNames.add("jewel-encrusted egg");
brokenEgg.altNames.add("egg");
brokenEgg.inventoryID = Location.INSIDE_BROKEN_EGG;
brokenEgg.trophyCaseValue = BROKEN_EGG_TROPHY_VALUE;
brokenEgg.weight = EGG_WEIGHT;
brokenEgg.capacity = 6;

let buoy = new Item("red buoy", Location.FRIGID_RIVER_4);
buoy.altNames.add("buoy");
buoy.inventoryID = Location.INSIDE_BUOY;
buoy.weight = BUOY_WEIGHT;
buoy.capacity = 20;
buoy.initialPresenceString = ObjectStrings.INIT_BUOY;
buoy.examineString = "You notice something funny about the feel of the buoy.";

let candles = new Item("pair of candles", Location.ALTAR);
candles.altNames.add("candles");
candles.altNames.add("candle");
candles.altNames.add("pair");
candles.initialPresenceString = ObjectStrings.INIT_CANDLES;
candles.weight = CANDLES_WEIGHT;
candles.activated = true;
candles.plural = true;

let coal = new Item("small pile of coal", Location.DEAD_END_COAL_MINE);
coal.altNames.add("coal");
coal.altNames.add("pile");
coal.altNames.add("coal pile");
coal.altNames.add("pile of coal");
coal.altNames.add("small pile");
coal.weight = COAL_WEIGHT;

let deflatedBoat = new Item("pile of plastic", Location.DAM_BASE);
deflatedBoat.altNames.add("boat");
deflatedBoat.altNames.add("raft");
deflatedBoat.altNames.add("pile");
deflatedBoat.altNames.add("plastic");
deflatedBoat.presenceString = ObjectStrings.INIT_BOAT;
deflatedBoat.weight = BOAT_WEIGHT;

let garlic = new Item("clove of garlic", Location.INSIDE_SACK);
garlic.altNames.add("clove");
garlic.altNames.add("garlic");
garlic.weight = GARLIC_WEIGHT;

let guideBook = new Item("guidebook", Location.DAM_LOBBY);
guideBook.altNames.add("book");
guideBook.initialPresenceString = ObjectStrings.INIT_GUIDEBOOK;
guideBook.weight = GUIDEBOOK_WEIGHT;

let gunk = new Item("viscous material", Location.INSIDE_TUBE);
gunk.altNames.add("gunk");
gunk.altNames.add("material");
gunk.weight = GUNK_WEIGHT;

let inflatedBoat = new Item("magic boat", Location.NULL_LOCATION);
inflatedBoat.altNames.add("boat");
inflatedBoat.altNames.add("raft");
inflatedBoat.inventoryID = Location.INSIDE_BOAT;
inflatedBoat.weight = BOAT_WEIGHT;
inflatedBoat.capacity = 100;
inflatedBoat.itemOpen = true;

let knife = new Item("nasty knife", Location.ATTIC);
knife.altNames.add("knife");
knife.initialPresenceString = ObjectStrings.INIT_NASTY_KNIFE;
knife.weight = KNIFE_WEIGHT;

let lantern = new Item("brass lantern", Location.LIVING_ROOM);
lantern.initialPresenceString = ObjectStrings.INIT_LANTERN;
lantern.altNames.add("lamp");
lantern.altNames.add("lantern");
lantern.altNames.add("brass lamp");
lantern.lifespan = LANTERN_LIFESPAN;
lantern.weight = LANTERN_WEIGHT;

let nest = new Item("bird's nest", Location.UP_TREE);
nest.altNames.add("nest");
nest.initialPresenceString = ObjectStrings.INIT_NEST;
nest.inventoryID = Location.INSIDE_BIRDS_NEST;
nest.weight = NEST_WEIGHT;
nest.itemOpen = true;
nest.capacity = 20;

let leafPile = new Item("pile of leaves", Location.CLEARING_NORTH);
leafPile.altNames.add("pile");
leafPile.altNames.add("leaves");
leafPile.countString = "There are 69,105 leaves here.";
leafPile.initialPresenceString =  ObjectStrings.LEAF_PILE;
leafPile.presenceString =  ObjectStrings.LEAF_PILE;
leafPile.weight = LEAVES_WEIGHT;

let leaflet = new Item("leaflet", Location.INSIDE_MAILBOX);
leaflet.readString = GameStrings.LEAFLET_TEXT;
leaflet.weight = LEAFLET_WEIGHT;

let lunch = new Item("lunch", Location.INSIDE_SACK);
lunch.altNames.add("peppers");
lunch.altNames.add("hot peppers");
lunch.weight = LUNCH_WEIGHT;

let matchbook = new Item("matchbook", Location.DAM_LOBBY);
matchbook.altNames.add("matches");
matchbook.altNames.add("match");
matchbook.presenceString = ObjectStrings.INIT_MATCHBOOK;
matchbook.lifespan = MATCH_LIFESPAN;
matchbook.weight = MATCHBOOK_WEIGHT;

let pump = new Item("hand-held air pump", Location.RESERVOIR_NORTH);
pump.altNames.add("air pump");
pump.altNames.add("pump");
pump.weight = PUMP_WEIGHT;

let puncturedBoat = new Item("punctured boat", Location.NULL_LOCATION);
puncturedBoat.altNames.add("boat");
puncturedBoat.altNames.add("ruined boat");
puncturedBoat.weight = BOAT_WEIGHT;

let rope = new Item("rope", Location.ATTIC);
rope.initialPresenceString = ObjectStrings.INIT_ROPE;
rope.weight = ROPE_WEIGHT;

let rustyKnife = new Item("rusty knife", Location.MAZE_5);
rustyKnife.altNames.add("knife");
rustyKnife.initialPresenceString = ObjectStrings.INIT_RUSTY_KNIFE;
rustyKnife.weight = RUSTY_KNIFE_WEIGHT;

let sack = new Item("brown sack", Location.ON_KITCHEN_TABLE);
sack.altNames.add("sack");
sack.altNames.add("bag");
sack.altNames.add("brown bag");
sack.initialPresenceString = ObjectStrings.INIT_SACK;
sack.inventoryID = Location.INSIDE_SACK;
sack.weight = SACK_WEIGHT;
sack.capacity = 9;

let screwdriver = new Item("screwdriver", Location.MAINTENANCE_ROOM);
screwdriver.altNames.add("driver");
screwdriver.weight = SCREWDRIVER_WEIGHT;

let shovel = new Item("shovel", Location.SANDY_BEACH);
shovel.weight = SHOVEL_WEIGHT;

let skeletonKey = new Item("skeleton key", Location.MAZE_5);
skeletonKey.altNames.add("key");
skeletonKey.weight = SKELETON_KEY_WEIGHT;

let stiletto = new Item("stiletto", Location.THIEF_INVENTORY);
stiletto.weight = STILETTO_WEIGHT;

let studioPaper = new Item("ZORK owner's manual", Location.STUDIO);
studioPaper.altNames.add("paper");
studioPaper.altNames.add("manual");
studioPaper.readString = GameStrings.NATE_MANUAL_TEXT;
studioPaper.initialPresenceString = ObjectStrings.INIT_ZORK_MANUAL;
studioPaper.weight = ZORK_MANUAL_WEIGHT;

let sword = new Item("elvish sword", Location.LIVING_ROOM);
sword.initialPresenceString = ObjectStrings.INIT_SWORD;
sword.altNames.add("sword");
sword.weight = SWORD_WEIGHT;

let timber = new Item("broken timber", Location.TIMBER_ROOM);
timber.altNames.add("timber");
timber.weight = TIMBER_WEIGHT;

let tube = new Item("tube", Location.MAINTENANCE_ROOM);
tube.presenceString = ObjectStrings.TUBE;
tube.examineString = ObjectStrings.DESC_TUBE;
tube.inventoryID = Location.INSIDE_TUBE;
tube.weight = TUBE_WEIGHT;
tube.capacity = 7;

let uselessLantern = new Item("useless lantern", Location.MAZE_5);
uselessLantern.altNames.add("lantern");
uselessLantern.initialPresenceString = ObjectStrings.INIT_USELESS;
uselessLantern.weight = USELESS_LANTERN_WEIGHT;

let wrench = new Item("wrench", Location.MAINTENANCE_ROOM);
wrench.weight = WRENCH_WEIGHT;


// Features, containers and surfaces



let altar = new Surface("altar", Location.ALTAR);
altar.inventoryID = Location.ON_ALTAR;
altar.capacity = 50;

let atticTable = new Surface("attic table", Location.ATTIC);
atticTable.inventoryID = Location.ON_ATTIC_TABLE;
atticTable.altNames.add("table");
atticTable.capacity = 40;

let brokenMirror = new Feature("broken mirror", Location.NULL_LOCATION);
brokenMirror.altNames.add("mirror");
brokenMirror.examineString = "The mirror is broken into many pieces.";
brokenMirror.takeString = "The mirror is many times your size. Give up.";
brokenMirror.breakString = "Haven't you done enough damage already?";

let buttonBlue = new Feature("blue button", Location.MAINTENANCE_ROOM);
buttonBlue.altNames.add("blue");

let buttonBrown = new Feature("brown button", Location.MAINTENANCE_ROOM);
buttonBrown.altNames.add("brown");

let buttonRed = new Feature("red button", Location.MAINTENANCE_ROOM);
buttonRed.altNames.add("red");

let buttonYellow = new Feature("yellow button", Location.MAINTENANCE_ROOM);
buttonYellow.altNames.add("yellow");

let carpet = new Feature("oriental rug", Location.LIVING_ROOM);
carpet.takeString = "The rug is extremely heavy and cannot be carried.";
carpet.altNames.add("carpet");
carpet.altNames.add("oriental carpet");
carpet.altNames.add("rug");
carpet.altNames.add("oriental rug");
carpet.boardString = ObjectStrings.CARPET_SIT_1;
carpet.lookUnderString = ObjectStrings.CARPET_LOOK_UNDER;

let coalMachine = new Container("machine", Location.MACHINE_ROOM);
coalMachine.inventoryID = Location.INSIDE_COAL_MACHINE;
coalMachine.altNames.add("lid");
coalMachine.capacity = 50;
coalMachine.takeString = "It is far too large to carry.";

let coalMachineSwitch = new Feature("switch", Location.MACHINE_ROOM);

let damBolt = new Feature("bolt", Location.DAM);

let deadGate = new Feature("gate", Location.ENTRANCE_TO_HADES);
deadGate.altLocations.add(Location.LAND_OF_THE_DEAD);
deadGate.takeString = ObjectStrings.DEAD_GATE;
deadGate.touchString = ObjectStrings.DEAD_GATE;
deadGate.openString = ObjectStrings.DEAD_GATE;
deadGate.closeString = ObjectStrings.DEAD_GATE;

let engravings = new Feature("engravings", Location.ENGRAVINGS_CAVE);
engravings.altNames.add("markings");
engravings.altNames.add("walls");
engravings.altNames.add("wall");
engravings.readString = GameStrings.ENGRAVINGS_TEXT;
engravings.examineString = GameStrings.ENGRAVINGS_TEXT;

let forest = new Feature("forest", Location.FOREST_PATH);
forest.altNames.add("woods");
forest.altNames.add("trees");
forest.altNames.add("tree");
forest.altLocations.add(Location.FOREST_WEST);
forest.altLocations.add(Location.FOREST_EAST);
forest.altLocations.add(Location.FOREST_NORTHEAST);
forest.altLocations.add(Location.FOREST_SOUTH);
forest.altLocations.add(Location.CLEARING_NORTH);
forest.altLocations.add(Location.CLEARING_EAST);
forest.altLocations.add(Location.UP_TREE);
forest.listenString = "The pines and the hemlocks seem to be murmuring.";

let gas = new Feature("gas", Location.GAS_ROOM);
gas.blowString = "There is too much gas to blow away.";
gas.smellString = "It smells like coal gas in here.";

let grating = new Feature("grating", Location.GRATING_ROOM);
grating.altNames.add("grate");
grating.examineString = "The grating is closed.";
grating.lookInString = "You can see only darkness through the grating.";

let hotBell = new Feature("red hot brass bell", Location.NULL_LOCATION);
hotBell.altNames.add("red hot bell");
hotBell.altNames.add("hot brass bell");
hotBell.altNames.add("hot bell");
hotBell.altNames.add("brass bell");
hotBell.altNames.add("bell");
hotBell.takeString = "The bell is very hot and cannot be taken.";
hotBell.ringString = "The bell is too hot to reach.";
hotBell.presenceString = "On the ground is a red hot bell.";

let house = new Feature("white house", Location.WEST_OF_HOUSE);
house.altNames.add("house");
house.altLocations.add(Location.NORTH_OF_HOUSE);
house.altLocations.add(Location.BEHIND_HOUSE);
house.altLocations.add(Location.SOUTH_OF_HOUSE);
house.altLocations.add(Location.KITCHEN);
house.altLocations.add(Location.LIVING_ROOM);
house.altLocations.add(Location.ATTIC);
house.examineString = ObjectStrings.HOUSE_EXAMINE;
house.enterString = "I can't see how to get in from here.";

let houseBoards = new Feature("wooden boards", Location.WEST_OF_HOUSE);
houseBoards.altNames.add("boards");
houseBoards.altNames.add("board");
houseBoards.altNames.add("wood");
houseBoards.articleName = "some wooden boards";
houseBoards.altLocations.add(Location.SOUTH_OF_HOUSE);
houseBoards.altLocations.add(Location.NORTH_OF_HOUSE);
houseBoards.takeString = "The boards are securely fastened.";

let houseExteriorDoor = new Feature("door", Location.WEST_OF_HOUSE);
houseExteriorDoor.altNames.add("wooden door");
houseExteriorDoor.openString = "The door cannot be opened.";

let houseExteriorWindow = new Feature("boarded window", Location.NORTH_OF_HOUSE);
houseExteriorWindow.altNames.add("windows");
houseExteriorWindow.altNames.add("window");
houseExteriorWindow.altLocations.add(Location.SOUTH_OF_HOUSE);
houseExteriorWindow.breakString = "You can't break the windows open.";
houseExteriorWindow.openString = "The windows are boarded and can't be opened.";

let houseWindow = new Feature("kitchen window", Location.BEHIND_HOUSE);
houseWindow.altNames.add("window");
houseWindow.altLocations.add(Location.KITCHEN);
houseWindow.examineString = ObjectStrings.WINDOW_EXAMINE_AJAR;
houseWindow.lookInString = ObjectStrings.WINDOW_LOOK_IN;

let kitchenTable = new Surface("kitchen table", Location.KITCHEN);
kitchenTable.altNames.add("table");
kitchenTable.capacity = 50;
kitchenTable.inventoryID = Location.ON_KITCHEN_TABLE;

let mailbox = new Container("small mailbox", Location.WEST_OF_HOUSE);
mailbox.altNames.add("mailbox");
mailbox.altNames.add("box");
mailbox.takeString = "It is securely anchored.";
mailbox.moveString = "You can't move the small mailbox.";
mailbox.inventory.add(leaflet);
mailbox.inventoryID = Location.INSIDE_MAILBOX;
mailbox.capacity = 10;

let mirror = new Feature("mirror", Location.MIRROR_ROOM_SOUTH);
mirror.altLocations.add(Location.MIRROR_ROOM_NORTH);
mirror.touchString = "There is a rumble from deep within the earth and the room shakes.";
mirror.examineString = "There is an ugly person staring back at you.";
mirror.lookInString = "There is an ugly person staring back at you.";
mirror.takeString = "The mirror is many times your size. Give up.";
mirror.breakString = "You have broken the mirror. I hope you have a seven years' supply of good luck handy.";

let mountains = new Feature("mountains", Location.FOREST_NORTHEAST);
mountains.altNames.add("mountain");
mountains.climbString = "Don't you believe me? The mountains are impassable!";

let pedestal = new Surface("pedestal", Location.TORCH_ROOM);
pedestal.inventoryID = Location.ON_PEDESTAL;
pedestal.capacity = 30;

let railing = new Feature("wooden railing", Location.DOME_ROOM);
railing.altNames.add("railing");
railing.altNames.add("rail");

let rainbow = new Feature("rainbow", Location.END_OF_RAINBOW);
rainbow.altLocations.add(Location.ON_THE_RAINBOW);
rainbow.altLocations.add(Location.ARAGAIN_FALLS);
rainbow.crossString = "Can you walk on water vapor?";

let reservoirWater = new Feature("reservoir water", Location.RESERVOIR);
reservoirWater.altNames.add("reservoir");
reservoirWater.altNames.add("water");
reservoirWater.altLocations.add(Location.RESERVOIR_NORTH);
reservoirWater.altLocations.add(Location.RESERVOIR_SOUTH);

let riverWater = new Feature("river water", Location.FRIGID_RIVER_1);
riverWater.altNames.add("water");
riverWater.altNames.add("river");
riverWater.altLocations.add(Location.FRIGID_RIVER_2);
riverWater.altLocations.add(Location.FRIGID_RIVER_3);
riverWater.altLocations.add(Location.FRIGID_RIVER_4);
riverWater.altLocations.add(Location.FRIGID_RIVER_5);
riverWater.altLocations.add(Location.DAM_BASE);
riverWater.altLocations.add(Location.WHITE_CLIFFS_BEACH_NORTH);
riverWater.altLocations.add(Location.WHITE_CLIFFS_BEACH_SOUTH);
riverWater.altLocations.add(Location.SANDY_BEACH);
riverWater.altLocations.add(Location.SHORE);


let sand = new Feature("sand", Location.SANDY_CAVE);
sand.altNames.add("ground");

let self = new Feature("you", Location.NULL_LOCATION);
self.altNames.add("me");
self.altNames.add("self");
self.altNames.add("myself");
// self.takeString = "How romantic!";
// self.attackString = "You don't have the you.";
self.eatString = "Auto-cannabalism is not the answer.";


let shaftBasket = new Container("basket", Location.SHAFT_ROOM);
shaftBasket.altLocations.add(Location.DRAFTY_ROOM);
shaftBasket.containerOpen = true;
shaftBasket.capacity = 50;
shaftBasket.inventoryID = Location.INSIDE_BASKET;

let shaftChain = new Feature("chain", Location.SHAFT_ROOM);

let skeleton = new Feature("skeleton", Location.MAZE_5);

let streamWater = new Feature("stream water", Location.STREAM);
streamWater.altNames.add("stream");
streamWater.altNames.add("water");
streamWater.altLocations.add(Location.STREAM_VIEW);

let toolChests = new Feature("tool chests", Location.MAINTENANCE_ROOM);
toolChests.initialPresenceString = ObjectStrings.INIT_TOOL_CHESTS;
toolChests.takeString = "The chests are so rusty and corroded that they crumble when you touch them.";
toolChests.examineString = "The chests are all empty.";

let trapDoor = new Feature("trap door", Location.NULL_LOCATION);
trapDoor.altNames.add("trap");
trapDoor.altNames.add("door");

let trophyCase = new Container("trophy case", Location.LIVING_ROOM);
trophyCase.altNames.add("case");
trophyCase.inventoryID = Location.INSIDE_TROPHY_CASE;
trophyCase.capacity = 10000;

let vitreousSlag = new Item("small piece of vitreous slag", Location.NULL_LOCATION);
vitreousSlag.altNames.add("piece of vitreous slag");
vitreousSlag.altNames.add("piece of slag");
vitreousSlag.altNames.add("vitreous slag");
vitreousSlag.altNames.add("slag");

let water = new Feature("quantity of water", Location.NULL_LOCATION);
water.altNames.add("water");

let woodenDoor = new Feature("wooden door", Location.LIVING_ROOM);
woodenDoor.altNames.add("door");
woodenDoor.altNames.add("letters");
woodenDoor.altNames.add("lettering");
woodenDoor.openString = "The door cannot be opened.";
woodenDoor.readString = ObjectStrings.WOODEN_DOOR;
woodenDoor.examineString = ObjectStrings.WOODEN_DOOR;


// Actors

let cyclops = new Actor("cyclops", Location.CYCLOPS_ROOM);
cyclops.examineString = ObjectStrings.CYCLOPS_EXAMINE;
cyclops.helloString = "The cyclops bows his head to you in greeting.";

let damFlow = new Actor("flow", Location.DAM);
damFlow.intangible = true;

let flood = new Actor("flood", Location.MAINTENANCE_ROOM);
flood.intangible = true;

let gustOfWind = new Actor("gust of wind", Location.CAVE_SOUTH);
gustOfWind.intangible = true;

let riverCurrent = new Actor("current", Location.FRIGID_RIVER_1);
riverCurrent.altLocations.add(Location.FRIGID_RIVER_2);
riverCurrent.altLocations.add(Location.FRIGID_RIVER_3);
riverCurrent.altLocations.add(Location.FRIGID_RIVER_4);
riverCurrent.altLocations.add(Location.FRIGID_RIVER_5);
riverCurrent.intangible = true;


let songbird = new Actor("song bird", forest.location);
songbird.altLocations.add(Location.FOREST_PATH);
songbird.altLocations.add(Location.FOREST_WEST);
songbird.altLocations.add(Location.FOREST_EAST);
songbird.altLocations.add(Location.FOREST_NORTHEAST);
songbird.altLocations.add(Location.FOREST_SOUTH);
songbird.altLocations.add(Location.CLEARING_NORTH);
songbird.altLocations.add(Location.CLEARING_EAST);
songbird.altNames.add("songbird");
songbird.altNames.add("bird");
songbird.presenceString = "";
songbird.takeString = ObjectStrings.SONGBIRD_NEARBY;
songbird.examineString = ObjectStrings.SONGBIRD_NEARBY;

let spirits = new Actor("spirits", Location.ENTRANCE_TO_HADES);
spirits.presenceString = ObjectStrings.SPIRITS;
spirits.talkString = "The spirits jeer loudly and ignore you.";
spirits.attackString = "How can you attack a spirit with material objects?";
spirits.takeString = "You seem unable to interact with these spirits.";

let swordGlow = new Actor("glow", Location.NULL_LOCATION);
swordGlow.intangible = true;

let thief = new Actor("thief", Location.TREASURE_ROOM);
thief.altNames.add("theif");
thief.altNames.add("bandit");
thief.altNames.add("robber");
thief.altNames.add("man");
thief.inventoryID = Location.THIEF_INVENTORY;
thief.presenceString = ObjectStrings.THIEF_PRESENT_2;
thief.helloString = "The thief bows his head to you in greeting.";

let troll = new Actor("troll", Location.TROLL_ROOM);
troll.presenceString = ObjectStrings.TROLL_PRESENCE;
troll.takeString = ObjectStrings.TROLL_TAKE;
troll.talkString = ObjectStrings.TROLL_TALK_1;
troll.inventoryID = Location.TROLL_INVENTORY;
troll.helloString = "The troll bows his head to you in greeting.";

let vampireBat = new Actor("vampire bat", Location.BAT_ROOM);
vampireBat.altNames.add("vampire");
vampireBat.altNames.add("bat");
vampireBat.attackString = ObjectStrings.BAT_CEILING;
vampireBat.enterString = ObjectStrings.BAT_CEILING;
vampireBat.helloString = "The bat bows his head to you in greeting.";
vampireBat.kickString = ObjectStrings.BAT_CEILING;
vampireBat.listenString = "The bat makes pained squeaking noises while holding his nose.";
vampireBat.takeString = ObjectStrings.BAT_CEILING;

// Add all objects to the gamestate list

sceptre.isWeapon = true;
axe.isWeapon = true;
sword.isWeapon = true;
knife.isWeapon = true;
rustyKnife.isWeapon = true;

objectList.set(bar.name, bar);
objectList.set(bauble.name, bauble);
objectList.set(chalice.name, chalice);
objectList.set(coffin.name, coffin);
objectList.set(coins.name, coins);
objectList.set(canary.name, canary);
objectList.set(diamond.name, diamond);
objectList.set(egg.name, egg);
objectList.set(emerald.name, emerald);
objectList.set(jade.name, jade);
objectList.set(painting.name, painting);
objectList.set(pot.name, pot);
objectList.set(sapphire.name, sapphire);
objectList.set(scarab.name, scarab);
objectList.set(sceptre.name, sceptre);
objectList.set(skull.name, skull);
objectList.set(torch.name, torch);
objectList.set(trident.name, trident);
objectList.set(trunk.name, trunk);

// These are here just so they'll be listen in the "right" order
objectList.set(sack.name, sack);
objectList.set(sword.name, sword);

objectList.set(ancientMap.name, ancientMap);
objectList.set(axe.name, axe);
objectList.set(bell.name, bell);
objectList.set(blackBook.name, blackBook);
objectList.set(boatLabel.name, boatLabel);
objectList.set(bottle.name, bottle);
objectList.set(brokenCanary.name, brokenCanary);
objectList.set(brokenEgg.name, brokenEgg);
objectList.set(buoy.name, buoy);
objectList.set(candles.name, candles);
objectList.set(coal.name, coal);
objectList.set(deflatedBoat.name, deflatedBoat);
objectList.set(garlic.name, garlic);
objectList.set(guideBook.name, guideBook);
objectList.set(gunk.name, gunk);
objectList.set(hotBell.name, hotBell);
objectList.set(inflatedBoat.name, inflatedBoat);
objectList.set(lantern.name, lantern);
objectList.set(leaflet.name, leaflet);
objectList.set(leafPile.name, leafPile);
objectList.set(lunch.name, lunch);
objectList.set(knife.name, knife);
objectList.set(matchbook.name, matchbook);
objectList.set(nest.name, nest);
objectList.set(pump.name, pump);
objectList.set(puncturedBoat.name, puncturedBoat);
objectList.set(rope.name, rope);
objectList.set(rustyKnife.name, rustyKnife);
objectList.set(screwdriver.name, screwdriver);
objectList.set(shovel.name, shovel);
objectList.set(skeletonKey.name, skeletonKey);
objectList.set(stiletto.name, stiletto);
objectList.set(studioPaper.name, studioPaper);
objectList.set(timber.name, timber);
objectList.set(tube.name, tube);
objectList.set(uselessLantern.name, uselessLantern);
objectList.set(wrench.name, wrench);

objectList.set(altar.name, altar);
objectList.set(atticTable.name, atticTable);
objectList.set(brokenMirror.name, brokenMirror);
objectList.set(buttonBlue.name, buttonBlue);
objectList.set(buttonYellow.name, buttonYellow);
objectList.set(buttonBrown.name, buttonBrown);
objectList.set(buttonRed.name, buttonRed);
objectList.set(carpet.name, carpet);
objectList.set(coalMachine.name, coalMachine);
objectList.set(coalMachineSwitch.name, coalMachineSwitch);
objectList.set(damBolt.name, damBolt);
objectList.set(deadGate.name, deadGate);
objectList.set(engravings.name, engravings);
objectList.set(forest.name, forest);
objectList.set(gas.name, gas);
objectList.set(grating.name, grating);
objectList.set(house.name, house);
objectList.set(houseBoards.name, houseBoards);
objectList.set(houseExteriorDoor.name, houseExteriorDoor);
objectList.set(houseExteriorWindow.name, houseExteriorWindow);
objectList.set(houseWindow.name, houseWindow);
objectList.set(kitchenTable.name, kitchenTable);
objectList.set(mailbox.name, mailbox);
objectList.set(mirror.name, mirror);
objectList.set(mountains.name, mountains);
objectList.set(pedestal.name, pedestal);
objectList.set(railing.name, railing);
objectList.set(rainbow.name, rainbow);
objectList.set(reservoirWater.name, reservoirWater);
objectList.set(riverWater.name, riverWater);
objectList.set(sand.name, sand);
objectList.set(self.name, self);
objectList.set(shaftBasket.name, shaftBasket);
objectList.set(shaftChain.name, shaftChain);
objectList.set(skeleton.name, skeleton);
objectList.set(streamWater.name, streamWater);
objectList.set(trapDoor.name, trapDoor);
objectList.set(trophyCase.name, trophyCase);
objectList.set(toolChests.name, toolChests);
objectList.set(vitreousSlag.name, vitreousSlag);
objectList.set(water.name, water);
objectList.set(woodenDoor.name, woodenDoor);

objectList.set(cyclops.name, cyclops);
objectList.set(damFlow.name, damFlow);
objectList.set(flood.name, flood);
objectList.set(gustOfWind.name, gustOfWind);
objectList.set(riverCurrent.name, riverCurrent);
objectList.set(songbird.name, songbird);
objectList.set(spirits.name, spirits);
objectList.set(swordGlow.name, swordGlow);
objectList.set(thief.name, thief);
objectList.set(troll.name, troll);
objectList.set(vampireBat.name, vampireBat);

for (let [key, obj] of objectList)
{
    objectNameMap.set(key, obj);

    for (let name of obj.altNames)
    {
        objectNameMap.set(name, obj);
    }
}


function fillDictionary()
{
    for (let i = 0; i < GAME_WORDS.length; ++i)
    {
        dictionary.add(GAME_WORDS[i]);
    }

    for (let name of objectList.keys())
    {
        dictionary.add(name);
        gameNouns.add(name);

        let words = name.split(" ");
        for (let i = 0; i < words.length; ++i)
        {
            dictionary.add(words[i]);
            gameNouns.add(words[i]);
        }
    }

    for (let g of objectList.values())
    {
        for (let str of g.altNames)
        {
            dictionary.add(str);
            gameNouns.add(str);

            let words = str.split(" ");
            for (let i = 0; i < words.length; ++i)
            {
                dictionary.add(words[i]);
                gameNouns.add(words[i]);
            }
        }
    }

    for (let str of actions.keys())
    {
        let words = str.split(" ");
        for (let i = 0; i < words.length; ++i)
            dictionary.add(words[i]);
    }


}