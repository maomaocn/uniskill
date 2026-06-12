#!/usr/bin/env node

const { program } = require('commander');
const { version } = require('../package.json');

const installCmd = require('../src/commands/install');
const uninstallCmd = require('../src/commands/uninstall');
const scanCmd = require('../src/commands/scan');
const migrateCmd = require('../src/commands/migrate');
const initCmd = require('../src/commands/init');
const memoryCmd = require('../src/commands/memory');
const cursorCmd = require('../src/commands/cursor');

program
  .name('uniskill')
  .description('Universal AI Skill Router - One skill for all your AI assistants')
  .version(version);

program.command('init').description('Initialize Uniskill core').action(initCmd);
program.command('install <skillPath>').description('Install a skill').action(installCmd);
program.command('uninstall <skillPath>').description('Uninstall a globally routed skill').action(uninstallCmd);
program.command('scan').description('Scan local AI tools').action(scanCmd);
program.command('migrate').description('Migrate scattered skills').action(migrateCmd);
program.command('sync-memory').description('Sync cross-AI memories').action(memoryCmd);
program.command('cursor-bind [targetDir]').description('Bind capabilities via .mdc schema').action(cursorCmd);

program.parse(process.argv);
