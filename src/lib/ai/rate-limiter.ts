interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

const LIMITS: Record<string, RateLimitConfig> = {
  'generate:bullets': { windowMs: 60_000, maxRequests: 30 },
  'enhance:bullet': { windowMs: 60_000, maxRequests: 60 },
  'generate:summary': { windowMs: 60_000, maxRequests: 20 },
  'generate:skills': { windowMs: 60_000, maxRequests: 20 },
  'interview:questions': { windowMs: 60_000, maxRequests: 10 },
  'ats:analyze': { windowMs: 60_000, maxRequests: 15 },
  default: { windowMs: 60_000, maxRequests: 60 },
};

interface RequestRecord {
  timestamps: number[];
}

const requestStore = new Map<string, RequestRecord>();

function getKey(identifier: string, endpoint: string): string {
  return ${identifier}:;
}

function getConfig(endpoint: string): RateLimitConfig {
  return LIMITS[endpoint] || LIMITS.default;
}

function cleanupOldEntries(record: RequestRecord, windowMs: number): void {
  const now = Date.now();
  const cutoff = now - windowMs;
  record.timestamps = record.timestamps.filter(ts => ts > cutoff);
}

export function rateLimit(identifier: string, endpoint: string): {
  allowed: boolean;
  remaining: number;
  retryAfter?: number;
  resetTime: number;
} {
  const key = getKey(identifier, endpoint);
  const config = getConfig(endpoint);
  const now = Date.now();
  const windowMs = config.windowMs;
  const maxRequests = config.maxRequests;

  let record = requestStore.get(key);
  if (!record) {
    record = { timestamps: [] };
    requestStore.set(key, record);
  }

  cleanupOldEntries(record, windowMs);

  const currentCount = record.timestamps.length;
  const remaining = Math.max(0, maxRequests - currentCount - 1);
  const allowed = currentCount < maxRequests;

  if (allowed) {
    record.timestamps.push(now);
  }

  const resetTime = record.timestamps.length > 0 
    ? record.timestamps[0] + windowMs 
    : now + windowMs;

  const retryAfter = allowed ? undefined : Math.ceil((resetTime - now) / 1000);

  return { allowed, remaining, retryAfter, resetTime };
}

export function getRateLimitHeaders(endpoint: string, identifier: string): HeadersInit {
  const { allowed, remaining, retryAfter, resetTime } = rateLimit(identifier, endpoint);
  const headers: HeadersInit = {
    'X-RateLimit-Limit': LIMITS[endpoint]?.maxRequests.toString() || LIMITS.default.maxRequests.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': Math.ceil(resetTime / 1000).toString(),
  };

  if (!allowed && retryAfter) {
    headers['Retry-After'] = retryAfter.toString();
  }

  return headers;
}

export function checkRateLimit(identifier: string, endpoint: string): {
  allowed: boolean;
  remaining: number;
  retryAfter?: number;
} {
  const result = rateLimit(identifier, endpoint);
  return {
    allowed: result.allowed,
    remaining: result.remaining,
    retryAfter: result.retryAfter,
  };
}

setInterval(() => {
  const now = Date.now();
  for (const [key, record] of requestStore.entries()) {
    const endpoint = key.split(':')[1] || 'default';
    const config = getConfig(endpoint);
    cleanupOldEntries(record, config.windowMs);
    if (record.timestamps.length === 0) {
      requestStore.delete(key);
    }
  }
}, 60_000);
