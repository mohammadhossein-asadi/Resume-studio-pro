export class AIError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public provider?: string,
    public retryAfter?: number
  ) {
    super(message);
    this.name = 'AIError';
  }
}

export class RateLimitError extends AIError {
  constructor(retryAfter: number) {
    super('Rate limit exceeded', 'RATE_LIMIT', 429, undefined, retryAfter);
  }
}

export class ProviderError extends AIError {
  constructor(message: string, provider: string) {
    super(message, 'PROVIDER_ERROR', 502, provider);
  }
}

export class ValidationError extends AIError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400);
  }
}

export class ConfigurationError extends AIError {
  constructor(message: string) {
    super(message, 'CONFIGURATION_ERROR', 500);
  }
}
