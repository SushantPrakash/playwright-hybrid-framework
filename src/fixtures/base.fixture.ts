import { mergeExpects, mergeTests } from '@playwright/test';
import {test as pageTest, expect as pageExpect} from '@fixtures/pages.fixture.js';
import {test as e2eTest, expect as e2eExpect} from '@fixtures/e2e.fixture.js';

export const test = mergeTests(pageTest,e2eTest);
export const expect = mergeExpects(pageExpect,e2eExpect);