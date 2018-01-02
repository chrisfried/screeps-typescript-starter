const controlTower = {
  run(tower: StructureTower) {
    const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
      tower.attack(closestHostile);
    } else {
      const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => structure.hits < structure.hitsMax
      });
      tower.repair(closestDamagedStructure);

      const closestFriendly = tower.pos.findClosestByRange(FIND_CREEPS, {
        filter: (creep) => creep.hits < creep.hitsMax
      });
      tower.heal(closestFriendly);

      const damagedRamparts = tower.room.find(FIND_STRUCTURES, {
        filter: (structure) => structure.structureType === STRUCTURE_RAMPART
                            && structure.hits < structure.hitsMax
      });
      damagedRamparts.sort((a, b) => a.hits - b.hits);
      tower.repair(damagedRamparts[0]);
    }
  }
};

export { controlTower };
