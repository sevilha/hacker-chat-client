
import Events from 'events';
import CliConfig from './src/cliConfig.js';
import EventManager from './src/eventManager.js';
import SocketClient from './src/socker.js';
import TerminalContreller from "./src/terminalController.js";

const [nodePath, filePath, ...comands] = process.argv;
const config = CliConfig.parseArguments(comands);

const componentEmitter = new Events();
const socketClient = new SocketClient(config);

await socketClient.initialize();
const eventManager = new EventManager({ componentEmitter, socketClient });
const events = eventManager.getEvents();
socketClient.attachEvents(events);

const data = {
  roomId: config.room,
  userName: config.username
}

eventManager.joinRoomAndWaitForMessages(data);
const controller = new TerminalContreller();
await controller.initializeTable(componentEmitter);

