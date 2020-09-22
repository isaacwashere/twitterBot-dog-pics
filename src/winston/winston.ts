import winston from 'winston';
import { alignLogger, severityLevels, configTransports } from './config';

export const createWinstonLogger = (): winston.Logger => {
  return winston.createLogger({
    levels: severityLevels,
    format: winston.format.combine(alignLogger),
    transports: configTransports(),
  });
};
