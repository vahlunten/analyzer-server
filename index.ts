import express from 'express';
import { readdirSync } from "fs";
import cors from "cors";

const app: express.Application = express();

const port: number = 3000;
const kvsDir: string = '../analyzer-ts/storage/key_value_stores';
const defaultDir: string = '../analyzer-ts/storage/key_value_stores/default';
const runsDir: string = '../analyzer-ts/storage/key_value_stores/runs';
const analyzerDir: string = '../analyzer-ts';


app.use(express.static(runsDir));
app.use(cors());

app.get('/', async (_req, _res) => {
    let runs: string[] = [];
    let html: string = "";
    try {
        readdirSync(runsDir).forEach(file => {
            runs.push(file);
            html = html +`<div><a href="http://localhost:3000/${file}/DASHBOARD.html"> ${file}</a></div>\n`;
        });
    } catch (e:any) {
        console.log("Failed to read the runs directory.");
        _res.statusCode = 500;
    }
    _res.send(html);
});

app.listen(port, () => {
    console.log(`TypeScript with Express
         http://localhost:${port}/`);
});