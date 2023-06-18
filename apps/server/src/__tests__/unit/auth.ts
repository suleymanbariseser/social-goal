import { registerUser } from '@/controllers/auth';
import { User } from '@/lib/db/schema';

describe('auth controller', () => {
  test('should throw error if user already exists', () => {
    const user: User = {
      email: 'abc@test.com',
      firstName: 'Abc',
      lastName: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      id: 12,
      password: 'Qq12345678.',
    };

    registerUser({ input: user });
  });
});
