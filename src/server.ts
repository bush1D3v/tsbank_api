import app from "./index";

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT);

export default server;
