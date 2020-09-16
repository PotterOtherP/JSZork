class Passage {

    constructor(locA, locB)
    {
        this.locationA = locA;
        this.locationB = locB;

        this.closedFail = "";
        this.message = "";
        this.passageOpen = true;
        this.weightFail = "";
        this.weightLimit = 1000;
    }


    setOpen() { this.passageOpen = true; }
    setClosed() { this.passageOpen = false; }
    isOpen() { return this.passageOpen; }
}

