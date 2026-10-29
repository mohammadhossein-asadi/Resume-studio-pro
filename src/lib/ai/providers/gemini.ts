import { GoogleGenAI } from '@google/genai';
import { BaseProvider, ProviderOptions, ProviderResponse } from './base';
import { AIError, ProviderError } from '../errors';

const API_KEY = process.env.GEMINI_API_KEY;

export class GeminiProvider extends BaseProvider {
  readonly name = 'gemini';
  readonly models = ['gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-1.5-flash', 'gemini-1.5-pro'];
  readonly defaultModel = 'gemini-2.5-flash';

  private getClient(): GoogleGenAI {
    if (!API_KEY) {
      throw new ConfigurationError('GEMINI_API_KEY not configured');
    }
    return new GoogleGenAI({ apiKey: API_KEY });
  }

  async complete(prompt: string, options?: ProviderOptions): Promise<ProviderResponse> {
    const client = this.getClient();
    const model = this.getModel(options);
    const systemPrompt = options?.systemPrompt;
    const temperature = this.getTemperature(options);
    const maxTokens = this.getMaxTokens(options);

    try {
      const response = await client.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction: systemPrompt,
          temperature,
          maxOutputTokens: maxTokens,
        },
      });

      const content = response.text || '';
      return {
        content,
        usage: response.usageMetadata
          ? {
              promptTokens: response.usageMetadata.promptTokenCount || 0,
              completionTokens: response.usageMetadata.candidatesTokenCount || 0,
              totalTokens: response.usageMetadata.totalTokenCount || 0,
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
    const systemPrompt = options?.systemPrompt;
    const temperature = this.getTemperature(options);
    const maxTokens = this.getMaxTokens(options);

    const stream = await client.models.generateContentStream({
      model,
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        temperature,
        maxOutputTokens: maxTokens,
      },
    });

    for await (const chunk of stream) {
      const content = chunk.text;
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
    return Gemini: ;
  }
}

class ConfigurationError extends AIError {
  constructor(message: string) {
    super(message, 'CONFIGURATION_ERROR', 500);
  }
}
