/* Internal Modules */
import { app } from "./app/server.js";
const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server App is listening on port:${port}. http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map