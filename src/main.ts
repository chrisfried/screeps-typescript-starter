import { roleBuilder } from 'role.builder';
import { roleCourier } from 'role.courier';
import { roleFixer } from 'role.fixer';
import { roleHarvester } from 'role.harvester';
import { roleUpgrader } from 'role.upgrader';

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

  const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
  const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
  const builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
  const couriers = _.filter(Game.creeps, (creep) => creep.memory.role === 'courier');
  const defenders = _.filter(Game.creeps, (creep) => creep.memory.role === 'defender');
  const fixers = _.filter(Game.creeps, (creep) => creep.memory.role === 'fixer');

  if (couriers.length < 1) {
    const newName = 'Courier' + Game.time;
    Game.spawns['The Chateau'].spawnCreep([WORK, CARRY, MOVE], newName,
      { memory: { role: 'courier' } });
  } else if (harvesters.length < 1) {
    const newName = 'Harvester' + Game.time;
    Game.spawns['The Chateau'].spawnCreep([WORK, WORK, MOVE], newName,
      { memory: { role: 'harvester' } });
  } else if (upgraders.length < 1) {
    const newName = 'Upgrader' + Game.time;
    Game.spawns['The Chateau'].spawnCreep([WORK, CARRY, MOVE], newName,
      { memory: { role: 'upgrader' } });
  } else if (fixers.length < 1) {
    const newName = 'Fixer' + Game.time;
    Game.spawns['The Chateau'].spawnCreep([WORK, CARRY, MOVE], newName,
      { memory: { role: 'fixer' } });
  } else if (builders.length < 1) {
    const newName = 'Builder' + Game.time;
    Game.spawns['The Chateau'].spawnCreep([WORK, CARRY, MOVE], newName,
      { memory: { role: 'builder' } });
  } else if (harvesters.length < 5) {
    const newName = 'Harvester' + Game.time;
    Game.spawns['The Chateau'].spawnCreep([WORK, WORK, MOVE], newName,
      { memory: { role: 'harvester' } });
  } else if (couriers.length < 6) {
    const newName = 'Courier' + Game.time;
    Game.spawns['The Chateau'].spawnCreep([WORK, CARRY, MOVE], newName,
      { memory: { role: 'courier' } });
  } else if (upgraders.length < 3) {
    const newName = 'Upgrader' + Game.time;
    Game.spawns['The Chateau'].spawnCreep([WORK, CARRY, MOVE], newName,
      { memory: { role: 'upgrader' } });
  } else if (builders.length < 3) {
    const newName = 'Builder' + Game.time;
    Game.spawns['The Chateau'].spawnCreep([WORK, CARRY, MOVE], newName,
      { memory: { role: 'builder' } });
  } else if (fixers.length < 2) {
    const newName = 'Fixer' + Game.time;
    Game.spawns['The Chateau'].spawnCreep([WORK, CARRY, MOVE], newName,
      { memory: { role: 'fixer' } });
  } else if (defenders.length < 0) {
    const newName = 'Defender' + Game.time;
    Game.spawns['The Chateau'].spawnCreep([WORK, WORK, MOVE, MOVE], newName,
      { memory: { role: 'defender' } });
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
