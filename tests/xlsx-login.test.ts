import {test,expect,Locator} from '@playwright/test';
import * as XLSX from 'xlsx';
import fs from 'fs';

//Loaded excel file
const excelPath = "test-data/loginCred.xlsx";
//file==>workbook==>sheets==>rows&coloumns
const workbook = XLSX.readFile(excelPath);
const sheetNames = workbook.SheetNames[0];
const workSheets  = workbook.Sheets[sheetNames];

//convert sheet into json
const logindata:any = XLSX.utils.sheet_to_json(workSheets);
console.log(logindata);

test.describe("Excel demo", () => {
  for (const {email,password,status} of logindata) {
    test(`TC_001: Validate login credentials for ${email} and ${password}`,async({page})=>{
        await page.goto('https://demowebshop.tricentis.com/login');
        await page.locator('#Email').fill(email);
        await page.locator('#Password').fill(password);
        await page.locator('input[value="Log in"]').click();

        if(status.toLowerCase()==="valid"){
            const logoutLink: Locator = page.locator('a[href="/logout"]');
            await expect(logoutLink).toBeVisible({timeout:5000});
        }
        else{
            const errorMessage:Locator = page.locator('.validation-summary-errors');
            await expect(errorMessage).toBeVisible({timeout:5000});
            await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
        }
    });
  }
});