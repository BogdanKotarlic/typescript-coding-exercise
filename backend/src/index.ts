import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// CORS middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

interface Message {
  message: string;
  user: string;
  timestamp: string;
}

let messages: Message[] = [];

// Plugin system
interface Plugin {
  execute(message: Message): void;
}

class ChatbotPlugin implements Plugin {
  execute(message: Message) {
    if (message.message.includes("hello")) {
      messages.push({
        message: "Hello! How can I assist you today?",
        user: "Chatbot",
        timestamp: new Date().toISOString()
      });
    }
  }
}

const plugins: Plugin[] = [new ChatbotPlugin()];

// Authentication middleware
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (token === 'Bearer valid-token') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Get all messages
app.get("/messages", (req: Request, res: Response) => {
  res.json({ messages });
});

// Send a new message
app.post("/message", authenticate, (req: Request, res: Response) => {
  const { message, user } = req.body;
  if (!message || !user) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const newMessage: Message = {
    message,
    user,
    timestamp: new Date().toISOString(),
  };
  messages.push(newMessage);

  // Execute plugins
  plugins.forEach(plugin => plugin.execute(newMessage));

  res.status(200).json(newMessage);
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).send("Not Found");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
