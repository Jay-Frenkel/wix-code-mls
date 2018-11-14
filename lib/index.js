import optimist from 'optimist';
import {makeConfig} from './sync-mls';
import logger from './logger'

if (process.argv.length < 3) {
  printUsage();
  process.exit(1);
}

let command = process.argv[2];

if (command === 'make-config') {
  makeConfigCommand();
}
else if (command === 'make-schema') {
  makeSchema();
}
else if (command === 'run') {
  run();
}
else {
  printUsage(1);
  process.exit(1);
}

function printUsage() {
  console.log('Usage: ' + optimist.$0 + ' [command] [options...]');
  console.log('');
  console.log('Commands:');
  console.log('  make-config   generates the basic wix-code-rets config file');
  console.log('  make-schema   generates a schema file describing the RETS server Resources and Classes, \n'+
              '                and how to sync those to a Wix Code website');
  console.log('  run           runs the RETS integration, importing the data into a Wix Code website');
}

async function makeConfigCommand() {
  let argv = optimist
    .usage('Usage: $0 make-config -c [filename]')
    .alias(   'c', 'config')
    .describe('c', 'name of the config file to generate. defaults to conf.json')
    .parse(process.argv.slice(3));

  let filename = argv.config || 'conf.json';

  try {
    await makeConfig(filename);
    logger.strong(`Created config file template at ${filename}`);
    logger.log(`  next steps:`);
    logger.log(`  1. enter your REST server url, username and password in the generated file`);
    logger.log(`  2. run wix-code-rests.js make-schema`);
  }
  catch (e) {
    logger.error(`Failed to create config file ${filename} - ${e.message}`)
  }
}

function makeSchema() {

}

function run() {
  
}