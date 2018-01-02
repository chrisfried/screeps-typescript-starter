const roleWanderer = {
  run(creep: Creep) {
    // const closestHostile = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
    // if (closestHostile) {
    //   if (creep.attack(closestHostile) === ERR_NOT_IN_RANGE) {
    //     creep.moveTo(closestHostile);
    //   }
    // } else {
      creep.memory.room ? creep.memory.oldRoom = creep.memory.room : creep.memory.oldRoom = creep.room.name;
      creep.memory.room = creep.room.name;

      if (creep.memory.room !== creep.memory.oldRoom || !creep.memory.exit) {
        let directions = [FIND_EXIT_BOTTOM, FIND_EXIT_LEFT, FIND_EXIT_RIGHT, FIND_EXIT_TOP];
        directions = _.shuffle(directions);
        creep.memory.exit = undefined;
        directions.forEach((direction) => {
          if (!creep.memory.exit && creep.pos.findClosestByPath(direction)) {
            creep.memory.exit = direction;
          }
        });
      }

      if (creep.memory.exit) {
        creep.moveTo(creep.pos.findClosestByPath(creep.memory.exit), { visualizePathStyle: { stroke: '#00ff00' } });
      }
    }
  // }
};

export { roleWanderer };
