import app from './app';
import { config } from './config';
import { logger } from './shared/utils/logger';
import prisma from './config/database';

const start = async () => {
  try {
    await prisma.$connect();
    logger.info('Database connected');

    app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port} [${config.env}]`);
    });
  } catch (error) {
    logger.error('Failed to start', error);
    process.exit(1);
  }
};

process.on('SIGINT', async () => { await prisma.$disconnect(); process.exit(0); });
process.on('SIGTERM', async () => { await prisma.$disconnect(); process.exit(0); });

start();