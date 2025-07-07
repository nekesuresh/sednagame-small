import { writable } from 'svelte/store';

export const usedQuestionIds = writable<Set<string>>(new Set()); 