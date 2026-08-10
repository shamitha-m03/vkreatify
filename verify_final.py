import asyncio
from playwright.async_api import async_playwright

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True, args=['--no-sandbox', '--disable-setuid-sandbox'])
        page = await browser.new_page()
        
        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg) if msg.type == "error" else None)
        
        await page.goto("https://cinematic-proto.preview.emergentagent.com/", wait_until="networkidle", timeout=30000)
        await page.wait_for_timeout(3000)
        
        # Check for canvas
        canvas_info = await page.evaluate("""() => {
            const canvas = document.querySelector('canvas');
            const wrapper = document.querySelector('[data-testid="crystal-sphere"]');
            return {
                canvasExists: !!canvas,
                canvasWidth: canvas ? canvas.width : 0,
                canvasHeight: canvas ? canvas.height : 0,
                wrapperExists: !!wrapper,
                wrapperOpacity: wrapper ? window.getComputedStyle(wrapper).opacity : '0'
            };
        }""")
        
        print("Hero Section Check:")
        print(f"  Canvas exists: {canvas_info['canvasExists']}")
        print(f"  Canvas size: {canvas_info['canvasWidth']}x{canvas_info['canvasHeight']}")
        print(f"  Wrapper visible (opacity): {canvas_info['wrapperOpacity']}")
        
        # Scroll to footer
        print("\nScrolling to footer...")
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        await page.wait_for_timeout(4000)  # Wait for crack animation
        
        await page.screenshot(path="/app/footer_crack.png", full_page=False)
        print("  Screenshot saved: /app/footer_crack.png")
        
        # Check console errors
        print(f"\nConsole errors: {len(console_errors)}")
        for err in console_errors[:3]:
            print(f"  - {err.text}")
        
        await browser.close()
        
        return {
            "canvas_rendered": canvas_info['canvasExists'],
            "no_errors": len(console_errors) == 0
        }

result = asyncio.run(verify())
print("\n" + "="*60)
print("FINAL VERIFICATION RESULT")
print("="*60)
print(f"✓ Canvas rendered: {result['canvas_rendered']}")
print(f"✓ No console errors: {result['no_errors']}")
print("="*60)
