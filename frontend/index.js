import express, { json, static as serveStatic } from 'express';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const app = express();
const port = 5000;

app.use(json());

// 정적 파일 서빙 설정
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(serveStatic(join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export default app;
