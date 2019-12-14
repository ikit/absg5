import "reflect-metadata";
import { createConnections } from "typeorm";
import { createExpressServer } from "routing-controllers";
import * as bodyParser from "body-parser";
import rfs from 'rotating-file-stream';
import { Init } from './init';
import { logger, errorLogHandler, accessLogHandler } from "./middleware/logger";
import { jwtAuthorizationChecker, currentUserChecker } from "./middleware";

import { agpaService, citationService, immtService, agendaService, voyagService, eventService } from "./services";

const ormconfig = require(`../ormconfig.${process.env.NODE_ENV}.json`);

console.log('---');
createConnections(ormconfig).then(() => {

    console.log('ORM connection created');

    // Une fois la connection créé, on peut initialialiser les services
    agpaService.initService();
    citationService.initService();
    immtService.initService();
    agendaService.initService();
    voyagService.initService();
    eventService.initService();
    console.log('AbsG services initialized');


    // create express app
    const app = createExpressServer({
        routePrefix: '/api',
        controllers: [__dirname + '/controllers/*.ts'],
        authorizationChecker: jwtAuthorizationChecker,
        currentUserChecker
    });

    app.use(bodyParser.json()); // parse request as JSON
    app.use(accessLogHandler()); // access logs
    app.use(errorLogHandler()); // error logs
    
        
    // start express server
    app.listen(5000);
    
    console.info('Server has started on port 5000.');

    // init DB data on dev
    if (process.env.NODE_ENV === 'development') {
        new Init().initData();
    }
    
    console.log('---');
    
  })
  .catch(error => {
    console.error(error);
    logger.error(error);
  });

