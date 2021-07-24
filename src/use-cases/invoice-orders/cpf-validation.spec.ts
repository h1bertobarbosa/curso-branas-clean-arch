import { validate } from './cpf-validation.validate';

describe('CPF Validation test', () => {
  it('should be return false if type repeated numbers', async () => {
    expect(validate('00000000000')).toBeFalsy();
  });

  it('should be return false if invalid length', async () => {
    expect(validate('123456789123')).toBeFalsy();
  });

  it('should be return false if invalid cpf', async () => {
    expect(validate('86446422799')).toBeFalsy();
  });

  it('should be return false if type cpf with Nan', async () => {
    expect(validate('a1720b89726')).toBeFalsy();
  });

  it('should be return false mod 11 invalid', async () => {
    expect(validate('12345678912')).toBeFalsy();
  });

  it('should be return true if cpf is valid', async () => {
    expect(validate('86446422784')).toBeTruthy();
  });

  it('should be return true if cpf is valid with dot', async () => {
    expect(validate('864.464.227-84')).toBeTruthy();
  });
});
