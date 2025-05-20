type FetchJob = () => Promise<void>;

const queue: FetchJob[] = [];
let running = false;

export function enqueue(job: FetchJob) {
  queue.push(job);
  if (!running) runQueue();
}

async function runQueue() {
  running = true;

  while (queue.length > 0) {
    const job = queue.shift();
    if (job) {
      try {
        await job();
      } catch {
        // Silent fail
      }
    }

    await new Promise((res) => {
      const baseDelay = 20;
      const jitter = Math.floor(Math.random() * 150); // 0–149ms
      const totalDelay = baseDelay + jitter;
      setTimeout(res, totalDelay);
    });
  }

  running = false;
}