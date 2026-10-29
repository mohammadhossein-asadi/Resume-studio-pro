import { Mistral } from '@mistralai/mistralai';
import { BaseProvider, ProviderOptions, ProviderResponse } from './base';
import { AIError, ProviderError } from '../errors';

const API_KEY = process.env.MISTRAL_API_KEY;

export class MistralProvider extends BaseProvider {
  readonly name = 'mistral';
  readonly models = [
    'mistral-large-latest',
    'mistral-medium-latest',
    'mistral-small-latest',
    'open-mistral-7b',
    'open-mixtral-8x7b',
  ];
  readonly defaultModel = 'mistral-small-latest';

  private getClient(): Mistral {
    if (!API_KEY) {
      throw new ConfigurationError('MISTRAL_API_KEY not configured');
    }
    return new Mistral({ apiKey: API_KEY });
  }

  async complete(prompt: string, options?: ProviderOptions): Promise<ProviderResponse> {
    const client = this.getClient();
    const model = this.getModel(options);
    const messages = this.buildMessages(prompt, options?.systemPrompt);

    try {
      const response = await client.chat.complete({
        model,
        messages,
        temperature: this.getTemperature(options),
        maxTokens: this.getMaxTokens(options),
      });

      const content = response.choices[0]?.message?.content || '';
      const usage = response.usage;
      return {
        content,
        usage: usage
          ? {
              promptTokens: usage.promptTokens,
              completionTokens: usage.completionTokens,
              totalTokens: usage.totalTokens,
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

    const stream = await client.chat.stream({
      model,
      messages,
      temperature: this.getTemperature(options),
      maxTokens: this.getMaxTokens(options),
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
    return Mistral: ;
  }
}

class ConfigurationError extends AIError {
  constructor(message: string) {
    super(message, 'CONFIGURATION_ERROR', 500);
  }
}
