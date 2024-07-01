import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

interface Message {
  message: string;
  user: string;
  timestamp: string;
}

let messages: Message[] = [];

// Get all messages
app.get("/messages", (req: Request, res: Response) => {
  res.json({ messages });
});

// Send a new message
app.post("/message", (req: Request, res: Response) => {
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
