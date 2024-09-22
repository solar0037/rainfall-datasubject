import express, { json, static as serveStatic } from 'express';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { interpolate, calculateValues } from './calc.js';

const points = [
    { x: 0, y: 0, value: 0 },
    { x: 1, y: 1, value: 1 },
    { x: 2, y: 2, value: 2 },
    { x: 3, y: 3, value: 3 }
];

const results = calculateValues(points);
console.log(results);

const app = express();
const port = 3000;

app.use(json());

// Interpolation endpoint
app.post('/interpolate', (req, res) => {
    const { p1, p2, t } = req.body;
    const result = interpolate(p1, p2, t);
    res.json(result);
});

// Calculate values endpoint
app.post('/calculate-values', (req, res) => {
    const { points } = req.body;
    const results = calculateValues(points);
    res.json(results);
});

// 정적 파일 서빙 설정
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(serveStatic(join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export default app;
