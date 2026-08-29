import { mergeExpects, mergeTests } from '@playwright/test';
import {test as pageTest, expect as pageExpect} from '@fixtures/pages.fixture.js';

export const test: typeof pageTest = mergeTests(pageTest);
export const expect: typeof pageExpect = mergeExpects(pageExpect);