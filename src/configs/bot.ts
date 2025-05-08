import { Telegraf } from 'telegraf';
import { EnvironmentVariableError } from '../types/errorTypes';
import dotenv from 'dotenv';

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) throw new EnvironmentVariableError('BOT_TOKEN is required');

export const bot = new Telegraf(BOT_TOKEN);
