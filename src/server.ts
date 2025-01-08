import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Express Server in TypeScript!");
});

// GET API to fetch query and path parameters
app.get("/api/:pathParam", (req: Request, res: Response) => {
  const queryParam: string | undefined = req.query.queryParam as string;
  const pathParam: string = req.params.pathParam;

  res.json({
    info: "GET API Response",
    queryParam: queryParam || "No query parameter provided",
    pathParam: pathParam,
  });
});

// POST API to accept JSON data and return an array
app.post("/api/data", (req: Request, res: Response) => {
  const requestData = req.body; // Extract JSON data from the request body

  if (!requestData || Object.keys(requestData).length === 0) {
    res.status(400).json({
      error: "No JSON data provided",
    });
  }

  const responseArray = Object.entries(requestData).map(([key, value]) => ({
    key,
    value,
  }));

  res.json({
    message: "POST API Response",
    data: responseArray,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
