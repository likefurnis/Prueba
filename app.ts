import express from 'express';
import * as http from 'http';
import * as bodyparser from 'body-parser';
import cors from 'cors';
import debug from 'debug';

import {CommonRoutesConfig} from './src/common/common.routes.config';
import {CouponsRoutes} from './src/coupon/coupon.routes.config';
import { AlgorithmRoutes } from './src/algorithm/algorithm.routes.config';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

app.use(bodyparser.json());
app.use(cors());

routes.push(new CouponsRoutes(app));
routes.push(new AlgorithmRoutes(app));

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send('Server up and running!');
});

server.listen(PORT, () => {
    debugLog(`Server running at http://localhost:${PORT}`);
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getControllerName()}`);
    });
});