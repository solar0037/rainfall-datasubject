import { initializeApp, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import serviceAccount from './rainfall-datasubject-firebase.json' assert { type: "json" };

// Firebase Admin SDK 초기화
initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://rainfall-datasubject-default-rtdb.firebaseio.com" // Firebase Realtime Database URL
});

// Firebase Realtime Database 참조 생성
const db = getDatabase();

// 데이터 전송 함수
async function sendDataToFirebase(data) {
  try {
    const ref = db.ref("rainFallData");
    await ref.set(data);
    console.log("Data sent successfully!");
  } catch (error) {
    console.error("Error sending data:", error);
  }
}

export { sendDataToFirebase };
