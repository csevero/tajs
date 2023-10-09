import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import Service from '../src/service.js'

// import crypto from 'crypto'
import fsPromises from 'fs/promises'
import fs from 'fs'

describe('#Service Suite', () => {
  let _service
  const filename = 'testfile.ndjson'

  beforeEach(() => {
    _service = new Service({ filename })
  })

  describe('#read', () => {
    it('should return an empty array if the file is empty', async () => {
      jest.spyOn(fs, 'existsSync').mockReturnValue(true)
      const readFileSpyOn = jest.spyOn(fsPromises, fsPromises.readFile.name).mockResolvedValue('')

      const result = await _service.read()

      expect(result).toEqual({})
      expect(readFileSpyOn).toHaveBeenCalled()
    })

    it('should return an empty array if the file not exists', async () => {
      jest.spyOn(fs, 'existsSync').mockReturnValue(false)
      const readFileSpyOn = jest.spyOn(fsPromises, 'readFile').mockResolvedValue('')

      const result = await _service.read()

      expect(result).toEqual({})
      expect(readFileSpyOn).not.toHaveBeenCalled()
    })

    it('should return users without password if file contains users', async () => {
      // Arrange
      const dbData = [
        {
          username: 'John Doe 1',
          password: 'pass1',
          createdAt: new Date().toISOString()
        },
        {
          username: 'John Doe 2',
          password: 'pass2',
          createdAt: new Date().toISOString()
        },
        {
          username: 'John Doe 3',
          password: 'pass3',
          createdAt: new Date().toISOString()
        },
      ]

      const fileContents = dbData.map(item => JSON.stringify(item).concat('\n')).join('')

      jest.spyOn(fs, 'existsSync').mockReturnValue(true)
      jest.spyOn(fsPromises, 'readFile').mockResolvedValue(fileContents)

      // Act
      const result = await _service.read()

      // Assert
      const expected = dbData.map(({ password, ...rest }) => ({ ...rest }))

      expect(result).toStrictEqual(expected)
    })
  })
})