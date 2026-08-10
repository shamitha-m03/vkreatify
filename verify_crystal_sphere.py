import asyncio
import sys
from playwright.async_api import async_playwright

async def verify_site():
    results = {
        "page_loads": False,
        "no_webpack_errors": False,
        "no_console_errors": False,
        "canvas_rendered": False,
        "sphere_visible": False,
        "particles_count": 0,
        "text_sections_visible": False,
        "console_logs": []
    }
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True, args=['--no-sandbox', '--disable-setuid-sandbox'])
        page = await browser.new_page()
        
        # Capture console messages
        page.on("console", lambda msg: results["console_logs"].append(f"[{msg.type}] {msg.text}"))
        
        try:
            # Load the page
            print("Loading page...")
            response = await page.goto("https://cinematic-proto.preview.emergentagent.com/", wait_until="networkidle", timeout=30000)
            results["page_loads"] = response.status == 200
            print(f"✓ Page loaded with status {response.status}")
            
            # Wait a bit for React to render
            await page.wait_for_timeout(3000)
            
            # Check for webpack error overlay
            webpack_error = await page.query_selector('[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay')
            results["no_webpack_errors"] = webpack_error is None
            if webpack_error:
                print("✗ Webpack error overlay detected")
            else:
                print("✓ No webpack error overlay")
            
            # Check for canvas element
            canvas = await page.query_selector('canvas[data-testid="crystal-sphere"]')
            results["canvas_rendered"] = canvas is not None
            if canvas:
                print("✓ Canvas element found")
            else:
                print("✗ Canvas element NOT found")
            
            # Check if canvas has WebGL context (sphere rendering)
            if canvas:
                sphere_check = await page.evaluate("""() => {
                    const canvas = document.querySelector('canvas[data-testid="crystal-sphere"]');
                    if (!canvas) return { visible: false, hasContext: false };
                    const rect = canvas.getBoundingClientRect();
                    const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
                    return {
                        visible: rect.width > 0 && rect.height > 0,
                        hasContext: gl !== null,
                        width: rect.width,
                        height: rect.height
                    };
                }""")
                results["sphere_visible"] = sphere_check.get("visible", False) and sphere_check.get("hasContext", False)
                print(f"✓ Canvas dimensions: {sphere_check.get('width')}x{sphere_check.get('height')}, WebGL: {sphere_check.get('hasContext')}")
            
            # Check for text sections (headline, nav)
            headline = await page.query_selector('h1, [class*="headline"], [class*="hero"]')
            nav = await page.query_selector('nav, [class*="nav"]')
            results["text_sections_visible"] = headline is not None or nav is not None
            if headline or nav:
                print("✓ Text sections (nav/headline) found")
            else:
                print("✗ Text sections NOT found")
            
            # Take screenshot of hero section
            await page.screenshot(path="/app/hero_section.png", full_page=False)
            print("✓ Hero section screenshot saved to /app/hero_section.png")
            
            # Scroll to footer/contact section
            print("\nScrolling to footer/contact section...")
            await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            await page.wait_for_timeout(3000)
            
            # Take screenshot of footer
            await page.screenshot(path="/app/footer_section.png", full_page=False)
            print("✓ Footer section screenshot saved to /app/footer_section.png")
            
            # Check console for errors
            error_logs = [log for log in results["console_logs"] if "error" in log.lower() or "failed" in log.lower()]
            results["no_console_errors"] = len(error_logs) == 0
            
            if error_logs:
                print(f"\n✗ Console errors found ({len(error_logs)}):")
                for log in error_logs[:5]:
                    print(f"  {log}")
            else:
                print("\n✓ No console errors")
            
        except Exception as e:
            print(f"✗ Error during verification: {str(e)}")
            results["error"] = str(e)
        
        finally:
            await browser.close()
    
    return results

async def main():
    results = await verify_site()
    
    print("\n" + "="*60)
    print("VERIFICATION SUMMARY")
    print("="*60)
    print(f"1. Page loads: {'✓ PASS' if results['page_loads'] else '✗ FAIL'}")
    print(f"2. No webpack errors: {'✓ PASS' if results['no_webpack_errors'] else '✗ FAIL'}")
    print(f"3. Canvas rendered: {'✓ PASS' if results['canvas_rendered'] else '✗ FAIL'}")
    print(f"4. Sphere visible: {'✓ PASS' if results['sphere_visible'] else '✗ FAIL'}")
    print(f"5. Text sections visible: {'✓ PASS' if results['text_sections_visible'] else '✗ FAIL'}")
    print(f"6. No console errors: {'✓ PASS' if results['no_console_errors'] else '✗ FAIL'}")
    print("="*60)
    
    all_pass = all([
        results['page_loads'],
        results['no_webpack_errors'],
        results['canvas_rendered'],
        results['sphere_visible'],
        results['text_sections_visible'],
        results['no_console_errors']
    ])
    
    sys.exit(0 if all_pass else 1)

if __name__ == "__main__":
    asyncio.run(main())
