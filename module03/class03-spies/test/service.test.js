import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import Service from '../src/service.js';

import fsPromises from 'fs/promises';
import crypto from 'crypto';

describe('#Service Suite', () => {
  let _service;
  const filename = 'testfile.ndjson';

  const MOCKED_HASH_PWD = 'hashedPassword';
  describe('#create - spies', () => {
    beforeEach(() => {
      jest.spyOn(crypto, crypto.createHash.name).mockReturnValue({
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValue(MOCKED_HASH_PWD),
      });

      jest.spyOn(fsPromises, fsPromises.appendFile.name).mockResolvedValue();

      _service = new Service({ filename });

    });

    it('should call append file with right params', async () => {
      const input = {
        username: 'user1',
        password: 'pass1',
      };

      const expectCreatedAt = new Date().toISOString();

      jest
        .spyOn(Date.prototype, Date.prototype.toISOString.name)
        .mockReturnValue(expectCreatedAt);

      await _service.create(input);

      expect(crypto.createHash).toHaveBeenCalledWith('sha256');

      const hash = crypto.createHash('sha256')
      expect(hash.update).toHaveBeenCalledWith(input.password)
      expect(hash.digest).toHaveBeenCalledWith('hex')

      const expected = JSON.stringify({
        ...input,
        createdAt: expectCreatedAt,
        password: MOCKED_HASH_PWD
      }).concat('\n')

      expect(fsPromises.appendFile).toHaveBeenCalledWith(filename, expected)
    });
  });
});
