const {test, expect} = require('@playwright/test');


test('user can add a task', async ({page}) => {
    await page.goto('http://localhost:5500/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    const testTask = await page.textContent('.task');
    expect(testTask).toContain('Test Task');
});

test('user can delete a task', async ({page}) => {
    await page.goto('http://localhost:5500/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    await page.click('.task .delete-task');
    const tests = await page.$$eval('.task',
        tests=> tests.map(test => test.textContent))
    expect(tests).not.toContain('Test Task')
});


test('user can mark a task as complete', async ({page}) => {
    await page.goto('http://localhost:5500/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    await page.click('.task .task-complete');
    const completeTask = await page.$('.task.completed');
    expect(completeTask).not.toBeNull();
});

test('user can filter task', async ({page}) => {
    await page.goto('http://localhost:5500/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    await page.click('.task .task-complete');
   await page.selectOption('#filter', 'Completed');
   const inConpletedTask = await page.$('.task:not(.completed)');
   expect(inConpletedTask).toBeNull();
});

