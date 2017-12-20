import { getEnergy } from 'getEnergy';
import { roleCourier } from 'role.courier';

const roleFixer = {

  run(creep: Creep) {
    getEnergy.pickup(creep);

    if (creep.memory.fixing && creep.carry.energy === 0) {
      creep.memory.fixing = false;
    }
    if (!creep.memory.fixing && creep.carry.energy === creep.carryCapacity) {
      creep.memory.fixing = true;
    }

    const targets = creep.room.find(FIND_STRUCTURES, {
      filter: (object) => object.hits < object.hitsMax
    });
    if (creep.memory.fixing && targets.length > 0) {
      targets.sort((a, b) => a.hits - b.hits);
      if (creep.repair(targets[0]) === OK || creep.repair(creep.pos.findClosestByRange(targets)) === OK) {
        creep.say('🔧');
      } else if (creep.repair(targets[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ff00aa' } });
      }
    } else if (creep.memory.fixing) {
      roleCourier.run(creep);
    } else {
      getEnergy.go(creep);
    }
  }
};

export { roleFixer };
