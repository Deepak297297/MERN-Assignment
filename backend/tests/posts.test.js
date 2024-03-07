import request from 'supertest';
import app from '../app'; // Assuming your app is configured properly and exported from 'app.js'
import Post from '../db/models/postModel'; // Assuming the Post model is imported properly

// Mocking Post.find function
const mockFind = jest.fn();

jest.mock('../db/models/postModel', () => ({
  find: mockFind,
}));

describe('GET /api/posts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all posts', async () => {
    const mockPosts = [{ title: 'Post 1', body: 'Body of post 1' }, { title: 'Post 2', body: 'Body of post 2' }];
    mockFind.mockResolvedValue(mockPosts);

    const res = await request(app).get('/api/posts');

    expect(res.status).toBe(200);
    expect(res.body.posts).toEqual(mockPosts);
  });

  it('should return 500 if an error occurs while fetching posts', async () => {
    mockFind.mockRejectedValue(new Error('Database error'));

    const res = await request(app).get('/api/posts');

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('An error occurred while fetching posts');
  });
});
