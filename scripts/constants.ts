 /**
  * Shared constants for the pipeline scripts
  */
 
 /** Brave API monthly request limit */
 export const BRAVE_API_MONTHLY_LIMIT = 2000;
 
 /** Threshold percentage (0-1) at which to warn about API usage */
 export const BRAVE_API_WARNING_THRESHOLD = 0.8;
 
 /** Freshness filter for Brave search - 'pw' = past week */
 export const BRAVE_SEARCH_FRESHNESS = 'pw';
 
 /** Default number of search results to request */
 export const DEFAULT_SEARCH_COUNT = 5;
 
 /** Default number of retry attempts for API calls */
 export const DEFAULT_RETRY_COUNT = 3;
 
 /** Base delay in milliseconds for exponential backoff */
 export const RETRY_BASE_DELAY_MS = 1000;
 
 /** Delay between API calls to avoid rate limiting (ms) */
 export const API_THROTTLE_DELAY_MS = 500;
