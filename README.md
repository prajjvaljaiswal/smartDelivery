# 🚚 Smart Delivery Management System

🚀 Getting Started
1. Clone the repository

        git clone https://github.com/your-username/smart-delivery-system.git
        cd smartDelivery
  
2. Start Backend (in /backend)

        npm install
        npm run build
        npm start
  
3. Start Frontend (in /frontend)

        npm install
        npm run dev
   

**Here is Postman URL
        https://hackathon-1988.postman.co/workspace/My-Workspace~05eb9615-d0fe-4f6e-8544-0dfa8d4257b4/collection/40849698-befa6973-3933-48ae-a7df-48d3c9d7229d?action=share&creator=40849698
        

🔌 API Endpoints
🔹 Partner Routes

    GET    /api/partners
    POST   /api/partners
    PUT    /api/partners/:id
    DELETE /api/partners/:id
    
🔹 Order Routes

    GET    /api/orders
    POST   /api/orders/assign
    PUT    /api/orders/:id/status
🔹 Assignment Routes

    GET  /api/assignments/metrics
    POST /api/assignments/run

📊 Key Features
  ✅ Partner Management  

    Partner registration and profile editing
    Area and shift assignment
    List view with status, metrics, and load

  📦 Order Processing

    View active and historical orders
    Status tracking: pending → assigned → picked → delivered
    Assignment history and scheduled timing

  🧠 Assignment Dashboard

    Smart order-to-partner matching
    Tracks assignment attempts and outcomes
    Live availability view (Available / Busy / Offline)  

  **NOTE**
  This application is just an demo. Some real time features are not got create yet like assigning assignment to partner and such. It will be ready soon. There are alway room for improvement.
