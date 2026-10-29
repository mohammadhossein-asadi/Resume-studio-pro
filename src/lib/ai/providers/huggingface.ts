import OpenAI from 'openai';
import { BaseProvider, ProviderOptions, ProviderResponse } from './base';
import { AIError, ProviderError } from '../errors';

const DEEPSEEK_KEY = process.env.HF_DEEPSEEK_API_KEY;
const GLM_KEY = process.env.HF_GLM_API_KEY;
const HF_KEY = process.env.HUGGINGFACE_API_KEY;
const BASE_URL = 'https://router.huggingface.co/v1';

export class HuggingFaceProvider extends BaseProvider {
  readonly name = 'huggingface';
  readonly models = [
    'deepseek-ai/DeepSeek-R1:fastest',
    'deepseek-ai/DeepSeek-V3-0324:fastest',
    'Z.ai/GLM-4.5:fastest',
    'meta-llama/Llama-3.3-70B-Instruct:fastest',
    'Qwen/Qwen2.5-72B-Instruct:fastest',
  ];
  readonly defaultModel = 'deepseek-ai/DeepSeek-R1:fastest';

  private getClient(apiKey?: string): OpenAI {
    const key = apiKey || DEEPSEEK_KEY || GLM_KEY || HF_KEY;
    if (!key) {
      throw new ConfigurationError('No Hugging Face API key configured (HF_DEEPSEEK_API_KEY, HF_GLM_API_KEY, or HUGGINGFACE_API_KEY)');
    }
    return new OpenAI({
      apiKey: key,
      baseURL: BASE_URL,
    });
  }

  async complete(prompt: string, options?: ProviderOptions): Promise<ProviderResponse> {
    const model = this.getModel(options);
    const messages = this.buildMessages(prompt, options?.systemPrompt);

    // Try different keys for different models
    const keysToTry = this.getKeysForModel(model);
    let lastError: Error | null = null;

    for (const key of keysToTry) {
      try {
        const client = this.getClient(key);
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
        lastError = error as Error;
        if (this.isRateLimitError(error)) {
          continue;
        }
      }
    }

    throw new ProviderError(lastError?.message || 'All Hugging Face keys exhausted', this.name);
  }

  async *stream(prompt: string, options?: ProviderOptions): AsyncIterable<string> {
    const model = this.getModel(options);
    const messages = this.buildMessages(prompt, options?.systemPrompt);
    const key = this.getKeysForModel(model)[0];
    const client = this.getClient(key);

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

  private getKeysForModel(model: string): string[] {
    if (model.includes('DeepSeek')) {
      return [DEEPSEEK_KEY, HF_KEY].filter(Boolean) as string[];
    }
    if (model.includes('GLM') || model.includes('Z.ai')) {
      return [GLM_KEY, HF_KEY].filter(Boolean) as string[];
    }
    return [HF_KEY, DEEPSEEK_KEY, GLM_KEY].filter(Boolean) as string[];
  }

  private isRateLimitError(error: unknown): boolean {
    const message = (error as Error)?.message?.toLowerCase() || '';
    return message.includes('rate limit') || message.includes('429');
  }

  private formatError(error: unknown): string {
    const message = (error as Error)?.message || 'Unknown error';
    return HuggingFace: ;
  }
}

class ConfigurationError extends AIError {
  constructor(message: string) {
    super(message, 'CONFIGURATION_ERROR', 500);
  }
}
