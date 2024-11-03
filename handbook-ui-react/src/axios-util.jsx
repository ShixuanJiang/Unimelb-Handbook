import axios from 'axios';

class ApiService {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL: baseURL,
      timeout: 10000, 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      response => {
        return response.data; 
      },
      error => {
        this.handleError(error);
        return Promise.reject(error);
      }
    );
  }

  handleError(error) {
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error:', error.message);
    }
  }

  get(url, params = {}) {
    return this.client.get(url, { params });
  }

  post(url, data = {}) {
    return this.client.post(url, data);
  }

  put(url, data = {}) {
    return this.client.put(url, data);
  }

  delete(url) {
    return this.client.delete(url);
  }
}

export default ApiService;
