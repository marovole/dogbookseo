 /**
  * Shared type definitions for the pipeline scripts
  * Single source of truth for Region, Category, and related types
  */
 
 /** Supported geographic regions */
 export type Region = 'global' | 'india' | 'taiwan_hk' | 'latam';
 
 /** Content categories */
 export type Category = 'politics' | 'economy' | 'tech' | 'entertainment' | 'sports';
 
 /** Topic status */
 export type TopicStatus = 'active' | 'closed';
 
 /** Mapping of regions to their supported languages */
 export const REGION_LANGUAGES: Record<Region, readonly string[]> = {
   global: ['en'],
   india: ['hi'],
   taiwan_hk: ['zh-TW'],
   latam: ['pt', 'es'],
 } as const;
 
 /** All supported locales */
 export const SUPPORTED_LOCALES = ['en', 'zh-TW', 'hi', 'pt', 'es'] as const;
 export type Locale = (typeof SUPPORTED_LOCALES)[number];
 
 /** Localized content for a topic */
 export interface LocaleContent {
   title: string;
   question: string;
   description: string;
 }
 
 /** Generated topic from LLM */
 export interface GeneratedTopic {
   slug: string;
   title: string;
   question: string;
   description: string;
   options: [string, string];
   keywords: string[];
   expirationDate: string;
   category: string;
 }
 
 /** Collected topic ready for storage */
 export interface CollectedTopic {
   slug: string;
   region: Region;
   category: Category;
   locale: Record<string, LocaleContent>;
   options: [string, string];
   keywords: string[];
   expirationDate: string;
   source: string;
 }
 
 /** Topic data stored in content files */
 export interface TopicData {
   slug: string;
   region: Region;
   category: Category;
   locale: Record<string, LocaleContent>;
   options: [string, string];
   keywords: string[];
   status: TopicStatus;
   publishedAt: string;
   expirationDate: string;
   source: string;
 }
 
 /** Brave search result */
 export interface BraveSearchResult {
   title: string;
   url: string;
   description: string;
   publishedDate?: string;
 }
 
 /** Region configuration for content collection */
 export interface RegionConfig {
   languages: string[];
   searchLang: string;
   categories: CategoryConfig[];
 }
 
 /** Category configuration within a region */
 export interface CategoryConfig {
   name: string;
   category: Category;
   queries: string[];
 }
 
 /**
  * Type guard to check if a string is a valid Region
  */
 export function isValidRegion(value: string): value is Region {
   return ['global', 'india', 'taiwan_hk', 'latam'].includes(value);
 }
 
 /**
  * Type guard to check if a string is a valid Category
  */
 export function isValidCategory(value: string): value is Category {
   return ['politics', 'economy', 'tech', 'entertainment', 'sports'].includes(value);
 }
 
 /**
  * Type guard to check if a string is a valid Locale
  */
 export function isValidLocale(value: string): value is Locale {
   return SUPPORTED_LOCALES.includes(value as Locale);
 }
