import { roleBuilder } from 'role.builder';
import { roleUpgrader } from 'role.upgrader';
import { getEnergy } from 'util.energy';

const roleCourier = {

  run(creep: Creep) {
    getEnergy.pickup(creep);
    let targets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN)
            && structure.energy < structure.energyCapacity;
      }
    });
    if (!targets.length) {
      const towers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => structure.structureType === STRUCTURE_TOWER
      });
      const weakTowers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => structure.structureType === STRUCTURE_TOWER
             && structure.energy < structure.energyCapacity / 3
      });
      if (!creep.memory.towerCooldown || weakTowers.length) {
        creep.memory.towerCooldown = false;
        targets = towers;
      }
    }
    if (!targets.length) {
      roleBuilder.run(creep);
    } else if (creep.carry.energy >= 50) {
      const target = creep.pos.findClosestByRange(targets);
      if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target, { visualizePathStyle: { stroke: '#00ffaa' } });
      }
      if (target.structureType === STRUCTURE_TOWER && target.energy > target.energyCapacity * .95) {
        creep.memory.towerCooldown = true;
      }
    } else {
      getEnergy.go(creep);
    }
  }
};

export { roleCourier };
