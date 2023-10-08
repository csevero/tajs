import { describe, it, expect, jest } from '@jest/globals'
import Person from '../src/person'

describe('#Person Suite', () => {
  describe('#validate', () => {
    it('Should throw if the name is not present', () => {
      // mock is the necessary entrance to test work 
      const mockInvalidPerson = {
        name: '',
        cpf: '444.555.666-77'
      }

      expect(() => Person.validate(mockInvalidPerson)).toThrow(new Error('name is required'))
    })

    it('Should throw if the cpf is not present', () => {
      // mock is the necessary entrance to test work 
      const mockInvalidPerson = {
        name: 'John Doe',
        cpf: ''
      }

      expect(() => Person.validate(mockInvalidPerson)).toThrow(new Error('cpf is required'))
    })

    it('Should not throw if person is valid', () => {
      // mock is the necessary entrance to test work 
      const mockInvalidPerson = {
        name: 'John Doe',
        cpf: '444.555.666-77'
      }

      expect(() => Person.validate(mockInvalidPerson)).not.toThrow()
    })
  })

  describe('#format', () => {
    // start of principle that the data is already validate by the .validate method

    it('should format the person name and cpf', () => {
      // AAA
      // Arrange = prepare
      const mockPerson = {
        name: 'John Doe Bryan',
        cpf: '444.555.666-99'
      }

      // Act = execute
      const formattedPerson = Person.format(mockPerson)

      // Asset = validate
      const expected = {
        firstName: 'John',
        lastName: 'Doe Bryan',
        cpf: '44455566699'
      }

      expect(formattedPerson).toStrictEqual(expected)
    })
  })

  describe('#save', () => {
    it.todo('should throw if firstName is not present')
    it.todo('should throw if cpf is not present')
    it.todo('should throw if lastName is not present')
    it.todo('should not throw if person is valid')
  })

  describe('#process', () => {
    it('should process a valid person', () => {
      // Arrange
      const mockPerson = {
        name: 'John Doe Bryan',
        cpf: '444.555.666-99'
      }

      jest.spyOn(Person, Person.validate.name)
      .mockReturnValue()
      // .mockImplementation(() => {throw new Error('Deu ruim!')})
      
      jest.spyOn(Person, Person.format.name).mockReturnValue({
        firstName: 'John',
        lastName: 'Doe Bryan',
        cpf: '44455566699'
      })

      // Act
      const result = Person.process(mockPerson)

      // Assert

      const expected = 'ok'
      expect(result).toStrictEqual(expected)
    })
  })
})