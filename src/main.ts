import { Worker } from 'worker_threads';

function startWorker(path: string, port: number): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`Starting worker on port ${port}...`);
    const worker = new Worker(path, { workerData: { port } });

    worker.on('message', (message) => {
      console.log(`Worker on port ${port} message: ${message}`);
      if (message === 'Worker started successfully') {
        resolve();
      }
    });

    worker.on('error', (error) => {
      console.error(`Worker on port ${port} error: ${error.message}`);
      reject(error);
    });

    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker on port ${port} stopped with exit code ${code}`));
      } else {
        console.log(`Worker on port ${port} exited successfully.`);
      }
    });
  });
}

async function bootstrap() {
  try {
    console.log('Starting workers...');
  
    await Promise.all([
      startWorker(require.resolve('./worker'), 4000), 
      startWorker(require.resolve('./worker'), 4001), 
    ]);
    console.log('All workers started successfully');
  } catch (error) {
    console.error(`Error starting workers: ${error.message}`);
  }
}

bootstrap(); 
