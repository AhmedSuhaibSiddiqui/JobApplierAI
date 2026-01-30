import asyncio
from playwright.async_api import async_playwright
import os

class BrowserAgent:
    def __init__(self):
        self.headless = False  # Set to False so you can see it working!

    async def apply_to_job(self, job_url: str, user_profile: dict, resume_path: str):
        """
        Launches browser, goes to job URL, fills form, and submits.
        Currently supports: Greenhouse.io, Lever.co
        """
        async with async_playwright() as p:
            # Launch Browser
            browser = await p.chromium.launch(headless=self.headless, slow_mo=50) 
            context = await browser.new_context()
            page = await context.new_page()

            print(f"[BrowserAgent] Navigating to {job_url}...")
            await page.goto(job_url)
            
            # Detect Platform
            if "greenhouse.io" in job_url:
                await self._fill_greenhouse(page, user_profile, resume_path)
            elif "lever.co" in job_url:
                await self._fill_lever(page, user_profile, resume_path)
            else:
                print("[BrowserAgent] Unsupported platform. Only Greenhouse & Lever are fully supported yet.")
                await browser.close()
                return {"status": "error", "message": "Unsupported platform"}

            # Wait a bit to ensure submission processes (or for user to see)
            await asyncio.sleep(5)
            
            await browser.close()
            return {"status": "success", "message": "Application process finished"}

    async def _fill_greenhouse(self, page, profile, resume_path):
        print("[BrowserAgent] Detected Greenhouse. Filling form...")
        
        # 1. Upload Resume (This usually pre-fills other fields, but we force fill to be safe)
        # Greenhouse usually has a button id="s3_upload_for_resume" or input type="file"
        try:
            file_input = page.locator("input[type='file']").first
            if resume_path and os.path.exists(resume_path):
                 await file_input.set_input_files(resume_path)
                 print("[BrowserAgent] Resume uploaded.")
            else:
                 print(f"[BrowserAgent] Resume file not found at: {resume_path}")
        except Exception as e:
            print(f"[BrowserAgent] Resume upload failed: {e}")

        # 2. Fill Basic Info
        await page.fill("#first_name", profile.get("first_name", ""))
        await page.fill("#last_name", profile.get("last_name", ""))
        await page.fill("#email", profile.get("email", ""))
        await page.fill("#phone", profile.get("phone", ""))

        # 3. LinkedIn (Custom fields vary, but this is common)
        try:
            # Try to find a label containing "LinkedIn" and fill its neighbor input
            linkedin_label = page.get_by_text("LinkedIn Profile", exact=False)
            if await linkedin_label.count() > 0:
                # This is tricky in Greenhouse, often simpler to find by input name if known
                pass 
        except:
            pass

        print("[BrowserAgent] Form filled. Submitting...")
        
        # 4. Submit
        # Check for "Submit Application" button
        submit_btn = page.locator("#submit_app")
        if await submit_btn.is_visible():
            await submit_btn.click()
            print("[BrowserAgent] clicked Submit!")
        else:
             print("[BrowserAgent] Submit button not found. You might need to finish manually.")

    async def _fill_lever(self, page, profile, resume_path):
        print("[BrowserAgent] Detected Lever. Filling form...")
        
        # Lever is often a 2-step process or a single long page.
        # 1. Apply with Resume
        try:
            file_input = page.locator("input[type='file']").first
            if resume_path and os.path.exists(resume_path):
                 await file_input.set_input_files(resume_path)
        except:
            pass

        # 2. Basic Info
        await page.fill("input[name='name']", f"{profile.get('first_name')} {profile.get('last_name')}")
        await page.fill("input[name='email']", profile.get("email", ""))
        await page.fill("input[name='phone']", profile.get("phone", ""))
        
        # 3. Submit
        submit_btn = page.locator("button.postings-btn")
        if await submit_btn.is_visible():
            await submit_btn.click()
