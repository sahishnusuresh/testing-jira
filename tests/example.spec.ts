import { test, expect, ElementHandle } from '@playwright/test';
import dotenv from 'dotenv'
import * as google from 'googleapis'
import {Random} from 'random'
// test('enabling devrev intergation', async ({ page }) => {
//   // trying gmail api
// // const clientId = "YOUR_CLIENT_ID";
// // const clientSecret = "YOUR_CLIENT_SECRET";
// // const redirectUri = "urn:ietf:wg:oauth:2.0:oob";
// // const auth = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
//   await page.goto('https://app.oslash.com/');
//   dotenv.config()
//   const email=process.env.email_id
//   const password=process.env.password
//   const randomname=(num)=>{
//     let str=''
//     for(let i=0;i<num;i++){
//       let random=Math.floor(Math.random()*27)
//       str+=String.fromCharCode(97+random)
//     }
//     return str;
//   }
//   const prefix=randomname(7)

//   await page.locator('button.oslash-google-sign-in-btn').click()
//   await page.locator('input[type="email"]').fill(email as string)
//   await page.getByRole('button',{name:'Next'}).click()
//   await page.locator('input[type="password"]').fill(password as string)
//   await page.getByRole('button',{name:'Next'}).click()

//   const delay=async (time)=>new Promise(resolve=> setTimeout(resolve,time))
//   await delay(10000)
  
//   await page.goto('https://app.oslash.com/workspace/new/create?type=TEAM')

//   const date=new Date()
  
//   await page.locator('input#workspaceName').fill(prefix as string)
//   await page.locator('input#companyName').fill("oslash")
//   await page.getByRole('button',{name:'Start 15-day Free Trial'}).click()
//   await page.locator('input[name="emails"]').fill(email as string)
//   await page.keyboard.press('Enter')
//   await page.getByRole('button',{name:'Send invite'}).click()
//   await page.locator('a[href="/settings/organization"]').click()
//   await page.getByRole('button',{name:'expand'}).click()
//   await page.locator('a[href="/settings/search/integrations"]').click()
//   await page.getByRole('button',{name:"Connect"}).nth(9).click()
//   const clientid=process.env.client_id
//   await page.locator('input#clientId').fill(clientid as string)
//   const clientsecret=process.env.client_secret
//   await page.locator('input#clientSecret').fill(clientsecret as string)
//   const baseUrl=process.env.baseUrl
//   await page.locator('input#baseUrl').fill(baseUrl as string)
//   await page.getByRole('button',{name:'Save and Connect'}).click()
//   await delay(5000)
//   const timeout=2000
  
//   await page.getByRole('button',{name:'Skip for now'}).click()
  
 
//   // const [popup]=await Promise.all([ page.waitForEvent('popup'),page.getByRole('button',{name:'Skip for now'}).click() ])
//   // await popup.waitForLoadState();
//   // await delay(7000)
//   await page.locator('a:has-text("Integrations")').nth(0).click()
//   await page.getByRole('button',{name:'Grant'}).click()
//   await page.locator('button#google-auth-button').click()
//   await page.locator(`div[data-identifier="${email}"]`).click()
//   // await page.pause()
//   await  page.locator('button[type="submit"]').click()
//   await delay(10000)
//   await page.getByRole('button',{name:'Skip for now'}).click()
//   // await page.getByText("0 documents indexed")
//   while (true) {
//     try{
//       const span=await page.locator('span:has-text:("0 documents indexed")')
//       const text=await page.evaluate(span=>span.innerText,span) 
//       if (text==="726 documents indexed") {
//         console.log('Matched span inner text:', text);
//         break;
//       }
    
//     }
//     catch(error){
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       await page.reload();
//     }


  
    
//   }
// });
//   await page.locator('button[aria-label="settingsbackmenubutton"]').click()

//   const searchel=page.getByPlaceholder("Search in workspace")
//   // validating wildcard searches
//   await searchel.fill("hello")
//   await page.keyboard.press('Enter')
//   const srcbtn=page.locator('span:has-text:("Source")')
//   await expect(srcbtn).toBeVisible()
//   await srcbtn.click()
//   const jirabtn=page.locator('button[role="menuitem"]')
//   await expect(jirabtn).toBeVisible()
//   await jirabtn.click()
//   await expect(page.locator('span:has-text("Assignee")')).toBeVisible()
//   await expect(page.locator('span:has-text("Creator")')).toBeVisible()
//   await expect(page.locator('span:has-text("Priority")')).toBeVisible()
//   await expect(page.locator('span:has-text("Status")')).toBeVisible()
//   await expect(page.locator('span:has-text("Project")')).toBeVisible()
// });

test('trying search',async({page})=>{
  await page.goto('https://app.oslash.com/');
  dotenv.config()
  const email=process.env.email_id
  const password=process.env.password
  const randomname=(num)=>{
    let str=''
    for(let i=0;i<num;i++){
      let random=Math.floor(Math.random()*27)
      str+=String.fromCharCode(97+random)
    }
    return str;
  }
  const prefix=randomname(7)
  await page.locator('button.oslash-google-sign-in-btn').click()
  await page.locator('input[type="email"]').fill(email as string)
  await page.getByRole('button',{name:'Next'}).click()
  await page.locator('input[type="password"]').fill(password as string)
  await page.getByRole('button',{name:'Next'}).click()
  const delay=async (time)=>new Promise(resolve=> setTimeout(resolve,time))
  // await delay(10000)
  // await page.pause()
  await delay(3000)
  await page.getByRole('button',{name:'Skip for now'}).click()
  await page.locator('a[href="/home"]').click()
  await delay(6000)
   //word search highlight
  const searchel=page.getByPlaceholder("Search in workspace")
  await searchel.fill('oslash')
  await delay(3000)
  await page.keyboard.press('Enter')
  const searchterm=await page.getByPlaceholder("Search in workspace").innerHTML
 
const highlighted_terms=await page.$$('mark.text-sm.font-semibold')
const firstMark = await highlighted_terms[0]
let firstMarkText:string|null=""
if(firstMark!=undefined){
  firstMarkText=await firstMark.textContent()
}

for (let i = 1; i < highlighted_terms.length; i++) {
  let marktext=await highlighted_terms[i]
  let markinnertext:string|null=""
  if(marktext!=undefined){
    markinnertext=await marktext.textContent()
  }
  if (markinnertext !== firstMarkText) {
    console.log('All elements of the search term not highlighted.');
    break;
  }
}

console.log('All elements of the search term are highlighted');
// //  await page.evaluate(() => {
// //     const searchTerm = 'Oslash';
// //     const marks = document.querySelectorAll('mark');
  
// //   for (const mark of marks) {
// //     if (mark?.textContent?.includes(searchTerm)) {
// //       return true;
// //     }
// //   }
  
//   return false;
// });
  
 //validating wildcard searches
  await page.locator('a[href="/home"]').click()
  await delay(3000)
  await searchel.fill("*")
  await delay(3000)
  await page.keyboard.press('Enter')
  await delay(5000)
  //total_count
  const total_cnt=await page.locator('p.text-gray-500.text-sm.font-medium').innerText()
  const res_arr=Array.from(total_cnt)
  const str=res_arr.join("")
  const str_arr=str.split(" ")
  const count=parseInt(str_arr[3])
  console.log(`The total number of results are ${count}`)
  
  
  //pagination search

  // const pages=await page.$$('hidden.md\\\:mt-px.md\\\:flex button')
  const pages=page.locator('flex.items-center.justify-between.border-t.border-gray-200.px-4.sm\\\:px-0 >div> button')

  console.log(pages)
  const pages_cnt=pages.nth(1).click()
  // console.log(pages_cnt)
  // const pages=await page.locator(`button[name=${/[1-10]/i}`).

  //search resulst view


  await page.pause()
  
  const srcbtn=page.locator('button >span:has-text("Source")')
  await srcbtn.click()  
 
  
  //checking if all the filters are present

  await page.locator('button >span>span:has-text("Jira")').click()
  await expect(page.locator('button>span:has-text("Assignee")')).toBeVisible()
  await expect(page.locator('button>span:has-text("Creator")')).toBeVisible()
  await expect(page.locator('button>span:has-text("Priority")')).toBeVisible()
  await expect(page.locator('button>span:has-text("Status")')).toBeVisible()
  await expect(page.locator('button>span:has-text("Project")')).toBeVisible()
  await expect(page.locator('button>span:has-text("Issue Type")')).toBeVisible()

  // await page.pause()

  // date filter search
  
  await page.locator('button>span:has-text("Date")').click()
  
  //year
  const year_numbers=page.locator('span.rdrYearPicker >select>option')
  const an_num=Math.floor(Math.random()*(11-1)+1)
  const year_selects=await year_numbers.count()
  const num1=Math.floor(Math.random() * (year_selects - 1) + 1)
  console.log(year_selects)
  const selects1=await page.$('span.rdrYearPicker select')
  await selects1?.click()
  const options=await page.$$('span.rdrYearPicker select')
  await page.selectOption('span.rdrYearPicker select', { index: num1-1 });

  console.log(options)
  // await selects1?.selectOption((num1-1).toString())
  // if (selects1 !== null) {
  //   await selects1.click();
  // }  // const optionele=await selects1.locator('option:nth-child(')
  // await selects1.nth(num1).click()
  
  // await page.pause()
    
  //month
    const month_numbers=page.locator('span.rdrMonthPicker >select>option')
    
    const month_selects=await year_numbers.count()
    const num2=Math.floor(Math.random() * (year_selects - 1) + 1)
    console.log(year_selects)
    const selects2=await page.$('span.rdrYearPicker select')
    await selects1?.click()
    const options1=await page.$$('span.rdrYearPicker select')
    await page.selectOption('span.rdrYearPicker select', { index: num2-1 });
  
  
  const num3=Math.floor(Math.random() * (28 - 1) + 1)
  await page.locator(`span.rdrDayNumber>span:has-text("${num3}")`).nth(0).click()
  await page.getByRole('button',{name:"Apply"}).click()
  await page.pause()

  

  const regexp=new RegExp("Page"+""+/[0-9]/+"of"+""+/[0-1000]/+"across 0 Source")
  await delay(3000)
  await expect(page.locator('p.text-gray-500 text-sm font-medium')).toHaveText(regexp)
  await page.pause()

})

