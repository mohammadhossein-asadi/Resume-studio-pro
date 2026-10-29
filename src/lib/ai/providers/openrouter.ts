import OpenAI from 'openai';
import { BaseProvider, ProviderOptions, ProviderResponse } from './base';
import { AIError, ProviderError } from '../errors';

const API_KEY = process.env.OPENROUTER_API_KEY;
const BASE_URL = 'https://openrouter.ai/api/v1';

export class OpenRouterProvider extends BaseProvider {
  readonly name = 'openrouter';
  readonly models = [
    'openai/gpt-4o',
    'openai/gpt-4o-mini',
    'anthropic/claude-3.5-sonnet',
    'google/gemini-2.5-flash',
    'meta-llama/llama-3.1-70b-instruct',
    'mistralai/mistral-large',
  ];
  readonly defaultModel = 'openai/gpt-4o-mini';

  private getClient(): OpenAI {
    if (!API_KEY) {
      throw new ConfigurationError('OPENROUTER_API_KEY not configured');
    }
    return new OpenAI({
      apiKey: API_KEY,
      baseURL: BASE_URL,
      defaultHeaders: {
        'HTTP-Referer': 'https://resume-studio-pro.vercel.app',
        'X-Title': 'Resume Studio Pro',
      },
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
    return OpenRouter: ;
  }
}

class ConfigurationError extends AIError {
  constructor(message: string) {
    super(message, 'CONFIGURATION_ERROR', 500);
  }
}
