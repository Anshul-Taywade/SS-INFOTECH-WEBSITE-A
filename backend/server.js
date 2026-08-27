const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const env = require('./config/env');
const { notFound, errorHandler } = require('./middleware/error.middleware');

// Route imports
const authRoutes = require('./routes/auth.routes');
const contactRoutes = require('./routes/contact.routes');
const newsletterRoutes = require('./routes/newsletter.routes');
const serviceRoutes = require('./routes/service.routes');
const projectRoutes = require('./routes/project.routes');
const testimonialRoutes = require('./routes/testimonial.routes');
const partnerRoutes = require('./routes/partner.routes');
const careerRoutes = require('./routes/career.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

// Initialize app
const app = express();

// Connect to Database
connectDB();

// Security Middlewares
app.use(helmet());

// Enable CORS
app.use(
  cors({
    origin: [env.CLIENT_URL, 'http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Body Parser & Logger
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health Check Route
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'SS Infotech Backend API is running smoothly',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/contacts', contactRoutes);
app.use('/api/v1/newsletter', newsletterRoutes);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/testimonials', testimonialRoutes);
app.use('/api/v1/partners', partnerRoutes);
app.use('/api/v1/careers', careerRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

// Error Middlewares
app.use(notFound);
app.use(errorHandler);

// Start Server
const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 SS Infotech Server listening on port ${PORT} [${env.NODE_ENV}]`);
});
