import { SerialPort } from 'serialport';
import Readline from '@serialport/parser-readline';

// 시리얼 포트 설정 (여기서 COM3은 연결된 포트 이름으로 바꿔야 합니다)
const port = new SerialPort('COM3', {
  baudRate: 9600, // HC-06의 기본 baud rate는 9600입니다.
});

const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

let rainfallValues = [];

// 시리얼 포트로부터 데이터 읽기
parser.on('data', (data) => {
  console.log(`Received data: ${data}`);
  rainfallValues = data;
});

// 시리얼 포트 오류 처리
port.on('error', (err) => {
  console.error('Error: ', err.message);
});

function getRainfallValues() {
    return rainfallValues;
}

export { getRainfallValues };
