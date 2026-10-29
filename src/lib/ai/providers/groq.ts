import OpenAI from 'openai';
import { BaseProvider, ProviderOptions, ProviderResponse } from './base';
import { AIError, ProviderError } from '../errors';

const API_KEY = process.env.GROQ_API_KEY;
const BASE_URL = 'https://api.groq.com/openai/v1';

export class GroqProvider extends BaseProvider {
  readonly name = 'groq';
  readonly models = [
    'llama-3.3-70b-versatile',
    'llama-3.1-70b-versatile',
    'llama-3.1-8b-instant',
    'mixtral-8x7b-32768',
    'gemma2-9b-it',
  ];
  readonly defaultModel = 'llama-3.3-70b-versatile';

  private getClient(): OpenAI {
    if (!API_KEY) {
      throw new ConfigurationError('GROQ_API_KEY not configured');
    }
    return new OpenAI({
      apiKey: API_KEY,
      baseURL: BASE_URL,
    });
  }

  async complete(prompt: string, options?: ProviderOptions): Promise<ProviderResponse> {
    const client = this.getClient();
    const model = this.getModel(options);
    const messages = this.buildMessages(prompt, options?.systemPrompt);

    try {
      const completion = await client.chat.completions.create({
        model,
        messages,
        temperature: this.getTemperature(options),
        max_tokens: this.getMaxTokens(options),
      });

      const content = completion.choices[0]?.message?.content || '';
      return {
        content,
        usage: completion.usage
          ? {
              promptTokens: completion.usage.prompt_tokens,
              completionTokens: completion.usage.completion_tokens,
              totalTokens: completion.usage.total_tokens,
            }
          : undefined,
        model,
      };
    } catch (error) {
      throw new ProviderError(this.formatError(error), this.name);
    }
  }

  async *stream(prompt: string, options?: ProviderOptions): AsyncIterable<string> {
    const client = this.getClient();
    const model = this.getModel(options);
    const messages = this.buildMessages(prompt, options?.systemPrompt);

    const stream = await client.chat.completions.create({
      model,
      messages,
      temperature: this.getTemperature(options),
      max_tokens: this.getMaxTokens(options),
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) yield content;
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      const client = this.getClient();
      await client.models.list();
      return true;
    } catch {
      return false;
    }
  }

  private formatError(error: unknown): string {
    const message = (error as Error)?.message || 'Unknown error';
    return Groq: ;
  }
}

class ConfigurationError extends AIError {
  constructor(message: string) {
    super(message, 'CONFIGURATION_ERROR', 500);
  }
}
