import { expect, request, test } from '@playwright/test';

type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

test('Validate completed todo count', async () => {
    const apiContext = await request.newContext();

    try {
        const response = await apiContext.get('https://jsonplaceholder.typicode.com/todos');

        expect(response.status()).toBe(200);

        const responseBody = (await response.json()) as Todo[];
        expect(Array.isArray(responseBody)).toBeTruthy();

        const completedTodoCount = responseBody.filter((todo) => todo.completed).length;
        console.log(`Total completed todos: ${completedTodoCount}`);

        expect(completedTodoCount).toBe(90);
    } finally {
        await apiContext.dispose();
    }
});
