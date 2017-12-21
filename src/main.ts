import { controlTower } from 'control.tower';
import { roleBuilder } from 'role.builder';
import { roleCourier } from 'role.courier';
import { roleFixer } from 'role.fixer';
import { roleHarvester } from 'role.harvester';
import { roleUpgrader } from 'role.upgrader';
import { roleWanderer } from 'role.wanderer';

import { ErrorMapper } from 'utils/ErrorMapper';

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  const towers = Game.spawns['The Chateau'].room.find(FIND_STRUCTURES, {
    filter: (structure) => structure.structureType === STRUCTURE_TOWER
  }) as StructureTower[];

  towers.forEach((tower) => controlTower.run(tower));

  const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
  const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
  const builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
  const couriers = _.filter(Game.creeps, (creep) => creep.memory.role === 'courier');
  const defenders = _.filter(Game.creeps, (creep) => creep.memory.role === 'defender');
  const wanderers = _.filter(Game.creeps, (creep) => creep.memory.role === 'wanderer');
  const fixers = _.filter(Game.creeps, (creep) => creep.memory.role === 'fixer');

  const courierBuilds = [
    [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
    [WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
    [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    [WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
    [WORK, CARRY, MOVE, MOVE],
    [WORK, CARRY, MOVE]
  ];

  const harvestorBuilds = [
    [WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE],
    [WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE],
    [WORK, WORK, WORK, MOVE, MOVE, MOVE],
    [WORK, WORK, MOVE, MOVE]
  ];

  const workerBuilds = [
    [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
    [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE],
    [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    [WORK, WORK, CARRY, MOVE, MOVE, MOVE],
    [WORK, CARRY, MOVE, MOVE],
    [WORK, CARRY, MOVE]
  ];

  const defenderBuilds = [
    [ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    [ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE],
    [ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE],
    [ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE],
    [ATTACK, ATTACK, MOVE, MOVE, MOVE, TOUGH],
    [ATTACK, ATTACK, MOVE, MOVE],
    [ATTACK, MOVE, MOVE, MOVE, TOUGH, TOUGH],
    [ATTACK, MOVE, MOVE, TOUGH],
    [ATTACK, MOVE]
  ];

  const wandererBuilds = [
    [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
      MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
      MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    [TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    [TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    [TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    [TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    [TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE],
    [TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE],
    [TOUGH, MOVE, MOVE, MOVE],
    [TOUGH, MOVE, MOVE],
    [MOVE]
  ];

  const spawnCourier = (name: string) => courierBuilds.forEach((build) => {
    Game.spawns['The Chateau'].spawnCreep(build, name,
      { memory: { role: 'courier' } });
  });

  const spawnHarvester = (name: string) => harvestorBuilds.forEach((build) => {
    Game.spawns['The Chateau'].spawnCreep(build, name,
      { memory: { role: 'harvester' } });
  });

  const spawnWorker = (name: string, role: string) => workerBuilds.forEach((build) => {
    Game.spawns['The Chateau'].spawnCreep(build, name,
      { memory: { role } });
  });

  const spawnDefender = (name: string) => defenderBuilds.forEach((build) => {
    Game.spawns['The Chateau'].spawnCreep(build, name,
      { memory: { role: 'defender' } });
  });

  const spawnWanderer = (name: string) => wandererBuilds.forEach((build) => {
    Game.spawns['The Chateau'].spawnCreep(build, name,
      { memory: { role: 'wanderer' } });
  });

  if (couriers.length < 1) {
    spawnCourier('Courier' + Game.time);
  } else if (harvesters.length < 1) {
    spawnHarvester('Harvester' + Game.time);
  } else if (upgraders.length < 1) {
    spawnWorker('Upgrader' + Game.time, 'upgrader');
  } else if (fixers.length < 1) {
    spawnWorker('Fixer' + Game.time, 'fixer');
  } else if (builders.length < 1) {
    spawnWorker('Builder' + Game.time, 'builder');
  } else if (harvesters.length < 5) {
    spawnHarvester('Harvester' + Game.time);
  } else if (couriers.length < 5) {
    spawnCourier('Courier' + Game.time);
  } else if (upgraders.length < 3) {
    spawnWorker('Upgrader' + Game.time, 'upgrader');
  } else if (builders.length < 3) {
    spawnWorker('Builder' + Game.time, 'builder');
  } else if (fixers.length < 3) {
    spawnWorker('Fixer' + Game.time, 'fixer');
  } else if (defenders.length < 0) {
    spawnDefender('Defender' + Game.time);
  } else if (wanderers.length < 5) {
    spawnWanderer('Wanderer' + Game.time);
  }

  if (Game.spawns['The Chateau'].spawning) {
    const spawningCreep = Game.creeps[Game.spawns['The Chateau'].spawning.name];
    Game.spawns['The Chateau'].room.visual.text(
      '🛠️' + spawningCreep.memory.role,
      Game.spawns['The Chateau'].pos.x + 1,
      Game.spawns['The Chateau'].pos.y,
      { align: 'left', opacity: 0.8 });
  }

  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    if (creep.memory.role === 'wanderer') {
      roleWanderer.run(creep);
    }
    if (creep.memory.role === 'harvester') {
      roleHarvester.run(creep);
    }
    if (creep.memory.role === 'courier') {
      roleCourier.run(creep);
    }
    if (creep.memory.role === 'upgrader') {
      roleUpgrader.run(creep);
    }
    if (creep.memory.role === 'builder') {
      roleBuilder.run(creep);
    }
    if (creep.memory.role === 'fixer') {
      roleFixer.run(creep);
    }
  }
});
