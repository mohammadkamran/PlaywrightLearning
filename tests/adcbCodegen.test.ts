import { test, expect } from '@playwright/test';
import {generateRandomEmail} from './helper/common.helper'

const randomEmail = generateRandomEmail('signup');

test('test', async ({ page }) => {
  await page.goto('https://automationexercise.com/login');
  await page.getByRole('listitem').filter({ hasText: 'Signup / Login' }).click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('adcbTest1234');
  await page.locator('form').filter({ hasText: 'Signup' }).click();
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(randomEmail);
  await page.getByRole('button', { name: 'Signup' }).click();
  await page.getByRole('radio', { name: 'Mr.' }).check();
  await page.getByText('Title Mr. Mrs. Name * Email').click();
  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('adcb@12341234');
  await page.locator('#days').selectOption('14');
  await page.locator('#months').selectOption('8');
  await page.locator('#years').selectOption('1989');
  await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
  await page.getByRole('checkbox', { name: 'Receive special offers from' }).check();
  await page.getByRole('textbox', { name: 'First name *' }).click();
  await page.getByRole('textbox', { name: 'First name *' }).fill('Kamran');
  await page.getByRole('textbox', { name: 'Last name *' }).click();
  await page.getByRole('textbox', { name: 'Last name *' }).fill('mohammad');
  await page.getByRole('textbox', { name: 'Company', exact: true }).click();
  await page.getByRole('textbox', { name: 'Company', exact: true }).fill('adcb network');
  await page.getByRole('paragraph').filter({ hasText: 'Address * (Street address, P.' }).click();
  await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('palm street new juabail');
  await page.getByRole('textbox', { name: 'Address 2' }).click();
  await page.getByRole('textbox', { name: 'Address 2' }).fill('near twin tower');
  await page.getByLabel('Country *').selectOption('Australia');
  await page.getByRole('textbox', { name: 'State *' }).click();
  await page.getByRole('textbox', { name: 'State *' }).fill('UAE');
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).click();
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('fedf');
  await page.locator('#zipcode').click();
  await page.locator('#zipcode').fill('787878');
  await page.getByRole('textbox', { name: 'Mobile Number *' }).click();
  await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('782711117444');
  await page.getByRole('button', { name: 'Create Account' }).click();
});