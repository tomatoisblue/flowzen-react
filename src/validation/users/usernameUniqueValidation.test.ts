import axios from "axios";
import { usernameUniqueValidation } from "./usernameUniqueValidation";

jest.mock('axios');

describe('usernameUniqueValidation', () => {
  const mockAxios = axios as jest.Mocked<typeof axios>

  it('returns false for an existing username', async () => {
    const existingUsername = 'moto';
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({ status: 400 }));

    const result = await usernameUniqueValidation(existingUsername);

    expect(result).toBeFalsy();
    expect(mockAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('/username-unique'),
      { username: existingUsername },
      expect.any(Object)
    );
  });

  it('returns true for a non-existing username', async () => {
    const nonExistingUsername = 'alasjdfasldfj';
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({ status: 200 }));

    const result = await usernameUniqueValidation(nonExistingUsername);

    expect(result).toBeTruthy();
    expect(mockAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('/username-unique'),
      { username: nonExistingUsername },
      expect.any(Object)
    );
  });
});
