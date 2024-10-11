import env from "../env";
import app from "./app";
// Start Server
app.listen(env.PORT, () => {
    console.log(`Listening on port ${env.PORT}....`)
});