import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: 'XXXXXXXXXXXXXXXXXXXXXXX',
  authDomain: 'todoapp-XXXX.firebaseapp.com',
  databaseURL: 'https://todoapp-XXXXXX.firebaseio.com',
  projectId: 'todoapp-XXXX',
  storageBucket: 'todoapp-XXXX.appspot.com',
  messagingSenderId: 'XXXXXXX',
  appId: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {db};
