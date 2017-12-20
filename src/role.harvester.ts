const roleHarvester = {

  run(creep: Creep) {
    if (creep.harvest(creep.pos.findClosestByRange(FIND_SOURCES)) === ERR_NOT_IN_RANGE) {
      const sources = creep.room.find(FIND_SOURCES);
      sources.some((source) => {
        let spots = 0;
        for (let i = source.pos.x - 1; i <= source.pos.x + 1; i++) {
          for (let j = source.pos.y - 1; j <= source.pos.y + 1; j++) {
            if (Game.map.getTerrainAt(i, j, creep.room.name) !== 'wall') {
              const harvesters = _.filter(Game.creeps,
                (c) => c.memory.role === 'harvester'
                    && c.pos.x === i
                    && c.pos.y === j);
              if (!harvesters.length) {
                spots++;
              }
            }
          }
        }
        if (spots) {
          creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaaaa' } });
          return true;
        }
        return false;
      });
    }
  }
};

export { roleHarvester };
