import { it, expect, jest, describe, beforeEach } from '@jest/globals';
import Task from '../src/task';
import { setTimeout } from 'node:timers/promises';

describe('Task Test Suite', () => {
  let _logMock;
  let _task;

  beforeEach(() => {
    _logMock = jest.spyOn(console, console.log.name).mockImplementation();

    _task = new Task();
  });

  it.skip('should only run tasks that are due date without fake timers (slow)', async () => {
    const tasks = [
      {
        name: 'Task-Will-Run-In-5-Secs',
        dueAt: new Date(Date.now() + 5000),
        fn: jest.fn(),
      },
      {
        name: 'Task-Will-Run-In-10-Secs',
        dueAt: new Date(Date.now() + 10000),
        fn: jest.fn(),
      },
    ];

    _task.save(tasks[0]);
    _task.save(tasks[1]);

    _task.run(200);

    await setTimeout(11e3);

    expect(tasks[0].fn).toHaveBeenCalled();
    expect(tasks[1].fn).toHaveBeenCalled();
  }, // timeout to run this test
  15e3);

  it('should only run tasks that are due date with fake timers (fast)', async () => {
    // initializing jest faketimers
    jest.useFakeTimers()

    const tasks = [
      {
        name: 'Task-Will-Run-In-5-Secs',
        dueAt: new Date(Date.now() + 5000),
        fn: jest.fn(),
      },
      {
        name: 'Task-Will-Run-In-10-Secs',
        dueAt: new Date(Date.now() + 10000),
        fn: jest.fn(),
      },
    ];

    _task.save(tasks[0]);
    _task.save(tasks[1]);

    _task.run(200);

    // advancing 4 seconds of faketimers
    jest.advanceTimersByTime(4000)

    // our tasks shouldn't be called, because the first task will executed just after 5 seconds
    expect(tasks[0].fn).not.toHaveBeenCalled();
    expect(tasks[1].fn).not.toHaveBeenCalled();

    // advancing more 2 seconds, so we're 6 seconds in the future
    jest.advanceTimersByTime(2000)

    // now our first task should be called
    expect(tasks[0].fn).toHaveBeenCalled();
    expect(tasks[1].fn).not.toHaveBeenCalled();

    // advancing more 4 seconds, so we're 10 minutes in the future
    jest.advanceTimersByTime(4000)

    // now our second task should be called
    expect(tasks[1].fn).toHaveBeenCalled();

    // after test we can put this information to jest use the realTimers after test
    jest.useRealTimers()
  });
});
