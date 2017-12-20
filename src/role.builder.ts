import { getEnergy } from 'getEnergy';
import { roleUpgrader } from 'role.upgrader';

const roleBuilder = {

  run(creep: Creep) {
    let swampRoad;
    let extension;
    let container;
    let target;
    // extension = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
    //   filter: (i) => i.structureType === 'extension'
    // });
    // if (!extension) {
    //   swampRoad = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
    //     filter: (i) => i.structureType === 'road'
    //       && Game.map.getTerrainAt(i.pos.x, i.pos.y, creep.room.name) === 'swamp'
    //   });

    //   if (!swampRoad) {
    //     container = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
    //       filter: (i) => i.structureType === 'container'
    //     });
    //   }
    // }
    if (swampRoad) {
      target = swampRoad;
    } else if (extension) {
      target = extension;
    } else if (container) {
      target = container;
    } else {
      target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    }
    getEnergy.pickup(creep);
    let workParts = 0;
    creep.body.forEach((part) => { if (part.type === 'work') { workParts++; } });
    if (creep.carry.energy >= 5 * workParts && target && creep.build(target) === OK) {
      creep.say('🚧');
    }
    if (creep.memory.building && creep.carry.energy < 5 * workParts) {
      creep.memory.building = false;
    }
    if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
      creep.memory.building = true;
    }
    if (creep.memory.building === undefined) {
      creep.memory.building = true;
    }

    if (creep.memory.building) {
      if (target) {
        if (creep.build(target) === OK) {
          creep.say('🚧');
        } else if (creep.build(target) === ERR_NOT_IN_RANGE) {
          creep.moveTo(target, { visualizePathStyle: { stroke: '#00aaff' } });
        }
      } else {
        roleUpgrader.run(creep);
      }
    } else {
      getEnergy.go(creep);
    }
  }
};

export { roleBuilder };
