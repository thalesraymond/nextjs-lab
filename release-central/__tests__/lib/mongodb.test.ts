jest.mock('mongodb', () => {
  return {
    MongoClient: class {
      connect = jest.fn().mockResolvedValue(true);
    }
  };
});

describe('MongoDB Connection', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should throw an error if MONGODB_URI is not defined', async () => {
    delete process.env.MONGODB_URI;
    
    await expect(async () => {
      await import('../../lib/mongodb');
    }).rejects.toThrow('Invalid/Missing environment variable: "MONGODB_URI"');
  });

  it('should return a promise that resolves to a MongoClient', async () => {
    process.env.MONGODB_URI = 'mongodb://localhost:27017/test';
    
    const { default: promise } = await import('../../lib/mongodb');
    expect(promise).toBeInstanceOf(Promise);
  });
});
