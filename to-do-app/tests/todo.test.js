const {test, expect} = require('@playwright/test');


test('user can add a task', async ({page}) => {
    await page.goto('http://localhost:5500/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    const testTask = await page.textContent('.task');
    expect(testTask).toContain('Test Task');
})