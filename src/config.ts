
export const CLIENT_URL = 'http://localhost:4200';
export const DB_URI = 'mongodb://localhost:27017/Sonder';
export const TOKEN_SECRET = 'SonderSecret';
export const CORS_OPTIONS = {
  origin: CLIENT_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  allowHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authentication, x-auth',
  methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  credentials: true
}