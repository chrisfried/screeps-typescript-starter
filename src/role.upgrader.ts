import { getEnergy } from 'util.energy';

const roleUpgrader = {

  run(creep: Creep) {
    getEnergy.pickup(creep);

    if (creep.memory.upgrading && creep.carry.energy === 0) {
      creep.memory.upgrading = false;
    }
    if (!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
      creep.memory.upgrading = true;
    }
    if (creep.memory.upgrading === undefined) {
      creep.memory.upgrading = true;
    }

    if (creep.memory.upgrading) {
      const controller = creep.room.controller as StructureController;
      if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(controller, { visualizePathStyle: { stroke: '#00FFFF' } });
      } else if (creep.upgradeController(controller) === OK) {
        creep.say('⚡');
      }
    } else {
      getEnergy.go(creep);
    }
  }
};

export { roleUpgrader };
