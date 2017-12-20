const getEnergy = {

  go(creep: Creep) {
    this.pickup(creep);
    const highDroppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
      filter: (i) => i.amount > 100
    });
    const droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
    const containers = creep.room.find(FIND_STRUCTURES, {
      filter: (i) => i.structureType === STRUCTURE_CONTAINER &&
        i.store[RESOURCE_ENERGY] > 0
    }) as StructureContainer[];
    containers.sort((a, b) => b.store.energy - a.store.energy);
    const containerWithEnergy = containers[0];
    const sources = creep.room.find(FIND_SOURCES, {
      filter: (i) => i.energy > 0
    });
    if (creep.carry.energy === creep.carryCapacity) {
      return;
    }
    if (highDroppedEnergy && creep.pickup(droppedEnergy) === ERR_NOT_IN_RANGE) {
      creep.moveTo(highDroppedEnergy, { visualizePathStyle: { stroke: '#ffaa00' } });
    } else if (containerWithEnergy && creep.withdraw(containerWithEnergy, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(containerWithEnergy, { visualizePathStyle: { stroke: '#ffaa00' } });
    } else if (droppedEnergy && creep.pickup(droppedEnergy) === ERR_NOT_IN_RANGE) {
      creep.moveTo(droppedEnergy, { visualizePathStyle: { stroke: '#ffaa00' } });
    } else if (sources.length && creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaaaa' } });
    } else if (sources.length && creep.harvest(sources[0]) === OK) {
      creep.say('🔄');
    }
    this.pickup(creep);
  },
  pickup(creep: Creep) {
    const droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
    const containerWithEnergy = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (i) => i.structureType === STRUCTURE_CONTAINER &&
        i.store[RESOURCE_ENERGY] > 0
    });
    if (droppedEnergy && creep.pickup(droppedEnergy) === OK) {
      creep.say('🔄');
    }
    if (containerWithEnergy && creep.withdraw(containerWithEnergy, RESOURCE_ENERGY) === OK) {
      creep.say('🔄');
    }
  }
};

export { getEnergy };
