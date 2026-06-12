#!/usr/bin/env node

const { program } = require('commander');
const { version } = require('../package.json');

const installCmd = require('../src/commands/install');
const scanCmd = require('../src/commands/scan');
const migrateCmd = require('../src/commands/migrate');
const initCmd = require('../src/commands/init');

program
  .name('uniskill')
  .description('Universal AI Skill Router - One skill for all your AI assistants')
  .version(version);

program
  .command('init')
  .description('Initialize Uniskill core directories and global setup')
  .action(initCmd);

program
  .command('install <skillPath>')
  .description('Install a skill (path/repo) and route it to all AI tools')
  .action(installCmd);

program
  .command('scan')
  .description('Scan local AI tools for overlapping skills and configurations')
  .action(scanCmd);

program
  .command('migrate')
  .description('Migrate existing scattered skills into the shared Uniskill pool')
  .action(migrateCmd);

program.parse(process.argv);
