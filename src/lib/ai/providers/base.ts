export interface ProviderOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

export interface ProviderResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  model: string;
}

export abstract class BaseProvider {
  abstract readonly name: string;
  abstract readonly models: string[];
  abstract readonly defaultModel: string;

  abstract complete(prompt: string, options?: ProviderOptions): Promise<ProviderResponse>;
  abstract stream(prompt: string, options?: ProviderOptions): AsyncIterable<string>;
  abstract healthCheck(): Promise<boolean>;

  protected buildMessages(prompt: string, systemPrompt?: string): Array<{ role: string; content: string }> {
    return systemPrompt
      ? [{ role: 'system', content: systemPrompt }, { role: 'user', content: prompt }]
      : [{ role: 'user', content: prompt }];
  }

  protected getModel(options?: ProviderOptions): string {
    return options?.model || this.defaultModel;
  }

  protected getTemperature(options?: ProviderOptions): number {
    return options?.temperature ?? 0.7;
  }

  protected getMaxTokens(options?: ProviderOptions): number {
    return options?.maxTokens ?? 2000;
  }
}
