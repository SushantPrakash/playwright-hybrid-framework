import { test as base} from '@playwright/test';
import { AddressAPIClient } from '../../src/api/addressLookupApi.js'

type APIFixtures={
    completeAddress: AddressAPIClient;
}
