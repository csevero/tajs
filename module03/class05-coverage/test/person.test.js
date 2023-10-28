import { it, expect, jest, describe, beforeEach } from '@jest/globals';
import { mapPerson } from '../src/person';

describe('Person Test Suite', () => {
  describe('Happy path', () => {
    it('should map person', () => {
      const personStr = '{"name":"Carlos","age":23}';
      const personObj = mapPerson(personStr);
      expect(personObj).toEqual({
        name: 'Carlos',
        age: 23,
        createdAt: expect.any(Date),
      });
    });
  });
  
  describe('What coverage doesnt tell you', () => {
    it('should not map person given invalid JSON string', () => {
      const personStr = '{"name":';
      expect(() => mapPerson(personStr)).toThrow('Unexpected end of JSON input')
    });
    
    it('should not map person given invalid JSON data', () => {
      const personStr = '{"names":"Carlos","ages":23}';
      const personObj = mapPerson(personStr);
      expect(personObj).toEqual({
        name: undefined,
        age: undefined,
        createdAt: expect.any(Date),
      });
    });
  });
});
