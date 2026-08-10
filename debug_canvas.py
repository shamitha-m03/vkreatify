import asyncio
from playwright.async_api import async_playwright

async def debug():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True, args=['--no-sandbox', '--disable-setuid-sandbox'])
        page = await browser.new_page()
        
        await page.goto("https://cinematic-proto.preview.emergentagent.com/", wait_until="networkidle", timeout=30000)
        await page.wait_for_timeout(3000)
        
        # Check for any canvas elements
        all_canvas = await page.evaluate("""() => {
            const canvases = document.querySelectorAll('canvas');
            return Array.from(canvases).map(c => ({
                id: c.id,
                className: c.className,
                testId: c.getAttribute('data-testid'),
                width: c.width,
                height: c.height,
                style: c.style.cssText
            }));
        }""")
        
        print("All canvas elements found:", all_canvas)
        
        # Check if CrystalSphere component is in the DOM
        crystal_sphere_check = await page.evaluate("""() => {
            const root = document.getElementById('root');
            return {
                rootExists: !!root,
                rootHTML: root ? root.innerHTML.substring(0, 500) : 'NO ROOT',
                hasCrystalSphere: document.body.innerHTML.includes('crystal')
            };
        }""")
        
        print("\nRoot element check:", crystal_sphere_check)
        
        # Check console logs
        console_logs = []
        page.on("console", lambda msg: console_logs.append(f"[{msg.type}] {msg.text}"))
        
        await page.wait_for_timeout(2000)
        
        print("\nConsole logs:")
        for log in console_logs[-10:]:
            print(log)
        
        await browser.close()

asyncio.run(debug())
