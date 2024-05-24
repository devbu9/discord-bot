import * as echo from '../../src/commands/echo';

test('echo command', () => {
    expect(echo.data.name).toBe('echo');
    expect(echo.data.description).toBe('Echo what you said!');
    expect(echo.execute('Hello, world!')).resolves.toBe('Hello, world!');
});