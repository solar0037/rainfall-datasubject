import express, { json, static as serveStatic } from 'express';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { interpolate, calculateValues, generateRainfallMap } from './calc.js';
// import { getRainfallValues } from './bt.js';

const app = express();
const port = 3000;

app.use(json());

app.get('/', (req, res) => {
    // TODO: points 랜덤 값으로 바꾸기
    const points = [
        { x: 0, y: 0, value: 10 },
        { x: 1, y: 0, value: 20 },
        { x: 0, y: 1, value: 30 },
        { x: 1, y: 1, value: 40 }
    ];
    // TODO: points value 블루투스 송신 값으로 바꾸기
    // const points = [
    //     { x: 0, y: 0, value: getRainfallValues() },
    //     { x: 1, y: 0, value: 20 },
    //     { x: 0, y: 1, value: 30 },
    //     { x: 1, y: 1, value: 40 }
    // ];
    const results = calculateValues(points);
    generateRainfallMap(results);
    const filePath = join(__dirname, 'views', 'index.html');
    res.sendFile(filePath);
})

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
