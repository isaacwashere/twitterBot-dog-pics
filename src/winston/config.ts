import { TIMEZONE } from '../constants';
import winston from 'winston';
import dotenv from 'dotenv';

const env = process.env.NODE_ENV;
if (env !== 'production') {
  dotenv.config();
}

export const severityLevels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
};

export const alignLogger = winston.format.combine(
  winston.format.colorize({
    colors: {
      error: 'red',
      warn: 'yellow',
      info: 'green',
      debug: 'blue',
    },
  }),
  winston.format.align(),
  winston.format.label({
    label: '[LOG]',
  }),
  winston.format.timestamp({
    format: () => timezone(),
  }),
  winston.format.printf(info => {
    const { label, timestamp, level, message, ...args } = info;

    const ts = timestamp.slice(0, 19).replace('T', ' - ');
    return `${label}-${ts}EDT [${level}]: ${message} ${
      Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
    }`;
  })
);

export const timezone = () => {
  const time = new Date().toLocaleString('en-US', {
    timeZone: TIMEZONE,
  });

  return new Date(time).toISOString();
};

export const configTransports = () => {
  const consoleLevel = process.env.DEBUG ? 'debug' : 'info';
  const transports = [
    new winston.transports.Console({ level: consoleLevel }),
    new winston.transports.File({
      level: 'info',
      filename: 'info.log',
    }),
    new winston.transports.File({
      level: 'error',
      filename: 'error.log',
    }),
  ];
  return transports;
};
