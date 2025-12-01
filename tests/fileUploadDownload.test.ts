import {test,expect, Locator} from '@playwright/test';
import fs from 'fs';

test.describe('File Upload',()=>{
    test.beforeEach(async ({page})=>{
        await page.goto('https://testautomationpractice.blogspot.com/#');
    });

    test('TC_001:Validate single file upload',async({page})=>{
        const singleFileInput:Locator = page.locator('#singleFileInput');
        expect(singleFileInput).toBeVisible();
        const uploadSingleFileStatus:Locator = page.locator('#singleFileStatus');
        const uploadSingleFileButton:Locator = page.locator("button:has-text('Upload Single File')");
        await expect(uploadSingleFileButton).toBeVisible();
        await uploadSingleFileButton.click();
        const noFileUploadtextStatus:string|null = await uploadSingleFileStatus.textContent();
        console.log(`Status before file upload: ${noFileUploadtextStatus}`);
        await page.waitForTimeout(3000);
        await singleFileInput.setInputFiles('uploadDocument/file_example_XLS_100.xls');
        await uploadSingleFileButton.click();
        const uploadSingleFileStatusText:string|null = await uploadSingleFileStatus.textContent();
        console.log(`Status after file upload: ${uploadSingleFileStatusText}`);
        await page.waitForTimeout(3000);

    });

    test('TC_002: Validate for multiple file upload',async({page})=>{
        const multipleFileInput:Locator = page.locator('#multipleFilesInput');
        expect(multipleFileInput).toBeVisible();
        const uploadMultipleFileStatus:Locator = page.locator('#multipleFilesStatus');
        const uploadMultipleFileButton:Locator = page.locator("button:has-text('Upload Multiple Files')");
        await expect(uploadMultipleFileButton).toBeVisible();
        await uploadMultipleFileButton.click();
        const noFileUploadtextStatus:string|null = await uploadMultipleFileStatus.textContent();
        console.log(`Status before file upload: ${noFileUploadtextStatus}`);
        await page.waitForTimeout(3000);
        await multipleFileInput.setInputFiles(['uploadDocument/file-sample_100kB.doc', 'uploadDocument/file_example_XLS_100.xls']);
        await uploadMultipleFileButton.click();
        const multipleFileUploadStatusText:string|null = await uploadMultipleFileStatus.textContent();
        console.log(`Status after multiple file upload: ${multipleFileUploadStatusText}`);
        await page.waitForTimeout(3000);
    });
});

test.describe('File download',()=>{
    test.beforeEach(async ({page})=>{
        await page.goto('https://testautomationpractice.blogspot.com/p/download-files_25.html');
        // const downloadFileLink:Locator = page.locator("a:has-text('Download Files')");
        // await expect(downloadFileLink).toBeVisible();
        // await downloadFileLink.click();
    });
    test('TC_001: Validate the text file download',async({page})=>{
        console.log("===Welcome to Download File Page====");
        await page.locator('#inputText').fill('Welcome to playwright automation');
        const generateText:Locator = page.locator('#generateTxt');
        expect(generateText).toBeVisible();
        await generateText.click(); //clicking on the generate and download button
        await page.waitForTimeout(3000);
        // start waiting for the download before clicking
        const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#txtDownloadLink').click()]);
        const downloadPath = 'downloadDocument/text-file.txt'
        await download.saveAs(downloadPath);
        const fileExist = fs.existsSync(downloadPath);
        expect(fileExist).toBeTruthy();
        await page.waitForTimeout(3000);
        if(fileExist){
            fs.unlinkSync(downloadPath);
        }
    });

    test('TC_002: Validate the pdf file download',async({page})=>{
        console.log("===Welcome to Download File Page====");
        await page.locator('#inputText').fill('Welcome to playwright automation');
        const generatePDF:Locator = page.locator('#generatePdf');
        expect(generatePDF).toBeVisible();
        await generatePDF.click(); //clicking on the generate and download button
        await page.waitForTimeout(3000);
        // start waiting for the download before clicking
        const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#pdfDownloadLink').click()]);
        const downloadPath = 'downloadDocument/text-file.pdf'
        await download.saveAs(downloadPath);
        const fileExist = fs.existsSync(downloadPath);
        expect(fileExist).toBeTruthy();
        await page.waitForTimeout(3000);
        if(fileExist){
            fs.unlinkSync(downloadPath);
        }
    });
});