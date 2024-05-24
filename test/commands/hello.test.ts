import * as hello from '../../src/commands/hello';

test('hello command', () => {
    expect(hello.data.name).toBe('hello');
    expect(hello.data.description).toBe('Replies Hi Back!');
    expect(hello.execute('')).resolves.toBe('Hi Back!');
    expect(hello.execute('tes')).resolves.toBe('Hi Back!');
});