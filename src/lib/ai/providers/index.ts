import { BaseProvider } from './base';
import { OpenAIProvider } from './openai';
import { GeminiProvider } from './gemini';
import { OpenRouterProvider } from './openrouter';
import { GroqProvider } from './groq';
import { MistralProvider } from './mistral';
import { HuggingFaceProvider } from './huggingface';
import { AIError } from '../errors';

const PROVIDER_CHAIN = ['openrouter', 'openai', 'gemini', 'groq', 'mistral', 'huggingface'] as const;

type ProviderName = typeof PROVIDER_CHAIN[number];

const providerInstances = new Map<ProviderName, BaseProvider>();

function createProvider(name: ProviderName): BaseProvider {
  switch (name) {
    case 'openai':
      return new OpenAIProvider();
    case 'gemini':
      return new GeminiProvider();
    case 'openrouter':
      return new OpenRouterProvider();
    case 'groq':
      return new GroqProvider();
    case 'mistral':
      return new MistralProvider();
    case 'huggingface':
      return new HuggingFaceProvider();
    default:
      throw new Error(Unknown provider: );
  }
}

function getProviderInstance(name: ProviderName): BaseProvider {
  if (!providerInstances.has(name)) {
    providerInstances.set(name, createProvider(name));
  }
  return providerInstances.get(name)!;
}

export function getProvider(name?: string): BaseProvider {
  if (name) {
    if (!PROVIDER_CHAIN.includes(name as ProviderName)) {
      throw new AIError(\Unknown provider: \\, 'UNKNOWN_PROVIDER', 400);
    }
    return getProviderInstance(name as ProviderName);
  }
  return getProviderChain()[0];
}

export function getProviderChain(): BaseProvider[] {
  return PROVIDER_CHAIN.map(name => getProviderInstance(name));
}

export function getAvailableProviders(): string[] {
  return [...PROVIDER_CHAIN];
}

export async function completeWithFallback(
  prompt: string,
  options?: { model?: string; temperature?: number; maxTokens?: number; systemPrompt?: string }
): Promise<{ content: string; usage?: any; model: string; provider: string }> {
  const chain = getProviderChain();

  for (const provider of chain) {
    try {
      if (await provider.healthCheck()) {
        const response = await provider.complete(prompt, options);
        return { ...response, provider: provider.name };
      }
    } catch (error) {
      console.warn(\Provider \ failed: \\);
      continue;
    }
  }

  throw new AIError('All providers unavailable', 'NO_PROVIDERS', 503);
}

export async function streamWithFallback(
  prompt: string,
  options?: { model?: string; temperature?: number; maxTokens?: number; systemPrompt?: string }
): AsyncIterable<{ content: string; provider: string }> {
  const chain = getProviderChain();

  for (const provider of chain) {
    try {
      if (await provider.healthCheck()) {
        for await (const chunk of provider.stream(prompt, options)) {
          yield { content: chunk, provider: provider.name };
        }
        return;
      }
    } catch (error) {
      console.warn(\Provider \ failed: \\);
      continue;
    }
  }

  throw new AIError('All providers unavailable', 'NO_PROVIDERS', 503);
}
