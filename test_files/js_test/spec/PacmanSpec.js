var main = require(process.argv[3]);

describe( "pacman", function () {
    var arrayEquality = function(first, second){
        count = 0;
        for (i = 0; i < second.length; i++) {
            if(parseInt(second[i]) == parseInt(first[i])){
                count = count + 1;
            }
        }
        return (count == 3);
    }
    beforeEach(function () {
        jasmine.addCustomEqualityTester(arrayEquality);
    });

    it("traverses generic.txt", function () {
        expect(main.pacman("text_inputs/generic.txt")).toEqual([6,1,27]);
    });

    it("doesn't run for edge.txt", function () {
        expect(main.pacman("text_inputs/edge.txt")).toEqual([-1,-1,0]);
    });

    it("traverses runtime.txt", function () {
        expect(main.pacman("text_inputs/runtime.txt")).toEqual([2142,147,148]);
    });

    
    it("doesn't run if initial data doesn't include at least three lines (board dimensions, initial coords, moves)", function () {
        expect(main.pacman("text_inputs/edge_data.txt")).toEqual([-1,-1,0]);
    })

    it("throws error if initial coords are invalid", function () {
        expect(main.pacman("text_inputs/edge_initial_wall.txt")).toEqual([-1,-1,0]);
        expect(main.pacman("text_inputs/edge_initial.txt")).toEqual([-1,-1,0]);
    })

    it("doesn't run if wall coords are invalid", function () {
        expect(main.pacman("text_inputs/edge_wall.txt")).toEqual([-1,-1,0]);
    })
    
    it("doesn't run if movement char is invalid", function () {
        expect(main.pacman("text_inputs/edge_movement.txt")).toEqual([-1,-1,0]);
    })
});
