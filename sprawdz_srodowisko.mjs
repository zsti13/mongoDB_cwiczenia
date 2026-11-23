import mongoose from 'mongoose';

const URI = 'mongodb://127.0.0.1:27017/test_polaczenia';

console.log(`Node.js: ${process.version}`);
console.log(`Laczenie z ${URI} ...`);

try {
  await mongoose.connect(URI, { serverSelectionTimeoutMS: 5000 });
  console.log('OK: Polaczono pomyslnie z baza MongoDB!');
  await mongoose.disconnect();
  process.exit(0);
} catch (err) {
  console.error('BLAD polaczenia z MongoDB:', err.message);
  process.exit(1);
}
