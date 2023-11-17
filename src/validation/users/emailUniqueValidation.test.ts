import axios from "axios";
import { emailUniqueValidation } from "./emailUniqueValidation";

jest.mock('axios');

describe('emailUniqueValidation', () => {
  const mockAxios = axios as jest.Mocked<typeof axios>

  it('returns false for an existing email', async () => {
    const existingEmail = 'moto@gmail.com';
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({ status: 400 }));

    const result = await emailUniqueValidation(existingEmail);

    expect(result).toBeFalsy();
    expect(mockAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('/email-unique'),
      { email: existingEmail },
      expect.any(Object)
    );
  });

  it('returns true for a non-existing email', async () => {
    const nonExistingEmail = 'tarotaro@gmail.com';
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({ status: 200 }));

    const result = await emailUniqueValidation(nonExistingEmail);

    expect(result).toBeTruthy();
    expect(mockAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('/email-unique'),
      { email: nonExistingEmail },
      expect.any(Object)
    );
  });
});
