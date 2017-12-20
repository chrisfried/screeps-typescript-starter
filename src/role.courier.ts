import { getEnergy } from 'getEnergy';
import { roleBuilder } from 'role.builder';
import { roleUpgrader } from 'role.upgrader';

const roleCourier = {

  run(creep: Creep) {
    getEnergy.pickup(creep);
    const targets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
          structure.energy < structure.energyCapacity;
      }
    });
    if (!targets.length) {
      roleBuilder.run(creep);
    } else if (creep.carry.energy === creep.carryCapacity) {
      const target = creep.pos.findClosestByRange(targets);
      if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target, { visualizePathStyle: { stroke: '#00ffaa' } });
      }
    } else {
      getEnergy.go(creep);
    }
  }
};

export { roleCourier };
